# Organization - 組織架構管理模組

> 🏢 組織、部門、員工與角色管理

## ⚠️ 模組狀態
**🔄 開發中** - 部分組件尚未實現

## 📁 目錄結構

```
organization/
├── README.md              # 本文件
├── routes.ts              # 路由配置
├── components/            # 表現層（待開發）
│   ├── organization-tree/   # 組織樹
│   ├── department-list/     # 部門列表
│   ├── department-detail/   # 部門詳情
│   ├── employee-list/       # 員工列表
│   ├── employee-detail/     # 員工詳情
│   └── role-management/     # 角色管理
├── models/                # 數據模型 ✅
│   ├── organization.model.ts
│   ├── department.model.ts
│   ├── employee.model.ts
│   ├── role.model.ts
│   └── common.model.ts
├── services/              # 服務層 ✅
│   ├── organization.service.ts
│   ├── department.service.ts
│   ├── employee.service.ts
│   └── role.service.ts
├── guards/                # 路由守衛 ✅
│   └── organization.guard.ts
├── DESIGN.md              # 設計文檔
└── COMPONENTS.md          # 組件規格
```

## 📚 設計文檔

- [設計文檔 (DESIGN.md)](DESIGN.md) - 完整設計說明
- [組件規格 (COMPONENTS.md)](COMPONENTS.md) - 組件接口規範

## 🔧 技術架構

- **數據模型**: TypeScript interfaces
- **服務層**: RESTful API 封裝
- **權限控制**: ACL 路由守衛
- **UI 組件**: ng-zorro-antd

## 🎯 待實現功能

- [ ] 組織樹組件
- [ ] 部門列表與詳情
- [ ] 員工列表與詳情
- [ ] 角色管理
- [ ] 權限分配

---

**導航**: [首頁](../../../README.md) > [Features](../README.md) > Organization

