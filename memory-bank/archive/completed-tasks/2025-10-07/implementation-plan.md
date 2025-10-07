# ng-alain 代碼組織優化實施計劃

> **創建日期**: 2025-10-07  
> **複雜度**: Level 3 (中型功能)  
> **預計時間**: 2-3 天  
> **目標評分**: 從 82/100 提升至 90+/100

---

## 📋 實施概覽

根據 VAN 模式分析結果，本計劃將系統性地改進專案代碼組織，使其完全符合 Angular 20、ng-alain 和 ng-zorro-antd 的官方最佳實踐。

### 改進目標
- ✅ shared/ 目錄按類型組織（components/directives/pipes）
- ✅ organization 模組完整啟用
- ✅ dashboard 模組按功能分組
- ✅ 所有模塊統一匯出（index.ts）
- ✅ 完善模塊文檔（README.md）

---

## 🎯 優先級 1：重構 shared/ 目錄結構

### 當前問題
```
shared/
├── cell-widget/          ⚠️ 未分類
├── json-schema/          ⚠️ 未分類
├── st-widget/            ⚠️ 未分類
├── utils/                ⚠️ 未分類
└── shared-*.module.ts
```

### 目標結構
```
shared/
├── components/           # 新增：業務組件
│   ├── cell-widget/
│   │   ├── cell-widget.component.ts
│   │   ├── index.ts
│   │   └── README.md
│   └── st-widget/
│       ├── st-widget.component.ts
│       ├── index.ts
│       └── README.md
├── schemas/              # 重命名：JSON Schema
│   ├── test/
│   │   └── test.widget.ts
│   ├── index.ts
│   └── README.md
├── utils/                # 保留：工具函數
│   ├── yuan.ts
│   ├── index.ts
│   └── README.md
├── index.ts              # 新增：統一匯出
└── README.md             # 更新：完整說明
```

### 實施步驟

#### Step 1.1：創建新目錄結構
```bash
# 在 src/app/shared/ 下創建
mkdir components
mkdir schemas
```

#### Step 1.2：移動 widget 組件
```bash
# 移動 cell-widget
mv cell-widget components/
# 移動 st-widget  
mv st-widget components/
```

#### Step 1.3：重命名並移動 json-schema
```bash
# 重命名為 schemas
mv json-schema schemas
```

#### Step 1.4：為每個子模塊創建 index.ts

**components/cell-widget/index.ts**:
```typescript
export * from './cell-widget.component';
```

**components/st-widget/index.ts**:
```typescript
export * from './st-widget.component';
```

**schemas/index.ts**:
```typescript
export * from './test/test.widget';
```

**utils/index.ts**:
```typescript
export * from './yuan';
```

#### Step 1.5：創建主 index.ts

**shared/index.ts**:
```typescript
// Components
export * from './components/cell-widget';
export * from './components/st-widget';

// Schemas
export * from './schemas';

// Utils
export * from './utils';

// Modules (保留現有)
export * from './shared-delon.module';
export * from './shared-imports';
export * from './shared-zorro.module';
```

#### Step 1.6：為每個子模塊創建 README.md

參考 `organization/README.md` 的格式，每個子模塊都應有：
- 模塊概述
- 使用範例
- API 文檔
- 更新日誌

#### Step 1.7：更新主 README.md

**shared/README.md**:
```markdown
# SharedModule

> 共享組件、Schema 和工具函數模塊

## 📁 目錄結構

### components/
業務共享組件，可在多個功能模塊中重用。

- **cell-widget**: ST 表格單元格 Widget
- **st-widget**: ST 表格自定義 Widget

### schemas/
JSON Schema 定義，用於 @delon/form 動態表單。

### utils/
工具函數和輔助方法。

## 📚 使用指南

### 導入組件
\`\`\`typescript
import { CellWidgetComponent } from '@shared/components/cell-widget';
\`\`\`

### 導入工具
\`\`\`typescript
import { yuan } from '@shared/utils';
\`\`\`

## 🔧 開發規範

1. 所有組件應為 Standalone
2. 使用 OnPush 變更檢測策略
3. 每個子模塊必須有 README.md
4. 每個子模塊必須有 index.ts
5. 遵循 Angular Style Guide
```

#### Step 1.8：更新導入路徑

檢查並更新所有引用 shared 模塊的檔案：

```bash
# 搜尋所有引用
grep -r "from '@shared" src/app/routes/
```

更新為新路徑：
```typescript
// 舊
import { CellWidgetComponent } from '@shared/cell-widget';

// 新
import { CellWidgetComponent } from '@shared/components/cell-widget';
// 或使用統一匯出
import { CellWidgetComponent } from '@shared';
```

---

## 🎯 優先級 2：註冊 organization 模組

### 實施步驟

#### Step 2.1：在主路由中註冊

**src/app/routes/routes.ts**:
```typescript
export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/routes').then(m => m.routes) },
      { path: 'widgets', loadChildren: () => import('./widgets/routes').then(m => m.routes) },
      { path: 'style', loadChildren: () => import('./style/routes').then(m => m.routes) },
      { path: 'delon', loadChildren: () => import('./delon/routes').then(m => m.routes) },
      { path: 'extras', loadChildren: () => import('./extras/routes').then(m => m.routes) },
      { path: 'pro', loadChildren: () => import('./pro/routes').then(m => m.routes) },
      // 新增：組織管理模組
      { 
        path: 'organization', 
        loadChildren: () => import('./organization/routes').then(m => m.routes),
        data: { title: '組織管理' }
      }
    ]
  },
  // ... 其他路由
];
```

#### Step 2.2：確保 organization/routes.ts 正確配置

**src/app/routes/organization/routes.ts**:
```typescript
import { Routes } from '@angular/router';
import { organizationGuard } from './guards/organization.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full'
  },
  {
    path: 'tree',
    loadComponent: () => import('./components/organization-tree/organization-tree.component')
      .then(m => m.OrganizationTreeComponent),
    canActivate: [organizationGuard],
    data: { 
      title: '組織架構',
      permissions: ['organization.view']
    }
  },
  {
    path: 'departments',
    loadComponent: () => import('./components/department-list/department-list.component')
      .then(m => m.DepartmentListComponent),
    canActivate: [organizationGuard],
    data: { 
      title: '部門管理',
      permissions: ['department.view']
    }
  },
  {
    path: 'employees',
    loadComponent: () => import('./components/employee-list/employee-list.component')
      .then(m => m.EmployeeListComponent),
    canActivate: [organizationGuard],
    data: { 
      title: '員工管理',
      permissions: ['employee.view']
    }
  }
];
```

#### Step 2.3：在側邊欄菜單中添加入口

**src/app/layout/basic/widgets/user.component.ts** (或相應的菜單配置文件):
```typescript
menu: Menu[] = [
  {
    text: '主導航',
    group: true,
    children: [
      {
        text: '儀表板',
        icon: 'dashboard',
        link: '/dashboard'
      },
      // 新增：組織管理菜單
      {
        text: '組織管理',
        icon: 'team',
        link: '/organization',
        acl: 'organization.view',  // ACL 權限控制
        children: [
          {
            text: '組織架構',
            link: '/organization/tree',
            acl: 'organization.view'
          },
          {
            text: '部門管理',
            link: '/organization/departments',
            acl: 'department.view'
          },
          {
            text: '員工管理',
            link: '/organization/employees',
            acl: 'employee.view'
          }
        ]
      }
    ]
  }
];
```

#### Step 2.4：配置 Mock 數據（開發環境）

**_mock/_organization.ts**:
```typescript
import { MockRequest } from '@delon/mock';

export const ORGANIZATION_API = {
  // 獲取組織樹
  'GET /api/organizations/tree': (req: MockRequest) => {
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'org-1',
        name: '總公司',
        type: 'company',
        level: 1,
        children: [
          {
            id: 'org-2',
            name: '研發部',
            type: 'department',
            level: 2,
            children: []
          },
          {
            id: 'org-3',
            name: '市場部',
            type: 'department',
            level: 2,
            children: []
          }
        ]
      }
    };
  },
  
  // 獲取部門列表
  'GET /api/departments': (req: MockRequest) => {
    return {
      code: 0,
      msg: 'success',
      data: {
        list: [
          {
            id: 'dept-1',
            name: '研發部',
            organizationId: 'org-1',
            managerId: 'emp-1',
            memberCount: 25,
            status: 'active'
          }
        ],
        total: 1
      }
    };
  },
  
  // 獲取員工列表
  'GET /api/employees': (req: MockRequest) => {
    return {
      code: 0,
      msg: 'success',
      data: {
        list: [
          {
            id: 'emp-1',
            name: '張三',
            email: 'zhang@example.com',
            departmentId: 'dept-1',
            roleIds: ['role-1'],
            position: '高級工程師',
            status: 'active'
          }
        ],
        total: 1
      }
    };
  }
};
```

**_mock/index.ts** (更新):
```typescript
import { ORGANIZATION_API } from './_organization';

export default [
  // ... 現有 API
  ...Object.entries(ORGANIZATION_API).map(([key, value]) => ({
    url: key,
    method: key.split(' ')[0],
    response: value
  }))
];
```

---

## 🎯 優先級 3：優化 dashboard 子模塊組織

### 當前結構
```
dashboard/
├── analysis/       ⚠️ 扁平化
├── monitor/        ⚠️ 扁平化
├── workplace/      ⚠️ 扁平化
├── v1/             ⚠️ 扁平化
└── routes.ts
```

### 目標結構
```
dashboard/
├── analytics/           # 分析功能組
│   ├── analysis/
│   │   ├── analysis.component.ts
│   │   ├── analysis.component.html
│   │   └── analysis.component.less
│   ├── reports/         # 未來擴展
│   ├── index.ts
│   └── README.md
├── monitoring/          # 監控功能組
│   ├── monitor/
│   │   ├── monitor.component.ts
│   │   ├── monitor.component.html
│   │   └── monitor.component.less
│   ├── alerts/          # 未來擴展
│   ├── index.ts
│   └── README.md
├── workspace/           # 工作區功能組
│   ├── workplace/
│   │   ├── workplace.component.ts
│   │   ├── workplace.component.html
│   │   └── workplace.component.less
│   ├── v1/
│   ├── index.ts
│   └── README.md
├── routes.ts
├── index.ts
└── README.md
```

### 實施步驟

#### Step 3.1：創建功能組目錄
```bash
cd src/app/routes/dashboard/
mkdir analytics monitoring workspace
```

#### Step 3.2：移動現有組件
```bash
# 移動到 analytics
mv analysis analytics/

# 移動到 monitoring
mv monitor monitoring/

# 移動到 workspace
mv workplace workspace/
mv v1 workspace/
```

#### Step 3.3：為每個功能組創建 index.ts

**analytics/index.ts**:
```typescript
export * from './analysis/analysis.component';
```

**monitoring/index.ts**:
```typescript
export * from './monitor/monitor.component';
```

**workspace/index.ts**:
```typescript
export * from './workplace/workplace.component';
export * from './v1/v1.component';
```

#### Step 3.4：更新 routes.ts

**dashboard/routes.ts**:
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'workspace', pathMatch: 'full' },
  
  // 分析功能組
  {
    path: 'analytics',
    children: [
      {
        path: 'analysis',
        loadComponent: () => import('./analytics/analysis/analysis.component')
          .then(m => m.AnalysisComponent),
        data: { title: '分析頁' }
      }
    ]
  },
  
  // 監控功能組
  {
    path: 'monitoring',
    children: [
      {
        path: 'monitor',
        loadComponent: () => import('./monitoring/monitor/monitor.component')
          .then(m => m.MonitorComponent),
        data: { title: '監控頁' }
      }
    ]
  },
  
  // 工作區功能組
  {
    path: 'workspace',
    children: [
      {
        path: '',
        loadComponent: () => import('./workspace/workplace/workplace.component')
          .then(m => m.WorkplaceComponent),
        data: { title: '工作台' }
      },
      {
        path: 'v1',
        loadComponent: () => import('./workspace/v1/v1.component')
          .then(m => m.V1Component),
        data: { title: 'V1 儀表板' }
      }
    ]
  }
];
```

#### Step 3.5：為每個功能組創建 README.md

參考 organization 模組的文檔格式。

---

## 🎯 優先級 4：為所有模塊添加 index.ts

### 需要添加的模塊

1. **routes/dashboard/**: ✅ (Step 3 已完成)
2. **routes/pro/**: 待添加
3. **routes/delon/**: 待添加
4. **routes/extras/**: 待添加
5. **routes/style/**: 待添加
6. **routes/widgets/**: 待添加

### 標準格式

**routes/[module]/index.ts**:
```typescript
// 匯出所有組件
export * from './[component1]/[component1].component';
export * from './[component2]/[component2].component';

// 匯出路由配置
export * from './routes';
```

### 實施步驟

為每個缺少 index.ts 的模塊創建統一匯出文件。

---

## 🎯 優先級 5：為主要模塊添加 README

### 需要添加 README 的模塊

1. **routes/dashboard/**: 待添加
2. **routes/pro/**: 待添加
3. **routes/delon/**: 待添加
4. **shared/components/**: 待添加
5. **shared/schemas/**: 待添加
6. **shared/utils/**: 待添加

### README 標準格式

```markdown
# [模塊名稱]

> 一句話描述

## 📋 模塊概述

詳細說明模塊的用途和功能。

## 🗂️ 目錄結構

\`\`\`
module/
├── component1/
├── component2/
└── ...
\`\`\`

## 🚀 使用範例

\`\`\`typescript
// 代碼範例
\`\`\`

## 📚 API 文檔

### Component1
- **用途**: ...
- **輸入**: ...
- **輸出**: ...

## 📝 更新日誌

### v1.0.0 (YYYY-MM-DD)
- 初始版本
```

---

## 🧪 驗證與測試

### Step 6.1：檢查編譯錯誤
```bash
# 編譯專案
npm run build

# 檢查 TypeScript 錯誤
npx tsc --noEmit
```

### Step 6.2：檢查 Lint 錯誤
```bash
# 執行 ESLint
npm run lint

# 執行 Stylelint
npm run lint:style
```

### Step 6.3：執行單元測試
```bash
# 執行所有測試
npm test

# 執行特定模塊測試
npm test -- --include='**/shared/**/*.spec.ts'
```

### Step 6.4：手動測試
1. 啟動開發伺服器：`npm start`
2. 測試所有重構的路由和組件
3. 確認 organization 模塊可正常訪問
4. 檢查側邊欄菜單顯示正常

### Step 6.5：檢查導入路徑
```bash
# 搜尋可能的錯誤導入
grep -r "from '@shared/cell-widget'" src/
grep -r "from '@shared/json-schema'" src/
```

---

## 📊 成果驗證

### 預期改進指標

| 指標 | 改進前 | 改進後 | 提升 |
|------|--------|--------|------|
| **總體評分** | 82/100 | 90+/100 | +8 |
| **shared/ 結構** | 60/100 | 95/100 | +35 |
| **模塊啟用** | 85/100 | 100/100 | +15 |
| **目錄組織** | 75/100 | 90/100 | +15 |
| **文檔完整度** | 80/100 | 95/100 | +15 |

### 最終檢查清單

- [ ] shared/ 按類型組織（components/directives/pipes）
- [ ] organization 模組在主路由中註冊
- [ ] organization 模組在側邊欄菜單中可見
- [ ] dashboard 模組按功能分組
- [ ] 所有主要模塊有 index.ts
- [ ] 所有主要模塊有 README.md
- [ ] 所有導入路徑更新正確
- [ ] 編譯無錯誤
- [ ] Lint 檢查通過
- [ ] 單元測試通過
- [ ] 手動測試通過

---

## 📅 實施時間表

### Day 1：核心重構
- ✅ 上午：重構 shared/ 目錄（4 小時）
- ✅ 下午：註冊 organization 模組（2 小時）
- ✅ 下午：驗證與測試（2 小時）

### Day 2：模塊優化
- ✅ 上午：優化 dashboard 結構（3 小時）
- ✅ 下午：添加 index.ts 匯出（3 小時）
- ✅ 下午：初步測試（2 小時）

### Day 3：文檔與驗證
- ✅ 上午：添加 README 文檔（3 小時）
- ✅ 下午：完整測試與驗證（3 小時）
- ✅ 下午：更新 Memory Bank（2 小時）

---

## 🔗 相關資源

- [Angular 20 Style Guide](https://angular.dev/style-guide)
- [ng-alain 官方文檔](https://ng-alain.com)
- [ng-zorro-antd 官方文檔](https://ng.ant.design)
- [Memory Bank 專案架構](../system-patterns/architecture/projectArchitecture.md)
- [編碼標準](../../implementation/code/codeStandards.md)
- [測試標準](../../implementation/tests/testingStandards.md)

---

**最後更新**: 2025-10-07  
**維護者**: Memory Bank System  
**狀態**: 📋 待實施

