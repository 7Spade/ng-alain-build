# 組織管理模組

> 📊 企業級組織架構與人員管理系統

## 📋 模組概述

組織管理模組提供完整的企業組織架構管理功能，包括組織結構樹、部門管理、員工管理和角色權限控制。

### 核心功能
- 🌳 **組織架構樹**: 視覺化組織結構，支援拖拽調整
- 🏢 **部門管理**: 完整的部門 CRUD 與成員管理
- 👥 **員工管理**: 員工資訊管理與角色分配
- 🔐 **角色管理**: 基於 RBAC 的角色權限控制

### 技術特點
- ✅ 100% Standalone Components
- ✅ OnPush 變更檢測策略
- ✅ 整合 @delon/acl 權限控制
- ✅ 使用 ng-zorro-antd UI 組件
- ✅ Lazy Loading 路由
- ✅ TypeScript 嚴格模式

---

## 🗂️ 目錄結構

```
organization/
├── README.md                          # 本文檔
├── DESIGN.md                          # 詳細設計文檔
├── models/                            # 資料模型
│   ├── organization.model.ts          # 組織實體
│   ├── department.model.ts            # 部門實體
│   ├── employee.model.ts              # 員工實體
│   └── role.model.ts                  # 角色實體
├── services/                          # 服務層
│   ├── organization.service.ts        # 組織服務
│   ├── department.service.ts          # 部門服務
│   ├── employee.service.ts            # 員工服務
│   └── role.service.ts                # 角色服務
├── components/                        # 組件層
│   ├── organization-tree/             # 組織架構樹
│   ├── department-list/               # 部門列表
│   ├── department-form/               # 部門表單
│   ├── employee-list/                 # 員工列表
│   ├── employee-form/                 # 員工表單
│   └── role-management/               # 角色管理
├── guards/                            # 守衛
│   └── organization.guard.ts          # 組織權限守衛
└── routes.ts                          # 路由配置
```

---

## 🚀 快速開始

### 1. 路由配置
在主路由文件中引入組織模組路由：

```typescript
// src/app/routes/routes.ts
{
  path: 'organization',
  loadChildren: () => 
    import('./organization/routes').then(m => m.routes),
  data: { title: '組織管理' }
}
```

### 2. 權限配置
在 ACL 服務中配置組織管理權限：

```typescript
// 組織管理權限
aclService.setAbility([
  'organization.view',
  'organization.edit',
  'department.manage',
  'employee.manage',
  'role.manage'
]);
```

### 3. Mock 資料配置
在 `_mock` 目錄創建組織管理 API：

```typescript
// _mock/_organization.ts
export const API = {
  'GET /api/organizations/tree': { /* 組織樹資料 */ },
  'GET /api/departments': { /* 部門列表 */ },
  'GET /api/employees': { /* 員工列表 */ },
  // ...
};
```

---

## 📊 資料模型

### Organization（組織）
```typescript
interface Organization {
  id: string;              // 組織 ID
  name: string;            // 組織名稱
  parentId: string | null; // 父組織 ID
  type: OrganizationType;  // 組織類型
  level: number;           // 組織層級
  children?: Organization[]; // 子組織
}
```

### Department（部門）
```typescript
interface Department {
  id: string;           // 部門 ID
  name: string;         // 部門名稱
  organizationId: string; // 所屬組織
  managerId: string;    // 負責人 ID
  memberCount: number;  // 成員數量
  status: DepartmentStatus;
}
```

### Employee（員工）
```typescript
interface Employee {
  id: string;         // 員工 ID
  name: string;       // 姓名
  email: string;      // 電子郵件
  departmentId: string; // 部門 ID
  roleIds: string[];  // 角色 ID 列表
  position: string;   // 職位
  status: EmployeeStatus;
}
```

---

## 🔐 權限控制

### 權限定義
```typescript
export const ORGANIZATION_PERMISSIONS = {
  // 組織架構
  'organization.view': '查看組織架構',
  'organization.create': '創建組織',
  'organization.edit': '編輯組織',
  'organization.delete': '刪除組織',
  'organization.move': '調整組織架構',
  
  // 部門管理
  'department.view': '查看部門',
  'department.create': '創建部門',
  'department.edit': '編輯部門',
  'department.delete': '刪除部門',
  
  // 員工管理
  'employee.view': '查看員工',
  'employee.create': '新增員工',
  'employee.edit': '編輯員工',
  'employee.delete': '刪除員工',
  
  // 角色管理
  'role.view': '查看角色',
  'role.create': '創建角色',
  'role.edit': '編輯角色',
  'role.delete': '刪除角色',
  'role.assign': '分配角色'
};
```

### 使用範例
```typescript
// 在路由中使用
{
  path: 'departments',
  loadComponent: () => import('./components/department-list'),
  canActivate: [organizationGuard],
  data: { permissions: ['department.view'] }
}

// 在模板中使用
<button 
  nz-button 
  *aclIf="'organization.create'"
  (click)="onCreate()">
  新增組織
</button>
```

---

## 🎨 UI 組件

### 1. OrganizationTreeComponent（組織架構樹）
- 使用 `nz-tree` 展示組織架構
- 支援拖拽調整結構
- 支援搜尋過濾
- 右鍵選單操作

### 2. DepartmentListComponent（部門列表）
- 使用 `@delon/abc` ST 組件
- 支援分頁、排序、篩選
- 批次操作功能
- 匯出功能

### 3. EmployeeListComponent（員工列表）
- 完整的員工資訊展示
- 支援進階搜尋
- 角色分配功能
- 狀態管理

### 4. RoleManagementComponent（角色管理）
- 整合 @delon/acl
- 權限分配介面
- 角色繼承設定

---

## 📈 實施計劃

### Phase 1: 基礎架構（1-2 天）
- [x] 創建目錄結構
- [ ] 定義資料模型
- [ ] 實現服務層
- [ ] 配置路由

### Phase 2: 核心功能（3-5 天）
- [ ] 組織架構樹組件
- [ ] 部門管理功能
- [ ] 員工管理功能
- [ ] 基本 CRUD 操作

### Phase 3: 權限整合（1-2 天）
- [ ] 實現守衛
- [ ] 整合 @delon/acl
- [ ] 角色管理功能
- [ ] 權限檢查邏輯

### Phase 4: 優化與測試（2-3 天）
- [ ] 性能優化
- [ ] 單元測試（80% 覆蓋率）
- [ ] E2E 測試
- [ ] 文檔完善

---

## 🧪 測試

### 單元測試
```bash
# 執行所有組織模組測試
npm test -- --include='**/organization/**/*.spec.ts'

# 測試覆蓋率
npm run test:cov -- --include='**/organization/**'
```

### E2E 測試
```bash
# 執行組織管理 E2E 測試
npm run e2e -- --spec='organization.e2e-spec.ts'
```

---

## 📚 相關文檔

- [DESIGN.md](./DESIGN.md) - 詳細設計文檔
- [專案架構](../../memory-bank/system-patterns/architecture/projectArchitecture.md)
- [開發原則](../../memory-bank/system-patterns/patterns/developmentPrinciples.md)
- [編碼標準](../../memory-bank/implementation/code/codeStandards.md)
- [測試標準](../../memory-bank/implementation/tests/testingStandards.md)

---

## 🤝 貢獻指南

1. 遵循專案的編碼標準
2. 使用 ESLint 和 Prettier 格式化代碼
3. 撰寫單元測試（覆蓋率 >80%）
4. 更新相關文檔
5. 遵循 Angular commit 規範

---

## 📝 更新日誌

### v1.0.0 (2025-10-07)
- 🎉 初始設計完成
- 📐 定義模組架構
- 📋 完成資料模型設計
- 🔐 整合權限控制系統

