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
    }
  });
};
```

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
