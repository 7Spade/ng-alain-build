# ng-alain 開發原則與最佳實踐

> 生成日期: 2025-10-07  
> 基於: Sequential Thinking 分析 + Context7 官方文件 + 專案實際代碼

## 🎯 開發原則總覽

本文檔定義了 ng-alain 專案的開發規範、最佳實踐和代碼標準。所有開發者都應遵循這些原則，以確保代碼品質和一致性。

---

## 📦 組件開發原則

### 原則 1: Standalone Component Template

**標準組件模板**：

```typescript
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-feature-name',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule
  ],
  template: `
    <div class="feature-container">
      @if (loading) {
        <nz-spin nzSize="large" />
      } @else {
        @for (item of items; track item.id) {
          <nz-card>{{ item.name }}</nz-card>
        }
      }
    </div>
  `,
  styles: [`
    .feature-container {
      padding: 24px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit {
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  
  items: Item[] = [];
  loading = false;
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.loading = true;
    this.cdr.detectChanges();
    
    this.http.get('/api/items').subscribe({
      next: (result) => {
        this.items = result.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('載入失敗:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
```

### 原則 2: 組件大小限制

- **小型組件**: < 100 行，使用 inline template
- **中型組件**: 100-300 行，考慮分離 template
- **大型組件**: > 300 行，必須分離 template 並考慮拆分

### 原則 3: 組件職責單一

每個組件只負責一個職責：

```typescript
// ✅ 職責單一
OrganizationListComponent    // 僅負責列表展示
OrganizationFormComponent    // 僅負責表單編輯
OrganizationCardComponent    // 僅負責卡片展示

// ❌ 職責過多
OrganizationComponent        // 列表 + 表單 + 詳情（太多職責）
```

---

## 🔧 服務開發原則

### 原則 1: Injectable providedIn root

所有服務使用 `providedIn: 'root'`：

```typescript
@Injectable({
  providedIn: 'root'  // Tree-shakable
})
export class MyService {
  private readonly http = inject(_HttpClient);
}
```

### 原則 2: @delon/theme _HttpClient

使用 @delon 的 _HttpClient 包裝器：

```typescript
// ✅ 使用 @delon _HttpClient
import { _HttpClient } from '@delon/theme';

@Injectable({ providedIn: 'root' })
export class MyService {
  private readonly http = inject(_HttpClient);
  
  getData(): Observable<Data> {
    return this.http.get('/api/data');  // 自動處理 loading 和錯誤
  }
}

// ❌ 不直接使用 Angular HttpClient
import { HttpClient } from '@angular/common/http';
```

### 原則 3: RESTful API Convention

嚴格遵循 REST 規範：

```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly API_BASE = '/api/organizations';
  
  // GET /api/organizations - 列表
  getOrganizations(params?: QueryParams): Observable<{data: Organization[]; total: number}> {
    return this.http.get(this.API_BASE, params);
  }
  
  // GET /api/organizations/:id - 詳情
  getOrganization(id: string): Observable<Organization> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  // POST /api/organizations - 創建
  createOrganization(org: Partial<Organization>): Observable<Organization> {
    return this.http.post(this.API_BASE, org);
  }
  
  // PUT /api/organizations/:id - 更新
  updateOrganization(id: string, params: UpdateParams): Observable<Organization> {
    return this.http.put(`${this.API_BASE}/${id}`, params);
  }
  
  // DELETE /api/organizations/:id - 刪除
  deleteOrganization(id: string): Observable<void> {
    return this.http.delete(`${this.API_BASE}/${id}`);
  }
}
```

### 原則 4: Observable Return Types

所有服務方法返回 Observable：

```typescript
// ✅ 返回 Observable
getOrganizations(): Observable<Organization[]> {
  return this.http.get('/api/organizations');
}

// ❌ 不返回 Promise
async getOrganizations(): Promise<Organization[]> {
  return this.http.get('/api/organizations').toPromise();
}
```

**理由**: Observable 提供更多 operators，支援取消訂閱

---

## 🛡️ 守衛開發原則

### 原則 1: Functional Guard Template

**標準守衛模板**：

```typescript
export const myFeatureGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const service = inject(MyService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  const resourceId = route.paramMap.get('id');
  
  if (!resourceId) {
    notification.error('錯誤', '無效的資源 ID');
    router.navigate(['/fallback']);
    return of(false);
  }
  
  return service.checkPermission(resourceId).pipe(
    map(hasPermission => {
      if (!hasPermission) {
        notification.error('權限不足', '您沒有權限訪問此資源');
        router.navigate(['/fallback']);
      }
      return hasPermission;
    }),
    catchError(error => {
      console.error('權限檢查失敗:', error);
      notification.error('錯誤', '無法驗證權限');
      router.navigate(['/fallback']);
      return of(false);
    })
  );
};
```

### 原則 2: 守衛命名規範

```typescript
// 功能 + 權限級別 + Guard
export const orgOwnerGuard: CanActivateFn     // 擁有者權限
export const orgAdminGuard: CanActivateFn     // 管理員權限
export const orgMemberGuard: CanActivateFn    // 成員權限
```

---

## 📐 路由開發原則

### 原則 1: 分層路由結構

```typescript
// Level 1: Layout
{
  path: 'feature',
  component: LayoutBasicComponent,
  canActivate: [authSimpleCanActivate],
  canActivateChild: [authSimpleCanActivateChild],
  children: [
    // Level 2: Feature Module
    {
      path: '',
      loadChildren: () => import('./feature/routes').then(m => m.routes)
    }
  ]
}

// Level 3: Sub-features (in feature/routes.ts)
export const routes: Routes = [
  { path: 'list', loadComponent: () => import('./list.component') },
  { path: 'create', loadComponent: () => import('./form.component') },
  {
    path: ':id',
    children: [
      { path: '', loadComponent: () => import('./detail.component') },
      { path: 'edit', loadComponent: () => import('./edit.component') }
    ]
  }
];
```

### 原則 2: Route Data for Metadata

所有路由都應該有 data 屬性：

```typescript
{
  path: 'list',
  loadComponent: () => import('./list.component'),
  data: {
    title: '組織列表',
    titleI18n: 'organization.list',
    permission: 'org:read'  // 可選：權限標識
  }
}
```

---

## 🎨 樣式開發原則

### 原則 1: BEM 命名規範（建議）

```less
.organization-list {              // Block
  &__header {                     // Element
    &--primary {                  // Modifier
      color: #1890ff;
    }
  }
}
```

### 原則 2: CSS Grid for Layouts

優先使用 CSS Grid 而非 Flexbox：

```less
.organization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

### 原則 3: Design Tokens（設計令牌）

使用 Less 變量定義設計令牌：

```less
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;

@spacing-sm: 12px;
@spacing-md: 16px;
@spacing-lg: 24px;

@border-radius-base: 2px;
@border-radius-lg: 4px;
```

---

## 🧪 測試原則

### 原則 1: 測試覆蓋率目標

- **Services**: 80% 覆蓋率
- **Components**: 60% 覆蓋率
- **Guards**: 100% 覆蓋率（關鍵安全邏輯）

### 原則 2: 單元測試模板

```typescript
describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService]
    });
    service = TestBed.inject(OrganizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should get organizations', () => {
    const mockOrgs = [{ id: '1', name: 'Test Org' }];
    
    service.getOrganizations().subscribe(result => {
      expect(result.data).toEqual(mockOrgs);
    });
    
    const req = httpMock.expectOne('/api/organizations');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockOrgs, total: 1 });
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

---

## 📝 文檔原則

### 原則 1: 所有功能模組都有 README

每個功能模組目錄都應包含 README.md：

```markdown
# [Feature Name] Module

## 功能概述
[簡短描述]

## 目錄結構
[樹狀圖]

## 使用方式
[代碼示例]

## API 文檔
[API 說明]

## 開發指南
[開發注意事項]
```

### 原則 2: JSDoc for Public APIs

所有公開的服務方法都應有 JSDoc：

```typescript
/**
 * 獲取組織列表
 * @param params 查詢參數（分頁、搜索、篩選）
 * @returns Observable<{data: Organization[]; total: number}>
 */
getOrganizations(params?: OrganizationQueryParams): Observable<{data: Organization[]; total: number}> {
  return this.http.get('/api/organizations', params);
}
```

---

## 🔄 Git Workflow 原則

### Commit Message Format

遵循 Angular Commit Convention：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔變更
- `style`: 代碼格式（不影響邏輯）
- `refactor`: 重構（既非新功能也非修復）
- `perf`: 性能優化
- `test`: 測試相關
- `build`: 建置系統或外部依賴
- `ci`: CI 配置

**Examples**:
```
feat(organization): add organization switcher component

- Implement GitHub-style organization switcher
- Add context switching between personal and organization
- Integrate with layout header

Closes #123
```

---

## 🚀 性能優化原則

### 原則 1: trackBy in @for Loops

所有 @for 循環都必須使用 track：

```html
<!-- ✅ 使用 track -->
@for (org of organizations; track org.id) {
  <div>{{ org.name }}</div>
}

<!-- ❌ 沒有 track -->
@for (org of organizations) {
  <div>{{ org.name }}</div>
}
```

### 原則 2: OnPush + Manual detectChanges

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  
  updateData(): void {
    this.data = newData;
    this.cdr.detectChanges();  // 必須手動觸發
  }
}
```

### 原則 3: Lazy Load Heavy Dependencies

重量級依賴應該懶加載：

```typescript
// ✅ 懶加載 TinyMCE
{
  path: 'editor',
  loadComponent: () => import('./editor.component')
}

// ❌ 在 app.config.ts 中直接導入
import { TinymceModule } from 'ngx-tinymce';
```

---

## 🔐 安全原則

### 原則 1: 永遠驗證輸入

```typescript
// ✅ 驗證參數
const organizationId = route.paramMap.get('id');
if (!organizationId) {
  notification.error('錯誤', '無效的組織 ID');
  return of(false);
}

// ❌ 直接使用，可能為 null
const organizationId = route.paramMap.get('id')!;  // 危險
```

### 原則 2: 錯誤處理必須完整

```typescript
// ✅ 完整的錯誤處理
this.service.getData().subscribe({
  next: (data) => { /* handle success */ },
  error: (error) => {
    console.error('Error:', error);
    this.notification.error('錯誤', '操作失敗');
  }
});

// ❌ 沒有錯誤處理
this.service.getData().subscribe(data => {
  this.data = data;
});
```

### 原則 3: 避免在模板中使用 Function Calls

```html
<!-- ❌ 每次變更檢測都會調用 -->
<div>{{ getRoleLabel(member.role) }}</div>

<!-- ✅ 使用 Pipe -->
<div>{{ member.role | roleLabel }}</div>

<!-- ✅ 或在組件中預計算 -->
<div>{{ member.roleLabel }}</div>
```

---

## 📊 數據模型原則

### 原則 1: Interface for Data, Enum for Constants

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

// ❌ 使用 type 定義數據（不推薦）
export type Organization = {
  id: string;
  name: string;
}

// ❌ 使用常量對象（無類型檢查）
export const MemberRole = {
  OWNER: 'owner',
  ADMIN: 'admin'
} as const;
```

### 原則 2: 分離請求和響應類型

```typescript
// 請求參數
export interface OrganizationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

// 創建請求
export interface CreateOrganizationRequest {
  name: string;
  displayName?: string;
  isPublic: boolean;
}

// 更新請求
export interface UpdateOrganizationRequest {
  displayName?: string;
  description?: string;
}

// 響應數據
export interface Organization {
  id: string;
  name: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 列表響應
export interface OrganizationListResponse {
  data: Organization[];
  total: number;
}
```

---

## 🎯 Mock 數據原則

### 原則 1: 完整的 CRUD 操作

Mock 必須支援完整的 CRUD：

```typescript
export const ORGANIZATIONS = {
  'GET /api/organizations': (req) => getOrganizations(req),
  'GET /api/organizations/:id': (req) => getOrganization(req),
  'POST /api/organizations': (req) => createOrganization(req),
  'PUT /api/organizations/:id': (req) => updateOrganization(req),
  'DELETE /api/organizations/:id': (req) => deleteOrganization(req)
};
```

### 原則 2: 真實的數據關係

Mock 數據應該模擬真實的業務邏輯：

```typescript
function createOrganization(req: MockRequest): Organization {
  const newOrg = {
    id: String(organizations.length + 1),
    name: req.body.name,
    membersCount: 1,              // 創建者自動成為成員
    repositoriesCount: 0,          // 新組織沒有倉庫
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  organizations.push(newOrg);     // 實際寫入內存
  return newOrg;
}
```

### 原則 3: 支援查詢參數

```typescript
function getOrganizations(req: MockRequest) {
  const { page = 1, pageSize = 10, search, isPublic } = req.queryString;
  
  let filtered = [...organizations];
  
  // 搜索篩選
  if (search) {
    filtered = filtered.filter(org => 
      org.name.includes(search) || 
      org.displayName?.includes(search)
    );
  }
  
  // 公開狀態篩選
  if (isPublic !== undefined) {
    filtered = filtered.filter(org => org.isPublic === (isPublic === 'true'));
  }
  
  // 分頁
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length
  };
}
```

---

## 📦 依賴管理原則

### 原則 1: 鎖定主要版本

```json
{
  "dependencies": {
    "@angular/core": "^20.3.0",      // 允許 patch 更新
    "ng-zorro-antd": "^20.3.1",
    "@delon/theme": "^20.0.2"
  }
}
```

### 原則 2: 定期更新依賴

每月檢查並更新依賴：

```bash
# 檢查過時的依賴
yarn outdated

# 更新 patch 版本
yarn upgrade

# 更新 minor 版本（謹慎）
yarn upgrade --latest
```

---

## 🌐 國際化原則

### 原則 1: 所有文字都使用 i18n

```html
<!-- ✅ 使用 i18n pipe -->
<h2>{{ 'organization.list.title' | i18n }}</h2>
<button>{{ 'common.create' | i18n }}</button>

<!-- ❌ 硬編碼文字 -->
<h2>組織列表</h2>
<button>創建</button>
```

### 原則 2: 命名空間組織

```typescript
// i18n key 結構
feature.component.element

// 範例
organization.list.title          // 組織列表標題
organization.form.submit         // 組織表單提交按鈕
common.cancel                    // 通用取消按鈕
validation.required              // 通用必填驗證
```

---

## 🎯 代碼審查 Checklist

每個 Pull Request 都應檢查：

### 架構
- [ ] 組件是 standalone
- [ ] 使用 loadComponent 懶加載
- [ ] 路由有適當的守衛
- [ ] 服務使用 providedIn: 'root'

### 性能
- [ ] 組件使用 OnPush
- [ ] @for 循環有 track
- [ ] 避免在模板中調用函數
- [ ] 大型列表考慮虛擬滾動

### 類型安全
- [ ] 所有參數有類型定義
- [ ] 避免使用 any
- [ ] Observable 返回類型明確

### 用戶體驗
- [ ] 有載入狀態
- [ ] 有空狀態處理
- [ ] 錯誤有用戶通知
- [ ] 響應式設計（手機適配）

### 代碼品質
- [ ] 通過 ESLint
- [ ] 通過 Stylelint
- [ ] 有適當的註釋
- [ ] 功能模組有 README

---

**最後更新**: 2025-10-07  
**適用版本**: Angular 20.3.0 + ng-alain 20.0.2

