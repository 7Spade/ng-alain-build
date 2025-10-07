# Firebase Authentication + @delon/auth 整合設計文件（第二部分）

> 接續 [FIREBASE_AUTHENTICATION_DESIGN.md](./FIREBASE_AUTHENTICATION_DESIGN.md)

---

## ✅ 最佳實踐

### 1. 安全性最佳實踐

| 實踐 | 說明 | 重要性 |
|------|------|--------|
| **使用 HTTPS** | 所有 Firebase 通訊必須使用 HTTPS | 🔴 必須 |
| **驗證 ID Token** | 後端必須驗證 Firebase ID Token | 🔴 必須 |
| **設定 Custom Claims** | 使用 Custom Claims 進行授權 | 🟠 強烈建議 |
| **定期刷新 Token** | Token 過期前自動刷新 | 🟠 強烈建議 |
| **安全儲存** | 避免在 localStorage 明文存敏感資訊 | 🟡 建議 |
| **啟用 App Check** | 防止濫用和欺詐 | 🟡 建議 |

#### 實作範例：後端 Token 驗證

```typescript
// backend/middleware/firebase-auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // 從 Header 提取 Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: '未提供認證 Token' });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // 驗證 Token
    const decodedToken = await auth().verifyIdToken(idToken);
    
    // 附加使用者資訊到 request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role,  // Custom Claim
      permissions: decodedToken.permissions  // Custom Claim
    };
    
    next();
  } catch (error) {
    console.error('[Auth Middleware] Token 驗證失敗:', error);
    return res.status(401).json({ error: '無效的認證 Token' });
  }
}
```

#### Custom Claims 設定（Admin SDK）

```typescript
// backend/services/custom-claims.service.ts
import { auth } from 'firebase-admin';

/**
 * 設定使用者角色和權限
 */
export async function setUserRole(
  uid: string,
  role: string,
  permissions: string[]
): Promise<void> {
  try {
    await auth().setCustomUserClaims(uid, {
      role,
      permissions,
      updatedAt: Date.now()
    });
    
    console.log(`[Custom Claims] 已設定使用者 ${uid} 的角色為 ${role}`);
  } catch (error) {
    console.error('[Custom Claims] 設定失敗:', error);
    throw error;
  }
}

/**
 * 獲取使用者的 Custom Claims
 */
export async function getUserClaims(uid: string): Promise<any> {
  try {
    const user = await auth().getUser(uid);
    return user.customClaims || {};
  } catch (error) {
    console.error('[Custom Claims] 獲取失敗:', error);
    throw error;
  }
}

/**
 * 移除使用者的 Custom Claims
 */
export async function removeUserClaims(uid: string): Promise<void> {
  try {
    await auth().setCustomUserClaims(uid, null);
    console.log(`[Custom Claims] 已移除使用者 ${uid} 的 Custom Claims`);
  } catch (error) {
    console.error('[Custom Claims] 移除失敗:', error);
    throw error;
  }
}
```

### 2. 性能優化最佳實踐

```typescript
// ✅ 使用 OnPush 變更檢測
@Component({
  selector: 'app-user-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="user$ | async as user">
      <h2>{{ user.displayName }}</h2>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserProfileComponent {
  private firebaseAuth = inject(FirebaseAuthService);
  
  // ✅ 使用 Observable，避免重複訂閱
  user$ = this.firebaseAuth.user$;
}

// ✅ Token 快取機制
@Injectable({ providedIn: 'root' })
export class TokenCacheService {
  private tokenCache: Map<string, { token: string; expires: number }> = new Map();
  
  /**
   * 獲取快取的 Token
   */
  getCachedToken(uid: string): string | null {
    const cached = this.tokenCache.get(uid);
    if (!cached) return null;
    
    // 檢查是否過期
    if (Date.now() >= cached.expires) {
      this.tokenCache.delete(uid);
      return null;
    }
    
    return cached.token;
  }
  
  /**
   * 設定 Token 快取
   */
  setCachedToken(uid: string, token: string, expiresIn: number): void {
    this.tokenCache.set(uid, {
      token,
      expires: Date.now() + expiresIn
    });
  }
  
  /**
   * 清除快取
   */
  clearCache(): void {
    this.tokenCache.clear();
  }
}
```

### 3. 錯誤處理最佳實踐

```typescript
// error-handler.service.ts
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  
  handleError(error: Error | HttpErrorResponse): void {
    const notification = this.injector.get(NzNotificationService);
    
    if (error instanceof HttpErrorResponse) {
      // HTTP 錯誤
      this.handleHttpError(error, notification);
    } else {
      // 前端錯誤
      this.handleClientError(error, notification);
    }
    
    // 記錄到監控服務（如 Sentry）
    console.error('[Global Error Handler]', error);
  }
  
  private handleHttpError(error: HttpErrorResponse, notification: NzNotificationService): void {
    switch (error.status) {
      case 401:
        notification.error('認證失敗', '請重新登入');
        break;
      case 403:
        notification.error('權限不足', '您沒有權限執行此操作');
        break;
      case 404:
        notification.error('資源不存在', '請求的資源未找到');
        break;
      case 500:
        notification.error('伺服器錯誤', '請稍後再試');
        break;
      default:
        notification.error('請求失敗', error.message);
    }
  }
  
  private handleClientError(error: Error, notification: NzNotificationService): void {
    notification.error('應用錯誤', error.message);
  }
}

// 在 app.config.ts 註冊
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // ...其他配置
  ]
};
```

---

## 📊 具體使用場景

### 場景 1：多租戶 SaaS 應用

```typescript
// multi-tenant-auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { OrganizationContextService } from './organization-context.service';

@Injectable({ providedIn: 'root' })
export class MultiTenantAuthService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private orgContext = inject(OrganizationContextService);
  
  /**
   * 登入並設定租戶上下文
   */
  async loginWithTenant(email: string, password: string): Promise<void> {
    // 1. Firebase 登入
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = credential.user;
    
    // 2. 獲取 Token Result（包含租戶資訊）
    const result = await user.getIdTokenResult();
    
    // 3. 提取租戶 ID
    const tenantId = result.claims['tenantId'] as string;
    if (!tenantId) {
      throw new Error('使用者未關聯任何租戶');
    }
    
    // 4. 設定租戶上下文
    this.orgContext.setCurrentOrganization(tenantId);
    
    // 5. 同步到 @delon/auth
    this.tokenService.set({
      token: result.token,
      expired: new Date(result.expirationTime).getTime(),
      tenantId,
      role: result.claims['role'],
      permissions: result.claims['permissions']
    });
    
    console.log(`[Multi-Tenant Auth] 已登入租戶: ${tenantId}`);
  }
  
  /**
   * 切換租戶
   */
  async switchTenant(tenantId: string): Promise<void> {
    // 1. 驗證使用者是否有權訪問該租戶
    const result = await this.auth.currentUser?.getIdTokenResult();
    const allowedTenants = result?.claims['tenants'] as string[] || [];
    
    if (!allowedTenants.includes(tenantId)) {
      throw new Error('您沒有權限訪問該租戶');
    }
    
    // 2. 更新租戶上下文
    this.orgContext.setCurrentOrganization(tenantId);
    
    // 3. 強制刷新 Token（後端會根據新租戶重新生成 Claims）
    const newToken = await this.auth.currentUser?.getIdToken(true);
    const newResult = await this.auth.currentUser?.getIdTokenResult();
    
    // 4. 更新 Token
    this.tokenService.set({
      token: newToken!,
      expired: new Date(newResult!.expirationTime).getTime(),
      tenantId,
      role: newResult!.claims['role'],
      permissions: newResult!.claims['permissions']
    });
    
    console.log(`[Multi-Tenant Auth] 已切換至租戶: ${tenantId}`);
  }
}
```

### 場景 2：角色權限管理（RBAC）

```typescript
// rbac.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

export enum Permission {
  READ_USERS = 'users:read',
  WRITE_USERS = 'users:write',
  DELETE_USERS = 'users:delete',
  READ_PROJECTS = 'projects:read',
  WRITE_PROJECTS = 'projects:write',
  DELETE_PROJECTS = 'projects:delete',
  ADMIN = 'admin:all'
}

@Injectable({ providedIn: 'root' })
export class RBACService {
  private auth = inject(Auth);
  
  /**
   * 檢查使用者是否有特定權限
   */
  hasPermission(permission: Permission): Observable<boolean> {
    return from(this.getUserPermissions()).pipe(
      map(permissions => permissions.includes(permission))
    );
  }
  
  /**
   * 檢查使用者是否有任一權限
   */
  hasAnyPermission(permissions: Permission[]): Observable<boolean> {
    return from(this.getUserPermissions()).pipe(
      map(userPerms => permissions.some(p => userPerms.includes(p)))
    );
  }
  
  /**
   * 檢查使用者是否有所有權限
   */
  hasAllPermissions(permissions: Permission[]): Observable<boolean> {
    return from(this.getUserPermissions()).pipe(
      map(userPerms => permissions.every(p => userPerms.includes(p)))
    );
  }
  
  /**
   * 獲取使用者權限列表
   */
  private async getUserPermissions(): Promise<Permission[]> {
    const user = this.auth.currentUser;
    if (!user) return [];
    
    const result = await user.getIdTokenResult();
    return (result.claims['permissions'] as Permission[]) || [];
  }
  
  /**
   * 檢查使用者角色
   */
  hasRole(role: string): Observable<boolean> {
    return from(this.getUserRole()).pipe(
      map(userRole => userRole === role)
    );
  }
  
  /**
   * 獲取使用者角色
   */
  private async getUserRole(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (!user) return null;
    
    const result = await user.getIdTokenResult();
    return (result.claims['role'] as string) || null;
  }
}

// 權限指令
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private rbac = inject(RBACService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  
  @Input() set hasPermission(permission: Permission) {
    this.rbac.hasPermission(permission).subscribe(hasPermission => {
      this.viewContainer.clear();
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

// 使用範例
@Component({
  template: `
    <!-- 只有有 WRITE_USERS 權限的使用者才能看到 -->
    <button *hasPermission="Permission.WRITE_USERS" (click)="createUser()">
      新增使用者
    </button>
    
    <!-- 使用多重權限 -->
    <div *ngIf="hasAdminPermission$ | async">
      <h2>管理員面板</h2>
    </div>
  `
})
export class UserManagementComponent {
  Permission = Permission;
  private rbac = inject(RBACService);
  
  hasAdminPermission$ = this.rbac.hasPermission(Permission.ADMIN);
  
  createUser(): void {
    // 創建使用者邏輯
  }
}
```

### 場景 3：離線模式支援

```typescript
// offline-auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, browserLocalPersistence, setPersistence } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class OfflineAuthService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private isOnline = true;
  
  constructor() {
    this.setupOfflineSupport();
  }
  
  /**
   * 設定離線支援
   */
  private async setupOfflineSupport(): Promise<void> {
    // 1. 啟用持久化
    await setPersistence(this.auth, browserLocalPersistence);
    
    // 2. 監聽網路狀態
    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
      console.log(`[Offline Auth] 網路狀態: ${this.isOnline ? '線上' : '離線'}`);
      
      if (this.isOnline) {
        this.onBackOnline();
      }
    });
    
    // 3. 檢查初始狀態
    const status = await Network.getStatus();
    this.isOnline = status.connected;
  }
  
  /**
   * 恢復線上時的處理
   */
  private async onBackOnline(): Promise<void> {
    console.log('[Offline Auth] 已恢復線上，同步狀態...');
    
    const user = this.auth.currentUser;
    if (!user) return;
    
    try {
      // 刷新 Token
      const newToken = await user.getIdToken(true);
      const result = await user.getIdTokenResult();
      
      // 更新本地 Token
      this.tokenService.set({
        token: newToken,
        expired: new Date(result.expirationTime).getTime(),
        ...result.claims
      });
      
      console.log('[Offline Auth] 狀態同步完成');
    } catch (error) {
      console.error('[Offline Auth] 狀態同步失敗:', error);
    }
  }
  
  /**
   * 檢查是否可以執行需要網路的操作
   */
  requiresOnline(): boolean {
    if (!this.isOnline) {
      throw new Error('此操作需要網路連接');
    }
    return true;
  }
}
```

---

## 🔧 實作建議與最佳實踐

### 1. 專案結構建議

```
src/app/
├── core/
│   ├── services/
│   │   ├── firebase-auth.service.ts          # Firebase 認證服務
│   │   ├── delon-firebase-token.service.ts   # @delon Token 同步
│   │   ├── token-refresh.service.ts          # Token 刷新
│   │   ├── auto-refresh.service.ts           # 自動刷新
│   │   ├── rbac.service.ts                   # 權限管理
│   │   ├── multi-tenant-auth.service.ts      # 多租戶認證
│   │   └── firebase-error-handler.service.ts # 錯誤處理
│   ├── net/
│   │   ├── firebase-auth.interceptor.ts      # Firebase Token 附加
│   │   ├── firebase-refresh-token.ts         # Firebase Token 刷新
│   │   ├── default.interceptor.ts            # 錯誤處理（已更新）
│   │   └── helper.ts                         # 輔助函數
│   ├── guards/
│   │   ├── firebase-auth.guard.ts            # Firebase 認證守衛
│   │   └── permission.guard.ts               # 權限守衛（工廠函數）
│   └── models/
│       └── firebase-token.model.ts           # Token 模型與枚舉
├── auth/                                      # 認證功能模組（現有）
│   ├── login/
│   │   ├── login.component.ts               # 登入頁（需更新整合 Firebase）
│   │   ├── login.component.html
│   │   └── login.component.less
│   ├── register/
│   │   ├── register.component.ts            # 註冊頁（需更新整合 Firebase）
│   │   ├── register.component.html
│   │   └── register.component.less
│   ├── callback/                             # Firebase 回調處理（新增）
│   │   ├── callback.component.ts
│   │   └── callback.component.html
│   ├── landing/                              # 著陸頁（現有）
│   ├── lock/                                 # 鎖定頁（現有）
│   ├── register-result/                      # 註冊結果（現有）
│   ├── routes.ts                             # 認證路由（需更新）
│   └── README.md                             # 模組說明
└── shared/
    ├── directives/
    │   ├── has-permission.directive.ts       # 權限指令
    │   ├── has-role.directive.ts             # 角色指令
    │   └── has-not-permission.directive.ts   # 非權限指令
    └── pipes/
        └── firebase-user.pipe.ts             # 使用者管道（可選）
```

### 2. 環境配置

```typescript
// environments/environment.ts
export const environment = {
  production: false,
  
  // Firebase 配置
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  },
  
  // Token 配置
  token: {
    expiresIn: 60 * 60,  // 1 小時
    refreshBefore: 5 * 60,  // 過期前 5 分鐘刷新
    maxRetries: 3,  // 最大重試次數
    retryDelay: 1000  // 重試延遲（毫秒）
  },
  
  // API 配置
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000
  }
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'] || '',
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'] || '',
    projectId: process.env['FIREBASE_PROJECT_ID'] || '',
    storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'] || '',
    appId: process.env['FIREBASE_APP_ID'] || ''
  },
  
  token: {
    expiresIn: 60 * 60,
    refreshBefore: 5 * 60,
    maxRetries: 3,
    retryDelay: 1000
  },
  
  api: {
    baseUrl: process.env['API_BASE_URL'] || '',
    timeout: 30000
  }
};
```

### 3. 初始化配置

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// @delon
import { provideAlain } from '@delon/theme';
import { provideAuth as provideDelonAuth } from '@delon/auth';

// 攔截器
import { firebaseAuthInterceptor } from './core/interceptors/firebase-auth.interceptor';
import { defaultInterceptor } from './core/interceptors/default.interceptor';

// 環境
import { environment } from '@env/environment';

// 路由
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 路由
    provideRouter(routes),
    
    // 動畫
    provideAnimations(),
    
    // HTTP 客戶端 + 攔截器
    provideHttpClient(
      withInterceptors([
        firebaseAuthInterceptor,
        defaultInterceptor
      ])
    ),
    
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    
    // @delon
    provideAlain({
      config: {
        auth: { login_url: '/passport/login' }
      }
    }),
    provideDelonAuth(),
    
    // 其他配置...
  ]
};
```

---

## ⚡ Token 刷新最佳實踐

### 1. 自動刷新策略

```typescript
// auto-refresh.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { interval, Subscription, switchMap, filter } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AutoRefreshService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private refreshSubscription?: Subscription;
  
  /**
   * 啟動自動刷新
   */
  start(): void {
    console.log('[Auto Refresh] 啟動自動 Token 刷新');
    
    // 策略 1：監聽 Firebase idToken 變化
    this.startIdTokenMonitor();
    
    // 策略 2：定期檢查 Token 狀態
    this.startPeriodicCheck();
  }
  
  /**
   * 停止自動刷新
   */
  stop(): void {
    console.log('[Auto Refresh] 停止自動 Token 刷新');
    this.refreshSubscription?.unsubscribe();
  }
  
  /**
   * 監聽 Firebase idToken 變化
   */
  private startIdTokenMonitor(): void {
    idToken(this.auth).pipe(
      filter(token => !!token)
    ).subscribe(async (token) => {
      console.log('[Auto Refresh] Firebase Token 已更新');
      
      // 同步到 @delon/auth
      await this.syncToken();
    });
  }
  
  /**
   * 定期檢查 Token 狀態
   */
  private startPeriodicCheck(): void {
    const checkInterval = 60 * 1000; // 每分鐘檢查一次
    
    this.refreshSubscription = interval(checkInterval).pipe(
      switchMap(() => this.checkAndRefresh())
    ).subscribe({
      error: (err) => console.error('[Auto Refresh] 錯誤:', err)
    });
  }
  
  /**
   * 檢查並刷新 Token
   */
  private async checkAndRefresh(): Promise<void> {
    const token = this.tokenService.get();
    if (!token || !token.expired) {
      return;
    }
    
    const expiresIn = token.expired - Date.now();
    const threshold = environment.token.refreshBefore * 1000;
    
    // 如果即將過期，刷新
    if (expiresIn <= threshold) {
      console.log(`[Auto Refresh] Token 即將過期，剩餘 ${Math.floor(expiresIn / 1000)} 秒`);
      await this.forceRefresh();
    }
  }
  
  /**
   * 強制刷新 Token
   */
  private async forceRefresh(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;
    
    try {
      const newToken = await user.getIdToken(true);
      await this.syncToken();
      console.log('[Auto Refresh] Token 刷新成功');
    } catch (error) {
      console.error('[Auto Refresh] Token 刷新失敗:', error);
    }
  }
  
  /**
   * 同步 Token 到 @delon/auth
   */
  private async syncToken(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;
    
    const result = await user.getIdTokenResult();
    this.tokenService.set({
      token: result.token,
      expired: new Date(result.expirationTime).getTime(),
      ...result.claims
    });
  }
}
```

### 2. 初始化自動刷新

```typescript
// app.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AutoRefreshService } from './core/services/auto-refresh.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  private autoRefresh = inject(AutoRefreshService);
  
  ngOnInit(): void {
    // 啟動自動刷新
    this.autoRefresh.start();
  }
  
  ngOnDestroy(): void {
    // 停止自動刷新
    this.autoRefresh.stop();
  }
}
```

---

## 🚨 錯誤處理與日誌

### 1. 統一錯誤處理

```typescript
// firebase-error-handler.service.ts
import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';

export interface FirebaseErrorInfo {
  code: string;
  message: string;
  userMessage: string;
  severity: 'info' | 'warning' | 'error';
}

@Injectable({ providedIn: 'root' })
export class FirebaseErrorHandler {
  /**
   * 處理 Firebase 錯誤
   */
  handle(error: any): FirebaseErrorInfo {
    if (error instanceof FirebaseError) {
      return this.handleFirebaseError(error);
    }
    
    return {
      code: 'unknown',
      message: error.message || '未知錯誤',
      userMessage: '發生錯誤，請稍後再試',
      severity: 'error'
    };
  }
  
  /**
   * 處理 Firebase 特定錯誤
   */
  private handleFirebaseError(error: FirebaseError): FirebaseErrorInfo {
    const errorMap: Record<string, FirebaseErrorInfo> = {
      // 認證錯誤
      'auth/user-not-found': {
        code: error.code,
        message: error.message,
        userMessage: '使用者不存在',
        severity: 'error'
      },
      'auth/wrong-password': {
        code: error.code,
        message: error.message,
        userMessage: '密碼錯誤',
        severity: 'error'
      },
      'auth/invalid-email': {
        code: error.code,
        message: error.message,
        userMessage: 'Email 格式錯誤',
        severity: 'error'
      },
      'auth/user-disabled': {
        code: error.code,
        message: error.message,
        userMessage: '帳號已被停用',
        severity: 'error'
      },
      'auth/email-already-in-use': {
        code: error.code,
        message: error.message,
        userMessage: 'Email 已被使用',
        severity: 'error'
      },
      'auth/weak-password': {
        code: error.code,
        message: error.message,
        userMessage: '密碼強度不足',
        severity: 'warning'
      },
      'auth/operation-not-allowed': {
        code: error.code,
        message: error.message,
        userMessage: '此登入方式未啟用',
        severity: 'error'
      },
      'auth/network-request-failed': {
        code: error.code,
        message: error.message,
        userMessage: '網路連接失敗',
        severity: 'error'
      },
      'auth/too-many-requests': {
        code: error.code,
        message: error.message,
        userMessage: '請求過於頻繁，請稍後再試',
        severity: 'warning'
      },
      
      // Token 錯誤
      'auth/id-token-expired': {
        code: error.code,
        message: error.message,
        userMessage: '登入已過期，請重新登入',
        severity: 'warning'
      },
      'auth/id-token-revoked': {
        code: error.code,
        message: error.message,
        userMessage: '登入憑證已失效',
        severity: 'error'
      },
      'auth/invalid-id-token': {
        code: error.code,
        message: error.message,
        userMessage: '無效的登入憑證',
        severity: 'error'
      }
    };
    
    return errorMap[error.code] || {
      code: error.code,
      message: error.message,
      userMessage: '認證失敗，請重試',
      severity: 'error'
    };
  }
}
```

### 2. 日誌服務

```typescript
// logger.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private currentLevel: LogLevel = environment.production ? LogLevel.INFO : LogLevel.DEBUG;
  
  debug(message: string, ...args: any[]): void {
    if (this.currentLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
  
  info(message: string, ...args: any[]): void {
    if (this.currentLevel <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }
  
  warn(message: string, ...args: any[]): void {
    if (this.currentLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }
  
  error(message: string, error?: any): void {
    if (this.currentLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, error);
      
      // 在生產環境發送到監控服務
      if (environment.production) {
        this.sendToMonitoring(message, error);
      }
    }
  }
  
  /**
   * 發送到監控服務（如 Sentry, LogRocket）
   */
  private sendToMonitoring(message: string, error: any): void {
    // 實作監控服務整合
    // 例如：Sentry.captureException(error);
  }
}
```

---

## 🔒 安全 Header 配置

### 1. CSP (Content Security Policy)

```typescript
// csp-config.ts
export const CSP_CONFIG = {
  directives: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",  // Angular 需要
      'https://apis.google.com',  // Google APIs
      'https://www.gstatic.com'  // Firebase
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'"  // ng-zorro 需要
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'font-src': [
      "'self'",
      'data:'
    ],
    'connect-src': [
      "'self'",
      'https://*.googleapis.com',  // Google APIs
      'https://*.firebase.com',  // Firebase
      'https://*.firebaseio.com'  // Firebase Realtime DB
    ],
    'frame-src': [
      "'self'",
      'https://*.firebaseapp.com'  // Firebase Auth
    ],
    'worker-src': [
      "'self'",
      'blob:'
    ]
  }
};

// 在 index.html 中設定
// <meta http-equiv="Content-Security-Policy" content="...">
```

### 2. CORS 配置（後端）

```typescript
// backend/cors.config.ts
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const whitelist = [
      'http://localhost:4200',  // 開發環境
      'https://your-app.web.app',  // Firebase Hosting
      'https://your-app.firebaseapp.com'
    ];
    
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 不允許此來源'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Firebase-AppCheck'
  ]
};
```

### 3. 安全 Header 設定（後端）

```typescript
// backend/security-headers.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // 防止 Clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // XSS 保護
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // 防止 MIME 類型嗅探
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
}
```

---

## 📦 完整實作範例

### 登入組件

```typescript
// login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '@core/services/firebase-auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
  imports: [ReactiveFormsModule, /* ng-zorro modules */]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private firebaseAuth = inject(FirebaseAuthService);
  private message = inject(NzMessageService);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true]
  });
  
  loading = false;
  
  /**
   * Email/Password 登入
   */
  submitForm(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    
    this.loading = true;
    const { email, password } = this.loginForm.value;
    
    this.firebaseAuth.loginWithEmailPassword(email, password).subscribe({
      next: () => {
        this.message.success('登入成功');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.message.error(error.message);
        this.loading = false;
      }
    });
  }
  
  /**
   * Google 登入
   */
  loginWithGoogle(): void {
    this.loading = true;
    
    this.firebaseAuth.loginWithGoogle().subscribe({
      next: () => {
        this.message.success('Google 登入成功');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.message.error(error.message);
        this.loading = false;
      }
    });
  }
}
```

---

*（文件完成）*

## 📚 參考資源

- [Firebase Authentication 官方文件](https://firebase.google.com/docs/auth)
- [AngularFire 官方文件](https://github.com/angular/angularfire)
- [@delon/auth 官方文件](https://ng-alain.com/auth)
- [Angular Security Best Practices](https://angular.dev/best-practices/security)

---

**版本歷史：**
- v1.0.0 (2025-10-07): 初始版本

