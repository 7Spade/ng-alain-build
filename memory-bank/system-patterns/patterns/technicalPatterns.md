# 技術模式指南

> 基於實際代碼分析和官方文檔查詢生成

## 🎯 設計模式應用

### 1. Smart & Dumb Components
**描述**: 分離容器組件和展示組件
```typescript
// Smart Component (Container)
@Component({
  selector: 'app-user-list',
  template: `
    <app-user-card 
      *ngFor="let user of users$ | async" 
      [user]="user"
      (edit)="onEdit($event)">
    </app-user-card>
  `
})
export class UserListComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}

// Dumb Component (Presentation)
@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="edit.emit(user)">Edit</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
}
```

### 2. Async Pipe Pattern
**描述**: 使用 Async Pipe 處理異步數據
```typescript
@Component({
  template: `
    @if (users$ | async; as users) {
      <div *ngFor="let user of users">
        {{ user.name }}
      </div>
    } @else {
      <div>Loading...</div>
    }
  `
})
export class UserComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}
```

### 3. RxJS Operators Pattern
**描述**: 使用 RxJS 操作符處理數據流
```typescript
@Component({
  template: `
    <input (input)="searchTerm$.next($event.target.value)" 
           placeholder="Search users...">
    @for (user of filteredUsers$ | async; track user.id) {
      <div>{{ user.name }}</div>
    }
  `
})
export class UserSearchComponent {
  searchTerm$ = new BehaviorSubject<string>('');
  
  filteredUsers$ = this.searchTerm$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => 
      term ? this.userService.searchUsers(term) : of([])
    )
  );
}
```

### 4. Error Handling Pattern
**描述**: 統一的錯誤處理模式
```typescript
@Injectable()
export class UserService {
  private handleError = (error: HttpErrorResponse) => {
    console.error('UserService Error:', error);
    return throwError(() => error);
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(this.handleError)
    );
  }
}
```

### 5. Form Handling Pattern
**描述**: 響應式表單處理模式
```typescript
@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <input formControlName="email" placeholder="Email">
      <button type="submit" [disabled]="userForm.invalid">
        Save
      </button>
    </form>
  `
})
export class UserFormComponent {
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      // Handle form submission
    }
  }
}
```

### 6. Pagination Pattern
**描述**: 分頁處理模式
```typescript
@Component({
  template: `
    <nz-table [nzData]="users$ | async" [nzPageSize]="pageSize">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users$ | async">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </nz-table>
    <nz-pagination 
      [nzPageIndex]="currentPage"
      [nzTotal]="totalCount"
      (nzPageIndexChange)="onPageChange($event)">
    </nz-pagination>
  `
})
export class UserListComponent {
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  
  users$ = this.currentPage$.pipe(
    switchMap(page => this.userService.getUsers(page, this.pageSize))
  );
  
  private currentPage$ = new BehaviorSubject(1);
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.currentPage$.next(page);
  }
}
```

### 7. Search & Filter Pattern
**描述**: 搜索和篩選模式
```typescript
@Component({
  template: `
    <input [(ngModel)]="searchTerm" (input)="onSearch()" 
           placeholder="Search...">
    <select [(ngModel)]="selectedCategory" (change)="onFilter()">
      <option value="">All Categories</option>
      <option *ngFor="let cat of categories" [value]="cat.id">
        {{ cat.name }}
      </option>
    </select>
  `
})
export class SearchComponent {
  searchTerm = '';
  selectedCategory = '';
  
  filteredData$ = combineLatest([
    this.searchTerm$,
    this.selectedCategory$
  ]).pipe(
    switchMap(([term, category]) => 
      this.dataService.search(term, category)
    )
  );
  
  private searchTerm$ = new BehaviorSubject('');
  private selectedCategory$ = new BehaviorSubject('');
  
  onSearch() {
    this.searchTerm$.next(this.searchTerm);
  }
  
  onFilter() {
    this.selectedCategory$.next(this.selectedCategory);
  }
}
```

### 8. Loading State Pattern
**描述**: 載入狀態處理模式
```typescript
@Component({
  template: `
    @if (loading$ | async) {
      <nz-spin [nzSpinning]="true">
        <div>Loading...</div>
      </nz-spin>
    } @else if (error$ | async; as error) {
      <nz-alert [nzType]="'error'" [nzMessage]="error.message">
      </nz-alert>
    } @else {
      <div *ngFor="let item of data$ | async">
        {{ item.name }}
      </div>
    }
  `
})
export class DataComponent {
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<Error | null>(null);
  data$ = new BehaviorSubject<any[]>([]);
  
  loadData() {
    this.loading$.next(true);
    this.error$.next(null);
    
    this.dataService.getData().pipe(
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: data => this.data$.next(data),
      error: error => this.error$.next(error)
    });
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
