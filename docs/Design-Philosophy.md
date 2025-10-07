# ng-alain 專案設計哲學

> 分析日期: 2025-10-07  
> 分析方法: VAN Mode + Context7 Official Docs + Sequential Thinking (15 steps)  
> 專案版本: Angular 20.3.0 + ng-alain 20.0.2 + ng-zorro-antd 20.3.1

## 🎯 核心設計理念

### 設計哲學總綱

本專案採用 **"Modern Angular + Enterprise UI + Developer Experience First"** 的三位一體設計理念：

1. **Modern Angular First**: 全面擁抱 Angular 20 最新特性
2. **Enterprise UI Standards**: 基於 Ant Design 的企業級 UI 規範
3. **Developer Experience First**: 優化開發體驗，提升開發效率

---

## 📐 六大設計原則體系

### A. 架構設計原則

#### 1. Standalone First（獨立組件優先）

**理念**: 完全擺脫 NgModule，擁抱 Angular 20 的 Standalone 架構

**實踐**：
```typescript
// ❌ 舊模式：使用 NgModule
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule, NzButtonModule]
})

// ✅ 新模式：Standalone Component
@Component({
  standalone: true,
  imports: [CommonModule, NzButtonModule]
})
```

**優勢**：
- ✅ 更好的 Tree-shaking（未使用的模組不會被打包）
- ✅ 更清晰的依賴關係（每個組件明確聲明依賴）
- ✅ 更快的編譯速度（減少模組依賴分析）
- ✅ 更簡單的測試（組件自包含，易於隔離測試）

**應用場景**: 100% 的組件採用 standalone 模式

---

#### 2. Lazy Loading Everywhere（普遍懶加載）

**理念**: 所有功能模組都採用懶加載，最小化初始 Bundle 大小

**實踐**：
```typescript
// 布局層級的懶加載
{
  path: 'pro',
  component: LayoutBasicComponent,
  children: [{
    path: '',
    loadChildren: () => import('./pro/routes').then(m => m.routes)
  }]
}

// 功能層級的懶加載
{
  path: 'organization',
  loadChildren: () => import('@organization/routes').then(m => m.routes)
}

// 組件層級的懶加載
{
  path: 'list',
  loadComponent: () => import('./components/organization-list/organization-list.component')
    .then(m => m.OrganizationListComponent)
}
```

**三層懶加載策略**：
- **Layer 1**: Layout routes（布局路由）
- **Layer 2**: Feature routes（功能路由）
- **Layer 3**: Component routes（組件路由）

**性能收益**：
- 初始 Bundle < 2MB
- 按需載入功能模組
- 路由切換時才下載組件

---

#### 3. Feature Module Organization（功能模組組織）

**理念**: 即使在 standalone 時代，也保持清晰的功能模組目錄結構

**標準目錄結構**：
```
src/app/routes/[feature]/
├── components/          # 展示層組件
│   ├── [feature]-list/     # 列表組件
│   ├── [feature]-form/     # 表單組件
│   └── [feature]-detail/   # 詳情組件
├── services/            # 業務邏輯服務
│   └── [feature].service.ts
├── models/              # 數據模型
│   └── [feature].model.ts
├── guards/              # 路由守衛
│   └── [feature]-permission.guard.ts
├── routes.ts            # 路由配置
├── index.ts             # 公開 API
└── README.md            # 模組文檔
```

**實際案例**（Organization 模組）：
```
src/app/routes/organization/
├── components/
│   ├── organization-list/
│   ├── organization-form/
│   ├── org-profile/
│   ├── org-members/
│   ├── org-settings/
│   ├── org-invitations/
│   ├── org-structure/
│   └── user-profile/
├── services/
│   ├── organization.service.ts
│   ├── user.service.ts
│   └── membership.service.ts
├── models/
│   ├── organization.model.ts
│   ├── user.model.ts
│   └── membership.model.ts
├── guards/
│   └── org-admin.guard.ts
└── routes.ts
```

**優勢**：
- 功能內聚，易於定位代碼
- 清晰的關注點分離
- 易於團隊協作（不同人負責不同目錄）
- 易於刪除或遷移功能（整個目錄移除）

---

#### 4. Path Alias for Clean Imports（路徑別名）

**理念**: 使用 TypeScript 路徑別名避免相對路徑地獄

**配置**（tsconfig.json）：
```typescript
"paths": {
  "@shared": ["src/app/shared/index"],
  "@core": ["src/app/core/index"],
  "@organization": ["src/organization/index"],
  "@organization/*": ["src/organization/*"],
  "@env/*": ["src/environments/*"],
  "@_mock": ["_mock/index"]
}
```

**使用效果**：
```typescript
// ❌ 相對路徑地獄
import { OrganizationService } from '../../../routes/pro/organization/services/organization.service';

// ✅ 使用別名
import { OrganizationService } from '@organization/services/organization.service';
```

**優勢**：
- 導入路徑與物理路徑解耦
- 重構時不需要改變 import 語句
- 代碼更易讀
- IDE 自動完成友好

---

#### 5. Layered Routing with Guards（分層路由與守衛）

**理念**: 三層路由架構 + 分層權限控制

**層級結構**：
```typescript
// Layer 1: Layout Level（布局層）
{
  path: 'pro',
  component: LayoutBasicComponent,
  canActivate: [startPageGuard, authSimpleCanActivate],    // 全局守衛
  canActivateChild: [authSimpleCanActivateChild],          // 子路由守衛
  children: [...]
}

// Layer 2: Feature Level（功能層）
{
  path: 'organization',
  loadChildren: () => import('@organization/routes').then(m => m.routes)
}

// Layer 3: Component Level（組件層）
{
  path: ':id/settings',
  loadComponent: () => import('./org-settings.component').then(m => m.OrgSettingsComponent),
  canActivate: [orgOwnerGuard]                            // 功能級守衛
}
```

**權限層級**：
1. **Global Guards**: `authSimpleCanActivate` - 檢查是否登入
2. **Feature Guards**: `orgMemberGuard` - 檢查是否為組織成員
3. **Action Guards**: `orgOwnerGuard` - 檢查是否為擁有者

**優勢**：
- 權限檢查分層，效率高
- 錯誤及早發現（在路由層攔截）
- 代碼清晰，易於維護

---

### B. 組件設計原則

#### 1. OnPush Detection Strategy（變更檢測優化）

**理念**: 所有組件使用 OnPush 策略，配合手動 detectChanges

**實踐**：
```typescript
@Component({
  selector: 'app-organization-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  
  loadOrganizations(): void {
    this.loading = true;
    this.cdr.detectChanges();  // 手動觸發
    
    this.service.getOrganizations().subscribe({
      next: (result) => {
        this.organizations = result.data;
        this.loading = false;
        this.cdr.detectChanges();  // 手動觸發
      }
    });
  }
}
```

**性能收益**：
- 減少不必要的變更檢測循環
- 提升大型列表渲染性能
- 降低 CPU 使用率

---

#### 2. Explicit Imports Over Shared（明確導入優於共享）

**理念**: 每個組件明確聲明所有依賴，而不是導入共享模組

**對比**：
```typescript
// ❌ 舊模式：使用共享模組
import { SHARED_IMPORTS } from '@shared';

@Component({
  imports: [SHARED_IMPORTS]  // 可能包含未使用的模組
})

// ✅ 新模式：明確導入
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  imports: [CommonModule, NzButtonModule, NzCardModule]  // 僅導入需要的
})
```

**優勢**：
- ✅ 更好的 Tree-shaking（移除未使用的代碼）
- ✅ 清晰的依賴關係（一眼看出組件需要什麼）
- ✅ 更小的 Bundle size
- ✅ 編譯時錯誤檢查（如果缺少導入會報錯）

**Trade-off**: 雖然增加了代碼量，但換來了性能和可維護性。

---

#### 3. Native Control Flow（原生控制流）

**理念**: 使用 Angular 17+ 的 @if, @for, @switch 新語法，取代舊的結構型指令

**新舊對比**：
```html
<!-- ❌ 舊語法：結構型指令 -->
<div *ngIf="loading">載入中...</div>
<div *ngIf="organizations.length === 0">暫無資料</div>
<div *ngIf="organizations.length > 0">
  <div *ngFor="let org of organizations; trackBy: trackById">
    {{ org.name }}
  </div>
</div>

<!-- ✅ 新語法：原生控制流 -->
@if (loading) {
  <div>載入中...</div>
} @else if (organizations.length === 0) {
  <div>暫無資料</div>
} @else {
  @for (org of organizations; track org.id) {
    <div>{{ org.name }}</div>
  }
}
```

**優勢**：
- ✅ 更直觀的語法（類似 JavaScript）
- ✅ 更好的性能（編譯器優化）
- ✅ 類型安全（track 表達式的類型檢查）
- ✅ 更好的 IDE 支援

---

#### 4. Inline Templates for Cohesion（內聯模板保持聚合）

**理念**: 中小型組件使用內聯模板，保持代碼在單一文件中

**實踐**：
```typescript
@Component({
  selector: 'app-organization-list',
  template: `
    <div class="organization-list">
      @if (loading) {
        <nz-spin />
      } @else {
        @for (org of organizations; track org.id) {
          <nz-card>{{ org.name }}</nz-card>
        }
      }
    </div>
  `,
  styles: [`
    .organization-list {
      padding: 24px;
    }
  `]
})
```

**優勢**：
- 所有代碼在一個文件中，易於理解
- 減少文件數量
- Template 和 Logic 更緊密
- 適合 100 行以內的模板

**何時使用分離模板**：
- 模板超過 150 行
- 需要重用模板
- 設計師需要單獨編輯 HTML

---

#### 5. Mobile-First Responsive Design（移動優先響應式）

**理念**: 使用 CSS Grid + 媒體查詢實現響應式設計

**實踐**：
```css
/* Desktop: 多列自適應 */
.organization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
}

/* Mobile: 單列布局 */
@media (max-width: 768px) {
  .organization-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header {
    flex-direction: column;
    gap: 16px;
  }
}
```

**設計要點**：
- 使用 CSS Grid 而非 Flexbox（更強大的佈局能力）
- auto-fill + minmax 實現自適應列數
- 移動端隱藏次要元素
- 觸控友好的按鈕大小

---

### C. 數據與狀態管理原則

#### 1. Service-based State（基於服務的狀態管理）

**理念**: 不使用 NgRx/Signal Store，使用服務 + RxJS 管理狀態

**實踐**：
```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(_HttpClient);
  
  // API 方法直接返回 Observable
  getOrganizations(params?: QueryParams): Observable<{data: Organization[]; total: number}> {
    return this.http.get('/api/organizations', params);
  }
}
```

**為什麼不用 NgRx**：
- ✅ 專案規模適中，服務層足夠
- ✅ 減少樣板代碼（actions, reducers, effects）
- ✅ 學習曲線平緩
- ✅ 更直接的數據流

**何時考慮 NgRx**：
- 跨多個組件的複雜狀態共享
- 需要時間旅行調試
- 狀態邏輯極其複雜

---

#### 2. Observable Streams（可觀察流）

**理念**: 使用 RxJS Observable 作為數據源，實現響應式編程

**實踐**：
```typescript
// 服務返回 Observable
getOrganizations(): Observable<Organization[]> {
  return this.http.get('/api/organizations');
}

// 組件訂閱 Observable
ngOnInit(): void {
  this.organizationService.getOrganizations().subscribe({
    next: (orgs) => this.organizations = orgs,
    error: (error) => console.error(error)
  });
}

// 使用 RxJS operators
this.organizationService.getOrganizations().pipe(
  map(orgs => orgs.filter(org => org.isPublic)),
  catchError(error => of([]))
).subscribe();
```

**優勢**：
- 統一的異步處理模型
- 豐富的 operators（map, filter, switchMap, etc.）
- 自動取消訂閱（配合 async pipe）
- 易於組合多個數據流

---

#### 3. Type-Safe Everything（全面類型安全）

**理念**: 100% TypeScript，完整的類型定義

**實踐**：
```typescript
// 模型定義
export interface Organization {
  id: string;
  name: string;
  displayName?: string;
  isPublic: boolean;
  membersCount: number;
  repositoriesCount: number;
  settings?: OrganizationSettings;
}

// 查詢參數類型
export interface OrganizationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isPublic?: boolean;
}

// 更新參數類型
export interface OrganizationUpdateParams {
  displayName?: string;
  description?: string;
  isPublic?: boolean;
  settings?: Partial<OrganizationSettings>;
}

// 服務方法類型
getOrganizations(params?: OrganizationQueryParams): Observable<{data: Organization[]; total: number}>
```

**TypeScript 配置**：
```json
{
  "strict": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

**優勢**：
- 編譯時錯誤檢查
- IDE 自動完成
- 重構安全
- 自我文檔化

---

#### 4. URL as State（URL 作為狀態源）

**理念**: 從 URL 推斷應用狀態，而非使用集中式狀態管理

**實踐**：
```typescript
loadCurrentEntity(): void {
  const currentUrl = this.router.url;
  const orgMatch = currentUrl.match(/\/pro\/organization\/([^\/]+)/);
  
  if (orgMatch) {
    const orgId = orgMatch[1];
    this.organizationService.getOrganization(orgId).subscribe({
      next: (org) => this.currentEntity = org
    });
  }
}
```

**優勢**：
- ✅ 可分享的 URL（複製 URL 給同事，他看到相同內容）
- ✅ 可書籤化（用戶可以收藏特定頁面）
- ✅ 瀏覽器後退/前進友好
- ✅ SEO 友好（URL 反映內容）
- ✅ 簡化狀態管理（URL 即狀態）

**應用場景**：
- 當前組織上下文
- 分頁狀態
- 篩選條件
- 詳情頁 ID

---

#### 5. Cache Service for Performance（快取優化）

**理念**: 使用 @delon/cache 快取頻繁訪問的數據

**規劃**（尚未完全實施）：
```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly cache = inject(DelonCacheService);
  
  getOrganizations(params?: QueryParams): Observable<Organization[]> {
    const cacheKey = `organizations_${JSON.stringify(params)}`;
    return this.cache.get(cacheKey, () =>
      this.http.get('/api/organizations', params),
      { expire: 5 * 60 * 1000 }  // 5分鐘過期
    );
  }
  
  updateOrganization(id: string, params: UpdateParams): Observable<Organization> {
    return this.http.put(`/api/organizations/${id}`, params).pipe(
      tap(() => this.cache.clear())  // 清除快取
    );
  }
}
```

**快取策略**：
- **列表數據**: 5-15 分鐘
- **詳情數據**: 10-30 分鐘
- **設定數據**: 30-60 分鐘
- **變更後**: 立即清除相關快取

---

### D. 權限與安全原則

#### 1. Functional Guards（函數式守衛）

**理念**: 使用 Angular 20 的函數式守衛，取代 class-based guards

**實踐**：
```typescript
export const orgOwnerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const membershipService = inject(MembershipService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  const organizationId = route.paramMap.get('id');
  
  return membershipService.getUserRole(organizationId, 'current-user').pipe(
    map(role => {
      const hasPermission = role === MemberRole.OWNER;
      if (!hasPermission) {
        notification.error('權限不足', '只有組織擁有者才能訪問此頁面');
        router.navigate(['/pro/organization']);
      }
      return hasPermission;
    }),
    catchError(() => of(false))
  );
};
```

**優勢**：
- ✅ 更簡潔（無需 class boilerplate）
- ✅ 使用 inject() 獲取依賴
- ✅ 易於測試（純函數）
- ✅ 易於組合（可以組合多個守衛函數）

---

#### 2. Role-based Access Control（基於角色的訪問控制）

**理念**: 四層角色體系 + 路由級權限控制

**角色層級**：
```typescript
export enum MemberRole {
  OWNER = 'owner',      // 擁有者：完全控制
  ADMIN = 'admin',      // 管理員：管理成員和設定
  MEMBER = 'member',    // 成員：查看和參與
  VIEWER = 'viewer'     // 查看者：僅查看
}
```

**權限矩陣**：

| 功能 | Owner | Admin | Member | Viewer |
|-----|-------|-------|--------|--------|
| 查看組織 | ✅ | ✅ | ✅ | ✅ |
| 管理成員 | ✅ | ✅ | ❌ | ❌ |
| 修改設定 | ✅ | ❌ | ❌ | ❌ |
| 刪除組織 | ✅ | ❌ | ❌ | ❌ |

**路由守衛應用**：
```typescript
{
  path: ':id/members',
  canActivate: [orgAdminGuard],  // Admin 或 Owner
  ...
},
{
  path: ':id/settings',
  canActivate: [orgOwnerGuard],  // 僅 Owner
  ...
}
```

---

#### 3. Observable-based Authorization（可觀察式授權）

**理念**: 權限檢查返回 Observable，支援非同步驗證

**實踐**：
```typescript
// 服務方法
getUserRole(orgId: string, userId: string): Observable<MemberRole> {
  return this.http.get(`/api/organizations/${orgId}/members/${userId}/role`);
}

// 守衛中使用
return membershipService.getUserRole(organizationId, 'current-user').pipe(
  map(role => role === MemberRole.OWNER),
  catchError(() => of(false))
);
```

**優勢**：
- 支援後端權限驗證
- 可以快取權限結果
- 統一的異步處理模型

---

#### 4. User Feedback on Denial（拒絕時的用戶反饋）

**理念**: 權限不足時，明確告知用戶原因

**實踐**：
```typescript
if (!hasPermission) {
  notification.error('權限不足', '只有組織擁有者才能訪問此頁面');
  router.navigate(['/pro/organization']);
}
```

**優勢**：
- 用戶知道為什麼被拒絕
- 減少困惑和支援請求
- 更好的用戶體驗

---

#### 5. Graceful Error Handling（優雅的錯誤處理）

**理念**: 所有 Observable 都使用 catchError 處理錯誤

**實踐**：
```typescript
this.organizationService.getOrganizations().subscribe({
  next: (result) => {
    this.organizations = result.data;
  },
  error: (error) => {
    console.error('載入組織列表失敗:', error);
    this.notification.error('錯誤', '載入組織列表失敗，請稍後再試');
  }
});

// 在守衛中
return membershipService.getUserRole(orgId, userId).pipe(
  map(role => checkPermission(role)),
  catchError(error => {
    console.error('權限檢查失敗:', error);
    notification.error('錯誤', '無法驗證權限');
    return of(false);
  })
);
```

**錯誤處理層級**：
1. **捕獲錯誤**: catchError operator
2. **記錄錯誤**: console.error
3. **用戶通知**: NzNotificationService
4. **回退行為**: 返回 empty array / false / 導向錯誤頁

---

### E. 開發體驗原則

#### 1. Mock-First Development（Mock 優先開發）

**理念**: 前端開發不依賴後端，使用 @delon/mock 模擬 API

**配置**：
```typescript
// environment.ts
export const environment = {
  production: false,
  providers: [provideMockConfig({ data: MOCKDATA })],
  interceptorFns: [mockInterceptor]
}

// _mock/_organization.ts
export const ORGANIZATIONS = {
  'GET /api/organizations': (req: MockRequest) => getOrganizations(req),
  'POST /api/organizations': (req: MockRequest) => createOrganization(req),
  'PUT /api/organizations/:id': (req: MockRequest) => updateOrganization(req),
  'DELETE /api/organizations/:id': (req: MockRequest) => deleteOrganization(req)
};
```

**Mock 數據特點**：
- ✅ 完整的 CRUD 操作
- ✅ 支援查詢參數（分頁、搜索、篩選）
- ✅ 真實的數據結構
- ✅ In-memory 持久化（開發期間）

**切換到真實 API**：
只需將 environment.production 設為 true，無需改變任何業務代碼。

---

#### 2. Hot Module Replacement（熱模組替換）

**理念**: 支援 HMR，加速開發迭代

**配置**：
```json
{
  "scripts": {
    "start": "ng s -o",
    "hmr": "ng s -o --hmr"
  }
}
```

**開發流程**：
1. `npm run hmr` 啟動開發伺服器
2. 修改組件代碼
3. 瀏覽器自動熱更新（保持狀態）
4. 無需手動刷新頁面

---

#### 3. High Memory Build（高記憶體建置）

**理念**: 為大型專案分配足夠的記憶體

**配置**：
```json
{
  "scripts": {
    "ng-high-memory": "node --max_old_space_size=8000 ./node_modules/@angular/cli/bin/ng",
    "build": "npm run ng-high-memory build"
  }
}
```

**為什麼需要**：
- Angular 20 + ng-zorro + @delon 依賴龐大
- 嚴格的 TypeScript 檢查需要更多記憶體
- Less 編譯需要記憶體
- Source map 生成需要記憶體

---

#### 4. Linting & Formatting（代碼檢查與格式化）

**理念**: 自動化代碼品質保證

**工具鏈**：
```json
{
  "lint": "npm run lint:ts && npm run lint:style",
  "lint:ts": "npx eslint --cache --fix",
  "lint:style": "npx stylelint 'src/**/*.less'"
}
```

**配置**：
- **ESLint**: Angular + TypeScript 規則
- **Stylelint**: Less 文件檢查 + clean order
- **Prettier**: 統一代碼格式

---

#### 5. Git Hooks Integration（Git 掛鉤整合）

**理念**: Pre-commit 自動檢查，確保代碼品質

**配置**：
```json
{
  "lint-staged": {
    "(src)/**/*.{html,ts}": ["eslint --cache"],
    "(src)/**/*.less": ["npm run lint:style"]
  }
}
```

**流程**：
1. 執行 `git commit`
2. Husky 觸發 pre-commit hook
3. lint-staged 僅檢查 staged files
4. 如果有錯誤，阻止 commit
5. 修復錯誤後重新 commit

---

### F. UI/UX 設計原則

#### 1. ng-zorro-antd Over Custom（優先使用 ng-zorro）

**理念**: 優先使用 ng-zorro-antd 組件，減少自定義組件

**使用的組件**：
- **佈局**: Card, Grid, Divider, Space
- **導航**: Menu, Dropdown, Breadcrumb, Tabs
- **輸入**: Input, Select, DatePicker, Checkbox, Radio
- **展示**: Avatar, Tag, Badge, Tooltip, Popover
- **反饋**: Spin, Empty, Notification, Modal
- **表格**: Table, Pagination

**為什麼**：
- ✅ 企業級設計規範（Ant Design）
- ✅ 無障礙支援（Accessibility）
- ✅ 國際化支援
- ✅ 主題定制能力
- ✅ 減少維護成本

---

#### 2. Empty States Everywhere（普遍的空狀態）

**理念**: 所有列表都有空狀態處理

**實踐**：
```html
@if (organizations.length === 0) {
  <nz-empty
    nzNotFoundContent="暫無組織"
    nzNotFoundDescription="您還沒有創建或加入任何組織"
  >
    <button nz-button nzType="primary" (click)="createOrganization()">
      創建第一個組織
    </button>
  </nz-empty>
}
```

**空狀態設計要點**：
- 描述性標題
- 說明原因
- CTA 按鈕（引導用戶下一步操作）
- 視覺化圖示（nz-empty 內建）

---

#### 3. Loading States（載入狀態）

**理念**: 所有異步操作都有載入狀態

**實踐**：
```typescript
@if (loading) {
  <div class="loading-container">
    <nz-spin nzSize="large" />
  </div>
} @else {
  <!-- 內容 -->
}
```

**載入狀態模式**：
- **全頁載入**: Spin 覆蓋整個區域
- **按鈕載入**: Button 的 nzLoading 屬性
- **表格載入**: Table 的 nzLoading 屬性
- **局部載入**: 特定區域的 Spin

---

#### 4. Hover Effects for Interaction（懸停效果）

**理念**: 微交互提升用戶體驗

**實踐**：
```css
.organization-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.organization-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

**微交互設計**：
- **卡片懸停**: 上移 + 陰影增強
- **按鈕懸停**: 背景色變化
- **圖標懸停**: 顏色變化
- **過渡動畫**: 使用 transition: all 0.3s ease

---

#### 5. GitHub-style Navigation（GitHub 風格導航）

**理念**: 學習 GitHub 的導航模式，提供熟悉的用戶體驗

**實踐**：

**組織切換器**（類似 GitHub）：
- 個人 / 組織上下文切換
- 下拉選單顯示所有組織
- 視覺標示當前上下文
- 快速創建組織入口

**路由設計**（規劃中）：
```
當前:
/pro/organization/:id/members

規劃:
/org/:orgname/members      （類似 GitHub）
/u/:username/projects       （類似 GitHub）
```

**為什麼學習 GitHub**：
- 用戶已熟悉 GitHub 的交互模式
- 減少學習成本
- GitHub 的設計經過大量用戶驗證

---

## 🏛️ 架構分層

### 1. 物理層級（Physical Layers）

```
src/
├── app/
│   ├── core/              # 核心層（全局單例服務）
│   │   ├── i18n/             # 國際化服務
│   │   ├── net/              # HTTP 攔截器
│   │   └── startup/          # 應用啟動服務
│   ├── shared/            # 共享層（可重用的組件/工具）
│   │   ├── utils/            # 工具函數
│   │   ├── st-widget/        # 表格小部件
│   │   └── cell-widget/      # Cell 小部件
│   ├── layout/            # 佈局層（頁面框架）
│   │   ├── basic/            # 基本佈局
│   │   ├── blank/            # 空白佈局
│   │   └── passport/         # 登入佈局
│   └── routes/            # 功能層（業務功能）
│       ├── dashboard/        # 儀表板
│       ├── organization/     # 組織管理
│       └── ...               # 其他功能
├── assets/               # 資源層（靜態資源）
└── environments/         # 環境層（環境配置）
```

### 2. 邏輯層級（Logical Layers）

```
┌─────────────────────────────────────┐
│  Presentation Layer (展示層)         │
│  - Components                        │
│  - Templates                         │
│  - Styles                            │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│  Business Logic Layer (業務邏輯層)   │
│  - Services                          │
│  - Guards                            │
│  - Interceptors                      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│  Data Layer (數據層)                 │
│  - Models / Interfaces               │
│  - HTTP Client                       │
│  - Mock Data                         │
└─────────────────────────────────────┘
```

### 3. 依賴流向（Dependency Flow）

```
Routes ──→ Components ──→ Services ──→ HTTP Client ──→ API
   │           │             │
   ├──→ Guards │             │
   └──────────→ Models  ←────┘
```

**原則**: 
- 上層依賴下層（單向依賴）
- 下層不知道上層存在
- Models 被所有層使用（共享定義）

---

## 🔧 技術棧選擇理由

### 為什麼選擇 Angular 20？

1. **企業級框架**: Google 支援，長期維護保證
2. **TypeScript 原生**: 天生類型安全
3. **完整的工具鏈**: CLI, Router, Forms, HTTP, i18n 內建
4. **大型專案友好**: 強制的架構規範
5. **Standalone 架構**: 現代化，性能優化

### 為什麼選擇 ng-zorro-antd？

1. **Ant Design 規範**: 業界認可的設計系統
2. **70+ 企業級組件**: 開箱即用
3. **中文社群活躍**: 文檔完整，支援良好
4. **TypeScript 原生**: 完整的類型定義
5. **定制化能力**: 支援主題客製化

### 為什麼選擇 @delon？

1. **ng-alain 腳手架**: 專為後台管理系統設計
2. **豐富的 ABC 組件**: ST (Simple Table), SE (Search Form), SV (View)
3. **ACL 權限系統**: 內建權限控制
4. **Mock 系統**: 完整的開發環境模擬
5. **主題系統**: 完整的主題定制能力

---

## 🎨 設計模式應用

### 1. Facade Pattern（門面模式）

**應用**: @organization 路徑別名

```
使用者視角:
import { OrganizationService } from '@organization';

實際路徑:
src/organization/index.ts → 重新導出 → src/app/routes/organization/services/
```

**優勢**: 隱藏實現細節，提供統一接口

---

### 2. Repository Pattern（倉儲模式）

**應用**: Service 層作為數據訪問層

```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  // 抽象數據訪問
  getOrganizations(): Observable<Organization[]> {
    return this.http.get('/api/organizations');
  }
}
```

**優勢**: 業務邏輯與數據訪問分離

---

### 3. Observer Pattern（觀察者模式）

**應用**: RxJS Observable everywhere

```typescript
// 服務發布數據
getOrganizations(): Observable<Organization[]>

// 組件訂閱數據
this.service.getOrganizations().subscribe(...)
```

**優勢**: 響應式編程，自動化數據流

---

### 4. Strategy Pattern（策略模式）

**應用**: ChangeDetectionStrategy

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // 策略選擇
})
```

**優勢**: 靈活選擇變更檢測策略

---

### 5. Dependency Injection Pattern（依賴注入模式）

**應用**: Angular DI 系統 + inject() 函數

```typescript
export class MyComponent {
  private readonly service = inject(MyService);  // 現代寫法
}
```

**優勢**: 鬆耦合，易於測試和替換實現

---

## 📋 代碼風格規範

### TypeScript 風格

```typescript
// ✅ 使用 interface 定義數據結構
export interface Organization {
  id: string;
  name: string;
  isPublic: boolean;
}

// ✅ 使用 enum 定義常量
export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member'
}

// ✅ 使用 type 定義聯合類型
export type EntityType = 'user' | 'organization';

// ✅ 使用 readonly 注入依賴
private readonly http = inject(_HttpClient);

// ✅ 使用 Optional chaining
const displayName = org?.displayName || org?.name;

// ✅ 使用 Nullish coalescing
const isPublic = req.body.isPublic ?? true;
```

### 命名規範

```typescript
// Components: PascalCase + Component 後綴
OrganizationListComponent

// Services: PascalCase + Service 後綴
OrganizationService

// Guards: camelCase + Guard 後綴
orgOwnerGuard, orgAdminGuard

// Models/Interfaces: PascalCase
Organization, MemberRole

// Constants: UPPER_SNAKE_CASE
const ORGANIZATIONS = {...}

// Private members: camelCase with underscore prefix (optional)
private readonly _http

// Observable members: $ suffix
organizations$
```

---

## 🚀 性能優化策略

### 1. Bundle Optimization

- **Lazy Loading**: 所有功能模組懶加載
- **Tree-shaking**: Standalone + explicit imports
- **Source Map Analysis**: `npm run analyze:view`

### 2. Runtime Optimization

- **OnPush Detection**: 減少變更檢測
- **trackBy in @for**: 列表渲染優化
- **Virtual Scrolling**: 大列表使用虛擬滾動（規劃）
- **Cache Service**: 快取常用數據（規劃）

### 3. Network Optimization

- **HTTP Interceptors**: 統一的請求/響應處理
- **Request Caching**: 快取 GET 請求
- **Lazy Image Loading**: 圖片懶加載

---

## 📊 專案成熟度

### 已實施的設計模式 ✅

- ✅ Standalone Components
- ✅ Lazy Loading Routes
- ✅ Functional Guards with inject()
- ✅ OnPush Change Detection
- ✅ Native Control Flow (@if, @for, @switch)
- ✅ Type-safe Models
- ✅ RESTful Service Layer
- ✅ Mock-First Development
- ✅ Path Aliases
- ✅ Mobile-First Responsive

### 規劃中的優化 🔄

- 🔄 Cache Service Integration
- 🔄 Virtual Scrolling for Large Lists
- 🔄 Signal Store for Complex State
- 🔄 Unified Error Handling Service
- 🔄 API Documentation Auto-generation
- 🔄 E2E Testing Suite
- 🔄 Performance Monitoring

---

## 🎓 設計決策記錄

### Decision #1: Standalone vs NgModule

**決策**: 100% Standalone
**理由**: Angular 20 推薦，未來方向
**Trade-off**: 每個組件需要明確導入，代碼量增加
**結果**: ✅ 採納，性能和可維護性提升

### Decision #2: Service State vs NgRx

**決策**: 使用 Service + RxJS
**理由**: 專案規模適中，NgRx 過於複雜
**Trade-off**: 大型狀態管理較困難
**結果**: ✅ 採納，簡單有效

### Decision #3: Inline Template vs Separate HTML

**決策**: 中小型組件使用 inline template
**理由**: 代碼聚合，易於理解
**Trade-off**: 大型模板不易編輯
**結果**: ✅ 採納，100 行以下使用 inline

### Decision #4: Hash Routing vs Path Routing

**決策**: 使用 Hash Routing（useHash: true）
**理由**: 部署簡單，無需伺服器端配置
**Trade-off**: SEO 不友好
**結果**: ✅ 採納，後台系統不需要 SEO

### Decision #5: Less vs SCSS

**決策**: 使用 Less
**理由**: ng-zorro-antd 和 @delon 使用 Less
**Trade-off**: Less 社群較 SCSS 小
**結果**: ✅ 採納，與生態系統對齊

---

## 🌟 設計亮點

### 1. GitHub-style Organization Switcher

類似 GitHub 的組織/個人切換器，提供直覺的上下文切換體驗。

### 2. Role-based Guard System

三級守衛系統（Owner/Admin/Member），清晰的權限控制。

### 3. Mock-Driven Development

完整的 Mock 系統，前後端並行開發。

### 4. Path Alias System

乾淨的 import 路徑，易於重構和維護。

### 5. Feature Module Organization

清晰的目錄結構，易於團隊協作。

---

**更新日期**: 2025-10-07  
**分析狀態**: ✅ Complete  
**下一步**: 實施 Cache Service 和 Virtual Scrolling

