# Firebase Authentication 快速開始指南

> **5 分鐘快速上手** - 從設計到實施的完整指南

---

## 🚀 快速開始（3 步驟）

### Step 1: 啟用 Firebase 登入方式（2 分鐘）

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇專案：`elite-chiller-455712-c4`
3. 點擊 **Authentication** > **Sign-in method**
4. 啟用以下登入方式：
   - ✅ Google
   - ✅ GitHub
   - ✅ Email/Password

### Step 2: 配置環境（1 分鐘）

環境配置已完成，確認以下檔案：

**✅ 已配置：** `src/environments/firebase.config.ts`
```typescript
export const firebaseConfig = {
  projectId: 'elite-chiller-455712-c4',
  appId: '1:7807661688:web:ff2a2fcd4ff3d8451d1f8d',
  // ... 其他配置
};
```

**✅ 已配置：** `src/environments/environment.ts`
```typescript
api: {
  refreshTokenType: 'firebase'  // 使用 Firebase Token 刷新
}
```

### Step 3: 測試登入（2 分鐘）

```bash
# 啟動開發伺服器
npm start

# 或
yarn start
```

訪問 `http://localhost:4200/#/auth/login`，測試：
- ✅ Google 登入按鈕
- ✅ GitHub 登入按鈕
- ✅ Email/Password 登入

---

## 📁 已實施的文件

### 核心服務（7 個）

| 服務 | 路徑 | 功能 |
|------|------|------|
| FirebaseAuthService | `core/services/firebase-auth.service.ts` | Google、GitHub、Email 登入 |
| DelonFirebaseTokenService | `core/services/delon-firebase-token.service.ts` | Token 同步與檢查 |
| TokenRefreshService | `core/services/token-refresh.service.ts` | 被動 Token 刷新 |
| AutoRefreshService | `core/services/auto-refresh.service.ts` | 自動 Token 刷新（已啟動） |
| RBACService | `core/services/rbac.service.ts` | 角色權限管理 |
| MultiTenantAuthService | `core/services/multi-tenant-auth.service.ts` | 多租戶管理 |
| FirebaseErrorHandler | `core/services/firebase-error-handler.service.ts` | 錯誤處理 |

### HTTP 攔截器（2 個）

| 攔截器 | 路徑 | 功能 |
|--------|------|------|
| firebaseAuthInterceptor | `core/net/firebase-auth.interceptor.ts` | 自動附加 Firebase Token |
| tryRefreshFirebaseToken | `core/net/firebase-refresh-token.ts` | 401 錯誤自動刷新 |

### 路由守衛（2 個 + 3 個工廠）

| 守衛 | 路徑 | 功能 |
|------|------|------|
| firebaseAuthGuard | `core/guards/firebase-auth.guard.ts` | 檢查登入狀態 |
| firebaseGuestGuard | `core/guards/firebase-auth.guard.ts` | 只允許未登入 |
| createPermissionGuard() | `core/guards/permission.guard.ts` | 權限守衛工廠 |
| createRoleGuard() | `core/guards/permission.guard.ts` | 角色守衛工廠 |
| createTenantGuard() | `core/guards/permission.guard.ts` | 租戶守衛工廠 |

### 指令（3 個）

| 指令 | 路徑 | 功能 |
|------|------|------|
| *hasPermission | `shared/directives/has-permission.directive.ts` | 權限控制顯示 |
| *hasRole | `shared/directives/has-permission.directive.ts` | 角色控制顯示 |
| *hasNotPermission | `shared/directives/has-permission.directive.ts` | 反向權限控制 |

### 組件（1 個）

| 組件 | 路徑 | 功能 |
|------|------|------|
| CallbackComponent | `auth/callback/callback.component.ts` | Firebase 回調處理 |

---

## 💡 使用範例

### 1. 在組件中使用登入

```typescript
import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from '@core';

@Component({
  template: `
    <button (click)="loginWithGoogle()">Google 登入</button>
    <button (click)="loginWithGitHub()">GitHub 登入</button>
    <button (click)="logout()">登出</button>
  `
})
export class MyComponent {
  private firebaseAuth = inject(FirebaseAuthService);
  
  loginWithGoogle(): void {
    this.firebaseAuth.loginWithGoogle().subscribe();
  }
  
  loginWithGitHub(): void {
    this.firebaseAuth.loginWithGitHub().subscribe();
  }
  
  logout(): void {
    this.firebaseAuth.logout().subscribe();
  }
}
```

### 2. 使用路由守衛

```typescript
import { Routes } from '@angular/router';
import { firebaseAuthGuard, createPermissionGuard, Permission } from '@core';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [firebaseAuthGuard]  // 需要登入
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [createPermissionGuard([Permission.ADMIN])]  // 需要管理員權限
  }
];
```

### 3. 使用權限指令

```html
<!-- 只有有 WRITE_USERS 權限的使用者能看到 -->
<button *hasPermission="Permission.WRITE_USERS">
  新增使用者
</button>

<!-- 只有管理員能看到 -->
<div *hasRole="Role.ADMIN">
  <h2>管理員面板</h2>
</div>

<!-- 沒有權限時顯示 -->
<p *hasNotPermission="Permission.ADMIN">
  您不是管理員
</p>
```

### 4. 檢查權限

```typescript
import { inject } from '@angular/core';
import { RBACService, Permission } from '@core';

private rbac = inject(RBACService);

// 非同步檢查
this.rbac.hasPermission(Permission.WRITE_USERS).subscribe(has => {
  if (has) {
    // 執行操作
  }
});

// 同步檢查（從快取）
if (this.rbac.isAdminSync()) {
  // 快速檢查
}
```

---

## 🔧 配置選項

### 切換 Firebase/Mock 模式

**登入組件：** `src/app/auth/login/login.component.ts`

```typescript
// 設為 true 使用 Firebase，false 使用傳統 Mock API
useFirebase = true;
```

### Token 刷新模式

**環境配置：** `src/environments/environment.ts`

```typescript
api: {
  refreshTokenType: 'firebase'  // Firebase 模式
  // refreshTokenType: 're-request'  // 傳統 HTTP 模式
  // refreshTokenType: 'auth-refresh'  // @delon/auth 模式
}
```

---

## 🐛 常見問題

### Q: 點擊 Google 登入沒反應？

**A:** 檢查 Firebase Console 是否已啟用 Google 登入方式

### Q: Token 刷新失敗？

**A:** 確認 `environment.ts` 中 `refreshTokenType` 設為 `'firebase'`

### Q: 權限指令不生效？

**A:** 確認後端已設定 Custom Claims

### Q: 編譯錯誤？

**A:** 執行 `yarn lint:ts --fix` 自動修復導入問題

---

## 📚 完整文件

- [核心設計（第一部分）](./FIREBASE_AUTHENTICATION_DESIGN.md) - 架構與流程
- [最佳實踐（第二部分）](./FIREBASE_AUTHENTICATION_DESIGN_PART2.md) - 實作與場景
- [文件導航](./README_FIREBASE_DESIGN.md) - 總覽與索引
- [實施總結](./FIREBASE_IMPLEMENTATION_SUMMARY.md) - 完成清單

---

## ✅ 驗證清單

- [x] Firebase 配置已設定
- [x] 核心服務已創建（7個）
- [x] 攔截器已整合（2個）
- [x] 守衛已創建（2個 + 3個工廠）
- [x] 指令已創建（3個）
- [x] 登入組件已更新
- [x] 回調組件已創建
- [x] app.config.ts 已整合
- [x] 自動刷新已啟動
- [ ] Firebase Console 已啟用登入方式 ⏳
- [ ] 後端已實作 Custom Claims ⏳
- [ ] 已完成登入測試 ⏳

---

**🎉 Firebase Authentication 整合已完成，可以開始測試！**

