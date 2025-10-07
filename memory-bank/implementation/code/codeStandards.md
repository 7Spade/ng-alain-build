---
type: development-standard
category: constitution-core
complexity: intermediate
target_audience: [beginner, intermediate, advanced]
reading_time: 20min
tags: [typescript, angular, ng-alain, code-templates, standards, best-practices]
summary: TypeScript、Angular、ng-alain 完整編碼標準與代碼模板
related_files:
  - ../tests/testingStandards.md
  - ../documentation/documentationStandards.md
  - ../../system-patterns/patterns/developmentPrinciples.md
last_updated: 2025-10-07
---

# 代碼標準

## 組件標準

### Standalone 組件模板
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private loadData(): void {
    this.http.get<Data[]>('/api/data')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.cdr.markForCheck();
      });
  }
}
```

### 組件設計原則
| 原則 | 說明 |
|------|------|
| **Standalone** | 100% standalone 組件 |
| **OnPush** | 強制 OnPush 變更檢測 |
| **inject()** | 使用 inject() 函數注入 |
| **Explicit Imports** | 明確聲明所有依賴 |
| **Size Limit** | <100 行內聯，>300 行分離 |
| **Cleanup** | 實現 OnDestroy 清理訂閱 |

## 服務標準

### RESTful 服務模板
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(_HttpClient);
  
  getUsers(params?: QueryParams): Observable<PagedResult<User>> {
    return this.http.get<PagedResult<User>>('/api/users', params);
  }
  
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
  
  updateUser(id: string, user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user);
  }
  
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}
```

### 服務設計原則
| 原則 | 說明 |
|------|------|
| **providedIn** | 使用 providedIn: 'root' |
| **_HttpClient** | 使用 @delon/theme _HttpClient |
| **Observable** | 返回 Observable 而非 Promise |
| **RESTful** | 遵循 REST API 規範 |
| **Type-Safe** | 完整類型定義 |
| **Error Handling** | 統一錯誤處理 |

## 守衛標準

### 函數式守衛模板
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  return true;
};

export const roleGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const notification = inject(NzNotificationService);
  const router = inject(Router);
  
  const requiredRole = route.data?.['role'];
  
  return aclService.can(requiredRole).pipe(
    map(hasPermission => {
      if (!hasPermission) {
        notification.error('權限不足', '無法訪問該頁面');
        router.navigate(['/403']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      notification.error('錯誤', '權限驗證失敗');
      router.navigate(['/error']);
      return of(false);
    })
  );
};
```

### 守衛設計原則
| 原則 | 說明 |
|------|------|
| **Functional** | 使用 CanActivateFn |
| **inject()** | 使用 inject() 注入依賴 |
| **Error Handling** | 完整錯誤處理與反饋 |
| **Type-Safe** | 完整參數類型 |
| **Observable** | 返回 Observable<boolean> 支援異步 |

## 路徑別名標準

### tsconfig.json 配置
```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["src/app/shared/*"],
      "@core/*": ["src/app/core/*"],
      "@env/*": ["src/environments/*"],
      "@_mock/*": ["_mock/*"]
    }
  }
}
```

### 使用範例
```typescript
// Good
import { SharedModule } from '@shared';
import { AuthService } from '@core/auth';
import { environment } from '@env/environment';

// Bad
import { SharedModule } from '../../shared';
import { AuthService } from '../../../core/auth';
```

## ng-zorro 組件標準

### 常用組件分類
| 類別 | 組件 |
|------|------|
| **Layout** | Card, Grid, Divider, Space |
| **Navigation** | Menu, Dropdown, Tabs, Breadcrumb |
| **Input** | Input, Select, DatePicker, Checkbox |
| **Display** | Avatar, Tag, Badge, Tooltip |
| **Feedback** | Spin, Empty, Notification, Modal |
| **Table** | Table, Pagination |

### 使用原則
1. **優先使用**: 優先使用 ng-zorro 組件
2. **最少自訂**: 避免過度自訂樣式
3. **一致性**: 保持 UI 一致性
4. **主題集成**: 使用主題變數

## 性能標準

### 性能指標
| 指標 | 目標值 | 測量方式 |
|------|--------|----------|
| **Initial Bundle** | <2 MB | source-map-explorer |
| **Time to Interactive** | <1.5s | Lighthouse |
| **FCP** | <1s | Lighthouse |
| **LCP** | <2.5s | Lighthouse |
| **CLS** | <0.1 | Lighthouse |

### 優化策略
1. **OnPush Strategy**: 所有組件使用 OnPush
2. **Lazy Loading**: 所有功能模組懶載入
3. **trackBy Functions**: @for 迴圈使用 track
4. **Bundle Analysis**: 定期分析 bundle 大小
5. **Tree Shaking**: 確保有效的 tree shaking

## 安全標準

### 輸入驗證
```typescript
export class UserFormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      this.passwordStrengthValidator
    ]]
  });
  
  private passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    
    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { passwordStrength: true };
  }
}
```

### 安全原則
1. **Input Validation**: 所有輸入必須驗證
2. **XSS Prevention**: 使用 Angular 內建防護
3. **CSRF Protection**: 使用適當的 CSRF token
4. **Secure Storage**: 敏感資料不存本地
5. **HTTPS Only**: 生產環境僅使用 HTTPS

## 資料模型標準

### Interface 定義
```typescript
// 實體介面
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// 請求介面
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
}

// 查詢介面
export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 分頁結果介面
export interface PagedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 枚舉類型
export enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
  Viewer = 'viewer'
}
```

### 資料模型原則
1. **Interface over Class**: 優先使用 interface
2. **Separate Types**: 分離請求/響應類型
3. **Enum for Constants**: 使用 enum 定義常數
4. **Complete Types**: 完整類型定義
5. **No Any**: 禁止使用 any 類型

## Git Workflow 標準

### 提交訊息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 提交類型
- **feat**: 新功能
- **fix**: 錯誤修復
- **docs**: 文檔變更
- **style**: 代碼格式（不影響代碼意義）
- **refactor**: 重構（既非新功能也非修復）
- **perf**: 性能優化
- **test**: 測試相關
- **chore**: 建置過程或輔助工具變動

### 提交範例
```
feat(user): add user profile editing

Implement user profile editing functionality with form validation
and avatar upload support.

Closes #123
```
