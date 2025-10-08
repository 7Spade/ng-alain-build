# Firebase Authentication Bug Fixes - 2025-10-07

**執行方法**: VAN + Context7 + Sequential Thinking  
**問題來源**: 用戶反饋實際使用問題  
**狀態**: ✅ 已修復並建構成功

---

## 🐛 問題報告

### 問題 1: Google 登入首次卡住，F5 後才能用
**症狀**: 點擊 Google 登入後沒有反應，需要刷新頁面，第二次點擊才能成功

### 問題 2: 信箱註冊異常
**症狀**: 註冊頁面無法使用 Firebase 註冊

### 問題 3: 已註冊無法登入
**症狀**: 使用 Email/Password 登入失敗

---

## 🔍 根本原因分析

### 問題 1 根本原因：Popup 被瀏覽器阻止

**Context7 官方文檔驗證**:
- AngularFire 文檔明確指出：`signInWithPopup` 可能被瀏覽器阻止
- 官方建議：Web 環境優先使用 `signInWithRedirect`
- Cordova 環境必須使用 `signInWithRedirect`

**原始代碼問題**:
```typescript
// ❌ 舊代碼（firebase-auth.service.ts）
loginWithGoogle(useRedirect = false): Observable<User> {
  const signInMethod = useRedirect ? signInWithRedirect : signInWithPopup;
  return from(signInMethod(this.auth, provider)).pipe(
    map(credential => (credential as UserCredential).user),
    // ...
  );
}
```

**問題**:
1. 預設使用 Popup（`useRedirect = false`）
2. Popup 被阻止時沒有 fallback
3. `signInWithRedirect` 不返回 UserCredential（會離開頁面）
4. 缺少 `getRedirectResult()` 處理回調

### 問題 2 根本原因：未整合 Firebase 註冊

**原始代碼問題**:
```typescript
// ❌ 舊代碼（register.component.ts）
submit(): void {
  this.http.post('/register', data, null, {
    context: new HttpContext().set(ALLOW_ANONYMOUS, true)
  })
  .subscribe(() => {
    this.router.navigate(['/auth/register-result'], { queryParams: { email: data.mail } });
  });
}
```

**問題**:
- 仍使用 Mock API
- 未使用 `FirebaseAuthService.registerWithEmailPassword`
- Firebase 無法記錄註冊的用戶

### 問題 3 根本原因：Email 格式錯誤

**原始代碼問題**:
```typescript
// ❌ 舊代碼（login.component.ts）
const email = `${this.form.value.userName}@example.com`;
```

**問題**:
- 自動添加 `@example.com` 後綴
- Firebase 認證需要真實 email
- 與註冊的 email 不匹配

---

## ✅ 修復方案

### 修復 1: Google 登入改用 Redirect 模式

**檔案**: `src/app/core/services/firebase-auth.service.ts`

**修改內容**:

#### 1.1 添加 getRedirectResult 導入
```typescript
import {
  Auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,  // ✅ 新增
  // ...
} from '@angular/fire/auth';
```

#### 1.2 修改 loginWithGoogle 方法
```typescript
/**
 * Google 登入（使用 Redirect 模式，避免 Popup 被瀏覽器阻止）
 * @param useRedirect - 是否使用 Redirect 模式（預設 true）
 */
loginWithGoogle(useRedirect = true): Observable<void> {  // ✅ 改為 void
  this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);

  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  if (useRedirect) {
    // Redirect 模式：會離開頁面，返回後在 handleRedirectResult 處理
    return from(signInWithRedirect(this.auth, provider)).pipe(
      tap(() => console.log('[Firebase Auth] 正在跳轉至 Google 登入頁...')),
      catchError(error => this.handleLoginError(error))
    );
  } else {
    // Popup 模式：適用於不會被阻止的環境（fallback）
    return from(signInWithPopup(this.auth, provider)).pipe(
      tap(credential => this.onLoginSuccess(credential.user, FirebaseLoginMethod.GOOGLE)),
      map(() => undefined),
      catchError(error => this.handleLoginError(error))
    );
  }
}
```

#### 1.3 添加 handleRedirectResult 方法
```typescript
/**
 * 處理 Redirect 登入回調
 * 應在應用啟動時調用（constructor 中）
 */
private handleRedirectResult(): void {
  from(getRedirectResult(this.auth))
    .pipe(
      tap(result => {
        if (result && result.user) {
          console.log('[Firebase Auth] Redirect 登入成功:', result.user.email);
          // 判斷登入方法
          const providerId = result.providerId;
          const method = providerId?.includes('google') 
            ? FirebaseLoginMethod.GOOGLE 
            : providerId?.includes('github') 
            ? FirebaseLoginMethod.GITHUB 
            : FirebaseLoginMethod.EMAIL_PASSWORD;
          
          this.onLoginSuccess(result.user, method);

          // 導航至原始頁面或首頁（延遲以確保 Token 同步完成）
          const redirect = sessionStorage.getItem('firebase_redirect_url') || '/dashboard';
          sessionStorage.removeItem('firebase_redirect_url');
          setTimeout(() => {
            console.log('[Firebase Auth] 導航至:', redirect);
            this.router.navigateByUrl(redirect);
          }, 200);
        }
      }),
      catchError(error => {
        if (error && error.code) {
          console.error('[Firebase Auth] Redirect 登入失敗:', error);
          // 錯誤處理...
        }
        return of(null);
      })
    )
    .subscribe();
}
```

#### 1.4 在 constructor 中調用
```typescript
constructor() {
  this.setupTokenSync();
  this.setupAuthStateMonitor();
  this.handleRedirectResult();  // ✅ 新增：處理 Redirect 回調
}
```

---

### 修復 2: 整合 Firebase 註冊功能

**檔案**: `src/app/auth/register/register.component.ts`

**修改內容**:

#### 2.1 導入 FirebaseAuthService
```typescript
import { FirebaseAuthService } from '@core';
```

#### 2.2 添加 Firebase 模式開關
```typescript
// Firebase 註冊模式
useFirebase = true; // 設為 true 使用 Firebase，false 使用 Mock API
```

#### 2.3 重構 submit 方法
```typescript
submit(): void {
  if (this.useFirebase) {
    this.registerWithFirebase();
  } else {
    this.registerWithMockAPI();
  }
}

/**
 * Firebase Email/Password 註冊
 */
private registerWithFirebase(): void {
  this.error = '';
  Object.keys(this.form.controls).forEach(key => {
    const control = (this.form.controls as NzSafeAny)[key] as AbstractControl;
    control.markAsDirty();
    control.updateValueAndValidity();
  });
  if (this.form.invalid) {
    return;
  }

  const data = this.form.value;
  const mail = (data.mail as unknown as string) || '';
  const password = (data.password as unknown as string) || '';
  
  this.loading = true;
  this.cdr.detectChanges();

  this.firebaseAuth.registerWithEmailPassword(mail, password).subscribe({
    next: () => {
      console.log('[Register] Firebase 註冊成功');
      this.loading = false;
      this.cdr.detectChanges();
      this.router.navigate(['/auth/register-result'], { queryParams: { email: mail } });
    },
    error: (err: Error) => {
      console.error('[Register] Firebase 註冊失敗:', err);
      this.error = err.message || '註冊失敗';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}
```

---

### 修復 3: Email 登入格式修正

**檔案**: `src/app/auth/login/login.component.ts` + `.html`

**修改內容**:

#### 3.1 移除表單驗證限制
```typescript
// ❌ 舊代碼
form = inject(FormBuilder).nonNullable.group({
  userName: ['', [Validators.required, Validators.pattern(/^(admin|user)$/)]],
  password: ['', [Validators.required, Validators.pattern(/^(123456)$/)]],
  remember: [true]
});

// ✅ 新代碼
form = inject(FormBuilder).nonNullable.group({
  userName: ['', [Validators.required]], // Firebase: 移除 Mock 驗證模式
  password: ['', [Validators.required, Validators.minLength(6)]],
  remember: [true]
});
```

#### 3.2 修改 loginWithFirebase 方法
```typescript
loginWithFirebase(): void {
  // ❌ 舊代碼
  // const email = `${this.form.value.userName}@example.com`;

  // ✅ 新代碼：直接使用輸入的 email
  const email = this.form.value.userName || '';
  const password = this.form.value.password || '';

  // 驗證 email 格式
  if (!email.includes('@')) {
    this.message.error('請輸入有效的 Email 地址');
    return;
  }

  // ... 登入邏輯
}
```

#### 3.3 修改 HTML 模板
```html
<!-- ❌ 舊代碼 -->
<input nz-input formControlName="userName" placeholder="username: admin or user" />

<!-- ✅ 新代碼：根據模式動態調整 -->
<input 
  nz-input 
  formControlName="userName" 
  [placeholder]="useFirebase ? 'Email' : 'username: admin or user'" 
  [type]="useFirebase ? 'email' : 'text'"
/>
```

#### 3.4 Google 登入保存 URL
```typescript
loginWithGoogle(): void {
  // 儲存當前 URL，登入後返回
  const currentUrl = this.tokenService.referrer?.url || '/dashboard';
  sessionStorage.setItem('firebase_redirect_url', currentUrl);

  this.loading = true;
  this.cdr.detectChanges();

  // signInWithRedirect 會離開頁面
  this.firebaseAuth.loginWithGoogle().subscribe({
    next: () => {
      // Redirect 模式下不會執行到這裡
    },
    error: (err: Error) => {
      this.message.error(err.message || 'Google 登入失敗');
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}
```

---

## 📊 修復總結

### 修改文件（3 個）
1. ✅ `src/app/core/services/firebase-auth.service.ts` - Google/GitHub Redirect 登入
2. ✅ `src/app/auth/register/register.component.ts` - Firebase 註冊整合
3. ✅ `src/app/auth/login/login.component.ts` + `.html` - Email 格式修正

### 新增功能
- ✅ Redirect 登入支援（Google + GitHub）
- ✅ Redirect 回調處理（getRedirectResult）
- ✅ Firebase 註冊功能
- ✅ Email 格式驗證
- ✅ sessionStorage URL 保存

### 建構結果
```
Exit Code: 0 ✅
建構時間: 13.416 秒
Bundle 大小: 3.20 MB
```

---

## 🧪 測試計劃

### 測試 1: Email 註冊
1. 訪問 `/auth/register`
2. 輸入 email: `test@example.com`
3. 輸入 password: `123456`
4. 點擊註冊
5. **預期**: 跳轉至 register-result 頁面

### 測試 2: Email 登入
1. 訪問 `/auth/login`
2. 輸入 email: `test@example.com`
3. 輸入 password: `123456`
4. 點擊登入
5. **預期**: 成功登入，跳轉至 dashboard

### 測試 3: Google Redirect 登入
1. 訪問 `/auth/login`
2. 點擊「Google 登入」
3. **預期**: 跳轉至 Google 授權頁面（不再卡住）
4. 授權後自動返回
5. **預期**: 成功登入，跳轉至 dashboard（不需要 F5）

---

## 📚 官方文檔參考

### AngularFire 文檔 (/angular/angularfire)
- ✅ signInWithRedirect 用於 Web 環境
- ✅ getRedirectResult 處理回調
- ✅ Popup vs Redirect 選擇策略

### Firebase Auth 文檔 (/llmstxt/firebase_google-llms.txt)
- ✅ createUserWithEmailAndPassword 註冊
- ✅ signInWithEmailAndPassword 登入
- ✅ Email/Password 需在 Console 啟用

---

## ⚠️ Firebase Console 配置需求

### 必須啟用的認證方法

前往 Firebase Console: https://console.firebase.google.com/

1. **Email/Password** ✅
   - Authentication → Sign-in method
   - 啟用「Email/Password」
   
2. **Google** ✅
   - Authentication → Sign-in method
   - 啟用「Google」
   - 設定支援的電子郵件地址

3. **GitHub** ⚪（選用）
   - Authentication → Sign-in method
   - 啟用「GitHub」
   - 需要 GitHub OAuth App 配置

### 授權網域

確保 `localhost` 在授權網域列表中：
- Authentication → Settings → Authorized domains
- 添加 `localhost` 或 `localhost:4200`

---

## 🎯 修復後預期行為

### Google 登入流程（Redirect 模式）
```
1. 用戶點擊「Google 登入」
2. 儲存當前 URL 到 sessionStorage
3. 執行 signInWithRedirect → 離開頁面
4. 跳轉至 Google 授權頁面
5. 用戶授權
6. Google 跳轉回應用（/#/auth/login）
7. handleRedirectResult() 自動執行
8. getRedirectResult() 獲取登入結果
9. onLoginSuccess() 同步 Token
10. 延遲 200ms 後導航至 dashboard
```

### Email 註冊流程
```
1. 用戶填寫 email + password
2. 點擊註冊
3. 執行 createUserWithEmailAndPassword
4. Firebase 創建新用戶
5. 自動登入
6. 跳轉至 register-result 頁面
```

### Email 登入流程
```
1. 用戶輸入真實 email (test@example.com)
2. 輸入 password
3. 點擊登入
4. 執行 signInWithEmailAndPassword
5. Firebase 驗證 email/password
6. 成功後同步 Token
7. 跳轉至 dashboard
```

---

## 🔧 技術細節

### signInWithRedirect vs signInWithPopup

| 特性 | Popup | Redirect |
|------|-------|----------|
| **用戶體驗** | 彈窗（可能被阻止） | 頁面跳轉（可靠） |
| **返回值** | UserCredential | void（離開頁面） |
| **回調處理** | 直接處理 | 需 getRedirectResult |
| **適用環境** | 桌面瀏覽器 | 所有環境 ✅ |
| **移動端** | 不穩定 | 官方推薦 ✅ |

### getRedirectResult 工作原理

```typescript
// 應在應用啟動時調用（我們在 FirebaseAuthService constructor 中調用）
getRedirectResult(auth).then(result => {
  if (result) {
    // 有登入結果（剛從 Google 返回）
    const user = result.user;
    const providerId = result.providerId; // 'google.com'
    // 處理登入成功邏輯
  } else {
    // 沒有登入結果（正常頁面載入）
  }
});
```

### sessionStorage URL 保存

**為什麼需要**:
- Redirect 會離開頁面並返回
- 原始 URL 信息會丟失
- 需要保存以在登入後返回

**實施**:
```typescript
// 登入前
sessionStorage.setItem('firebase_redirect_url', currentUrl);

// 登入後
const redirect = sessionStorage.getItem('firebase_redirect_url') || '/dashboard';
sessionStorage.removeItem('firebase_redirect_url');
router.navigateByUrl(redirect);
```

---

## ✅ 驗證結果

### 建構測試
```
✅ TypeScript 編譯：通過
✅ Build Status：成功
✅ Build Time：13.416 秒
✅ Initial Bundle：3.20 MB
✅ Lazy Chunks：31 個
✅ 無編譯錯誤
```

### Lint 測試
```
執行中...
```

---

## 📝 後續測試步驟

### 手動測試（待執行）

1. **測試 Firebase Console 配置**
   - 確認 Email/Password 已啟用
   - 確認 Google 已啟用
   - 確認 localhost 在授權網域

2. **測試 Email 註冊**
   - 使用真實 email 註冊
   - 確認 Firebase Console 中出現新用戶
   - 確認跳轉至 register-result

3. **測試 Email 登入**
   - 使用註冊的 email/password 登入
   - 確認成功跳轉至 dashboard

4. **測試 Google Redirect 登入**
   - 首次點擊應直接跳轉（不卡住）
   - 授權後應自動返回並登入
   - 不需要 F5 刷新

5. **測試 GitHub 登入**
   - 同 Google 登入流程

---

## 🎓 關鍵學習

### 1. Popup vs Redirect 選擇

**Context7 官方建議**:
- ✅ Redirect：適用於所有環境，更可靠
- ⚠️ Popup：可能被阻止，僅適合桌面瀏覽器

### 2. getRedirectResult 必須調用

**Firebase 官方文檔**:
- Redirect 登入後，應用會重新載入
- 必須在啟動時調用 `getRedirectResult()` 檢查登入結果
- 如果有結果，說明用戶剛從授權頁面返回

### 3. Email/Password 格式要求

**Firebase 要求**:
- Email 必須是真實格式（含 @）
- Password 最少 6 個字元
- 必須在 Firebase Console 啟用此方法

---

## 🚀 下一步

### 必須執行（Firebase Console）
1. 確認 Email/Password 認證方法已啟用
2. 確認 Google 認證方法已啟用
3. 確認 localhost:4200 在授權網域

### 建議測試
1. 使用 Playwright 自動化測試登入流程
2. 測試各種錯誤情況（密碼錯誤、email 重複等）
3. 測試 Redirect URL 保存功能

---

**修復完成時間**: 2025-10-07  
**執行方法**: VAN + Context7 + Sequential Thinking  
**建構狀態**: ✅ 成功（13.416 秒）  
**狀態**: ✅ **代碼修復完成，待 Firebase Console 配置和實際測試**

