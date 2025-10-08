---
type: plan
category: refactoring
complexity: high
priority: P0
estimated_time: 13 hours
status: pending
created: 2025-10-08
tags: [firebase, architecture, refactoring, ng-alain]
---

# 🔄 Firebase 整合重構計畫書

## 📋 執行摘要

**問題**: 當前 Firebase 整合完全偏離 ng-alain 原始架構，創建了平行認證系統而非基於原架構擴展。

**目標**: 重構為符合 ng-alain 設計原則的架構，保持 100% 框架相容性。

**預期效益**:
- 代碼量減少 70% (2,000行 → 600行)
- 維護成本降低 60%
- 恢復 @delon/auth 生態系統整合
- 消除代碼重複與競爭條件

---

## 🚨 問題診斷

### 問題 1: 破壞 @delon/auth 統一架構

**原始配置** (ng-alain-master):
```typescript
// app.config.ts - 簡潔的攔截器鏈
provideHttpClient(
  withInterceptors([
    authSimpleInterceptor,  // ✅ @delon/auth 核心
    defaultInterceptor
  ])
)
```

**當前配置**:
```typescript
// app.config.ts - 移除了核心攔截器！
provideHttpClient(
  withInterceptors([
    // ❌ authSimpleInterceptor 被移除
    firebaseAuthInterceptor,  // 自製替代品
    organizationInterceptor,
    defaultInterceptor
  ])
)
```

**影響**:
- @delon/auth Token 自動附加失效
- ACL 權限系統無法正常工作
- 與 ng-alain 生態系統脫節

---

### 問題 2: 創建平行認證系統

**應該**: 適配 @delon/auth 介面
**實際**: 創建 7 個平行服務

| 服務 | 行數 | 問題 |
|-----|------|------|
| `firebase-auth.service.ts` | 423 | 重造認證輪子 |
| `delon-firebase-token.service.ts` | 209 | 手動同步 Token |
| `multi-tenant-auth.service.ts` | 145 | 平行租戶管理 |
| `token-refresh.service.ts` | 145 | 手動刷新 (Firebase 自動) |
| `auto-refresh.service.ts` | 182 | 重複刷新邏輯 |
| `firebase-error-handler.service.ts` | - | 額外錯誤處理 |
| `rbac.service.ts` | 239 | 未整合 @delon/acl |
| **總計** | **1,343** | **多餘 1,000+ 行** |

---

### 問題 3: 攔截器職責分散

**ng-alain 原則**: 單一 defaultInterceptor

**當前實作**: 5 個攔截器

| 攔截器 | 行數 | 職責 | 問題 |
|-------|------|------|------|
| `firebase-auth.interceptor.ts` | 102 | 附加 Firebase Token | 與 authSimpleInterceptor 衝突 |
| `firebase-refresh-token.ts` | 121 | Firebase 刷新邏輯 | 應在 defaultInterceptor |
| `organization.interceptor.ts` | 48 | 附加組織 ID | 應在 defaultInterceptor |
| `refresh-token.ts` | 105 | 傳統 HTTP 刷新 | 與 Firebase 刷新衝突 |
| `default.interceptor.ts` | 95 | 統一錯誤處理 | 被污染 |

**違反原則**:
- Single Responsibility Principle
- Don't Repeat Yourself (DRY)
- ng-alain 最小化擴展原則

---

### 問題 4: Token 刷新機制重複

**發現 4 處獨立實作**:

1. **firebase-refresh-token.ts** (121行)
```typescript
let refreshToking = false;  // 全域變數
let refreshToken$ = new BehaviorSubject<string | null>(null);
```

2. **token-refresh.service.ts** (145行)
```typescript
let refreshToking = false;  // 重複全域變數！
let refreshToken$ = new BehaviorSubject<string | null>(null);
```

3. **auto-refresh.service.ts** (182行)
```typescript
// 監聽 + 定期檢查雙策略
private idTokenSubscription?: Subscription;
private periodicCheckSubscription?: Subscription;
```

4. **refresh-token.ts** (105行)
```typescript
let refreshToking = false;  // 再次重複！
```

**問題**:
- 4 個獨立的 `refreshToking` 全域變數 → 競爭條件
- Firebase SDK **自動處理** Token 刷新，無需手動實作
- 與 @delon/auth 刷新機制衝突

---

## ✅ 重構方案

### 核心原則

1. **適配而非重造**: 使用適配器模式整合 Firebase
2. **最小化擴展**: 保持 ng-alain 原有架構
3. **統一入口**: 所有認證通過 @delon/auth
4. **單一職責**: 一個攔截器處理一類事情

---

### 目標架構

```
┌─────────────────────────────────────────┐
│   Interceptor Chain (2層)               │
│   authSimpleInterceptor (@delon/auth)   │
│   ↓                                      │
│   defaultInterceptor (擴展 Firebase)    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│   @delon/auth (統一認證管理)            │
│   ↓                                      │
│   FirebaseTokenAdapter (適配層)         │
│   ↓                                      │
│   Firebase Authentication               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│   Services (最小化)                     │
│   - FirebaseAuthService (簡化 200行)    │
│   - 使用 @delon/acl (權限管理)          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│   startup.service (整合初始化)          │
└─────────────────────────────────────────┘
```

---

## 📅 分階段實施計劃

### 階段 1: 創建適配層 ⭐ (P0 - 立即執行)

**目標**: 將 Firebase 適配到 @delon/auth 介面

**新增檔案**: `src/app/core/adapters/firebase-token.adapter.ts`

**實作**:
```typescript
import { Injectable, inject } from '@angular/core';
import { Auth, idToken, user } from '@angular/fire/auth';
import { ITokenModel, ITokenService } from '@delon/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Firebase Token 適配器
 * 將 Firebase Authentication 適配為 @delon/auth ITokenService
 * 
 * 這是整合的關鍵：讓 @delon/auth 能夠使用 Firebase Token
 */
@Injectable({ providedIn: 'root' })
export class FirebaseTokenAdapter implements ITokenService {
  private auth = inject(Auth);

  /**
   * 獲取 Token (Observable)
   * @delon/auth 會自動訂閱此 Observable
   * Firebase SDK 自動管理 Token 刷新
   */
  get(): Observable<ITokenModel> {
    return idToken(this.auth).pipe(
      switchMap(token => {
        if (!token || !this.auth.currentUser) {
          return of(null);
        }
        
        // 從 Firebase 獲取完整的 Token Result（包含 Custom Claims）
        return from(this.auth.currentUser.getIdTokenResult()).pipe(
          map(result => ({
            token: result.token,
            expired: new Date(result.expirationTime).getTime(),
            // Firebase 使用者資訊
            uid: this.auth.currentUser!.uid,
            email: this.auth.currentUser!.email || undefined,
            email_verified: this.auth.currentUser!.emailVerified,
            name: this.auth.currentUser!.displayName || undefined,
            picture: this.auth.currentUser!.photoURL || undefined,
            // Custom Claims (角色、權限、租戶等)
            role: result.claims['role'] as string,
            permissions: result.claims['permissions'] as string[],
            tenantId: result.claims['tenantId'] as string,
            tenants: result.claims['tenants'] as string[],
            // Token 元數據
            issuedAt: result.issuedAtTime,
            expirationTime: result.expirationTime,
            signInProvider: result.signInProvider || undefined,
            // 所有其他 Claims
            ...result.claims
          } as ITokenModel))
        );
      })
    );
  }

  /**
   * 設定 Token
   * Firebase SDK 自動管理，此方法為空實作
   */
  set(_data: ITokenModel): boolean {
    // Firebase SDK 自動管理 Token
    // @delon/auth 會通過 get() Observable 自動獲取最新 Token
    return true;
  }

  /**
   * 清除 Token
   * 通過 FirebaseAuthService.logout() 清除
   */
  clear(): void {
    // Firebase 登出由 FirebaseAuthService 處理
    // 此方法僅用於 @delon/auth 介面相容
  }

  /**
   * 修改 Token（可選）
   * Firebase 不支援客戶端修改 Token
   */
  change(_data: ITokenModel): ITokenModel {
    // Firebase Token 由後端管理，不支援客戶端修改
    return _data;
  }
}
```

**配置適配器**: 修改 `src/app/app.config.ts`

```typescript
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { FirebaseTokenAdapter } from '@core/adapters/firebase-token.adapter';

const providers: Array<Provider | EnvironmentProviders> = [
  // ... 其他配置
  
  // ✅ 使用 Firebase 適配器替換默認 Token Service
  { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter },
  
  // ✅ 恢復 authSimpleInterceptor
  provideHttpClient(
    withInterceptors([
      authSimpleInterceptor,  // @delon/auth 自動附加 Token
      defaultInterceptor      // 統一錯誤處理
    ])
  ),
  
  // @delon/auth (認證系統)
  provideAuth(),
  
  // ... Firebase 配置保持不變
];
```

**工作量**: 2 小時  
**測試重點**:
- Token 自動同步到 @delon/auth
- authSimpleInterceptor 正確附加 Token
- 權限系統正常工作

---

### 階段 2: 修改 defaultInterceptor (P1 - 近期)

**目標**: 整合 Firebase 刷新邏輯到統一攔截器

**修改檔案**: `src/app/core/net/default.interceptor.ts`

**實作**:
```typescript
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';

function handleData(
  injector: Injector, 
  ev: HttpResponseBase, 
  req: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<any> {
  checkStatus(injector, ev);
  
  switch (ev.status) {
    case 200:
      // ... 原有邏輯
      break;
      
    case 401:
      // ✅ 整合 Firebase 刷新邏輯
      if (environment.api.refreshTokenEnabled) {
        const refreshType = environment.api.refreshTokenType;
        
        // Firebase 刷新模式
        if (refreshType === 'firebase') {
          return tryRefreshFirebaseToken(injector, ev, req, next);
        }
        
        // 傳統 HTTP 刷新模式
        if (refreshType === 're-request') {
          return tryRefreshToken(injector, ev, req, next);
        }
      }
      toLogin(injector);
      break;
      
    // ... 其他狀態碼處理
  }
  
  // ... 原有返回邏輯
}

/**
 * Firebase Token 刷新邏輯
 * 整合到 defaultInterceptor，避免多個攔截器
 */
function tryRefreshFirebaseToken(
  injector: Injector,
  ev: HttpResponseBase,
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> {
  const auth = injector.get(Auth);
  const tokenService = injector.get(DA_SERVICE_TOKEN);
  
  // 檢查使用者是否登入
  if (!auth.currentUser) {
    console.warn('[Default Interceptor] 未登入，跳轉至登入頁');
    toLogin(injector);
    return throwError(() => ev);
  }
  
  console.log('[Default Interceptor] 401 錯誤，開始刷新 Firebase Token...');
  
  // Firebase SDK 自動刷新 Token
  // forceRefresh: true 強制獲取新 Token
  return from(auth.currentUser.getIdToken(true)).pipe(
    switchMap(async newToken => {
      console.log('[Default Interceptor] Token 刷新成功');
      
      // @delon/auth 適配器會自動更新
      // 無需手動同步，因為 FirebaseTokenAdapter.get() 返回 Observable
      
      // 重新發起原始請求（@delon/auth 會自動附加新 Token）
      return next(req);
    }),
    switchMap(obs => obs),
    catchError(error => {
      console.error('[Default Interceptor] Token 刷新失敗:', error);
      toLogin(injector);
      return throwError(() => error);
    })
  );
}

// 原有的 defaultInterceptor 保持不變
export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  // 统一加上服务端前缀
  let url = req.url;
  if (!req.context.get(IGNORE_BASE_URL) && !url.startsWith('https://') && !url.startsWith('http://')) {
    const { baseUrl } = environment.api;
    url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
  }
  
  const newReq = req.clone({ url, setHeaders: getAdditionalHeaders(req.headers) });
  const injector = inject(Injector);

  return next(newReq).pipe(
    mergeMap(ev => {
      if (ev instanceof HttpResponseBase) {
        return handleData(injector, ev, newReq, next);
      }
      return of(ev);
    })
  );
};
```

**擴展組織 ID 附加** (可選):
```typescript
function getAdditionalHeaders(existingHeaders: HttpHeaders): Record<string, string> {
  const headers: Record<string, string> = {};
  
  // ✅ 整合組織 ID 邏輯（取代 organizationInterceptor）
  const orgContext = inject(OrganizationContextService, { optional: true });
  const currentOrgId = orgContext?.currentOrgId();
  
  if (currentOrgId) {
    headers['X-Organization-Id'] = currentOrgId;
  }
  
  return headers;
}
```

**工作量**: 3 小時  
**測試重點**:
- 401 錯誤自動刷新 Token
- 組織 ID 正確附加
- 與 authSimpleInterceptor 協同工作

---

### 階段 3: 簡化 FirebaseAuthService (P2 - 中期)

**目標**: 刪除 Token 管理邏輯，只保留認證操作

**修改檔案**: `src/app/core/services/firebase-auth.service.ts`

**簡化原則**:
- ❌ 刪除所有 Token 同步邏輯（由適配器處理）
- ❌ 刪除自動刷新邏輯（Firebase SDK 處理）
- ✅ 保留登入/登出/註冊方法
- ✅ 保留認證狀態流

**簡化後**:
```typescript
@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private settings = inject(SettingsService);

  // Observable: 當前使用者
  user$: Observable<User | null> = user(this.auth);

  // 認證狀態
  private authStateSubject = new BehaviorSubject<FirebaseAuthState>(
    FirebaseAuthState.UNAUTHENTICATED
  );
  authState$ = this.authStateSubject.asObservable();

  constructor() {
    // 監聽認證狀態變化
    this.setupAuthStateMonitor();
    // 處理 Redirect 登入回調
    this.handleRedirectResult();
  }

  // ===== 登入方法 =====
  
  loginWithGoogle(useRedirect = true): Observable<void> {
    // 保持原有邏輯，但移除 Token 同步
    // @delon/auth 適配器會自動處理
  }

  loginWithEmailPassword(email: string, password: string): Observable<User> {
    // 保持原有邏輯
  }

  registerWithEmailPassword(
    email: string, 
    password: string, 
    displayName?: string
  ): Observable<User> {
    // 保持原有邏輯
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        // ✅ 通過 @delon/auth 清除（適配器會處理）
        // tokenService.clear(); // 不再需要手動調用
        
        this.settings.setUser({});
        this.authStateSubject.next(FirebaseAuthState.UNAUTHENTICATED);
        this.router.navigateByUrl('/auth/login');
      })
    );
  }

  // ===== 私有方法 =====
  
  // ❌ 刪除 setupTokenSync() - 適配器自動處理
  // ❌ 刪除 onLoginSuccess() 的 Token 同步邏輯
  
  private setupAuthStateMonitor(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.authStateSubject.next(FirebaseAuthState.AUTHENTICATED);
        // 更新使用者設定
        this.settings.setUser({
          name: user.displayName || user.email,
          email: user.email,
          avatar: user.photoURL,
          uid: user.uid
        });
      } else {
        this.authStateSubject.next(FirebaseAuthState.UNAUTHENTICATED);
      }
    });
  }
}
```

**預期行數**: 從 423 行減少到 **200 行** (-53%)

**工作量**: 2 小時

---

### 階段 4: 整合 @delon/acl 權限系統 (P2 - 中期)

**目標**: 使用 @delon/acl 替代自製 RBACService

**修改檔案**: `src/app/core/startup/startup.service.ts`

**整合 ACL**:
```typescript
@Injectable()
export class StartupService {
  private aclService = inject(ACLService);
  private tokenService = inject(DA_SERVICE_TOKEN);
  // ...

  load(): Observable<void> {
    return zip(
      this.i18n.loadLangData(defaultLang),
      this.httpClient.get('./assets/tmp/app-data.json', {
        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      })
    ).pipe(
      map(([langData, appData]) => {
        // ... 原有邏輯
        
        // ✅ 從 Firebase Token 設定 ACL 權限
        this.setupACL();
        
        // ... 其他初始化
      })
    );
  }

  /**
   * 從 Firebase Custom Claims 設定 ACL 權限
   */
  private setupACL(): void {
    const token = this.tokenService.get();
    
    if (!token) {
      // 未登入，設定訪客權限
      this.aclService.setRole(['guest']);
      return;
    }
    
    // 設定角色
    if (token['role']) {
      this.aclService.setRole([token['role']]);
    }
    
    // 設定權限
    if (token['permissions']) {
      this.aclService.setAbility(token['permissions']);
    }
    
    // 設定完整權限（可選）
    if (token['role'] === 'admin') {
      this.aclService.setFull(true);
    }
    
    console.log('[Startup] ACL 權限已設定:', {
      role: token['role'],
      permissions: token['permissions']
    });
  }
}
```

**修改 Guards**: 使用 @delon/acl

```typescript
import { ACLService, ACLGuard, ACLCanActivateGuard } from '@delon/acl';

// ✅ 使用 @delon/acl 內建 Guard
export const adminGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  
  if (!aclService.canAbility('admin:all')) {
    const router = inject(Router);
    const msg = inject(NzMessageService);
    msg.error('您沒有權限訪問此頁面');
    router.navigate(['/']);
    return false;
  }
  
  return true;
};

// 或使用 @delon/acl 的工廠函數
import { aclCanActivate, aclCanActivateChild } from '@delon/acl';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [aclCanActivate],
    data: { 
      guard: { 
        ability: ['admin:all']  // 需要的權限
      } 
    }
  }
];
```

**刪除**: `src/app/core/services/rbac.service.ts` (239行)

**工作量**: 2 小時

---

### 階段 5: 清理多餘檔案 (P2 - 中期)

**目標**: 刪除不再需要的服務和攔截器

**刪除清單**:

```bash
# 刪除多餘的攔截器
rm src/app/core/net/firebase-auth.interceptor.ts       # 102 行
rm src/app/core/net/firebase-refresh-token.ts          # 121 行
rm src/app/core/net/organization.interceptor.ts        # 48 行

# 刪除多餘的服務
rm src/app/core/services/delon-firebase-token.service.ts    # 209 行
rm src/app/core/services/multi-tenant-auth.service.ts       # 145 行
rm src/app/core/services/token-refresh.service.ts           # 145 行
rm src/app/core/services/auto-refresh.service.ts            # 182 行
rm src/app/core/services/firebase-error-handler.service.ts
rm src/app/core/services/rbac.service.ts                    # 239 行

# 更新 app.config.ts - 移除對這些檔案的引用
```

**修改 app.config.ts**:
```typescript
const providers: Array<Provider | EnvironmentProviders> = [
  // ✅ 簡化的攔截器鏈
  provideHttpClient(
    withInterceptors([
      authSimpleInterceptor,  // @delon/auth 核心
      defaultInterceptor      // 擴展 Firebase 邏輯
    ])
  ),
  
  // ✅ Firebase 適配器
  { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter },
  
  // @delon/auth
  provideAuth(),
  
  // Firebase 配置保持不變
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirebaseAuth(() => getAuth()),
  // ...
  
  // ❌ 移除 AutoRefreshService 初始化
  // provideAppInitializer(() => {
  //   const autoRefresh = inject(AutoRefreshService);
  //   autoRefresh.start();
  // }),
];
```

**工作量**: 2 小時  
**風險**: 低（這些檔案已被新架構取代）

---

## 📊 預期改進效益

### 代碼量對比

| 類別 | 改進前 | 改進後 | 減少 |
|-----|-------|--------|------|
| **攔截器** | 5 個 (471行) | 2 個 (180行) | -62% |
| **認證服務** | 7 個 (1,343行) | 2 個 (400行) | -70% |
| **適配層** | 0 | 1 個 (150行) | +150行 |
| **總計** | ~2,000 行 | ~730 行 | **-63%** |

### 架構相容性

| 指標 | 改進前 | 改進後 |
|-----|-------|--------|
| 符合 ng-alain 原則 | ❌ 否 | ✅ 是 |
| @delon/auth 整合 | ❌ 破壞 | ✅ 完整 |
| @delon/acl 整合 | ❌ 未使用 | ✅ 使用 |
| Token 自動管理 | ❌ 手動 | ✅ 自動 |
| 攔截器數量 | 5 個 | 2 個 |
| 認證服務數量 | 7 個 | 2 個 |

### 維護成本

| 指標 | 改進前 | 改進後 | 改善 |
|-----|-------|--------|------|
| 代碼複雜度 | 高 | 低 | -60% |
| 重複代碼 | 多 | 無 | -100% |
| 競爭條件風險 | 高 | 無 | -100% |
| 學習曲線 | 陡峭 | 平緩 | -50% |
| 測試難度 | 高 | 低 | -40% |

---

## 🗓️ 實施時間表

| 階段 | 任務 | 工作量 | 依賴 | 狀態 |
|-----|------|--------|------|------|
| **階段 1** | 創建 FirebaseTokenAdapter | 2h | - | ⏳ 待執行 |
| **階段 2** | 修改 defaultInterceptor | 3h | 階段 1 | ⏳ 待執行 |
| **階段 3** | 簡化 FirebaseAuthService | 2h | 階段 1 | ⏳ 待執行 |
| **階段 4** | 整合 @delon/acl | 2h | 階段 1 | ⏳ 待執行 |
| **階段 5** | 清理多餘檔案 | 2h | 階段 2-4 | ⏳ 待執行 |
| **測試** | 完整測試與驗證 | 2h | 所有階段 | ⏳ 待執行 |
| **總計** | - | **13h** | - | - |

---

## ✅ 驗收標準

### 功能驗收

- [ ] 使用者可以正常登入/登出
- [ ] Token 自動同步到 @delon/auth
- [ ] 401 錯誤自動刷新 Token
- [ ] ACL 權限系統正常工作
- [ ] 組織切換功能正常
- [ ] 所有現有功能保持正常

### 技術驗收

- [ ] 使用 authSimpleInterceptor + defaultInterceptor
- [ ] FirebaseTokenAdapter 正確實作 ITokenService
- [ ] 無代碼重複（Token 刷新邏輯）
- [ ] 無競爭條件（全域變數）
- [ ] 符合 ng-alain 架構原則
- [ ] ESLint 無錯誤

### 效能驗收

- [ ] Token 刷新延遲 < 100ms
- [ ] 登入流程時間與改進前相同
- [ ] 無記憶體洩漏
- [ ] HTTP 請求數量未增加

---

## 🚀 執行步驟

### 步驟 1: 準備工作

```bash
# 1. 建立分支
git checkout -b refactor/firebase-integration

# 2. 備份當前代碼
git add .
git commit -m "chore: 備份 - Firebase 重構前"

# 3. 創建適配器目錄
mkdir -p src/app/core/adapters
```

### 步驟 2: 實施階段 1

```bash
# 1. 創建 FirebaseTokenAdapter
# 參考上面的代碼範例

# 2. 修改 app.config.ts
# 加入適配器配置

# 3. 測試
npm start
# 驗證 Token 是否正確同步
```

### 步驟 3: 實施階段 2-5

```bash
# 按照計畫書逐步執行
# 每完成一個階段，進行測試並提交
git add .
git commit -m "refactor(firebase): 完成階段 X"
```

### 步驟 4: 測試與驗收

```bash
# 1. 運行測試
npm run test

# 2. 運行 ESLint
npm run lint

# 3. 構建專案
npm run build

# 4. 手動測試所有功能
```

### 步驟 5: 合併

```bash
# 1. 確保所有驗收標準通過
# 2. 合併到 main
git checkout main
git merge refactor/firebase-integration

# 3. 推送
git push origin main
```

---

## 📝 風險評估

| 風險 | 等級 | 緩解措施 |
|-----|------|---------|
| 破壞現有功能 | 中 | 分階段執行，每階段測試 |
| Token 同步失敗 | 低 | Firebase SDK 自動處理，風險低 |
| ACL 權限失效 | 中 | 詳細測試權限系統 |
| 效能下降 | 低 | 減少代碼量，效能應提升 |
| 回滾困難 | 低 | 使用 Git 分支，易回滾 |

---

## 🎯 成功指標

1. **代碼量減少 60%+**
2. **符合 ng-alain 架構原則**
3. **所有現有功能正常**
4. **無 ESLint 錯誤**
5. **通過所有測試**

---

## 📚 參考資料

- [ng-alain 官方文檔](https://ng-alain.com/)
- [@delon/auth 文檔](https://ng-alain.com/auth/getting-started)
- [@delon/acl 文檔](https://ng-alain.com/acl/getting-started)
- [Firebase JS SDK 文檔](https://firebase.google.com/docs/web/setup)
- [Angular 20 Interceptor 文檔](https://angular.dev/guide/http/interceptors)

---

**建立時間**: 2025-10-08  
**預計完成時間**: 2025-10-09  
**負責人**: AI Agent + User  
**狀態**: ⏳ 待執行

---

## 💡 下一步行動

1. ✅ 閱讀並確認計畫書
2. ⏳ 執行階段 1: 創建 FirebaseTokenAdapter
3. ⏳ 測試適配器是否正常工作
4. ⏳ 執行後續階段

**準備好了嗎？讓我們開始重構吧！** 🚀

