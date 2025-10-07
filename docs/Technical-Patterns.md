# 技術模式與實踐指南

> 生成日期: 2025-10-07  
> 基於: Sequential Thinking 分析 + 實際代碼模式  
> 目的: 記錄專案中使用的技術模式和實踐方法

## 🎨 設計模式應用

### 1. Facade Pattern（門面模式）

**應用場景**: @organization 路徑別名系統

**實現**：

```
物理結構:
src/app/routes/organization/
├── components/
├── services/
├── models/
└── guards/

門面層:
src/organization/
└── index.ts (重新導出)

使用:
import { OrganizationService } from '@organization';
```

**目的**: 隱藏實現細節，提供穩定的公開 API

---

### 2. Repository Pattern（倉儲模式）

**應用場景**: Service 層數據訪問

**實現**：

```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/organizations';
  
  // Repository 方法
  getAll(params?: QueryParams): Observable<Organization[]> {
    return this.http.get(this.API_BASE, params);
  }
  
  getById(id: string): Observable<Organization> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  create(entity: Partial<Organization>): Observable<Organization> {
    return this.http.post(this.API_BASE, entity);
  }
  
  update(id: string, entity: Partial<Organization>): Observable<Organization> {
    return this.http.put(`${this.API_BASE}/${id}`, entity);
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete(`${this.API_BASE}/${id}`);
  }
}
```

**優勢**:
- 業務邏輯與數據訪問分離
- 易於測試（Mock Service）
- 易於切換數據源

---

### 3. Observer Pattern（觀察者模式）

**應用場景**: RxJS Observable 數據流

**實現**：

```typescript
// Subject: 服務發布數據
@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  data$ = this.dataSubject.asObservable();  // Observable
  
  loadData(): void {
    this.http.get('/api/data').subscribe(data => {
      this.dataSubject.next(data);  // 發布
    });
  }
}

// Observer: 組件訂閱數據
@Component({...})
export class MyComponent implements OnInit {
  data$ = inject(DataService).data$;  // 訂閱
  
  // 在模板中使用 async pipe
  // <div>@for (item of data$ | async; track item.id) {...}</div>
}
```

**優勢**:
- 響應式數據流
- 自動取消訂閱（使用 async pipe）
- 多個組件可訂閱同一數據流

---

### 4. Strategy Pattern（策略模式）

**應用場景**: Change Detection Strategy

**實現**：

```typescript
// 策略 1: Default (默認策略)
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})
export class SimpleComponent {}

// 策略 2: OnPush (優化策略)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  
  updateData(): void {
    this.cdr.detectChanges();
  }
}
```

**何時使用哪個策略**：
- **Default**: 簡單組件，頻繁更新，性能不敏感
- **OnPush**: 列表組件，性能敏感，控制變更時機

---

### 5. Guard Pattern（守衛模式）

**應用場景**: 路由權限控制

**實現**：

```typescript
// 守衛函數
export const orgOwnerGuard: CanActivateFn = (route, state) => {
  const service = inject(MembershipService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  return service.getUserRole(route.params.id).pipe(
    map(role => {
      if (role !== MemberRole.OWNER) {
        notification.error('權限不足', '僅擁有者可訪問');
        router.navigate(['/pro/organization']);
        return false;
      }
      return true;
    }),
    catchError(() => of(false))
  );
};

// 路由配置
{
  path: 'settings',
  canActivate: [orgOwnerGuard],  // 應用守衛
  loadComponent: () => import('./settings.component')
}
```

**分層守衛**:
1. **Authentication Layer**: authSimpleCanActivate
2. **Authorization Layer**: orgOwnerGuard, orgAdminGuard
3. **Business Logic Layer**: customBusinessGuard

---

### 6. Adapter Pattern（適配器模式）

**應用場景**: @delon _HttpClient 包裝 Angular HttpClient

**實現**：

```typescript
// Angular HttpClient (被適配者)
class HttpClient {
  get(url: string, options?: any): Observable<any> {...}
}

// @delon _HttpClient (適配器)
class _HttpClient extends HttpClient {
  get(url: string, params?: any, options?: HttpOptions): Observable<any> {
    // 額外的處理邏輯
    // - 自動錯誤處理
    // - Loading 狀態管理
    // - 參數處理
    return super.get(url, { params, ...options });
  }
}
```

**優勢**:
- 增強原有功能
- 不破壞原有接口
- 統一行為

---

### 7. Template Method Pattern（模板方法模式）

**應用場景**: 組件生命週期

**實現**：

```typescript
@Component({...})
export class ListComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  
  // Template Method: ngOnInit
  ngOnInit(): void {
    this.loadData();      // Step 1
    this.setupFilters();  // Step 2
    this.subscribeEvents(); // Step 3
  }
  
  // 具體步驟（可被子類覆寫）
  protected loadData(): void {
    this.subscription = this.service.getData().subscribe(...);
  }
  
  protected setupFilters(): void {
    // 設置篩選器
  }
  
  protected subscribeEvents(): void {
    // 訂閱事件
  }
  
  // Template Method: ngOnDestroy
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
```

---

### 8. Factory Pattern（工廠模式）

**應用場景**: 動態組件創建（Modal, Drawer）

**實現**：

```typescript
@Component({...})
export class MyComponent {
  private readonly modal = inject(NzModalService);
  
  openEditModal(data: any): void {
    this.modal.create({
      nzTitle: '編輯',
      nzContent: EditFormComponent,  // 工廠創建組件
      nzComponentParams: { data },   // 注入數據
      nzWidth: 600
    });
  }
}
```

---

## 🔧 技術實踐模式

### Pattern 1: Smart & Dumb Components

**Smart Component（聰明組件）**：
- 包含業務邏輯
- 與服務交互
- 管理狀態
- 處理路由

```typescript
@Component({
  selector: 'app-organization-list-page',  // Page suffix
  template: `
    <app-organization-list
      [organizations]="organizations"
      (create)="handleCreate()"
      (select)="handleSelect($event)"
    />
  `
})
export class OrganizationListPageComponent {
  private readonly service = inject(OrganizationService);
  organizations: Organization[] = [];
  
  ngOnInit(): void {
    this.service.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
    });
  }
  
  handleCreate(): void {
    this.router.navigate(['/pro/organization/create']);
  }
}
```

**Dumb Component（笨組件）**：
- 僅展示
- 通過 Input 接收數據
- 通過 Output 發出事件
- 無業務邏輯

```typescript
@Component({
  selector: 'app-organization-list',
  template: `
    @for (org of organizations; track org.id) {
      <app-organization-card 
        [organization]="org"
        (click)="select.emit(org)"
      />
    }
  `
})
export class OrganizationListComponent {
  @Input() organizations: Organization[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() select = new EventEmitter<Organization>();
}
```

**何時使用**:
- **Smart**: 路由級別組件（Pages）
- **Dumb**: 可重用組件（Cards, Lists, Forms）

---

### Pattern 2: Async Pipe Pattern

**理念**: 使用 async pipe 自動訂閱和取消訂閱

**實踐**：

```typescript
// ✅ 使用 async pipe（推薦）
@Component({
  template: `
    @for (item of items$ | async; track item.id) {
      <div>{{ item.name }}</div>
    }
  `
})
export class MyComponent {
  items$ = inject(MyService).getItems();  // Observable
}

// ❌ 手動訂閱（不推薦）
@Component({
  template: `
    @for (item of items; track item.id) {
      <div>{{ item.name }}</div>
    }
  `
})
export class MyComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private subscription?: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.service.getItems().subscribe(items => {
      this.items = items;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();  // 需要手動取消
  }
}
```

**優勢**:
- ✅ 自動取消訂閱（防止記憶體洩漏）
- ✅ 代碼更簡潔
- ✅ 不需要 ngOnDestroy

**何時不使用 async pipe**:
- 需要對數據進行處理後再顯示
- 需要在多個地方使用同一數據
- 需要手動控制訂閱時機

---

### Pattern 3: RxJS Operators Pattern

**常用 operators 組合**：

```typescript
// 搜索防抖
searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(keyword => this.service.search(keyword))
).subscribe(results => {...});

// 錯誤處理 + 重試
this.service.getData().pipe(
  retry(3),
  catchError(error => {
    this.handleError(error);
    return of([]);  // 返回空數組作為後備
  })
).subscribe(data => {...});

// 多個請求並行
forkJoin({
  organizations: this.orgService.getOrganizations(),
  users: this.userService.getUsers(),
  settings: this.settingsService.getSettings()
}).subscribe(({ organizations, users, settings }) => {...});

// 請求依賴
this.orgService.getOrganization(id).pipe(
  switchMap(org => this.memberService.getMembers(org.id))
).subscribe(members => {...});

// 緩存結果
this.service.getData().pipe(
  shareReplay(1)  // 多個訂閱者共享結果
).subscribe(...);
```

---

### Pattern 4: Guard Composition Pattern

**理念**: 組合多個守衛實現複雜權限邏輯

**實踐**：

```typescript
// 基礎守衛
export const isAuthenticatedGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated();
};

export const hasRoleGuard = (role: string): CanActivateFn => {
  return () => inject(AuthService).hasRole(role);
};

// 組合守衛
export const canEditOrganization: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const membership = inject(MembershipService);
  
  return auth.isAuthenticated().pipe(
    switchMap(isAuth => {
      if (!isAuth) return of(false);
      return membership.getUserRole(route.params.id);
    }),
    map(role => role === 'owner' || role === 'admin')
  );
};

// 路由中使用
{
  path: 'edit',
  canActivate: [canEditOrganization],  // 組合後的守衛
  loadComponent: () => import('./edit.component')
}
```

---

### Pattern 5: Error Handling Pattern

**統一錯誤處理模式**：

```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private readonly notification = inject(NzNotificationService);
  
  handleError(error: any, userMessage?: string): void {
    // 1. 記錄錯誤
    console.error('Error occurred:', error);
    
    // 2. 分析錯誤類型
    let message = userMessage || '操作失敗，請稍後再試';
    
    if (error.status === 403) {
      message = '權限不足';
    } else if (error.status === 404) {
      message = '資源不存在';
    } else if (error.status === 500) {
      message = '伺服器錯誤';
    }
    
    // 3. 通知用戶
    this.notification.error('錯誤', message);
  }
}

// 在服務中使用
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(_HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  
  getOrganizations(): Observable<Organization[]> {
    return this.http.get('/api/organizations').pipe(
      catchError(error => {
        this.errorHandler.handleError(error, '載入組織列表失敗');
        return of([]);
      })
    );
  }
}
```

---

### Pattern 6: Loading State Pattern

**統一載入狀態管理**：

```typescript
@Component({...})
export class ListComponent {
  loading = false;
  private readonly cdr = inject(ChangeDetectorRef);
  
  loadData(): void {
    this.setLoading(true);
    
    this.service.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.setLoading(false);
      },
      error: (error) => {
        this.handleError(error);
        this.setLoading(false);
      }
    });
  }
  
  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.cdr.detectChanges();
  }
}

// 在模板中
@if (loading) {
  <nz-spin nzSize="large" />
} @else {
  <!-- 內容 -->
}
```

---

### Pattern 7: Form Handling Pattern

**Reactive Forms 模式**：

```typescript
@Component({...})
export class OrganizationFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  
  // 類型化表單
  organizationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    displayName: [''],
    description: [''],
    isPublic: [true],
    website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
    email: ['', [Validators.email]]
  });
  
  ngOnInit(): void {
    // 如果是編輯模式，載入現有數據
    if (this.organizationId) {
      this.service.getOrganization(this.organizationId).subscribe(org => {
        this.organizationForm.patchValue(org);
      });
    }
  }
  
  submit(): void {
    if (this.organizationForm.valid) {
      const formValue = this.organizationForm.value;
      this.service.createOrganization(formValue).subscribe({
        next: () => this.router.navigate(['/pro/organization']),
        error: (error) => this.handleError(error)
      });
    }
  }
}
```

**驗證錯誤顯示**：

```html
<nz-form-item>
  <nz-form-label nzRequired>組織名稱</nz-form-label>
  <nz-form-control [nzErrorTip]="nameErrorTpl">
    <input nz-input formControlName="name" />
    <ng-template #nameErrorTpl let-control>
      @if (control.hasError('required')) {
        請輸入組織名稱
      } @else if (control.hasError('minlength')) {
        組織名稱至少2個字符
      }
    </ng-template>
  </nz-form-control>
</nz-form-item>
```

---

### Pattern 8: Pagination Pattern

**統一分頁處理**：

```typescript
@Component({...})
export class ListComponent {
  items: Item[] = [];
  total = 0;
  currentPage = 1;
  pageSize = 20;
  
  loadData(): void {
    this.service.getItems({
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe(result => {
      this.items = result.data;
      this.total = result.total;
    });
  }
  
  onPageChange(): void {
    this.loadData();
  }
  
  onPageSizeChange(): void {
    this.currentPage = 1;  // 重置到第一頁
    this.loadData();
  }
}

// 模板
<nz-pagination
  [(nzPageIndex)]="currentPage"
  [nzTotal]="total"
  [nzPageSize]="pageSize"
  [nzShowSizeChanger]="true"
  (nzPageIndexChange)="onPageChange()"
  (nzPageSizeChange)="onPageSizeChange()"
/>
```

---

### Pattern 9: Search & Filter Pattern

**實時搜索模式**：

```typescript
@Component({...})
export class ListComponent {
  searchKeyword = '';
  
  onSearch(): void {
    this.currentPage = 1;  // 重置分頁
    this.loadData();
  }
  
  loadData(): void {
    this.service.getItems({
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchKeyword || undefined
    }).subscribe(...);
  }
}

// 模板
<nz-input-group [nzPrefix]="searchIcon">
  <input
    nz-input
    [(ngModel)]="searchKeyword"
    placeholder="搜索..."
    (input)="onSearch()"
  />
</nz-input-group>
```

**防抖搜索模式**（大數據量）：

```typescript
export class ListComponent implements OnInit {
  private searchSubject = new Subject<string>();
  
  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(keyword => this.service.search(keyword))
    ).subscribe(results => {
      this.items = results;
    });
  }
  
  onSearch(keyword: string): void {
    this.searchSubject.next(keyword);
  }
}
```

---

### Pattern 10: Modal Communication Pattern

**Parent-Child 通信模式**：

```typescript
// Parent Component
openEditModal(organization: Organization): void {
  const modalRef = this.modal.create({
    nzTitle: '編輯組織',
    nzContent: OrganizationFormComponent,
    nzComponentParams: {
      organization,  // 傳入數據
      mode: 'edit'
    },
    nzWidth: 600
  });
  
  // 監聽 Modal 關閉後的回調
  modalRef.afterClose.subscribe(result => {
    if (result) {
      this.loadOrganizations();  // 重新載入列表
    }
  });
}

// Child Component (Modal)
@Component({...})
export class OrganizationFormComponent {
  @Input() organization?: Organization;
  @Input() mode: 'create' | 'edit' = 'create';
  
  private readonly modal = inject(NzModalRef);
  
  submit(): void {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: (result) => {
          this.modal.close(result);  // 關閉並返回結果
        }
      });
    }
  }
  
  cancel(): void {
    this.modal.close();  // 關閉不返回結果
  }
}
```

---

## 🎯 最佳實踐

### Practice 1: 避免記憶體洩漏

```typescript
// ❌ 記憶體洩漏風險
export class BadComponent implements OnInit {
  ngOnInit(): void {
    this.service.getData().subscribe(data => {
      this.data = data;
    });  // 沒有取消訂閱
  }
}

// ✅ 方法 1: 使用 async pipe
export class GoodComponent {
  data$ = this.service.getData();
}
// 模板: @for (item of data$ | async; track item.id)

// ✅ 方法 2: 手動取消訂閱
export class GoodComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  ngOnInit(): void {
    this.subscription.add(
      this.service.getData().subscribe(data => {
        this.data = data;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

// ✅ 方法 3: takeUntilDestroyed
export class GoodComponent {
  private readonly destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.data = data;
      });
  }
}
```

---

### Practice 2: 類型安全的 RxJS

```typescript
// ✅ 完整的類型定義
interface User {
  id: string;
  name: string;
}

getUsers(): Observable<User[]> {  // 明確返回類型
  return this.http.get<User[]>('/api/users').pipe(
    map((users: User[]) => users.filter(u => u.name)),  // 類型推斷
    catchError((error: HttpErrorResponse) => {  // 錯誤類型
      return of<User[]>([]);  // 後備類型
    })
  );
}
```

---

### Practice 3: 懶加載圖片

```html
<!-- ✅ 使用 loading="lazy" -->
<img 
  [src]="organization.avatarUrl" 
  [alt]="organization.name"
  loading="lazy"  <!-- 懶加載 -->
  width="64"
  height="64"
/>

<!-- ✅ 使用 nz-avatar（自動優化） -->
<nz-avatar 
  [nzSrc]="organization.avatarUrl"
  [nzText]="organization.name"
  nzSize="large"
/>
```

---

### Practice 4: 避免 Function Calls in Templates

```html
<!-- ❌ 每次變更檢測都調用 -->
<div>{{ getRoleLabel(member.role) }}</div>
<div>{{ calculateTotal() }}</div>

<!-- ✅ 使用 Pipe -->
<div>{{ member.role | roleLabel }}</div>
<div>{{ items | total }}</div>

<!-- ✅ 預計算 -->
export class MyComponent {
  get total(): number {
    return this.items.reduce((sum, item) => sum + item.value, 0);
  }
}
<div>{{ total }}</div>
```

---

### Practice 5: trackBy 性能優化

```typescript
// ✅ 定義 trackBy 函數
export class ListComponent {
  trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}

// 模板中使用
@for (item of items; track trackById($index, item)) {
  <div>{{ item.name }}</div>
}

// ✅ 更簡潔：直接 track id
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

---

## 📊 性能優化模式

### Pattern: Virtual Scrolling（規劃）

**適用場景**: 超過 100 項的列表

```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="60" class="viewport">
      @for (item of items; track item.id) {
        <div class="item">{{ item.name }}</div>
      }
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
    }
    .item {
      height: 60px;
    }
  `]
})
```

---

### Pattern: Image Optimization

```html
<!-- ✅ 使用 srcset for responsive images -->
<img 
  [src]="org.avatarUrl"
  [srcset]="`
    ${org.avatarUrl}?w=64 64w,
    ${org.avatarUrl}?w=128 128w,
    ${org.avatarUrl}?w=256 256w
  `"
  sizes="(max-width: 768px) 64px, 128px"
  loading="lazy"
/>

<!-- ✅ 使用 WebP with fallback -->
<picture>
  <source type="image/webp" [srcset]="org.avatarUrl + '.webp'">
  <img [src]="org.avatarUrl" alt="Avatar">
</picture>
```

---

### Pattern: Bundle Optimization

**代碼分割策略**：

```typescript
// ✅ 路由級別分割
{
  path: 'heavy-feature',
  loadChildren: () => import('./heavy-feature/routes').then(m => m.routes)
}

// ✅ 組件級別分割
{
  path: 'chart',
  loadComponent: () => import('./chart.component').then(m => m.ChartComponent)
}

// ✅ 動態導入重量級庫
async loadEditor(): Promise<void> {
  const { TinymceModule } = await import('ngx-tinymce');
  // 使用 TinymceModule
}
```

---

## 🧪 測試模式

### Pattern: Service Testing

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
    const mockData = [{ id: '1', name: 'Test' }];
    
    service.getOrganizations().subscribe(result => {
      expect(result.data).toEqual(mockData);
    });
    
    const req = httpMock.expectOne('/api/organizations');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockData, total: 1 });
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

---

### Pattern: Component Testing

```typescript
describe('OrganizationListComponent', () => {
  let component: OrganizationListComponent;
  let fixture: ComponentFixture<OrganizationListComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationListComponent],
      providers: [
        { provide: OrganizationService, useClass: MockOrganizationService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(OrganizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display organizations', () => {
    expect(component.organizations.length).toBeGreaterThan(0);
  });
});
```

---

## 📋 代碼審查模式

### Review Checklist Pattern

每個 Pull Request 都應檢查：

```markdown
## 架構檢查
- [ ] Standalone component
- [ ] Lazy loading
- [ ] Path alias 使用
- [ ] providedIn: 'root'

## 性能檢查
- [ ] OnPush detection
- [ ] @for 有 track
- [ ] 避免模板函數調用
- [ ] 圖片懶加載

## 類型安全檢查
- [ ] 所有方法有返回類型
- [ ] 避免 any
- [ ] Observable 類型明確

## 用戶體驗檢查
- [ ] 載入狀態
- [ ] 空狀態處理
- [ ] 錯誤通知
- [ ] 響應式設計

## 代碼品質檢查
- [ ] 通過 ESLint
- [ ] 通過 Stylelint
- [ ] 有適當註釋
- [ ] 無 console.log（除錯誤記錄）
```

---

**最後更新**: 2025-10-07  
**下次更新**: 有新模式時隨時更新

