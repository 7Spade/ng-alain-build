# Code Standards

## Core Standards

### TypeScript Standards
| 項目 | 標準 | 說明 |
|------|------|------|
| Strict Mode | 啟用 | 最大類型安全 |
| Naming | PascalCase (類), camelCase (變數), kebab-case (檔案) | 一致性命名 |
| Organization | 單一職責, 明確導入, Barrel exports | 清晰結構 |
| Type Safety | 介面定義, 類型守衛, 泛型 | 完整類型定義 |

## Angular Standards

### Component Template
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  template: `
    <div class="feature-container">
      @if (loading) {
        <nz-spin nzSize="large" />
      } @else {
        @for (item of items; track item.id) {
          <div>{{ item.name }}</div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  
  items: Item[] = [];
  loading = false;
}
```

### Service Template
```typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/feature';
  
  getAll(): Observable<Item[]> {
    return this.http.get(this.API_BASE);
  }
  
  create(item: Partial<Item>): Observable<Item> {
    return this.http.post(this.API_BASE, item);
  }
}
```

## ng-alain Standards

### Component Usage
| 組件 | 用途 | 關鍵配置 |
|------|------|----------|
| ST (Simple Table) | 數據表格 | 列定義, 操作按鈕, 分頁 |
| SE (Search Engine) | 搜索功能 | Schema 定義, 驗證, 重置 |
| ACL | 權限控制 | 角色定義, 守衛, 指令 |
| Theme | 主題系統 | 動態主題, 顏色變數 |

## Styling Standards

### Less 標準
```less
// 變數定義
@primary-color: #1890ff;
@border-radius: 4px;

// BEM 命名
.feature-component {
  padding: 16px;
  border-radius: @border-radius;
  
  &__header {
    font-size: 18px;
    font-weight: bold;
  }
  
  &--large {
    padding: 24px;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .feature-component {
    padding: 12px;
  }
}
```

## Testing Standards

### 測試覆蓋率
| 類型 | 覆蓋率 | 說明 |
|------|--------|------|
| Services | 80% | 業務邏輯測試 |
| Components | 60% | UI 組件測試 |
| Guards | 100% | 安全邏輯測試 |

### 測試模板
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
});
```

## Documentation Standards

### JSDoc 標準
```typescript
/**
 * 獲取用戶列表
 * @param params 查詢參數
 * @returns Observable<用戶列表>
 * @example
 * ```typescript
 * this.userService.getUsers({ page: 1 }).subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
getUsers(params?: QueryParams): Observable<User[]> {
  return this.http.get('/api/users', params);
}
```

### README 結構
- **專案概述**: 簡潔描述
- **安裝指南**: 步驟說明
- **使用範例**: 代碼示例
- **API 文檔**: 公開 API

## Performance Standards

### 性能基準
| 指標 | 目標值 | 說明 |
|------|--------|------|
| Initial Bundle | 1.8 MB | 懶加載後 |
| Time to Interactive | 1.2s | 首次互動時間 |
| Change Detection | OnPush | 40-60% 性能提升 |
| Bundle Reduction | 57% | 懶加載 vs 急加載 |

### 優化策略
```typescript
// 懶加載配置
const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature.component').then(m => m.FeatureComponent)
  }
];

// 記憶體管理
ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}

// TrackBy 優化
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

## Security Standards

### 安全原則
| 項目 | 標準 | 實現 |
|------|------|------|
| 輸入驗證 | 表單驗證 | Validators.required |
| 權限控制 | ACL 系統 | @delon/acl |
| 路由守衛 | Functional Guards | CanActivateFn |
| 錯誤處理 | 統一處理 | catchError |

### 守衛模板
```typescript
export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

## Modern Angular Standards

### 現代 Angular 模式
| 特性 | 標準 | 範例 |
|------|------|------|
| Standalone | 100% 採用 | standalone: true |
| inject() | 優先使用 | inject(Service) |
| Control Flow | 原生語法 | @if, @for, @switch |
| OnPush | 所有組件 | ChangeDetectionStrategy.OnPush |
| Path Alias | TypeScript 映射 | @shared, @core |

### 模板標準
```html
<!-- 原生控制流 -->
@if (loading) {
  <nz-spin nzSize="large" />
} @else if (items.length === 0) {
  <nz-empty />
} @else {
  @for (item of items; track item.id) {
    <nz-card>{{ item.name }}</nz-card>
  }
}
```

### 狀態管理
```typescript
// URL 作為狀態
loadFromUrl(): void {
  const id = this.route.snapshot.params['id'];
  if (id) this.loadEntity(id);
}

// 服務狀態管理
@Injectable({ providedIn: 'root' })
export class DataService {
  private data$ = new BehaviorSubject<Data[]>([]);
  
  getData(): Observable<Data[]> {
    return this.data$.asObservable();
  }
  
  updateData(data: Data[]): void {
    this.data$.next([...data]);
  }
}
```

## 錯誤處理標準

### Observable 錯誤處理
```typescript
// 組件錯誤處理
this.service.getData().subscribe({
  next: (data) => this.handleData(data),
  error: (error) => {
    console.error('載入失敗:', error);
    this.notification.error('錯誤', '載入數據失敗');
  }
});

// 服務錯誤處理
getData(): Observable<Data[]> {
  return this.http.get<Data[]>('/api/data').pipe(
    catchError(error => {
      console.error('API 錯誤:', error);
      return of([]); // 返回空數組作為後備
    })
  );
}
```

### 表單標準
```typescript
// 響應式表單
export class FormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    isActive: [true]
  });

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.saveData(formData);
    }
  }
}
```

## ng-alain 專用標準

### 組件模板標準
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule],
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  
  items: Item[] = [];
  loading = false;
}
```

### 服務模板標準
```typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/feature';
  
  getAll(params?: Params): Observable<{data: T[]; total: number}> {
    return this.http.get(this.API_BASE, params);
  }
  
  create(entity: Partial<T>): Observable<T> {
    return this.http.post(this.API_BASE, entity);
  }
}
```

### 路徑別名標準
| 別名 | 路徑 | 用途 |
|------|------|------|
| @shared | src/app/shared/ | 共享組件 |
| @core | src/app/core/ | 核心服務 |
| @organization | src/organization/ | 組織模組 |
| @env/* | src/environments/* | 環境配置 |
| @_mock | _mock/ | Mock 數據 |

### ng-zorro 組件分類
| 分類 | 組件 | 用途 |
|------|------|------|
| Layout | NzCardModule, NzGridModule | 佈局組件 |
| Navigation | NzMenuModule, NzTabsModule | 導航組件 |
| Input | NzInputModule, NzSelectModule | 輸入組件 |
| Display | NzAvatarModule, NzTagModule | 顯示組件 |
| Feedback | NzSpinModule, NzEmptyModule | 反饋組件 |
| Table | NzTableModule, NzPaginationModule | 表格組件 |

### 國際化標準
```html
<!-- 使用 i18n 管道 -->
<h2>{{ 'organization.list.title' | i18n }}</h2>
<button>{{ 'common.create' | i18n }}</button>

<!-- 翻譯鍵結構: feature.component.element -->
organization.list.title    // 組織列表標題
organization.form.submit   // 組織表單提交按鈕
common.cancel             // 通用取消按鈕
validation.required       // 通用必填驗證
```

### Mock 數據標準
```typescript
export const FEATURE_MOCK = {
  'GET /api/features': (req) => getFeatures(req),
  'POST /api/features': (req) => createFeature(req),
  'PUT /api/features/:id': (req) => updateFeature(req),
  'DELETE /api/features/:id': (req) => deleteFeature(req)
};

function getFeatures(req: MockRequest) {
  const { page = 1, pageSize = 10, search } = req.queryString;
  
  let filtered = [...features];
  if (search) {
    filtered = filtered.filter(item => item.name.includes(search));
  }
  
  const start = (page - 1) * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length
  };
}
```

## Git Workflow Standards

### Commit 規範
```
<type>(<scope>): <subject>

<body>

<footer>

類型: feat, fix, docs, style, refactor, perf, test, build, ci
範例: feat(organization): add organization switcher component
```

### 代碼審查清單
- [ ] 組件是 standalone
- [ ] 使用 OnPush 變更檢測
- [ ] @for 循環有 track
- [ ] 避免在模板中調用函數
- [ ] 有載入狀態和空狀態處理
- [ ] 通過 ESLint 和 Stylelint
- [ ] 有適當的註釋和文檔