# 技術模式與實踐指南

> 生成日期: 2025-01-07  
> 基於: Sequential Thinking 分析 + 實際代碼模式 + 官方文檔查詢  
> 目的: 記錄專案中使用的技術模式和實踐方法

## 🎨 設計模式應用

### 1. Repository Pattern（倉儲模式）

**應用場景**: Service 層數據訪問

**實現**：
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/data';
  
  // Repository 方法
  getAll(params?: QueryParams): Observable<Data[]> {
    return this.http.get(this.API_BASE, params);
  }
  
  getById(id: string): Observable<Data> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  create(entity: Partial<Data>): Observable<Data> {
    return this.http.post(this.API_BASE, entity);
  }
  
  update(id: string, entity: Partial<Data>): Observable<Data> {
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

### 2. Observer Pattern（觀察者模式）

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
  // @for (item of data$ | async; track item.id) {...}
}
```

**優勢**:
- 響應式數據流
- 自動取消訂閱（使用 async pipe）
- 多個組件可訂閱同一數據流

---

### 3. Strategy Pattern（策略模式）

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

### 4. Guard Pattern（守衛模式）

**應用場景**: 路由權限控制

**實現**：
```typescript
// 守衛函數
export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  return service.isAuthenticated().pipe(
    map(isAuth => {
      if (!isAuth) {
        notification.error('權限不足', '請先登入');
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError(() => of(false))
  );
};

// 路由配置
{
  path: 'protected',
  canActivate: [authGuard],  // 應用守衛
  loadComponent: () => import('./protected.component')
}
```

**分層守衛**:
1. **Authentication Layer**: authGuard
2. **Authorization Layer**: roleGuard, permissionGuard
3. **Business Logic Layer**: customBusinessGuard

---

### 5. Adapter Pattern（適配器模式）

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

### 6. Template Method Pattern（模板方法模式）

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

### 7. Factory Pattern（工廠模式）

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
  selector: 'app-data-list-page',  // Page suffix
  template: `
    <app-data-list
      [data]="data"
      (create)="handleCreate()"
      (select)="handleSelect($event)"
    />
  `
})
export class DataListPageComponent {
  private readonly service = inject(DataService);
  data: Data[] = [];
  
  ngOnInit(): void {
    this.service.getData().subscribe(data => {
      this.data = data;
    });
  }
  
  handleCreate(): void {
    this.router.navigate(['/data/create']);
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
  selector: 'app-data-list',
  template: `
    @for (item of data; track item.id) {
      <app-data-card 
        [data]="item"
        (click)="select.emit(item)"
      />
    }
  `
})
export class DataListComponent {
  @Input() data: Data[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() select = new EventEmitter<Data>();
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
  data1: this.service1.getData(),
  data2: this.service2.getData(),
  data3: this.service3.getData()
}).subscribe(({ data1, data2, data3 }) => {...});

// 請求依賴
this.service1.getData(id).pipe(
  switchMap(result => this.service2.getDetails(result.id))
).subscribe(details => {...});

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
export const canEditData: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const permission = inject(PermissionService);
  
  return auth.isAuthenticated().pipe(
    switchMap(isAuth => {
      if (!isAuth) return of(false);
      return permission.checkPermission(route.params.id);
    }),
    map(hasPermission => hasPermission === 'edit' || hasPermission === 'admin')
  );
};

// 路由中使用
{
  path: 'edit',
  canActivate: [canEditData],  // 組合後的守衛
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
export class DataService {
  private readonly http = inject(_HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  
  getData(): Observable<Data[]> {
    return this.http.get('/api/data').pipe(
      catchError(error => {
        this.errorHandler.handleError(error, '載入數據失敗');
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
export class DataFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  
  // 類型化表單
  dataForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    isActive: [true],
    email: ['', [Validators.email]]
  });
  
  ngOnInit(): void {
    // 如果是編輯模式，載入現有數據
    if (this.dataId) {
      this.service.getData(this.dataId).subscribe(data => {
        this.dataForm.patchValue(data);
      });
    }
  }
  
  submit(): void {
    if (this.dataForm.valid) {
      const formValue = this.dataForm.value;
      this.service.save(formValue).subscribe({
        next: () => this.router.navigate(['/data']),
        error: (error) => this.handleError(error)
      });
    }
  }
}
```

**驗證錯誤顯示**：
```html
<nz-form-item>
  <nz-form-label nzRequired>名稱</nz-form-label>
  <nz-form-control [nzErrorTip]="nameErrorTpl">
    <input nz-input formControlName="name" />
    <ng-template #nameErrorTpl let-control>
      @if (control.hasError('required')) {
        請輸入名稱
      } @else if (control.hasError('minlength')) {
        名稱至少2個字符
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
openEditModal(data: Data): void {
  const modalRef = this.modal.create({
    nzTitle: '編輯數據',
    nzContent: DataFormComponent,
    nzComponentParams: {
      data,  // 傳入數據
      mode: 'edit'
    },
    nzWidth: 600
  });
  
  // 監聽 Modal 關閉後的回調
  modalRef.afterClose.subscribe(result => {
    if (result) {
      this.loadData();  // 重新載入列表
    }
  });
}

// Child Component (Modal)
@Component({...})
export class DataFormComponent {
  @Input() data?: Data;
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

## 🔧 技術實踐模式

### 1. Service Pattern
**描述**: 服務層模式
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(CacheService);
  
  getUsers(): Observable<User[]> {
    const cacheKey = 'users';
    return this.cache.get(cacheKey, () => 
      this.http.get<User[]>('/api/users')
    );
  }
  
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>('/api/users', user).pipe(
      tap(newUser => {
        // Update cache
        this.cache.clear('users');
      })
    );
  }
}
```

### 2. Guard Pattern
**描述**: 路由守衛模式
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

export const roleGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const requiredRole = route.data?.['role'];
  
  if (aclService.can(requiredRole)) {
    return true;
  }
  
  return false;
};
```

### 3. Interceptor Pattern
**描述**: HTTP 攔截器模式
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = inject(AuthService);
    const token = authService.getToken();
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
```

### 4. Resolver Pattern
**描述**: 路由解析器模式
```typescript
@Injectable()
export class UserResolver implements Resolve<User> {
  private userService = inject(UserService);
  
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId!);
  }
}
```

### 5. Directive Pattern
**描述**: 自定義指令模式
```typescript
@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  @Input() appPermission!: string;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private aclService: ACLService
  ) {}
  
  ngOnInit() {
    if (this.aclService.can(this.appPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

### 6. Pipe Pattern
**描述**: 自定義管道模式
```typescript
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string, format: string = 'short'): string {
    if (!value) return '';
    
    const date = new Date(value);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
```

### 7. Factory Pattern
**描述**: 工廠模式
```typescript
@Injectable()
export class ComponentFactory {
  createComponent(type: string): Component {
    switch (type) {
      case 'user':
        return new UserComponent();
      case 'admin':
        return new AdminComponent();
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }
}
```

### 8. Observer Pattern
**描述**: 觀察者模式
```typescript
@Injectable()
export class EventBus {
  private events$ = new Subject<Event>();
  
  emit(event: Event) {
    this.events$.next(event);
  }
  
  on<T extends Event>(eventType: string): Observable<T> {
    return this.events$.pipe(
      filter(event => event.type === eventType),
      map(event => event as T)
    );
  }
}
```

### 9. Strategy Pattern
**描述**: 策略模式
```typescript
interface ExportStrategy {
  export(data: any[]): void;
}

@Injectable()
export class CSVExportStrategy implements ExportStrategy {
  export(data: any[]): void {
    // CSV export logic
  }
}

@Injectable()
export class ExcelExportStrategy implements ExportStrategy {
  export(data: any[]): void {
    // Excel export logic
  }
}

@Injectable()
export class ExportService {
  export(data: any[], strategy: ExportStrategy): void {
    strategy.export(data);
  }
}
```

### 10. Singleton Pattern
**描述**: 單例模式
```typescript
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static instance: ConfigService;
  private config: any = {};
  
  constructor() {
    if (ConfigService.instance) {
      return ConfigService.instance;
    }
    ConfigService.instance = this;
  }
  
  getConfig(key: string): any {
    return this.config[key];
  }
  
  setConfig(key: string, value: any): void {
    this.config[key] = value;
  }
}
```

## 🚀 性能優化模式

### 1. OnPush Strategy
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class OptimizedComponent {
  private cdr = inject(ChangeDetectorRef);
  
  updateData() {
    // Update data
    this.cdr.markForCheck();
  }
}
```

### 2. TrackBy Function
```typescript
@Component({
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.name }}
    </div>
  `
})
export class ListComponent {
  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
```

### 3. Virtual Scrolling
```typescript
@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class VirtualScrollComponent {
  items = Array.from({length: 10000}, (_, i) => ({id: i, name: `Item ${i}`}));
}
```

## 🧪 測試模式

### 1. Component Testing
```typescript
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [NoopAnimationsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display user data', () => {
    component.user = { id: 1, name: 'John Doe' };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('John Doe');
  });
});
```

### 2. Service Testing
```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should get users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

## 📝 代碼審查模式

### 1. 組件審查清單
- [ ] 是否使用 OnPush 變更檢測策略
- [ ] 是否正確處理訂閱和取消訂閱
- [ ] 是否使用 trackBy 函數
- [ ] 是否遵循單一職責原則
- [ ] 是否使用 TypeScript 嚴格模式

### 2. 服務審查清單
- [ ] 是否使用 inject() 函數
- [ ] 是否正確處理錯誤
- [ ] 是否使用適當的 RxJS 操作符
- [ ] 是否實現適當的緩存策略
- [ ] 是否遵循 RESTful API 設計

### 3. 模板審查清單
- [ ] 是否使用原生控制流 (@if, @for, @switch)
- [ ] 是否避免複雜的表達式
- [ ] 是否使用適當的管道
- [ ] 是否遵循無障礙設計原則
- [ ] 是否使用語義化 HTML
