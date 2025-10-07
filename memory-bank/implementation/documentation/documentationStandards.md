# 文檔標準

## JSDoc 標準

### 服務文檔
```typescript
/**
 * 用戶服務
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
@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   * 獲取用戶列表
   * @param params 查詢參數（分頁、搜索、排序）
   * @returns Observable<PagedResult<User>> 分頁用戶列表
   * @throws {HttpErrorResponse} API 請求失敗時
   */
  getUsers(params?: QueryParams): Observable<PagedResult<User>> {
    return this.http.get('/api/users', params);
  }
}
```

### Interface 文檔
```typescript
/**
 * 用戶實體介面
 * @interface User
 */
export interface User {
  /** 用戶唯一識別碼 */
  id: string;
  /** 用戶姓名 */
  name: string;
  /** 用戶電子郵件 */
  email: string;
  /** 用戶角色 */
  role: UserRole;
  /** 創建時間 */
  createdAt: Date;
  /** 更新時間 */
  updatedAt: Date;
}
```

## 組件文檔

### README 模板
```markdown
# ComponentName

簡短描述組件功能

## 使用方式
\`\`\`html
<app-component-name
  [inputProperty]="value"
  (outputEvent)="handler($event)">
</app-component-name>
\`\`\`

## 屬性
| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| inputProperty | string | '' | 輸入屬性說明 |

## 事件
| 事件 | 類型 | 說明 |
|------|------|------|
| outputEvent | EventEmitter<T> | 輸出事件說明 |

## 範例
### 基本使用
\`\`\`html
<app-component-name></app-component-name>
\`\`\`

### 帶屬性使用
\`\`\`html
<app-component-name
  [inputProperty]="'custom value'"
  (outputEvent)="handleEvent($event)">
</app-component-name>
\`\`\`
```

## 模組文檔

### 模組 README 模板
```markdown
# [Feature] 模組

## 功能概述
[描述模組主要功能]

## 目錄結構
\`\`\`
src/app/routes/[feature]/
├── components/
│   ├── [feature]-list/
│   ├── [feature]-form/
│   └── [feature]-detail/
├── services/
│   └── [feature].service.ts
├── models/
│   └── [feature].model.ts
├── routes.ts
└── README.md
\`\`\`

## 使用方式
[代碼示例和基本使用方法]

## API 文檔
[API 說明和參數]

## 開發指南
[開發注意事項和最佳實踐]
```

## 樣式文檔

### Less 文檔標準
```less
/**
 * FeatureComponent 樣式
 * 使用 BEM 命名方法
 */

// 變數定義
@component-padding: 16px;
@component-border-radius: 4px;

// 組件樣式
.feature-component {
  padding: @component-padding;
  border-radius: @component-border-radius;

  // Element
  &__header {
    font-size: 16px;
    font-weight: 600;
  }

  // Modifier
  &--large {
    padding: @component-padding * 2;
  }
}
```

## Git 提交標準

### 提交訊息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 類型說明
- **feat**: 新功能
- **fix**: 錯誤修復
- **docs**: 文檔變更
- **style**: 代碼格式
- **refactor**: 重構
- **test**: 測試相關
- **chore**: 建置工具

### 提交範例
```
feat(user): add user profile editing

Implement user profile editing functionality with:
- Form validation
- Avatar upload
- Real-time preview

Closes #123
```

## 架構文檔

### 系統架構圖
```markdown
# 系統架構

## 總覽
[高層系統架構描述]

## 組件
### 核心組件
- Component 1: 說明
- Component 2: 說明

### 功能組件
- Feature 1: 說明
- Feature 2: 說明

## 資料流
\`\`\`mermaid
graph TD
    A[User Input] --> B[Component]
    B --> C[Service]
    C --> D[API]
    D --> E[Response]
    E --> F[Update UI]
\`\`\`

## 依賴關係
- Angular 20.3.0
- ng-alain 20.0.2
- ng-zorro-antd 20.3.1
```

## 工具配置文檔

### ESLint 配置
```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@angular-eslint/prefer-standalone': 'error'
    }
  }
];
```

### Prettier 配置
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100
}
```

## 維護文檔

### 更新程序
```markdown
# 更新程序

## 依賴更新
1. 檢查更新: `npm outdated`
2. 更新套件: `npm update`
3. 測試應用: `npm test`
4. 建置應用: `npm run build`

## Angular 更新
1. 查閱 Angular 更新指南
2. 執行更新命令
3. 修復 breaking changes
4. 更新依賴
5. 完整測試
```

## 文檔維護週期

| 頻率 | 任務 |
|------|------|
| **每月** | 審查並更新 README |
| **每次發布** | 更新 CHANGELOG |
| **新功能** | 更新 API 文檔 |
| **錯誤修復** | 更新已知問題 |
