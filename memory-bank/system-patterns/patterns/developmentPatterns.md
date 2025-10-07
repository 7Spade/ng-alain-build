# 開發模式

## Angular 核心模式

### 組件模式
- **Smart/Dumb Components**: 容器與展示組件分離
- **OnPush Detection**: 性能優化策略
- **Standalone Components**: 100% standalone 架構
- **Component Composition**: 組件組合設計

### 服務模式
- **Injectable Services**: providedIn: 'root' 單例
- **Observable Services**: RxJS 資料流
- **_HttpClient**: @delon/theme 統一 HTTP 客戶端
- **RESTful API**: 標準 REST API 設計

### 狀態管理模式
- **Service-based State**: 集中式狀態管理
- **URL as State**: 路由狀態管理
- **Observable Streams**: 響應式資料流
- **Cache Service**: @delon/cache 緩存策略

## ng-alain 特定模式

### Admin 面板模式
- **ST (Simple Table)**: 內建功能的資料表格
- **SE (Search Engine)**: 進階搜索與篩選
- **ACL Integration**: 角色權限控制
- **Theme Integration**: 動態主題支援

### 表單模式
- **Schema-driven Forms**: JSON schema 表單生成
- **Reactive Forms**: FormGroup 響應式表單
- **Validation Patterns**: 內建與自訂驗證器
- **Dynamic Forms**: 運行時表單生成

### 佈局模式
- **Responsive Layout**: Mobile-first 響應式設計
- **Sidebar Navigation**: 可折疊側邊導航
- **Breadcrumb Navigation**: 階層導航
- **Header Actions**: 工具列與操作按鈕

## 現代 Angular 模式

### Standalone 模式
- 使用 standalone: true
- 明確 imports 陣列
- 移除 NgModule
- bootstrapApplication 啟動

### 函數式守衛
- CanActivateFn 替代 class-based
- inject() 依賴注入
- 守衛組合
- 完整類型安全

### 模板模式
- **Native Control Flow**: @if, @for, @switch
- **Template Inlining**: <150 行內聯
- **Grid Layout**: CSS Grid 響應式佈局
- **trackBy Functions**: @for 性能優化

## 測試模式

### 單元測試
- **AAA Pattern**: Arrange, Act, Assert
- **Mock Pattern**: 服務與依賴模擬
- **TestBed**: Angular 測試工具
- **Spy Objects**: jasmine.createSpyObj

### E2E 測試
- **Protractor**: Angular E2E 框架
- **data-testid**: E2E 測試選擇器
- **Page Objects**: 頁面物件模式
- **Browser Actions**: 瀏覽器操作模擬

## 性能模式

### 建置優化
- **Tree Shaking**: 未使用代碼消除
- **Code Splitting**: 路由級代碼分割
- **Bundle Analysis**: source-map-explorer
- **High Memory**: 8GB 記憶體配置

### 運行時優化
- **OnPush Strategy**: 40-60% 性能提升
- **Lazy Loading**: 按需模組載入
- **Virtual Scrolling**: 大資料集處理
- **Subscription Cleanup**: 記憶體管理
