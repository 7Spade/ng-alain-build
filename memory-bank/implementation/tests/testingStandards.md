# Testing Standards

## Testing Philosophy

### Test Pyramid
- **Unit Tests**: 70% - Fast, isolated component and service tests
- **Integration Tests**: 20% - Component interaction and service integration
- **E2E Tests**: 10% - Full application workflow tests

### Testing Principles
- **Fast**: Tests should run quickly
- **Independent**: Tests should not depend on each other
- **Repeatable**: Tests should produce consistent results
- **Self-Validating**: Tests should have clear pass/fail criteria
- **Timely**: Tests should be written close to implementation

## Unit Testing Standards

### Test Structure (AAA Pattern)
```typescript
describe('FeatureService', () => {
  let service: FeatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureService]
    });
    service = TestBed.inject(FeatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getData', () => {
    it('should return data when API call is successful', () => {
      // Arrange
      const mockData = { id: 1, name: 'Test' };
      const expectedUrl = '/api/data';

      // Act
      service.getData().subscribe(data => {
        // Assert
        expect(data).toEqual(mockData);
      });

      // Assert
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });
});
```

### Component Testing Standards
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockService: jasmine.SpyObj<FeatureService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FeatureService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [FeatureComponent],
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
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.data-item')).toBeTruthy();
  });
});
```

## ng-alain Testing Standards

### ST (Simple Table) Testing
```typescript
describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [STModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should display table with data', () => {
    // Arrange
    component.data = [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ];

    // Act
    fixture.detectChanges();

    // Assert
    const table = fixture.nativeElement.querySelector('st');
    expect(table).toBeTruthy();
    
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
  });

  it('should handle row selection', () => {
    // Arrange
    component.data = [{ id: 1, name: 'Test User' }];
    spyOn(component, 'onRowSelect');

    // Act
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();

    // Assert
    expect(component.onRowSelect).toHaveBeenCalled();
  });
});
```

### ACL Testing
```typescript
describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;
  let aclService: ACLService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedComponent],
      imports: [ACLModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    aclService = TestBed.inject(ACLService);
  });

  it('should show content when user has permission', () => {
    // Arrange
    aclService.setRole(['admin']);
    component.permission = 'admin';

    // Act
    fixture.detectChanges();

    // Assert
    const content = fixture.nativeElement.querySelector('.protected-content');
    expect(content).toBeTruthy();
  });

  it('should hide content when user lacks permission', () => {
    // Arrange
    aclService.setRole(['user']);
    component.permission = 'admin';

    // Act
    fixture.detectChanges();

    // Assert
    const content = fixture.nativeElement.querySelector('.protected-content');
    expect(content).toBeFalsy();
  });
});
```

## E2E Testing Standards

### Protractor Configuration
```typescript
// e2e/protractor.conf.js
exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['src/**/*.e2e-spec.ts'],
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
```

### E2E Test Structure
```typescript
describe('Application E2E', () => {
  beforeEach(() => {
    browser.get('/');
  });

  describe('Navigation', () => {
    it('should navigate to dashboard', () => {
      // Arrange
      const dashboardLink = element(by.css('[data-testid="dashboard-link"]'));

      // Act
      dashboardLink.click();

      // Assert
      expect(browser.getCurrentUrl()).toContain('/dashboard');
    });
  });

  describe('User Authentication', () => {
    it('should login successfully', () => {
      // Arrange
      const usernameInput = element(by.css('[data-testid="username-input"]'));
      const passwordInput = element(by.css('[data-testid="password-input"]'));
      const loginButton = element(by.css('[data-testid="login-button"]'));

      // Act
      usernameInput.sendKeys('testuser');
      passwordInput.sendKeys('testpassword');
      loginButton.click();

      // Assert
      const welcomeMessage = element(by.css('[data-testid="welcome-message"]'));
      expect(welcomeMessage.isDisplayed()).toBeTruthy();
    });
  });
});
```

## Mock Data Standards

### Service Mocking
```typescript
// Mock service implementation
export class MockFeatureService {
  private mockData = [
    { id: 1, name: 'Test Item 1' },
    { id: 2, name: 'Test Item 2' }
  ];

  getData(): Observable<any[]> {
    return of(this.mockData);
  }

  createItem(item: any): Observable<any> {
    const newItem = { ...item, id: Date.now() };
    this.mockData.push(newItem);
    return of(newItem);
  }
}

// Test configuration
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [FeatureComponent],
    providers: [
      { provide: FeatureService, useClass: MockFeatureService }
    ]
  }).compileComponents();
});
```

### @delon/mock Integration
```typescript
// mock/_api.ts
export const API = {
  'GET /api/users': { users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]},
  'POST /api/users': (req: any) => ({
    id: Date.now(),
    ...req.body
  })
};
```

## Test Coverage Standards

### Coverage Requirements
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

### Coverage Configuration
```json
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

## Development Principles Integration

### Test Coverage Requirements
- **Services**: 80% coverage
- **Components**: 60% coverage
- **Guards**: 100% coverage (critical security logic)

### Unit Test Template
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

### Component Test Template
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockService: jasmine.SpyObj<FeatureService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FeatureService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [FeatureComponent],
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
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.data-item')).toBeTruthy();
  });
});
```

### Guard Test Template
```typescript
describe('PermissionGuard', () => {
  let guard: CanActivateFn;
  let mockService: jasmine.SpyObj<PermissionService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNotification: jasmine.SpyObj<NzNotificationService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('PermissionService', ['checkPermission']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const notificationSpy = jasmine.createSpyObj('NzNotificationService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PermissionService, useValue: serviceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NzNotificationService, useValue: notificationSpy }
      ]
    });

    mockService = TestBed.inject(PermissionService) as jasmine.SpyObj<PermissionService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockNotification = TestBed.inject(NzNotificationService) as jasmine.SpyObj<NzNotificationService>;
    
    guard = permissionGuard;
  });

  it('should allow access when user has permission', () => {
    // Arrange
    const route = { paramMap: { get: () => '123' } } as any;
    mockService.checkPermission.and.returnValue(of(true));

    // Act
    const result = guard(route, {} as any);

    // Assert
    result.subscribe(hasAccess => {
      expect(hasAccess).toBe(true);
      expect(mockService.checkPermission).toHaveBeenCalledWith('123');
    });
  });

  it('should deny access when user lacks permission', () => {
    // Arrange
    const route = { paramMap: { get: () => '123' } } as any;
    mockService.checkPermission.and.returnValue(of(false));

    // Act
    const result = guard(route, {} as any);

    // Assert
    result.subscribe(hasAccess => {
      expect(hasAccess).toBe(false);
      expect(mockNotification.error).toHaveBeenCalledWith('權限不足', '無法訪問');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/fallback']);
    });
  });
});
```

### E2E Test Template
```typescript
describe('Application E2E', () => {
  beforeEach(() => {
    browser.get('/');
  });

  describe('Navigation', () => {
    it('should navigate to dashboard', () => {
      // Arrange
      const dashboardLink = element(by.css('[data-testid="dashboard-link"]'));

      // Act
      dashboardLink.click();

      // Assert
      expect(browser.getCurrentUrl()).toContain('/dashboard');
    });
  });

  describe('User Authentication', () => {
    it('should login successfully', () => {
      // Arrange
      const usernameInput = element(by.css('[data-testid="username-input"]'));
      const passwordInput = element(by.css('[data-testid="password-input"]'));
      const loginButton = element(by.css('[data-testid="login-button"]'));

      // Act
      usernameInput.sendKeys('testuser');
      passwordInput.sendKeys('testpassword');
      loginButton.click();

      // Assert
      const welcomeMessage = element(by.css('[data-testid="welcome-message"]'));
      expect(welcomeMessage.isDisplayed()).toBeTruthy();
    });
  });
});
```

### Mock Data Test Template
```typescript
// Mock service implementation
export class MockFeatureService {
  private mockData = [
    { id: 1, name: 'Test Item 1' },
    { id: 2, name: 'Test Item 2' }
  ];

  getData(): Observable<any[]> {
    return of(this.mockData);
  }

  createItem(item: any): Observable<any> {
    const newItem = { ...item, id: Date.now() };
    this.mockData.push(newItem);
    return of(newItem);
  }
}

// Test configuration
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [FeatureComponent],
    providers: [
      { provide: FeatureService, useClass: MockFeatureService }
    ]
  }).compileComponents();
});
```

### Performance Test Template
```typescript
describe('Performance Tests', () => {
  it('should render large dataset efficiently', () => {
    // Arrange
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    // Act
    const startTime = performance.now();
    component.data = largeDataset;
    fixture.detectChanges();
    const endTime = performance.now();

    // Assert
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });
});
```

### Test Data Attributes
```html
<!-- Use data-testid for E2E tests -->
<button data-testid="create-button">{{ 'common.create' | i18n }}</button>
<input data-testid="search-input" [(ngModel)]="searchTerm">
<div data-testid="results-list">
  @for (item of items; track item.id) {
    <div data-testid="result-item">{{ item.name }}</div>
  }
</div>
```

### Test Environment Setup
```typescript
// test-setup.ts
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

### Testing Checklist
- **Unit Tests**: Services 80%, Components 60%, Guards 100%
- **Test Structure**: Arrange, Act, Assert pattern
- **Mocking**: Proper service and dependency mocking
- **Coverage**: Maintain >80% code coverage
- **Descriptive Names**: Clear test descriptions
- **Isolation**: Test components in isolation
- **E2E Tests**: Full application workflow tests
- **Performance Tests**: Large dataset handling
- **Mock Data**: Complete CRUD operations
- **Test Data Attributes**: Use data-testid for E2E tests

## Performance Testing

### Component Performance
```typescript
describe('Performance Tests', () => {
  it('should render large dataset efficiently', () => {
    // Arrange
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    // Act
    const startTime = performance.now();
    component.data = largeDataset;
    fixture.detectChanges();
    const endTime = performance.now();

    // Assert
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });
});
```

## Test Maintenance

### Test Organization
- **Feature-based**: Group tests by feature
- **Descriptive Names**: Use clear test descriptions
- **Setup/Teardown**: Proper test isolation
- **Mock Management**: Consistent mocking strategies

### Regular Maintenance
- **Monthly**: Review and update test coverage
- **Release**: Run full test suite
- **Feature**: Add tests for new features
- **Bug Fix**: Add regression tests

## ng-alain Testing Standards

### Test Coverage Requirements
- **Services**: 80% coverage
- **Components**: 60% coverage
- **Guards**: 100% coverage (critical security logic)

### Testing Strategy from VAN Analysis
- **Unit Tests**: 70% - Fast, isolated component and service tests
- **Integration Tests**: 20% - Component interaction and service integration
- **E2E Tests**: 10% - Full application workflow tests

### Performance Testing Standards
```typescript
describe('Performance Tests', () => {
  it('should render large dataset efficiently', () => {
    // Arrange
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    // Act
    const startTime = performance.now();
    component.data = largeDataset;
    fixture.detectChanges();
    const endTime = performance.now();

    // Assert
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });
});
```

### Mock Data Testing Standards
```typescript
// Complete CRUD operations testing
describe('CRUD Operations', () => {
  it('should create entity successfully', () => {
    const newEntity = { name: 'Test Entity' };
    
    service.createEntity(newEntity).subscribe(result => {
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Entity');
    });
    
    const req = httpMock.expectOne('/api/entities');
    expect(req.request.method).toBe('POST');
    req.flush({ id: '123', ...newEntity });
  });
  
  it('should handle pagination correctly', () => {
    const params = { page: 1, pageSize: 10 };
    
    service.getEntities(params).subscribe(result => {
      expect(result.data.length).toBeLessThanOrEqual(10);
      expect(result.total).toBeGreaterThan(0);
    });
    
    const req = httpMock.expectOne('/api/entities?page=1&pageSize=10');
    req.flush({ data: mockData, total: 100 });
  });
});
```

### Unit Test Template
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

### Component Test Template
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockService: jasmine.SpyObj<FeatureService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FeatureService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [FeatureComponent],
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
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.data-item')).toBeTruthy();
  });
});
```

### Guard Test Template
```typescript
describe('PermissionGuard', () => {
  let guard: CanActivateFn;
  let mockService: jasmine.SpyObj<PermissionService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNotification: jasmine.SpyObj<NzNotificationService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('PermissionService', ['checkPermission']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const notificationSpy = jasmine.createSpyObj('NzNotificationService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PermissionService, useValue: serviceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NzNotificationService, useValue: notificationSpy }
      ]
    });

    mockService = TestBed.inject(PermissionService) as jasmine.SpyObj<PermissionService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockNotification = TestBed.inject(NzNotificationService) as jasmine.SpyObj<NzNotificationService>;
    
    guard = permissionGuard;
  });

  it('should allow access when user has permission', () => {
    // Arrange
    const route = { paramMap: { get: () => '123' } } as any;
    mockService.checkPermission.and.returnValue(of(true));

    // Act
    const result = guard(route, {} as any);

    // Assert
    result.subscribe(hasAccess => {
      expect(hasAccess).toBe(true);
      expect(mockService.checkPermission).toHaveBeenCalledWith('123');
    });
  });

  it('should deny access when user lacks permission', () => {
    // Arrange
    const route = { paramMap: { get: () => '123' } } as any;
    mockService.checkPermission.and.returnValue(of(false));

    // Act
    const result = guard(route, {} as any);

    // Assert
    result.subscribe(hasAccess => {
      expect(hasAccess).toBe(false);
      expect(mockNotification.error).toHaveBeenCalledWith('權限不足', '無法訪問');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/fallback']);
    });
  });
});
```

### E2E Test Template
```typescript
describe('Application E2E', () => {
  beforeEach(() => {
    browser.get('/');
  });

  describe('Navigation', () => {
    it('should navigate to dashboard', () => {
      // Arrange
      const dashboardLink = element(by.css('[data-testid="dashboard-link"]'));

      // Act
      dashboardLink.click();

      // Assert
      expect(browser.getCurrentUrl()).toContain('/dashboard');
    });
  });

  describe('User Authentication', () => {
    it('should login successfully', () => {
      // Arrange
      const usernameInput = element(by.css('[data-testid="username-input"]'));
      const passwordInput = element(by.css('[data-testid="password-input"]'));
      const loginButton = element(by.css('[data-testid="login-button"]'));

      // Act
      usernameInput.sendKeys('testuser');
      passwordInput.sendKeys('testpassword');
      loginButton.click();

      // Assert
      const welcomeMessage = element(by.css('[data-testid="welcome-message"]'));
      expect(welcomeMessage.isDisplayed()).toBeTruthy();
    });
  });
});
```

### Mock Data Test Template
```typescript
// Mock service implementation
export class MockFeatureService {
  private mockData = [
    { id: 1, name: 'Test Item 1' },
    { id: 2, name: 'Test Item 2' }
  ];

  getData(): Observable<any[]> {
    return of(this.mockData);
  }

  createItem(item: any): Observable<any> {
    const newItem = { ...item, id: Date.now() };
    this.mockData.push(newItem);
    return of(newItem);
  }
}

// Test configuration
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [FeatureComponent],
    providers: [
      { provide: FeatureService, useClass: MockFeatureService }
    ]
  }).compileComponents();
});
```

### Performance Test Template
```typescript
describe('Performance Tests', () => {
  it('should render large dataset efficiently', () => {
    // Arrange
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    // Act
    const startTime = performance.now();
    component.data = largeDataset;
    fixture.detectChanges();
    const endTime = performance.now();

    // Assert
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });
});
```

### Test Data Attributes
```html
<!-- Use data-testid for E2E tests -->
<button data-testid="create-button">{{ 'common.create' | i18n }}</button>
<input data-testid="search-input" [(ngModel)]="searchTerm">
<div data-testid="results-list">
  @for (item of items; track item.id) {
    <div data-testid="result-item">{{ item.name }}</div>
  }
</div>
```

### Test Environment Setup
```typescript
// test-setup.ts
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

### Coverage Configuration
```json
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