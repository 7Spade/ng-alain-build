# Technical Patterns

## Design Patterns

### 1. Repository Pattern（倉儲模式）
**應用場景**: Service 層數據訪問

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/data';
  
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

**優勢**: 業務邏輯與數據訪問分離，易於測試和切換數據源

### 2. Observer Pattern（觀察者模式）
**應用場景**: RxJS Observable 數據流

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  public data$ = this.dataSubject.asObservable();
  
  updateData(newData: Data[]): void {
    this.dataSubject.next([...newData]);
  }
  
  getData(): Observable<Data[]> {
    return this.data$;
  }
}
```

**優勢**: 響應式數據流，自動更新訂閱者

### 3. Strategy Pattern（策略模式）
**應用場景**: 不同驗證策略

```typescript
interface ValidationStrategy {
  validate(value: any): boolean;
}

class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

class PhoneValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /^\+?[\d\s-()]+$/.test(value);
  }
}

@Injectable({ providedIn: 'root' })
export class ValidationService {
  private strategies = new Map<string, ValidationStrategy>();
  
  constructor() {
    this.strategies.set('email', new EmailValidationStrategy());
    this.strategies.set('phone', new PhoneValidationStrategy());
  }
  
  validate(type: string, value: any): boolean {
    const strategy = this.strategies.get(type);
    return strategy ? strategy.validate(value) : false;
  }
}
```

## Angular Patterns

### 1. Smart & Dumb Components
**Smart Component**: 處理業務邏輯和狀態
**Dumb Component**: 純展示組件

```typescript
// Smart Component
@Component({
  selector: 'app-user-list',
  template: `
    <app-user-card 
      *ngFor="let user of users; trackBy: trackByUserId"
      [user]="user"
      (edit)="onEditUser($event)"
      (delete)="onDeleteUser($event)">
    </app-user-card>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}

// Dumb Component
@Component({
  selector: 'app-user-card',
  template: `
    <nz-card>
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button nz-button (click)="edit.emit(user)">編輯</button>
      <button nz-button nzDanger (click)="delete.emit(user)">刪除</button>
    </nz-card>
  `
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
}
```

### 2. Async Pipe Pattern
**使用 async pipe 處理 Observable**

```typescript
@Component({
  template: `
    <div *ngIf="users$ | async as users">
      <div *ngFor="let user of users; trackBy: trackByUserId">
        {{ user.name }}
      </div>
    </div>
  `
})
export class UserListComponent {
  users$ = this.userService.getUsers();
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

### 3. RxJS Operators Pattern
**使用 RxJS 操作符處理數據流**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(_HttpClient);
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      map(response => response.data),
      catchError(error => {
        console.error('獲取用戶失敗:', error);
        return of([]);
      }),
      shareReplay(1)
    );
  }
  
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/search?q=${query}`).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(response => of(response.data))
    );
  }
}
```

## ng-alain Patterns

### 1. ST (Simple Table) Pattern
**數據表格模式**

```typescript
@Component({
  template: `
    <st [data]="users" [columns]="columns" [req]="req" [res]="res">
      <ng-template #actions let-record>
        <button nz-button (click)="edit(record)">編輯</button>
        <button nz-button nzDanger (click)="delete(record)">刪除</button>
      </ng-template>
    </st>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  columns: STColumn[] = [
    { title: '姓名', index: 'name' },
    { title: '郵箱', index: 'email' },
    { title: '操作', type: 'template', template: 'actions' }
  ];
  
  req: STReq = {
    method: 'GET',
    url: '/api/users'
  };
  
  res: STRes = {
    process: (data: any[]) => data
  };
}
```

### 2. SE (Search Engine) Pattern
**搜索引擎模式**

```typescript
@Component({
  template: `
    <se [schema]="searchSchema" (submit)="onSearch($event)" (reset)="onReset()">
    </se>
  `
})
export class UserSearchComponent {
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        ui: { placeholder: '請輸入姓名' }
      },
      email: {
        type: 'string',
        title: '郵箱',
        ui: { placeholder: '請輸入郵箱' }
      },
      status: {
        type: 'string',
        title: '狀態',
        enum: [
          { label: '啟用', value: 'active' },
          { label: '禁用', value: 'inactive' }
        ]
      }
    }
  };
  
  onSearch(searchParams: any): void {
    // 處理搜索邏輯
  }
  
  onReset(): void {
    // 重置搜索
  }
}
```

### 3. ACL Pattern
**權限控制模式**

```typescript
@Component({
  template: `
    <div *acl="'user.create'">
      <button nz-button (click)="createUser()">創建用戶</button>
    </div>
    
    <div *acl="'user.edit'">
      <button nz-button (click)="editUser()">編輯用戶</button>
    </div>
  `
})
export class UserComponent {
  constructor(private acl: ACLService) {}
  
  ngOnInit(): void {
    // 設置用戶權限
    this.acl.setRole(['admin', 'user']);
  }
}
```

## Performance Patterns

### 1. Lazy Loading Pattern
**懶加載模式**

```typescript
const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
  },
  {
    path: 'organizations',
    loadChildren: () => import('./organization/organization.routes').then(m => m.organizationRoutes)
  }
];
```

### 2. OnPush Pattern
**OnPush 變更檢測模式**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  
  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
```

### 3. TrackBy Pattern
**TrackBy 優化模式**

```typescript
@Component({
  template: `
    <div *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent {
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

## State Management Patterns

### 1. Service-based State
**服務狀態管理**

```typescript
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  getUsers(): Observable<User[]> {
    this.loadingSubject.next(true);
    
    return this.userService.getUsers().pipe(
      tap(users => {
        this.usersSubject.next(users);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }
  
  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
  
  updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const index = currentUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      currentUsers[index] = updatedUser;
      this.usersSubject.next([...currentUsers]);
    }
  }
  
  deleteUser(userId: string): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next(currentUsers.filter(u => u.id !== userId));
  }
}
```

### 2. URL as State
**URL 作為狀態**

```typescript
@Component({
  template: `
    <div>
      <button (click)="goToUser(1)">用戶 1</button>
      <button (click)="goToUser(2)">用戶 2</button>
    </div>
  `
})
export class UserNavigationComponent {
  constructor(private router: Router) {}
  
  goToUser(userId: number): void {
    this.router.navigate(['/users', userId]);
  }
}

@Component({
  template: `
    <div *ngIf="user$ | async as user">
      <h1>{{ user.name }}</h1>
    </div>
  `
})
export class UserDetailComponent {
  user$ = this.route.params.pipe(
    switchMap(params => this.userService.getUser(params['id']))
  );
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
}
```

## Testing Patterns

### 1. AAA Pattern
**Arrange, Act, Assert 測試模式**

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
    // Arrange
    const mockUsers = [{ id: '1', name: 'John' }];
    
    // Act
    service.getUsers().subscribe(users => {
      // Assert
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

### 2. Mock Pattern
**Mock 測試模式**

```typescript
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser']);
    
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  it('should load users on init', () => {
    const mockUsers = [{ id: '1', name: 'John' }];
    mockUserService.getUsers.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(mockUserService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });
});
```

## Error Handling Patterns

### 1. Centralized Error Handling
**集中錯誤處理**

```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private notification: NzNotificationService) {}
  
  handleError(error: any): void {
    console.error('Error occurred:', error);
    
    if (error.status === 404) {
      this.notification.error('錯誤', '資源未找到');
    } else if (error.status === 500) {
      this.notification.error('錯誤', '服務器內部錯誤');
    } else {
      this.notification.error('錯誤', '發生未知錯誤');
    }
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: _HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(error => {
        this.errorHandler.handleError(error);
        return of([]);
      })
    );
  }
}
```

### 2. Retry Pattern
**重試模式**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      retry(3),
      catchError(error => {
        console.error('Failed to get users after 3 retries:', error);
        return of([]);
      })
    );
  }
}
```

## Form Patterns

### 1. Reactive Forms Pattern
**響應式表單模式**

```typescript
@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label>姓名</nz-form-label>
        <nz-form-control [nzErrorTip]="nameError">
          <input nz-input formControlName="name" placeholder="請輸入姓名">
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label>郵箱</nz-form-label>
        <nz-form-control [nzErrorTip]="emailError">
          <input nz-input formControlName="email" placeholder="請輸入郵箱">
        </nz-form-control>
      </nz-form-item>
      
      <button nz-button nzType="primary" [disabled]="userForm.invalid">
        提交
      </button>
    </form>
  `
})
export class UserFormComponent {
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });
  
  get nameError(): string {
    const control = this.userForm.get('name');
    if (control?.hasError('required')) return '姓名為必填項';
    if (control?.hasError('minlength')) return '姓名至少需要2個字符';
    return '';
  }
  
  get emailError(): string {
    const control = this.userForm.get('email');
    if (control?.hasError('required')) return '郵箱為必填項';
    if (control?.hasError('email')) return '請輸入有效的郵箱地址';
    return '';
  }
  
  constructor(private fb: FormBuilder) {}
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // 處理表單提交
    }
  }
}
```

### 2. Dynamic Forms Pattern
**動態表單模式**

```typescript
@Component({
  template: `
    <sf [schema]="schema" [formData]="formData" (formSubmit)="onSubmit($event)">
    </sf>
  `
})
export class DynamicFormComponent {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        ui: { placeholder: '請輸入姓名' }
      },
      email: {
        type: 'string',
        title: '郵箱',
        ui: { placeholder: '請輸入郵箱' }
      },
      age: {
        type: 'number',
        title: '年齡',
        minimum: 0,
        maximum: 120
      }
    },
    required: ['name', 'email']
  };
  
  formData = {};
  
  onSubmit(formData: any): void {
    console.log('Form submitted:', formData);
  }
}
```