# Firebase Console 配置指南

**專案**: elite-chiller-455712-c4  
**目的**: 啟用 Firebase Authentication 所需的認證方法  
**重要性**: ⭐⭐⭐⭐⭐（必須配置）

---

## 🎯 必須執行的配置

### 1. 啟用 Email/Password 認證

**步驟**:
1. 前往 [Firebase Console](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication/providers)
2. 點擊「Authentication」→「Sign-in method」
3. 找到「Email/Password」
4. 點擊「啟用」

**配置選項**:
- ✅ Email/Password（必須啟用）
- ⚪ Email 連結（無密碼登入）（選用）

**完成後**:
- 狀態應顯示「已啟用」
- 用戶可以使用 Email + Password 註冊和登入

---

### 2. 啟用 Google 認證

**步驟**:
1. 在「Sign-in method」頁面
2. 找到「Google」
3. 點擊「啟用」
4. **重要**: 設定「專案支援電子郵件」

**配置選項**:
```
專案公開顯示名稱: NG-ALAIN Admin
專案支援電子郵件: [您的 Gmail 地址]
```

**完成後**:
- 狀態應顯示「已啟用」
- 用戶可以使用 Google 帳號登入

---

### 3. 啟用 GitHub 認證（選用）

**步驟**:
1. 在「Sign-in method」頁面
2. 找到「GitHub」
3. 點擊「啟用」
4. **需要 GitHub OAuth App**

**GitHub OAuth App 設定**:
1. 前往 [GitHub Settings](https://github.com/settings/developers)
2. New OAuth App
3. 填寫資訊：
   ```
   Application name: NG-ALAIN Firebase Auth
   Homepage URL: http://localhost:4200
   Authorization callback URL: https://elite-chiller-455712-c4.firebaseapp.com/__/auth/handler
   ```
4. 創建後獲取 Client ID 和 Client Secret
5. 回到 Firebase Console 填入

**完成後**:
- 狀態應顯示「已啟用」
- 用戶可以使用 GitHub 帳號登入

---

### 4. 配置授權網域

**步驟**:
1. Authentication → Settings → Authorized domains
2. 確認以下網域在列表中：

**必須包含的網域**:
```
✅ localhost（開發環境）
✅ elite-chiller-455712-c4.firebaseapp.com（Firebase Hosting）
✅ elite-chiller-455712-c4.web.app（Firebase Hosting）
```

**如果部署到自定義網域，添加**:
```
your-custom-domain.com
```

---

## 🔍 驗證配置

### 檢查清單

前往 Authentication → Sign-in method 頁面，確認：

- [ ] **Email/Password**: 已啟用 ✅
- [ ] **Google**: 已啟用 ✅
- [ ] **GitHub**: 已啟用（選用）⚪
- [ ] **授權網域**: localhost 在列表中 ✅
- [ ] **專案支援電子郵件**: 已設定 ✅

---

## 🧪 測試認證配置

### 測試 Email/Password 註冊

1. 訪問 http://localhost:4200/#/auth/register
2. 輸入：
   ```
   Email: test@example.com
   Password: test123456
   Confirm Password: test123456
   ```
3. 點擊「註冊」
4. **預期結果**:
   - ✅ Firebase Console → Authentication → Users 中出現新用戶
   - ✅ 自動跳轉至 register-result 頁面
   - ✅ 用戶自動登入

**如果失敗**:
- 檢查 Console 錯誤訊息
- 確認 Email/Password 已啟用
- 確認密碼至少 6 個字元

---

### 測試 Email/Password 登入

1. 訪問 http://localhost:4200/#/auth/login
2. 輸入剛註冊的帳號：
   ```
   Email: test@example.com
   Password: test123456
   ```
3. 點擊「登錄」
4. **預期結果**:
   - ✅ 登入成功訊息
   - ✅ 跳轉至 /dashboard
   - ✅ StartupService 成功載入
   - ✅ 可以看到用戶資訊

**如果失敗**:
- 檢查 email/password 是否正確
- 檢查瀏覽器 Console 錯誤
- 確認 Firebase Console 中用戶狀態為「已啟用」

---

### 測試 Google Redirect 登入

1. 訪問 http://localhost:4200/#/auth/login
2. 點擊「Google 登入」按鈕
3. **預期行為**:
   - ✅ 頁面跳轉至 Google 授權頁面（不再卡住）
   - ✅ 選擇 Google 帳號
   - ✅ 授權後自動返回 ng-alain 應用
   - ✅ 自動登入並跳轉至 dashboard（不需要 F5）

**如果失敗**:
- 檢查 Google 認證是否已啟用
- 檢查「專案支援電子郵件」是否已設定
- 檢查瀏覽器 Console 錯誤
- 確認沒有 Popup 阻止警告

---

## 📊 Firebase Console 快速訪問

### 重要頁面連結

| 頁面 | 用途 | 直接連結 |
|------|------|----------|
| **Authentication** | 查看用戶、配置認證方法 | [連結](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication) |
| **Sign-in method** | 啟用/停用認證方法 | [連結](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication/providers) |
| **Users** | 查看已註冊用戶 | [連結](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication/users) |
| **Settings** | 授權網域配置 | [連結](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication/settings) |
| **Templates** | Email 模板（密碼重設等） | [連結](https://console.firebase.google.com/project/elite-chiller-455712-c4/authentication/emails) |

---

## 🔐 安全建議

### 密碼要求

**Firebase 預設**:
- 最少 6 個字元

**建議增強**:
- 最少 8 個字元
- 包含大小寫字母
- 包含數字
- 包含特殊字元

**實施方式**:
在 `register.component.ts` 中添加自定義驗證器。

---

### Email 驗證

**啟用 Email 驗證**:
1. Authentication → Settings
2. 「User account management」區塊
3. 啟用「Email verification」

**效果**:
- 新註冊用戶會收到驗證郵件
- 未驗證用戶無法登入（可選配置）

**實施方式**:
```typescript
// 註冊後發送驗證郵件
this.auth.currentUser.sendEmailVerification();
```

---

### 多因素認證（MFA）

**啟用 MFA**:
1. Authentication → Sign-in method
2. Advanced → Multi-factor authentication
3. 選擇「Required」或「Optional」

**支援方法**:
- SMS 簡訊驗證
- TOTP（Google Authenticator）

---

## ⚠️ 常見問題

### 問題 1: Google 登入失敗（unauthorized_client）

**原因**: 授權網域未配置

**解決**:
1. Authentication → Settings → Authorized domains
2. 添加當前網域（localhost 或部署域名）

---

### 問題 2: Email 已被使用

**原因**: 用戶已在 Firebase 註冊

**解決**:
1. 檢查 Firebase Console → Users
2. 如果是測試帳號，可以刪除重新註冊
3. 或使用「找回密碼」功能

---

### 問題 3: 密碼太弱

**原因**: 密碼少於 6 個字元

**解決**:
- 確保密碼至少 6 個字元
- 前端添加驗證（已實施：`Validators.minLength(6)`）

---

### 問題 4: Redirect 後回到登入頁

**原因**: getRedirectResult 未正確處理

**解決**:
- 檢查 `handleRedirectResult()` 是否在應用啟動時調用
- 檢查 sessionStorage 中是否有 `firebase_redirect_url`
- 檢查 Console 日誌

---

## 📝 配置檢查腳本

**在瀏覽器 Console 執行**:

```javascript
// 檢查 Firebase Auth 配置
const auth = firebase.auth();

console.log('Firebase Auth 配置：');
console.log('- Current User:', auth.currentUser?.email || '未登入');
console.log('- App Name:', auth.app.name);
console.log('- Auth Domain:', auth.app.options.authDomain);

// 檢查可用的認證方法
auth.fetchSignInMethodsForEmail('test@example.com').then(methods => {
  console.log('- 可用認證方法:', methods);
});
```

---

## 🎯 下一步

### 配置完成後

1. **測試完整流程**:
   - Email 註冊 → 登入
   - Google Redirect 登入
   - GitHub 登入（如已配置）

2. **檢查 Firebase Console**:
   - Users 頁面應出現新註冊的用戶
   - 可以看到登入方法（Email, Google, GitHub）
   - 可以查看最後登入時間

3. **監控錯誤**:
   - 瀏覽器 Console 日誌
   - Firebase Console → Authentication → Usage
   - Firebase Console → Authentication → Settings → Logs

---

**創建日期**: 2025-10-07  
**適用專案**: elite-chiller-455712-c4  
**文檔版本**: 1.0  
**狀態**: ✅ **配置指南完成，待執行配置**

