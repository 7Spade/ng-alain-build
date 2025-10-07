# 技術模式

> 本檔案包含從實際代碼分析和 VAN 評估中提取的技術模式

## 設計模式

### 組件模式
1. **Smart & Dumb Components**: 容器處理邏輯，展示處理顯示
2. **Async Pipe Pattern**: 模板中使用 async pipe 處理 Observable
3. **Guard Composition**: 組合多個守衛實現複雜權限邏輯
4. **Form Handling**: Reactive Forms 配合驗證與狀態管理

### 資料流模式
1. **RxJS Operators**: map, filter, switchMap, catchError 資料轉換
2. **Observable Streams**: RxJS Observable 作為主要資料源
3. **Error Handling**: 集中式錯誤處理配合用戶通知
4. **Pagination Pattern**: 統一的分頁實現

## 性能模式

### 渲染優化
1. **OnPush Pattern**: OnPush 變更檢測配合手動檢測
2. **TrackBy Pattern**: @for 迴圈使用 track 優化
3. **Virtual Scrolling**: 大資料集（100+ 項目）使用虛擬滾動
4. **Lazy Loading**: 路由級與組件級懶載入

### 建置優化
1. **Tree Shaking**: 未使用代碼自動消除
2. **Code Splitting**: 路由級代碼分割
3. **Bundle Analysis**: source-map-explorer 分析
4. **High Memory Build**: 8GB 記憶體配置

## 狀態管理模式

### Service-Based 模式
```typescript
@Injectable({ providedIn: 'root' })
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  
  getState(): Observable<State> {
    return this.state$.asObservable();
  }
  
  updateState(newState: Partial<State>): void {
    this.state$.next({ ...this.state$.value, ...newState });
  }
}
```

### 關鍵模式
1. **BehaviorSubject**: 狀態管理主體
2. **URL as State**: 路由作為主要狀態源
3. **Cache Pattern**: @delon/cache 應用級緩存
4. **Mock Pattern**: @delon/mock 開發與測試

## 測試模式

### 單元測試模式
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
    const mockUsers = [{ id: 1, name: 'Test' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
  afterEach(() => httpMock.verify());
});
```

### 測試策略
1. **AAA Pattern**: Arrange, Act, Assert 結構
2. **Mock Strategy**: 服務與依賴模擬
3. **TestBed**: Angular 測試配置
4. **Coverage**: >80% 服務，>60% 組件，100% 守衛

## 開發模式

### Mock-First 模式
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

### 開發策略
1. **Parallel Development**: 前後端並行開發
2. **HMR**: Hot Module Replacement 快速開發
3. **High Memory**: 8GB 記憶體建置
4. **Git Workflow**: Angular commit 規範

## 安全模式

### 權限驗證模式
```typescript
export const roleGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  const requiredRole = route.data?.['role'];
  const hasPermission = aclService.can(requiredRole);
  
  if (!hasPermission) {
    notification.error('權限不足', '無法訪問該頁面');
    router.navigate(['/403']);
    return false;
  }
  
  return true;
};
```

### 安全策略
1. **Functional Guards**: 使用 CanActivateFn
2. **RBAC**: 角色基礎權限控制 (Owner→Admin→Member→Viewer)
3. **Input Validation**: 表單驗證與清理
4. **Error Handling**: 統一錯誤處理與反饋

## UI/UX 模式

### Empty States
```html
<nz-empty
  *ngIf="items.length === 0"
  [nzNotFoundContent]="'暫無數據'"
  [nzNotFoundImage]="'simple'"
>
  <button nz-button nzType="primary">
    <span nz-icon nzType="plus"></span>
    創建新項目
  </button>
</nz-empty>
```

### Loading States
```html
<nz-spin [nzSpinning]="loading">
  <div *ngIf="!loading">
    <!-- Content -->
  </div>
</nz-spin>
```

### UI 策略
1. **ng-zorro 優先**: 優先使用 ng-zorro 組件
2. **Empty States**: 全域空狀態處理
3. **Loading States**: 完整載入狀態
4. **Responsive**: Mobile-first 響應式設計
