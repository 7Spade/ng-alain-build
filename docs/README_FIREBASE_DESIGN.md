# Firebase Authentication + @delon/auth 完整設計文件

> **文件概覽與導航指南**

---

## 📚 文件結構

本設計文件分為兩個主要部分，涵蓋 Firebase Authentication 與 @delon/auth 整合的完整設計與實作：

### 📄 第一部分：核心設計與流程
**檔案：** [FIREBASE_AUTHENTICATION_DESIGN.md](./FIREBASE_AUTHENTICATION_DESIGN.md)

**內容包含：**
1. 核心設計理念
2. 架構總覽
3. 登入流程（Google、Email/Password、持久化）
4. HTTP 請求與 Token 附加
5. Token 刷新機制（雙策略）
6. 關鍵代碼解析
   - Firebase 認證服務
   - @delon/auth Token 同步
7. 回調處理
8. 刷新邏輯

### 📄 第二部分：最佳實踐與實作
**檔案：** [FIREBASE_AUTHENTICATION_DESIGN_PART2.md](./FIREBASE_AUTHENTICATION_DESIGN_PART2.md)

**內容包含：**
1. 最佳實踐
   - 安全性最佳實踐
   - 性能優化最佳實踐
   - 錯誤處理最佳實踐
2. 具體使用場景
   - 多租戶 SaaS 應用
   - 角色權限管理（RBAC）
   - 離線模式支援
3. 實作建議與最佳實踐
   - 專案結構建議
   - 環境配置
   - 初始化配置
4. Token 刷新最佳實踐
   - 自動刷新策略
   - 初始化自動刷新
5. 錯誤處理與日誌
   - 統一錯誤處理
   - 日誌服務
6. 安全 Header 配置
   - CSP (Content Security Policy)
   - CORS 配置
   - 安全 Header 設定
7. 完整實作範例

---

## 🎯 快速開始

### 1. 閱讀順序建議

#### 新手入門（首次閱讀）
```
1. 核心設計理念（第一部分）
2. 架構總覽（第一部分）
3. 登入流程（第一部分）
4. 完整實作範例（第二部分）
5. 環境配置（第二部分）
```

#### 深入學習（進階閱讀）
```
1. HTTP 請求與 Token 附加（第一部分）
2. Token 刷新機制（第一部分）
3. 關鍵代碼解析（第一部分）
4. Token 刷新最佳實踐（第二部分）
5. 錯誤處理與日誌（第二部分）
```

#### 安全性關注（重點閱讀）
```
1. 最佳實踐 > 安全性最佳實踐（第二部分）
2. 安全 Header 配置（第二部分）
3. Token 驗證實作（第二部分）
4. Custom Claims 設定（第二部分）
```

### 2. 實作步驟

#### Step 1: 環境準備
```bash
# 安裝依賴
npm install @angular/fire firebase @delon/auth

# 或使用 yarn
yarn add @angular/fire firebase @delon/auth
```

#### Step 2: Firebase 專案設定
1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 創建新專案或選擇現有專案
3. 啟用 Authentication 服務
4. 設定登入方式（Google、Email/Password 等）
5. 複製專案配置到 `environment.ts`

#### Step 3: 應用配置
參考 **第二部分 > 環境配置** 和 **初始化配置** 章節

#### Step 4: 實作核心服務
參考 **第一部分 > 關鍵代碼解析** 章節：
- Firebase 認證服務
- @delon/auth Token 同步
- Token 刷新服務

#### Step 5: 實作 UI 組件
參考 **第二部分 > 完整實作範例** 章節

---

## 🔍 核心概念速查

### Firebase Authentication 核心
| 概念 | 說明 | 文件位置 |
|------|------|---------|
| **ID Token** | Firebase 簽發的 JWT，包含使用者資訊和 Claims | 第一部分 > 核心設計理念 |
| **Custom Claims** | 自訂的使用者屬性（角色、權限等） | 第二部分 > Custom Claims 設定 |
| **Token 刷新** | 自動或手動更新過期的 Token | 第一部分 > Token 刷新機制 |
| **Auth State** | 使用者登入狀態的 Observable | 第一部分 > 登入流程 |

### @delon/auth 核心
| 概念 | 說明 | 文件位置 |
|------|------|---------|
| **DA_SERVICE_TOKEN** | Token 管理服務的 DI Token | 第一部分 > 關鍵代碼解析 |
| **authSimpleInterceptor** | HTTP 請求攔截器，附加 Token | 第一部分 > HTTP 請求與 Token 附加 |
| **SocialService** | 第三方登入服務（可選） | - |
| **Token Model** | Token 資料結構定義 | 第一部分 > 關鍵代碼解析 |

---

## 📊 流程圖總覽

### 主要流程圖

#### 1. 整體架構圖
> 位置：第一部分 > 架構總覽

展示 Firebase、@delon/auth、前端應用和後端 API 之間的關係。

#### 2. Google 登入流程
> 位置：第一部分 > 登入流程 > 流程 1

詳細的 Google OAuth 登入流程，從使用者點擊按鈕到成功登入。

#### 3. Token 刷新流程
> 位置：第一部分 > Token 刷新機制

包含被動刷新（401 觸發）和主動刷新（定時檢查）兩種策略。

#### 4. HTTP 請求攔截流程
> 位置：第一部分 > HTTP 請求與 Token 附加

展示請求如何經過攔截器鏈，附加 Token 並處理錯誤。

---

## 🔑 關鍵代碼片段索引

### 服務層

| 代碼 | 說明 | 位置 |
|------|------|------|
| `FirebaseAuthService` | Firebase 認證核心服務 | 第一部分 > 關鍵代碼解析 > 1 |
| `DelonFirebaseTokenService` | Token 同步服務 | 第一部分 > 關鍵代碼解析 > 2 |
| `TokenRefreshService` | Token 刷新服務 | 第一部分 > 刷新邏輯 |
| `AutoRefreshService` | 自動刷新服務 | 第二部分 > Token 刷新最佳實踐 |
| `RBACService` | 角色權限管理服務 | 第二部分 > 具體使用場景 > 場景 2 |
| `MultiTenantAuthService` | 多租戶認證服務 | 第二部分 > 具體使用場景 > 場景 1 |

### 攔截器

| 代碼 | 說明 | 位置 |
|------|------|------|
| `firebaseAuthInterceptor` | Firebase Token 附加攔截器 | 第一部分 > HTTP 請求與 Token 附加 |
| `tryRefreshFirebaseToken` | 被動刷新函數 | 第一部分 > Token 刷新機制 > 策略一 |

### 組件

| 代碼 | 說明 | 位置 |
|------|------|------|
| `LoginComponent` | 登入頁面組件 | 第二部分 > 完整實作範例 |
| `CallbackComponent` | 認證回調組件 | 第一部分 > 回調處理 |

### 配置

| 代碼 | 說明 | 位置 |
|------|------|------|
| `appConfig` | 應用主配置 | 第二部分 > 初始化配置 |
| `environment` | 環境配置 | 第二部分 > 環境配置 |
| `CSP_CONFIG` | CSP 安全策略 | 第二部分 > 安全 Header 配置 |

---

## 🚀 使用場景範例

### 場景 1：標準 Web 應用
**需求：** 使用 Email/Password 和 Google 登入

**參考章節：**
- 第一部分 > 登入流程
- 第二部分 > 完整實作範例

### 場景 2：多租戶 SaaS 平台
**需求：** 支援多個組織/租戶，每個租戶有獨立的權限

**參考章節：**
- 第二部分 > 具體使用場景 > 場景 1
- 第二部分 > Custom Claims 設定

### 場景 3：企業後台管理系統
**需求：** 複雜的角色權限管理（RBAC）

**參考章節：**
- 第二部分 > 具體使用場景 > 場景 2
- 第二部分 > Custom Claims 設定

### 場景 4：混合應用（支援離線）
**需求：** 需要在離線狀態下保持登入

**參考章節：**
- 第二部分 > 具體使用場景 > 場景 3
- 第一部分 > 登入流程 > 流程 3

---

## ⚠️ 常見問題與注意事項

### Q1: Firebase Token 與 @delon Token 的關係？
**A:** Firebase Token（ID Token）是由 Firebase 簽發的 JWT，@delon/auth 的 Token 是用於統一管理和使用的介面層。我們將 Firebase Token 同步到 @delon Token，以便在整個應用中使用統一的 Token 管理機制。

**參考：** 第一部分 > 關鍵代碼解析 > @delon/auth Token 同步

### Q2: 什麼時候需要刷新 Token？
**A:** 有兩種策略：
1. **被動刷新：** 當 API 返回 401 錯誤時
2. **主動刷新：** Token 即將過期時（建議提前 5 分鐘）

**參考：** 第一部分 > Token 刷新機制（雙策略）

### Q3: Custom Claims 有什麼限制？
**A:** 
- 最大 1000 字元
- 只能在後端（Admin SDK）設定
- 需要刷新 Token 才能生效
- 不能使用保留的 OIDC 名稱

**參考：** 第二部分 > 最佳實踐 > Custom Claims 設定

### Q4: 如何實作權限檢查？
**A:** 使用 Custom Claims 存儲角色和權限，然後在前端和後端都進行檢查：
- 前端：使用 `RBACService` 和 `HasPermissionDirective`
- 後端：在 API 中驗證 Token 的 Claims

**參考：** 第二部分 > 具體使用場景 > 場景 2

### Q5: 如何處理 Token 過期？
**A:** 實作自動刷新機制：
1. 啟動 `AutoRefreshService`
2. 監聽 Firebase `idToken` 變化
3. 定期檢查 Token 狀態
4. HTTP 401 錯誤時觸發被動刷新

**參考：** 
- 第一部分 > Token 刷新機制
- 第二部分 > Token 刷新最佳實踐

---

## 🛠️ 除錯技巧

### 1. 啟用 Firebase Debug 模式
```typescript
import { getApp } from '@angular/fire/app';
import { enableLogging } from 'firebase/database';

enableLogging(true);  // 啟用 Firebase 日誌
```

### 2. 檢查 Token 內容
```typescript
// 在瀏覽器 Console 執行
const user = firebase.auth().currentUser;
if (user) {
  user.getIdTokenResult().then(result => {
    console.log('Token:', result.token);
    console.log('Claims:', result.claims);
    console.log('Expiration:', new Date(result.expirationTime));
  });
}
```

### 3. 檢查 @delon Token 狀態
```typescript
// 注入 DA_SERVICE_TOKEN
console.log('Delon Token:', this.tokenService.get());
```

### 4. 監控 HTTP 請求
```typescript
// 使用 Angular DevTools 或瀏覽器 Network Tab
// 檢查 Authorization Header 是否正確附加
```

---

## 📖 延伸閱讀

### 官方文件
- [Firebase Authentication 文件](https://firebase.google.com/docs/auth)
- [AngularFire 文件](https://github.com/angular/angularfire)
- [@delon/auth 文件](https://ng-alain.com/auth)
- [Angular Security 最佳實踐](https://angular.dev/best-practices/security)

### 相關主題
- [JWT 介紹](https://jwt.io/introduction)
- [OAuth 2.0 規範](https://oauth.net/2/)
- [RBAC 權限模型](https://en.wikipedia.org/wiki/Role-based_access_control)
- [CSP 安全策略](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CSP)

---

## 📝 版本歷史

| 版本 | 日期 | 變更內容 |
|------|------|----------|
| 1.0.0 | 2025-10-07 | 初始版本，完整設計文件 |

---

## 📧 聯絡與反饋

如有任何問題或建議，請透過以下方式聯絡：

- GitHub Issues: [專案儲存庫](https://github.com/your-repo)
- Email: your-email@example.com

---

**© 2025 ng-alain + Firebase Authentication 整合設計**

