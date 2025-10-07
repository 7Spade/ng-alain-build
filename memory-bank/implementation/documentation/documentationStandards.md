# Documentation Standards

## Documentation Structure

### README Template
```markdown
# Project Name

## Overview
簡潔的專案描述和目標

## Installation
```bash
npm install
npm start
```

## Usage
基本使用範例

## API Documentation
公開 API 說明

## Contributing
貢獻指南
```

## Code Documentation

### JSDoc Standards
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

### Component Documentation
```typescript
/**
 * 用戶列表組件
 * 
 * 功能：
 * - 顯示用戶列表
 * - 支持搜索和分頁
 * - 提供編輯和刪除操作
 * 
 * @example
 * ```html
 * <app-user-list 
 *   [users]="users" 
 *   (edit)="onEdit($event)"
 *   (delete)="onDelete($event)">
 * </app-user-list>
 * ```
 */
@Component({
  selector: 'app-user-list',
  template: `...`
})
export class UserListComponent {
  /** 用戶列表數據 */
  @Input() users: User[] = [];
  
  /** 編輯用戶事件 */
  @Output() edit = new EventEmitter<User>();
  
  /** 刪除用戶事件 */
  @Output() delete = new EventEmitter<User>();
}
```

## Git Documentation

### Commit Standards
```
<type>(<scope>): <subject>

<body>

<footer>

類型: feat, fix, docs, style, refactor, perf, test, build, ci
範例: feat(user): add user management module
```

### Pull Request Template
```markdown
## 變更描述
簡潔描述變更內容

## 變更類型
- [ ] Bug 修復
- [ ] 新功能
- [ ] 文檔更新
- [ ] 代碼重構

## 測試
- [ ] 單元測試
- [ ] 整合測試
- [ ] E2E 測試

## 檢查清單
- [ ] 代碼符合專案標準
- [ ] 通過所有測試
- [ ] 更新相關文檔
```

## API Documentation

### Interface Documentation
```typescript
/**
 * 用戶介面定義
 */
export interface User {
  /** 用戶唯一標識 */
  id: string;
  
  /** 用戶姓名 */
  name: string;
  
  /** 用戶郵箱 */
  email: string;
  
  /** 用戶狀態 */
  status: UserStatus;
  
  /** 創建時間 */
  createdAt: Date;
  
  /** 更新時間 */
  updatedAt: Date;
}

/**
 * 用戶狀態枚舉
 */
export enum UserStatus {
  /** 啟用 */
  ACTIVE = 'active',
  /** 禁用 */
  INACTIVE = 'inactive',
  /** 待審核 */
  PENDING = 'pending'
}
```

### Service Documentation
```typescript
/**
 * 用戶服務
 * 
 * 提供用戶相關的業務邏輯操作
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/users';
  
  /**
   * 獲取用戶列表
   * @param params 查詢參數
   * @returns 用戶列表 Observable
   */
  getUsers(params?: QueryParams): Observable<User[]> {
    return this.http.get(this.API_BASE, params);
  }
  
  /**
   * 創建新用戶
   * @param userData 用戶數據
   * @returns 創建的用戶 Observable
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post(this.API_BASE, userData);
  }
}
```

## Style Guide Documentation

### CSS/Less Documentation
```less
/**
 * 用戶卡片組件樣式
 * 
 * 使用 BEM 命名規範
 * 支持響應式設計
 */
.user-card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &__header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  &__content {
    color: #666;
    line-height: 1.5;
  }
  
  &--large {
    padding: 24px;
  }
  
  // 響應式設計
  @media (max-width: 768px) {
    padding: 12px;
  }
}
```

## Architecture Documentation

### System Overview
```markdown
# 系統架構

## 技術棧
- Angular 20+
- ng-alain 20.0.2
- ng-zorro-antd 20.3.1
- TypeScript 5.0+

## 目錄結構
```
src/
├── app/
│   ├── core/           # 核心服務
│   ├── shared/         # 共享組件
│   ├── routes/         # 路由模組
│   └── layout/         # 佈局組件
├── assets/             # 靜態資源
└── environments/       # 環境配置
```

## 設計原則
- 組件化開發
- 響應式設計
- 模組化架構
- 類型安全
```

## Deployment Documentation

### Build Process
```bash
# 開發環境
npm run start

# 生產環境
npm run build

# 測試
npm run test

# 代碼檢查
npm run lint
```

### Environment Configuration
```typescript
// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  version: '1.0.0'
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  version: '1.0.0'
};
```

## Update Procedures

### Version Update
```markdown
# 版本更新流程

## 1. 準備階段
- 備份當前版本
- 檢查依賴更新
- 準備回滾方案

## 2. 更新步驟
1. 更新依賴包
2. 運行測試套件
3. 檢查構建過程
4. 部署到測試環境

## 3. 驗證階段
- 功能測試
- 性能測試
- 用戶驗收測試

## 4. 發布階段
- 部署到生產環境
- 監控系統狀態
- 記錄更新日誌
```

## Code Review Checklist

### 代碼審查清單
- [ ] 代碼符合專案標準
- [ ] 通過所有測試
- [ ] 文檔完整且準確
- [ ] 性能考慮適當
- [ ] 安全性檢查通過
- [ ] 錯誤處理完善
- [ ] 代碼可讀性良好
- [ ] 無重複代碼
- [ ] 適當的註釋
- [ ] 提交信息清晰

## Development Tools

### ESLint Configuration
```json
{
  "extends": [
    "@angular-eslint/recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@angular-eslint/no-empty-lifecycle-method": "error"
  }
}
```

### Stylelint Configuration
```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true
  }
}
```

### Prettier Configuration
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true
}
```