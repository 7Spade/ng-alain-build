# Testing Standards

## Test Coverage Requirements
| 類型 | 覆蓋率 | 說明 |
|------|--------|------|
| Services | 80% | 業務邏輯測試 |
| Components | 60% | UI 組件測試 |
| Guards | 100% | 安全邏輯測試 |

## Testing Strategy
- **Unit Tests**: 70% - 快速、隔離的組件和服務測試
- **Integration Tests**: 20% - 組件交互和服務整合
- **E2E Tests**: 10% - 完整應用工作流程測試

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

  it('should return data when API call is successful', () => {
    // Arrange
    const mockData = { id: 1, name: 'Test' };
    
    // Act
    service.getData().subscribe(data => {
      // Assert
      expect(data).toEqual(mockData);
    });
    
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

### Component Testing
```typescript
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

  it('should display data when loaded', () => {
    component.data = [{ id: 1, name: 'Test' }];
    fixture.detectChanges();
    
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
      imports: [DataTableComponent, STModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should display table with data', () => {
    component.data = [{ id: 1, name: 'Test User' }];
    fixture.detectChanges();
    
    const table = fixture.nativeElement.querySelector('st');
    expect(table).toBeTruthy();
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
      imports: [ProtectedComponent, ACLModule.forRoot()]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    aclService = TestBed.inject(ACLService);
  });

  it('should show content when user has permission', () => {
    aclService.setRole(['admin']);
    component.permission = 'admin';
    fixture.detectChanges();
    
    const content = fixture.nativeElement.querySelector('.protected-content');
    expect(content).toBeTruthy();
  });
});
```

## E2E Testing Standards

### Protractor Configuration
```typescript
// e2e/protractor.conf.js
exports.config = {
  framework: 'jasmine',
  capabilities: { browserName: 'chrome' },
  specs: ['src/**/*.e2e-spec.ts']
};
```

### E2E Test Structure
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

## Mock Data Standards

### Service Mocking
```typescript
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
```

### @delon/mock Integration
```typescript
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

## Performance Testing

### Component Performance
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

    expect(endTime - startTime).toBeLessThan(100);
  });
});
```

## Test Data Attributes
```html
<button data-testid="create-button">{{ 'common.create' | i18n }}</button>
<input data-testid="search-input" [(ngModel)]="searchTerm">
<div data-testid="results-list">
  @for (item of items; track item.id) {
    <div data-testid="result-item">{{ item.name }}</div>
  }
</div>
```

## Coverage Configuration
```json
{
  "coverageReporter": {
    "dir": "coverage/",
    "reporters": [
      { "type": "html" },
      { "type": "text-summary" },
      { "type": "lcov" }
    ]
  },
  "thresholds": {
    "global": {
      "statements": 80,
      "branches": 75,
      "functions": 80,
      "lines": 80
    }
  }
}
```

## Test Maintenance
- **Monthly**: 審查和更新測試覆蓋率
- **Release**: 運行完整測試套件
- **Feature**: 為新功能添加測試
- **Bug Fix**: 添加回歸測試