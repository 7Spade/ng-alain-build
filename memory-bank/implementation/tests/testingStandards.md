# 測試標準

## 測試哲學

### 測試金字塔
- **單元測試**: 70% - 快速、隔離的組件與服務測試
- **整合測試**: 20% - 組件互動與服務整合
- **E2E 測試**: 10% - 完整應用流程測試

### 覆蓋率要求
| 類型 | 覆蓋率 | 理由 |
|------|--------|------|
| **Services** | 80% | 業務邏輯核心 |
| **Components** | 60% | UI 邏輯測試 |
| **Guards** | 100% | 安全關鍵邏輯 |

## 單元測試標準

### AAA 模式測試
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

  afterEach(() => {
    httpMock.verify();
  });

  it('should get users', () => {
    // Arrange
    const mockUsers = [{ id: 1, name: 'Test' }];

    // Act
    service.getUsers().subscribe(result => {
      // Assert
      expect(result.data).toEqual(mockUsers);
      expect(result.total).toBe(1);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockUsers, total: 1 });
  });
});
```

### 組件測試模板
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockService: jasmine.SpyObj<FeatureService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FeatureService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [FeatureComponent],
      providers: [
        { provide: FeatureService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(FeatureService) as jasmine.SpyObj<FeatureService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data when loaded', () => {
    // Arrange
    const mockData = [{ id: 1, name: 'Test' }];
    mockService.getData.and.returnValue(of(mockData));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    const element = fixture.nativeElement.querySelector('.data-item');
    expect(element).toBeTruthy();
    expect(element.textContent).toContain('Test');
  });
});
```

### 守衛測試模板
```typescript
describe('AuthGuard', () => {
  let guard: CanActivateFn;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = authGuard;
  });

  it('should allow access when authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);
    
    const result = guard({} as any, {} as any);
    
    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access when not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);
    
    const result = guard({} as any, { url: '/dashboard' } as any);
    
    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/dashboard' }
    });
  });
});
```

## ng-alain 測試

### ST (Simple Table) 測試
```typescript
describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, STModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should display table with data', () => {
    component.data = [{ id: 1, name: 'Test User' }];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Test User');
  });
});
```

### ACL 測試
```typescript
describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;
  let aclService: ACLService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedComponent, ACLModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    aclService = TestBed.inject(ACLService);
  });

  it('should show content with permission', () => {
    aclService.setRole(['admin']);
    component.permission = 'admin';
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.protected-content');
    expect(content).toBeTruthy();
  });

  it('should hide content without permission', () => {
    aclService.setRole(['user']);
    component.permission = 'admin';
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.protected-content');
    expect(content).toBeFalsy();
  });
});
```

## E2E 測試

### E2E 測試模板
```typescript
describe('Application E2E', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should navigate to dashboard', () => {
    const dashboardLink = element(by.css('[data-testid="dashboard-link"]'));
    dashboardLink.click();
    expect(browser.getCurrentUrl()).toContain('/dashboard');
  });

  it('should login successfully', () => {
    const usernameInput = element(by.css('[data-testid="username-input"]'));
    const passwordInput = element(by.css('[data-testid="password-input"]'));
    const loginButton = element(by.css('[data-testid="login-button"]'));

    usernameInput.sendKeys('testuser');
    passwordInput.sendKeys('testpassword');
    loginButton.click();

    const welcomeMessage = element(by.css('[data-testid="welcome-message"]'));
    expect(welcomeMessage.isDisplayed()).toBeTruthy();
  });
});
```

### Test Data Attributes
```html
<button data-testid="create-button">{{ 'common.create' | i18n }}</button>
<input data-testid="search-input" [(ngModel)]="searchTerm">
<div data-testid="results-list">
  @for (item of items; track item.id) {
    <div data-testid="result-item">{{ item.name }}</div>
  }
</div>
```

## Mock Data 標準

### Service Mocking
```typescript
export class MockUserService {
  private mockData = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockData);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    const newUser = { ...user, id: Date.now() };
    this.mockData.push(newUser);
    return of(newUser);
  }
}
```

### @delon/mock 集成
```typescript
// _mock/_api.ts
export const API = {
  'GET /api/users': {
    data: [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ],
    total: 2
  },
  'POST /api/users': (req: any) => ({
    id: Date.now(),
    ...req.body
  })
};
```

## 性能測試

### 渲染性能測試
```typescript
describe('Performance Tests', () => {
  it('should render large dataset efficiently', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    const startTime = performance.now();
    component.data = largeDataset;
    fixture.detectChanges();
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });
});
```

## Coverage 配置

### Karma 配置
```javascript
// karma.conf.js
module.exports = function (config) {
  config.set({
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ]
    },
    thresholds: {
      global: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80
      }
    }
  });
};
```

## 測試檢查清單

### 必檢項目
- [ ] 遵循 AAA 模式
- [ ] 使用描述性測試名稱
- [ ] 適當模擬依賴
- [ ] 達到覆蓋率要求
- [ ] 測試邊界情況
- [ ] 測試錯誤情況
- [ ] 使用 data-testid 進行 E2E 測試
- [ ] 正確清理測試環境
