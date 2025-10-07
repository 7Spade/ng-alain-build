# 開發原則

> 基於實際代碼分析和官方文檔查詢生成

## 🎯 組件開發原則

### 標準模板
```typescript
@Component({
  selector: 'app-feature-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature-component.html',
  styleUrls: ['./feature-component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {
  // 使用 inject() 進行依賴注入
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  
  // 組件實現
}
```

### 組件設計原則
1. **單一職責**: 每個組件只負責一個功能
2. **OnPush 策略**: 強制使用 OnPush 變更檢測
3. **明確導入**: 使用 standalone 組件的明確導入
4. **原生控制流**: 使用 @if, @for, @switch
5. **類型安全**: 使用 TypeScript 嚴格模式

## 🔧 服務開發原則

### RESTful API 模式
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(_HttpClient);
  
  // GET /api/users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  // GET /api/users/:id
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  
  // POST /api/users
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
  
  // PUT /api/users/:id
  updateUser(id: string, user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user);
  }
  
  // DELETE /api/users/:id
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}
```

### 服務設計原則
1. **單例服務**: 使用 providedIn: 'root'
2. **錯誤處理**: 統一的錯誤處理模式
3. **緩存策略**: 適當的緩存實現
4. **類型安全**: 強類型接口定義
5. **可觀測性**: 使用 Observable 模式

## 🛡️ 守衛開發原則

### 函數式守衛
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
  
  return aclService.can(requiredRole);
};
```

### 守衛設計原則
1. **函數式守衛**: 使用 CanActivateFn
2. **依賴注入**: 使用 inject() 函數
3. **類型安全**: 強類型參數
4. **組合性**: 支持守衛組合
5. **錯誤處理**: 適當的錯誤處理

## 🛣️ 路由開發原則

### 路由配置
```typescript
export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then(m => m.routes),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.routes),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  }
];
```

### 路由設計原則
1. **懶載入**: 所有功能模組使用懶載入
2. **守衛保護**: 適當的路由保護
3. **數據傳遞**: 使用 data 屬性傳遞元數據
4. **嵌套路由**: 合理的路由嵌套結構
5. **路徑別名**: 使用 TypeScript 路徑映射

## 🎨 樣式開發原則

### Less 標準
```less
// 變數定義
@primary-color: #1890ff;
@border-radius: 4px;
@spacing-unit: 8px;

// 組件樣式
.user-card {
  padding: @spacing-unit * 2;
  border-radius: @border-radius;
  border: 1px solid @border-color;
  
  &__header {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: @spacing-unit;
  }
  
  &__content {
    color: @text-color-secondary;
  }
  
  &--highlighted {
    background-color: @primary-color;
    color: white;
  }
}
```

### 樣式設計原則
1. **BEM 方法論**: 使用 BEM 命名規範
2. **變數使用**: 使用 Less 變數保持一致性
3. **嵌套限制**: 最多 3 層嵌套
4. **響應式設計**: 移動優先的響應式設計
5. **主題集成**: 與 ng-alain 主題系統集成

## 🧪 測試原則

### 單元測試
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

### 測試設計原則
1. **AAA 模式**: Arrange, Act, Assert
2. **隔離測試**: 組件和服務隔離測試
3. **模擬依賴**: 適當的依賴模擬
4. **覆蓋率**: 維持 >80% 代碼覆蓋率
5. **描述性命名**: 清晰的測試描述

## 📚 文檔原則

### JSDoc 標準
```typescript
/**
 * 用戶服務類
 * @description 提供用戶相關的 CRUD 操作
 * @example
 * ```typescript
 * constructor(private userService: UserService) {}
 * 
 * this.userService.getUsers().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * 獲取所有用戶
   * @returns Observable<User[]> 用戶數組
   * @throws {HttpErrorResponse} 當 API 請求失敗時
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

### 文檔設計原則
1. **JSDoc**: 使用 JSDoc 文檔化公共 API
2. **複雜邏輯**: 註釋複雜的業務邏輯
3. **TODO**: 標記臨時代碼
4. **棄用標記**: 清楚標記棄用代碼
5. **示例代碼**: 提供使用示例

## 🔄 Git Workflow

### 提交訊息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 提交類型
- `feat`: 新功能
- `fix`: 修復錯誤
- `docs`: 文檔變更
- `style`: 代碼格式變更
- `refactor`: 重構代碼
- `test`: 測試相關
- `chore`: 構建過程或輔助工具的變動

### Git 設計原則
1. **分支策略**: 使用 Git Flow 分支策略
2. **提交訊息**: 遵循約定式提交規範
3. **代碼審查**: 所有變更需要代碼審查
4. **持續集成**: 自動化測試和構建
5. **版本標籤**: 使用語義化版本標籤

## 🚀 性能優化原則

### 組件優化
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.name }}
    </div>
  `
})
export class OptimizedComponent {
  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
```

### 性能設計原則
1. **OnPush 策略**: 強制使用 OnPush 變更檢測
2. **TrackBy 函數**: 使用 trackBy 函數優化列表
3. **懶載入**: 路由級別的懶載入
4. **緩存策略**: 適當的數據緩存
5. **記憶體管理**: 正確的訂閱清理

## 🔒 安全原則

### 輸入驗證
```typescript
@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email">
      <div *ngIf="userForm.get('email')?.hasError('email')">
        請輸入有效的電子郵件地址
      </div>
    </form>
  `
})
export class UserFormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}
```

### 安全設計原則
1. **輸入驗證**: 表單驗證和數據清理
2. **XSS 防護**: 防止跨站腳本攻擊
3. **CSRF 防護**: 防止跨站請求偽造
4. **認證授權**: 適當的認證和授權
5. **敏感數據**: 保護敏感數據

## 📋 代碼審查清單

### 組件審查
- [ ] 是否使用 OnPush 變更檢測策略
- [ ] 是否正確處理訂閱和取消訂閱
- [ ] 是否使用 trackBy 函數
- [ ] 是否遵循單一職責原則
- [ ] 是否使用 TypeScript 嚴格模式
- [ ] 是否使用 inject() 函數
- [ ] 是否使用原生控制流

### 服務審查
- [ ] 是否使用 inject() 函數
- [ ] 是否正確處理錯誤
- [ ] 是否使用適當的 RxJS 操作符
- [ ] 是否實現適當的緩存策略
- [ ] 是否遵循 RESTful API 設計
- [ ] 是否使用強類型接口

### 模板審查
- [ ] 是否使用原生控制流 (@if, @for, @switch)
- [ ] 是否避免複雜的表達式
- [ ] 是否使用適當的管道
- [ ] 是否遵循無障礙設計原則
- [ ] 是否使用語義化 HTML
- [ ] 是否使用 trackBy 函數

### 測試審查
- [ ] 是否遵循 AAA 模式
- [ ] 是否使用描述性測試名稱
- [ ] 是否適當模擬依賴
- [ ] 是否達到代碼覆蓋率要求
- [ ] 是否測試邊界情況
- [ ] 是否測試錯誤情況

### 性能審查
- [ ] 是否使用 OnPush 策略
- [ ] 是否使用 trackBy 函數
- [ ] 是否實現懶載入
- [ ] 是否適當使用緩存
- [ ] 是否正確清理訂閱
- [ ] 是否避免記憶體洩漏

### 安全審查
- [ ] 是否驗證用戶輸入
- [ ] 是否防止 XSS 攻擊
- [ ] 是否實現適當的認證
- [ ] 是否保護敏感數據
- [ ] 是否使用 HTTPS
- [ ] 是否實現適當的授權
