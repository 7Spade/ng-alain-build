# 🔥 Firebase + @delon/auth 整合指南

> **狀態**: ✅ 配置完成  
> **日期**: 2025-10-07  
> **複雜度**: Level 3

---

## ✅ 已完成修復

### 問題
`ng add @angular/fire` 自動配置後，`app.config.ts` 有兩個 `providers` 屬性衝突。

### 解決方案
✅ 合併 providers 到單一數組  
✅ 解決 `provideAuth` 命名衝突（使用 `provideFirebaseAuth` 別名）  
✅ 提取 Firebase 配置到 `src/environments/firebase.config.ts`  
✅ 通過 Linter 檢查

---

## 📁 檔案結構

```
src/
├── app/
│   └── app.config.ts              ← ✅ 已修復（合併 providers）
├── environments/
│   └── firebase.config.ts         ← ✅ 新增（Firebase 配置）
└── ...

memory-bank/
└── creative-phase/
    └── design-decisions/
        └── firebase-delon-integration.md  ← 📝 整合架構文檔
```

---

## 🔑 核心配置

### 1. Firebase 配置文件

**src/environments/firebase.config.ts**
```typescript
export const firebaseConfig = {
  projectId: 'elite-chiller-455712-c4',
  appId: '1:7807661688:web:ff2a2fcd4ff3d8451d1f8d',
  // ... (已自動配置)
};

export const recaptchaEnterpriseSiteKey = 'YOUR_RECAPTCHA_SITE_KEY';
// ⚠️ TODO: 從 https://console.cloud.google.com/security/recaptcha?project=elite-chiller-455712-c4 獲取
```

### 2. 應用配置

**src/app/app.config.ts**
```typescript
const providers: Array<Provider | EnvironmentProviders> = [
  // @delon/auth (主認證系統)
  provideAuth(),
  
  // Firebase 整合
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirebaseAuth(() => getAuth()),  // 注意：使用別名避免衝突
  provideAnalytics(() => getAnalytics()),
  // ... 其他 Firebase 服務
];
```

---

## 🎯 使用方式

### 雙認證系統架構

```
┌─────────────────────────────────────────┐
│     @delon/auth (主認證系統)             │
│  • Token 管理                            │
│  • 路由守衛                              │
│  • HTTP 攔截器                           │
│  • 權限控制 (ACL)                        │
└─────────────────────────────────────────┘
              ▲
              │ Token 同步
              │
┌─────────────────────────────────────────┐
│   Firebase Auth (OAuth 提供者)          │
│  • Google 登入                           │
│  • Facebook 登入                         │
│  • GitHub 登入                           │
│  • Email/Password                        │
│  • 電話驗證                              │
└─────────────────────────────────────────┘
```

### Firebase 登入範例（類似 Auth0）

```typescript
import { inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { Router } from '@angular/router';
import { StartupService } from '@core';

export class LoginComponent {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private startupSrv = inject(StartupService);
  private router = inject(Router);

  // Google 登入
  loginWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        const user = result.user;
        
        // 同步到 @delon/auth
        this.tokenService.set({
          token: user.accessToken,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          expired: user.stsTokenManager.expirationTime
        });
        
        // 重新載入應用資料
        this.startupSrv.load().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      })
      .catch((error) => {
        console.error('Firebase 登入失敗:', error);
      });
  }

  // Facebook 登入
  loginWithFacebook(): void {
    signInWithPopup(this.auth, new FacebookAuthProvider())
      .then((result) => {
        // 同樣的 token 同步邏輯
      });
  }
}
```

---

## 📋 待辦事項

### ⚠️ 必要配置

- [ ] **配置 reCAPTCHA Enterprise**
  1. 前往 [Google Cloud Console](https://console.cloud.google.com/security/recaptcha?project=elite-chiller-455712-c4)
  2. 創建 reCAPTCHA Enterprise key
  3. 更新 `src/environments/firebase.config.ts` 中的 `recaptchaEnterpriseSiteKey`

### 🔨 實作功能

- [ ] **創建 Firebase 登入元件**
  - Google 登入按鈕
  - Facebook 登入按鈕
  - GitHub 登入按鈕
  - Email/Password 表單

- [ ] **整合到現有登入頁面**
  - 修改 `src/app/auth/login/login.component.ts`
  - 添加第三方登入選項
  - 實作 token 同步邏輯

- [ ] **測試各種登入方式**
  - Google OAuth 流程
  - Facebook OAuth 流程
  - GitHub OAuth 流程
  - Email/Password 登入
  - 錯誤處理測試

### 🚀 進階功能

- [ ] **多因素認證 (MFA)**
- [ ] **自訂 Claims 同步到 ACL**
- [ ] **離線模式支援**
- [ ] **Firebase Analytics 事件追蹤**

---

## 🔍 驗證配置

### 檢查 providers 是否正確

```bash
# 1. 檢查 linter（應該沒有錯誤）
npm run lint:ts

# 2. 啟動應用
npm start

# 3. 打開 DevTools Console，檢查是否有錯誤
# 應該看到 Firebase 初始化成功的訊息
```

### 檢查 Firebase 連線

```typescript
// 在 Angular DevTools 或 Console 中執行
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

const auth = inject(Auth);
console.log('Firebase Auth 實例:', auth);
console.log('當前用戶:', auth.currentUser);
```

---

## 📚 參考文檔

### 官方文檔
- [AngularFire 官方文檔](https://github.com/angular/angularfire)
- [@delon/auth 文檔](https://ng-alain.com/auth/getting-started)
- [Firebase Console](https://console.firebase.google.com/project/elite-chiller-455712-c4)

### 專案內部文檔
- 詳細架構: `memory-bank/creative-phase/design-decisions/firebase-delon-integration.md`
- Auth0 參考: `docs/ng-alain-master/src/app/routes/passport/login/login.component.ts`

---

## 🛠️ 故障排除

### 問題：找不到 Firebase 模組

```bash
# 重新安裝依賴
npm install
# 或
yarn install
```

### 問題：reCAPTCHA 錯誤

暫時註解掉 App Check：

```typescript
// provideAppCheck(() => {
//   const provider = new ReCaptchaEnterpriseProvider(recaptchaEnterpriseSiteKey);
//   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
// }),
```

### 問題：Token 沒有同步到 @delon/auth

檢查 `tokenService.set()` 是否正確調用，並確保：
1. Firebase 登入成功
2. `result.user.accessToken` 存在
3. StartupService 正確載入

---

## ✨ 優勢

### 為什麼選擇雙認證系統？

✅ **統一介面**: 所有認證都通過 @delon/auth 管理  
✅ **靈活擴展**: 可以輕鬆添加其他 OAuth 提供者  
✅ **ACL 整合**: 直接使用 ng-alain 的權限系統  
✅ **成熟穩定**: Firebase 提供企業級可靠性  
✅ **開發效率**: 減少自行實作 OAuth 的複雜度

---

**維護者**: Memory Bank System  
**版本**: 1.0.0  
**最後更新**: 2025-10-07

