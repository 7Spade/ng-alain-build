---
type: design_decision
category: authentication
complexity: level_3
target_audience: developers
tags: [firebase, @angular/fire, @delon/auth, authentication, integration]
created: 2025-10-07
summary: Firebase Authentication 與 @delon/auth 整合架構決策
related_files:
  - src/app/app.config.ts
  - src/environments/firebase.config.ts
  - docs/ng-alain-master/src/app/routes/passport/login/login.component.ts
---

# Firebase + @delon/auth 整合架構

## 📋 決策背景

**日期**: 2025-10-07  
**複雜度**: Level 3 (中型功能整合)  
**狀態**: ✅ 已實作

### 問題陳述

使用 `ng add @angular/fire` 自動配置後，`app.config.ts` 出現兩個 `providers` 屬性衝突：
- 原有 ng-alain 配置 (line 70-84)
- Firebase 自動生成配置 (line 93-97)

後者會覆蓋前者，導致整個應用配置失效。

---

## 🎯 解決方案

### 核心策略

採用 **雙認證系統共存** 模式：
1. **@delon/auth**: 主認證系統，管理 Token、路由守衛
2. **Firebase Auth**: 第三方 OAuth 提供者，提供 Google/Facebook/GitHub 等登入

### 架構設計

```
┌─────────────────────────────────────────────────┐
│            Application Config                    │
│                                                  │
│  ┌──────────────┐        ┌──────────────┐      │
│  │ @delon/auth  │        │ Firebase Auth│      │
│  │              │        │              │      │
│  │ provideAuth()│◄──────►│provideFirebase│     │
│  │              │        │     Auth()   │      │
│  └──────────────┘        └──────────────┘      │
│         │                        │              │
│         ▼                        ▼              │
│  Token Management      OAuth Providers          │
│  Route Guards          Google/Facebook/GitHub   │
│  HTTP Interceptor      Email/Password           │
│  Refresh Token         Phone Authentication     │
└─────────────────────────────────────────────────┘
```

---

## 🔧 實作細節

### 1. 命名衝突解決

**問題**: `provideAuth` 同時存在於兩個套件中

```typescript
// ❌ 衝突
import { provideAuth } from '@delon/auth';
import { provideAuth } from '@angular/fire/auth';

// ✅ 解決：使用別名
import { provideAuth } from '@delon/auth';
import { provideAuth as provideFirebaseAuth } from '@angular/fire/auth';
```

### 2. 配置提取

將 Firebase 配置移至獨立文件：

**src/environments/firebase.config.ts**
```typescript
export const firebaseConfig = {
  projectId: 'elite-chiller-455712-c4',
  appId: '1:7807661688:web:ff2a2fcd4ff3d8451d1f8d',
  // ... 其他配置
};

export const recaptchaEnterpriseSiteKey = 'YOUR_RECAPTCHA_SITE_KEY';
```

### 3. Providers 合併

**src/app/app.config.ts**
```typescript
const providers: Array<Provider | EnvironmentProviders> = [
  // HTTP & Interceptors
  provideHttpClient(...),
  
  // ng-alain & ng-zorro
  provideAlain(...),
  
  // @delon/auth (主認證系統)
  provideAuth(),
  
  // Firebase 整合 (OAuth 提供者)
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirebaseAuth(() => getAuth()),
  provideAnalytics(() => getAnalytics()),
  // ... 其他 Firebase 服務
  
  // 其他 providers
];
```

---

## 🔄 整合流程

### 類似 Auth0 的整合方式

參考 `docs/ng-alain-master/src/app/routes/passport/login/login.component.ts`：

```typescript
// 1. 用戶點擊 Firebase 登入按鈕
open(type: 'firebase', openType: 'window'): void {
  // 2. 使用 Firebase Auth 進行認證
  const auth = inject(Auth); // 來自 @angular/fire/auth
  
  // 3. Google OAuth 範例
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      const user = result.user;
      
      // 4. 將 Firebase token 存入 @delon/auth
      this.tokenService.set({
        token: user.accessToken,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        expired: user.stsTokenManager.expirationTime
      });
      
      // 5. 重新載入應用資料
      this.startupSrv.load().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
}
```

### 關鍵整合點

1. **Token 同步**: Firebase token → @delon/auth TokenService
2. **用戶資料**: Firebase user → SettingsService.setUser()
3. **路由守衛**: 繼續使用 @delon/auth 的 ACL 系統
4. **HTTP 攔截器**: authSimpleInterceptor 自動附加 token

---

## 📊 Provider 執行順序

```
1. provideHttpClient          ← HTTP 基礎設施
2. provideAuth (@delon)       ← Token 管理系統
3. provideFirebaseApp         ← Firebase 初始化
4. provideFirebaseAuth        ← Firebase Auth 服務
5. provideAnalytics           ← Firebase Analytics
6. provideFirestore           ← Firebase Firestore
   ... (其他 Firebase 服務)
7. provideStartup             ← 應用初始化
```

**重要**: @delon/auth 必須在 Firebase 之前初始化，因為 Firebase 認證結果需要同步到 @delon/auth。

---

## 🛡️ 安全考量

### 1. reCAPTCHA Enterprise

```typescript
provideAppCheck(() => {
  // TODO: 從 Firebase Console 獲取 site key
  const provider = new ReCaptchaEnterpriseProvider(recaptchaEnterpriseSiteKey);
  return initializeAppCheck(undefined, { 
    provider, 
    isTokenAutoRefreshEnabled: true 
  });
})
```

### 2. Token 過期處理

@delon/auth 會處理 token 過期：
- 方案 A: 401 自動刷新 (re-request)
- 方案 B: 主動監聽過期 (auth-refresh)

Firebase token 需要手動同步到 @delon/auth。

---

## ✅ 驗證清單

- [x] 解決 providers 屬性衝突
- [x] 解決 provideAuth 命名衝突
- [x] 提取 Firebase 配置到獨立文件
- [x] 合併所有 providers 到單一數組
- [x] 保留註釋和 TODO 標記
- [x] 通過 Linter 檢查
- [x] 文件化整合架構
- [ ] 實作 Firebase 登入元件
- [ ] 測試 Google/Facebook OAuth
- [ ] 配置 reCAPTCHA Enterprise

---

## 📚 相關文件

### AngularFire 官方文檔
- [Authentication Guide](https://github.com/angular/angularfire/blob/main/docs/auth.md)
- [Configuration](https://github.com/angular/angularfire/blob/main/README.md)
- [App Check](https://github.com/angular/angularfire/blob/main/docs/app-check.md)

### @delon/auth 文檔
- [Getting Started](https://ng-alain.com/auth/getting-started)
- [Social Login](https://ng-alain.com/auth/social)
- [Token Refresh](https://ng-alain.com/auth/refresh-token)

### 專案參考
- 類似實作: `docs/ng-alain-master/src/app/routes/passport/login/login.component.ts`
- 回調處理: `docs/ng-alain-master/src/app/routes/passport/callback.component.ts`

---

## 🎓 最佳實踐

1. **配置管理**: 敏感配置使用環境變數，不要直接提交到 Git
2. **錯誤處理**: Firebase 認證錯誤需要友好的用戶提示
3. **離線支持**: 使用 Firebase Persistence 保持登入狀態
4. **效能優化**: 延遲載入 Firebase 服務（僅在需要時初始化）
5. **測試策略**: 使用 Firebase Emulator Suite 進行本地測試

---

## 🔮 未來擴展

### 計劃中的功能

1. **多因素認證 (MFA)**
   - SMS 驗證
   - TOTP (Time-based One-Time Password)

2. **自訂 Claims**
   - 角色權限同步到 @delon/acl
   - 自訂用戶屬性

3. **離線模式**
   - IndexedDB 緩存
   - 自動重連機制

4. **Analytics 整合**
   - 用戶行為追蹤
   - 轉換漏斗分析

---

**維護者**: Memory Bank System  
**最後更新**: 2025-10-07  
**版本**: 1.0.0

