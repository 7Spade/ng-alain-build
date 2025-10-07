# Code Standards

## TypeScript Standards

### Type Definitions
- **Strict Mode**: Enable strict TypeScript compilation
- **Interface Definitions**: Use interfaces for object shapes
- **Type Guards**: Implement proper type checking
- **Generic Types**: Use generics for reusable components
- **Union Types**: Leverage union types for flexible APIs

### Naming Conventions
- **PascalCase**: Classes, interfaces, enums
- **camelCase**: Variables, functions, methods
- **kebab-case**: File names, component selectors
- **UPPER_CASE**: Constants and environment variables
- **Prefixes**: Use meaningful prefixes (is, has, can, should)

### Code Organization
- **Single Responsibility**: One responsibility per class/function
- **Dependency Injection**: Use Angular's DI system
- **Imports**: Organize imports (Angular, third-party, local)
- **Exports**: Use barrel exports for clean imports
- **File Structure**: Follow Angular style guide structure

## Angular Standards

### Component Standards
```typescript
@Component({
  selector: 'app-feature-component',
  templateUrl: './feature-component.html',
  styleUrls: ['./feature-component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {
  // Properties
  // Constructor with DI
  // Lifecycle hooks
  // Public methods
  // Private methods
}
```

### Service Standards
```typescript
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // Private properties
  // Constructor
  // Public methods
  // Private methods
}
```

### Module Standards
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  exports: [...],
  providers: [...]
})
export class FeatureModule { }
```

## ng-alain Standards

### ST (Simple Table) Usage
- **Data Source**: Use proper data source configuration
- **Columns**: Define columns with proper types
- **Actions**: Implement consistent action patterns
- **Selection**: Handle row selection appropriately
- **Pagination**: Configure pagination settings

### SE (Search Engine) Usage
- **Schema**: Define search schema properly
- **Validation**: Implement search validation
- **Reset**: Handle search reset functionality
- **Submit**: Manage search submission

### ACL Integration
- **Permissions**: Define clear permission structure
- **Guards**: Implement route guards
- **Directives**: Use ACL directives in templates
- **Service**: Integrate ACL service properly

## Styling Standards

### Less Standards
- **Variables**: Use Less variables for consistency
- **Mixins**: Create reusable mixins
- **Nesting**: Proper CSS nesting (max 3 levels)
- **BEM**: Use BEM methodology for class names
- **Responsive**: Mobile-first responsive design

### Component Styles
- **Scoped Styles**: Use component-specific styles
- **Global Styles**: Minimize global style usage
- **Theme Variables**: Use ng-alain theme variables
- **Custom Properties**: CSS custom properties for dynamic values

## Testing Standards

### Unit Testing
- **Test Structure**: Arrange, Act, Assert pattern
- **Mocking**: Proper service and dependency mocking
- **Coverage**: Maintain >80% code coverage
- **Descriptive Names**: Clear test descriptions
- **Isolation**: Test components in isolation

### Component Testing
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Documentation Standards

### Code Comments
- **JSDoc**: Use JSDoc for public APIs
- **Complex Logic**: Comment complex business logic
- **TODO**: Mark temporary code with TODO comments
- **Deprecation**: Mark deprecated code clearly

### README Files
- **Project Overview**: Clear project description
- **Setup Instructions**: Step-by-step setup guide
- **Usage Examples**: Code examples and usage patterns
- **API Documentation**: Public API documentation

## Performance Standards

### Bundle Optimization
- **Tree Shaking**: Ensure unused code elimination
- **Lazy Loading**: Implement route-based lazy loading
- **Dynamic Imports**: Use dynamic imports for large libraries
- **Bundle Analysis**: Regular bundle size analysis

### Runtime Performance
- **OnPush Strategy**: Use OnPush change detection
- **TrackBy Functions**: Implement trackBy for *ngFor
- **Unsubscribe**: Proper subscription cleanup
- **Memory Leaks**: Prevent memory leaks

## Security Standards

### Input Validation
- **Form Validation**: Implement proper form validation
- **Sanitization**: Sanitize user inputs
- **Type Checking**: Runtime type validation
- **Error Handling**: Proper error handling and logging

### Authentication
- **Token Management**: Secure token handling
- **Route Guards**: Implement proper route protection
- **ACL Integration**: Use ng-alain ACL system
- **Session Management**: Proper session handling

## Modern Angular Standards

### Standalone Component Standards
```typescript
@Component({
  selector: 'app-feature-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature-component.html',
  styleUrls: ['./feature-component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {
  // Use inject() for dependency injection
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  
  // Component implementation
}
```

### Functional Guard Standards
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

### Template Standards
```html
<!-- Use native control flow -->
@if (loading) {
  <div class="loading">載入中...</div>
} @else if (items.length === 0) {
  <div class="empty">暫無數據</div>
} @else {
  @for (item of items; track item.id) {
    <div class="item">{{ item.name }}</div>
  }
}
```

### State Management Standards
```typescript
// URL as state
loadCurrentEntity(): void {
  const currentUrl = this.router.url;
  const match = currentUrl.match(/\/entity\/([^\/]+)/);
  
  if (match) {
    const entityId = match[1];
    this.loadEntity(entityId);
  }
}

// Service-based state
@Injectable({ providedIn: 'root' })
export class EntityService {
  private readonly entities$ = new BehaviorSubject<Entity[]>([]);
  
  getEntities(): Observable<Entity[]> {
    return this.entities$.asObservable();
  }
  
  updateEntities(entities: Entity[]): void {
    this.entities$.next([...entities]); // Immutable update
  }
}
```

### Path Alias Standards
```typescript
// Use path aliases instead of relative paths
import { EntityService } from '@shared/services/entity.service';
import { EntityModel } from '@models/entity.model';
import { AuthGuard } from '@guards/auth.guard';
```

### Grid Layout Standards
```less
// CSS Grid for card layouts
.entity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

### Performance Standards
```typescript
// OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  
  updateData(): void {
    this.data = newData;
    this.cdr.detectChanges(); // Manual change detection
  }
}

// TrackBy for lists
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// Proper subscription cleanup
ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}
```

### Performance Benchmarks
- **Initial Bundle**: 1.8 MB (with lazy loading)
- **Time to Interactive**: 1.2s
- **Change Detection**: OnPush (40-60% faster)
- **Bundle Reduction**: 57% (lazy vs eager)
- **List Rendering**: 40-60% performance improvement with trackBy

### Bundle Optimization Standards
```typescript
// Lazy loading configuration
const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature/feature.component').then(m => m.FeatureComponent)
  }
];

// Tree shaking optimization
import { specificFunction } from 'library'; // Instead of import * from 'library'

// Dynamic imports for large libraries
const loadChart = () => import('chart.js').then(m => m.Chart);
```

### Memory Management Standards
```typescript
// Proper subscription cleanup
export class DataComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.handleData(data));
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Memory leak prevention
export class ServiceComponent {
  private subscriptions: Subscription[] = [];
  
  addSubscription(sub: Subscription): void {
    this.subscriptions.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
```

### Error Handling Standards
```typescript
// Observable error handling
this.service.getData().subscribe({
  next: (data) => this.handleData(data),
  error: (error) => {
    console.error('Error loading data:', error);
    this.notification.error('錯誤', '載入數據失敗');
  }
});

// Service error handling
getData(): Observable<Data[]> {
  return this.http.get<Data[]>('/api/data').pipe(
    catchError(error => {
      console.error('API Error:', error);
      return of([]); // Return empty array as fallback
    })
  );
}
```

### TypeScript Standards
```typescript
// Strict type definitions
export interface Entity {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Generic types
export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
}

// Type guards
export function isEntity(obj: any): obj is Entity {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

// Optional chaining and nullish coalescing
const displayName = entity?.displayName ?? entity?.name ?? 'Unknown';
const isActive = request.body.isActive ?? true;
```

### Form Standards
```typescript
// Reactive forms
export class FormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    isActive: [true]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.saveData(formData);
    }
  }
}
```

### Testing Standards
```typescript
// Component testing
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data correctly', () => {
    component.data = mockData;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.data-item')).toBeTruthy();
  });
});
```

## ng-alain Code Standards

### Component Template Standards
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

### Service Template Standards
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/resource';
  
  getAll(params?: Params): Observable<{data: T[]; total: number}> {
    return this.http.get(this.API_BASE, params);
  }
  
  getById(id: string): Observable<T> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  create(entity: Partial<T>): Observable<T> {
    return this.http.post(this.API_BASE, entity);
  }
  
  update(id: string, entity: Partial<T>): Observable<T> {
    return this.http.put(`${this.API_BASE}/${id}`, entity);
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete(`${this.API_BASE}/${id}`);
  }
}
```

### Guard Template Standards
```typescript
export const permissionGuard: CanActivateFn = (route) => {
  const service = inject(PermissionService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  const resourceId = route.paramMap.get('id');
  if (!resourceId) {
    notification.error('錯誤', '無效的資源');
    return of(false);
  }
  
  return service.checkPermission(resourceId).pipe(
    map(hasPermission => {
      if (!hasPermission) {
        notification.error('權限不足', '無法訪問');
        router.navigate(['/fallback']);
      }
      return hasPermission;
    }),
    catchError(() => of(false))
  );
};
```

### Path Alias Standards
```typescript
// Use path aliases instead of relative paths
@shared      → src/app/shared/
@core        → src/app/core/
@organization → src/organization/
@env/*       → src/environments/*
@_mock       → _mock/
```

### ng-zorro Component Standards
```typescript
// Layout Components
NzCardModule, NzGridModule, NzDividerModule, NzSpaceModule

// Navigation Components
NzMenuModule, NzDropDownModule, NzTabsModule, NzBreadCrumbModule

// Input Components
NzInputModule, NzSelectModule, NzDatePickerModule, NzCheckboxModule

// Display Components
NzAvatarModule, NzTagModule, NzBadgeModule, NzTooltipModule

// Feedback Components
NzSpinModule, NzEmptyModule, NzNotificationModule, NzModalModule

// Table Components
NzTableModule, NzPaginationModule
```

### Performance Standards
- **Initial Bundle**: 1.8 MB (with lazy loading)
- **Time to Interactive**: 1.2s
- **Change Detection**: OnPush (40-60% faster)
- **Bundle Reduction**: 57% (lazy vs eager)

### Security Standards
- **Input Validation**: Always validate user inputs
- **Complete Error Handling**: Comprehensive error handling with user feedback
- **Avoid Function Calls in Templates**: Use pipes or pre-computed values
- **Safe Navigation**: Use safe navigation operators and null checks

### Data Model Standards
```typescript
// Interface for data structures
export interface Organization {
  id: string;
  name: string;
  isPublic: boolean;
}

// Enum for constants
export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member'
}

// Separate request/response types
export interface OrganizationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface CreateOrganizationRequest {
  name: string;
  displayName?: string;
  isPublic: boolean;
}

export interface OrganizationListResponse {
  data: Organization[];
  total: number;
}
```

### Mock Data Standards
```typescript
export const ORGANIZATIONS = {
  'GET /api/organizations': (req) => getOrganizations(req),
  'GET /api/organizations/:id': (req) => getOrganization(req),
  'POST /api/organizations': (req) => createOrganization(req),
  'PUT /api/organizations/:id': (req) => updateOrganization(req),
  'DELETE /api/organizations/:id': (req) => deleteOrganization(req)
};

function getOrganizations(req: MockRequest) {
  const { page = 1, pageSize = 10, search, isPublic } = req.queryString;
  
  let filtered = [...organizations];
  
  if (search) {
    filtered = filtered.filter(org => 
      org.name.includes(search) || 
      org.displayName?.includes(search)
    );
  }
  
  if (isPublic !== undefined) {
    filtered = filtered.filter(org => org.isPublic === (isPublic === 'true'));
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length
  };
}
```

### Internationalization Standards
```html
<!-- Use i18n pipe for all text -->
<h2>{{ 'organization.list.title' | i18n }}</h2>
<button>{{ 'common.create' | i18n }}</button>

<!-- Translation key structure: feature.component.element -->
organization.list.title          // 組織列表標題
organization.form.submit         // 組織表單提交按鈕
common.cancel                    // 通用取消按鈕
validation.required              // 通用必填驗證
```

### Git Workflow Standards
```
<type>(<scope>): <subject>

<body>

<footer>

Header: Mandatory, includes type, scope (optional), and subject.
  - Type: Must be one of:
    - build: Changes that affect the build system or external dependencies
    - ci: Changes to our CI configuration files and scripts
    - docs: Documentation only changes
    - feat: A new feature
    - fix: A bug fix
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code
    - test: Adding missing tests or correcting existing tests
  - Subject: Succinct description of the change.
    - Use imperative, present tense: "change" not "changed" nor "changes"
    - Don't capitalize first letter
    - No dot (.) at the end

Body: Optional.
  - Use imperative, present tense: "change" not "changed" nor "changes".
  - Should include the motivation for the change and contrast this with previous behavior.

Footer: Optional.
  - Should contain any information about Breaking Changes.
  - Should reference GitHub issues that this commit Closes.
  - Breaking Changes: Start with `BREAKING CHANGE:` followed by a space or two newlines.

Examples:
  - docs(changelog): update change log to beta.5
  - fix(release): need to depend on latest rxjs and zone.js
```

## Development Principles Integration

### Component Development Standards
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

### Service Development Standards
```typescript
@Injectable({
  providedIn: 'root'  // Tree-shakable
})
export class MyService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/resource';
  
  // GET /api/resource - 列表
  getAll(params?: QueryParams): Observable<{data: T[]; total: number}> {
    return this.http.get(this.API_BASE, params);
  }
  
  // GET /api/resource/:id - 詳情
  getById(id: string): Observable<T> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  // POST /api/resource - 創建
  create(entity: Partial<T>): Observable<T> {
    return this.http.post(this.API_BASE, entity);
  }
  
  // PUT /api/resource/:id - 更新
  update(id: string, entity: Partial<T>): Observable<T> {
    return this.http.put(`${this.API_BASE}/${id}`, entity);
  }
  
  // DELETE /api/resource/:id - 刪除
  delete(id: string): Observable<void> {
    return this.http.delete(`${this.API_BASE}/${id}`);
  }
}
```

### Guard Development Standards
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

### Routing Development Standards
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

// Route Data for Metadata
{
  path: 'list',
  loadComponent: () => import('./list.component'),
  data: {
    title: '資源列表',
    titleI18n: 'resource.list',
    permission: 'resource:read'  // 可選：權限標識
  }
}
```

### Styling Development Standards
```less
// BEM 命名規範
.resource-list {              // Block
  &__header {                 // Element
    &--primary {              // Modifier
      color: #1890ff;
    }
  }
}

// CSS Grid for Layouts
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// Design Tokens（設計令牌）
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

### Performance Standards
```typescript
// trackBy in @for Loops
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// OnPush + Manual detectChanges
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

// Lazy Load Heavy Dependencies
{
  path: 'editor',
  loadComponent: () => import('./editor.component')
}
```

### Security Standards
```typescript
// 永遠驗證輸入
const resourceId = route.paramMap.get('id');
if (!resourceId) {
  notification.error('錯誤', '無效的資源 ID');
  return of(false);
}

// 錯誤處理必須完整
this.service.getData().subscribe({
  next: (data) => { /* handle success */ },
  error: (error) => {
    console.error('Error:', error);
    this.notification.error('錯誤', '操作失敗');
  }
});

// 避免在模板中使用 Function Calls
<!-- ❌ 每次變更檢測都會調用 -->
<div>{{ getRoleLabel(member.role) }}</div>

<!-- ✅ 使用 Pipe -->
<div>{{ member.role | roleLabel }}</div>

<!-- ✅ 或在組件中預計算 -->
<div>{{ member.roleLabel }}</div>
```

### Data Model Standards
```typescript
// Interface for Data, Enum for Constants
export interface Resource {
  id: string;
  name: string;
  isActive: boolean;
}

export enum ResourceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

// 分離請求和響應類型
export interface ResourceQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface CreateResourceRequest {
  name: string;
  displayName?: string;
  isActive: boolean;
}

export interface UpdateResourceRequest {
  displayName?: string;
  description?: string;
}

export interface ResourceListResponse {
  data: Resource[];
  total: number;
}
```

### Mock Data Standards
```typescript
export const RESOURCES = {
  'GET /api/resources': (req) => getResources(req),
  'GET /api/resources/:id': (req) => getResource(req),
  'POST /api/resources': (req) => createResource(req),
  'PUT /api/resources/:id': (req) => updateResource(req),
  'DELETE /api/resources/:id': (req) => deleteResource(req)
};

function getResources(req: MockRequest) {
  const { page = 1, pageSize = 10, search, isActive } = req.queryString;
  
  let filtered = [...resources];
  
  // 搜索篩選
  if (search) {
    filtered = filtered.filter(resource => 
      resource.name.includes(search) || 
      resource.displayName?.includes(search)
    );
  }
  
  // 狀態篩選
  if (isActive !== undefined) {
    filtered = filtered.filter(resource => resource.isActive === (isActive === 'true'));
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

### Internationalization Standards
```html
<!-- ✅ 使用 i18n pipe -->
<h2>{{ 'resource.list.title' | i18n }}</h2>
<button>{{ 'common.create' | i18n }}</button>

<!-- ❌ 硬編碼文字 -->
<h2>資源列表</h2>
<button>創建</button>
```

```typescript
// i18n key 結構
feature.component.element

// 範例
resource.list.title          // 資源列表標題
resource.form.submit         // 資源表單提交按鈕
common.cancel                // 通用取消按鈕
validation.required          // 通用必填驗證
```

### Testing Standards
```typescript
describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceService]
    });
    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should get resources', () => {
    const mockResources = [{ id: '1', name: 'Test Resource' }];
    
    service.getResources().subscribe(result => {
      expect(result.data).toEqual(mockResources);
    });
    
    const req = httpMock.expectOne('/api/resources');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResources, total: 1 });
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

### Code Review Checklist
- **Architecture**: Standalone components, lazy loading, proper guards, providedIn: 'root'
- **Performance**: OnPush strategy, trackBy in loops, avoid function calls in templates
- **Type Safety**: All parameters typed, avoid any, Observable return types
- **User Experience**: Loading states, empty states, error notifications, responsive design
- **Code Quality**: ESLint compliance, Stylelint compliance, proper comments, README files