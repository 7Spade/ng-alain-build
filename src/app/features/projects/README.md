# 專案功能模組
> **類似 GitHub Repository 的專案管理系統**

## 📋 模組概述

專案功能模組提供完整的專案管理功能，類似 GitHub Repository，支援：
- 🗂️ **專案列表**：卡片/表格視圖、搜尋篩選排序
- 📊 **專案總覽**：Tab 導航、統計卡片、活動時間線
- 📁 **檔案空間**：上傳下載、檔案列表、預覽功能
- ⚙️ **專案設定**：基本資訊、成員管理、危險操作
- 📈 **專案儀表板**：ECharts 圖表、儲存空間視覺化

## 🗂️ 目錄結構

```
projects/
├── README.md                          # 本文檔
├── models/                            # 資料模型
│   ├── project.model.ts               # 專案實體
│   ├── project-file.model.ts          # 專案檔案
│   ├── project-member.model.ts        # 專案成員
│   ├── project-activity.model.ts      # 專案活動
│   └── index.ts
├── services/                          # 服務層
│   ├── project.service.ts             # 專案服務
│   ├── project-file.service.ts        # 檔案服務
│   ├── project-member.service.ts      # 成員服務
│   └── index.ts
├── components/                        # 組件層
│   ├── project-list/                  # 專案列表
│   ├── project-overview/              # 專案總覽
│   ├── project-dashboard/             # 專案儀表板
│   ├── project-files/                 # 檔案空間
│   ├── member-list/                   # 成員列表
│   └── project-settings/              # 專案設定
├── guards/
│   └── project-access.guard.ts        # 專案權限守衛
└── routes.ts                          # 路由配置
```

## 🚀 快速開始

### 路由配置
專案模組已在主路由中註冊：

```typescript
// src/app/app.routes.ts
{
  path: 'projects',
  loadChildren: () => import('./features/projects/routes').then(m => m.routes),
  data: { title: '專案' }
}
```

### URL 結構
```
/projects                           # 專案列表
/projects/proj-123/overview         # 專案總覽
/projects/proj-123/files            # 檔案空間
/projects/proj-123/members          # 成員管理
/projects/proj-123/settings         # 專案設定
```

## 📊 資料模型

### Project（專案）
```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  ownerType: 'personal' | 'organization';
  organizationId?: string;
  fileCount: number;
  storageUsed: number;
  memberCount: number;
  status: 'active' | 'archived' | 'deleted';
  visibility: 'public' | 'private' | 'internal';
  // ... 其他欄位
}
```

## 🔧 核心服務

### ProjectService
```typescript
// 自動適配個人/組織空間
const orgId = this.orgContext.currentOrgId();
const url = orgId 
  ? `/api/organizations/${orgId}/projects`
  : `/api/users/me/projects`;
```

### ProjectFileService
```typescript
// 支援上傳進度追蹤
uploadFile(request: UploadFileRequest): Observable<HttpEvent<ProjectFile>>
```

### ProjectMemberService
```typescript
// 成員和權限管理
inviteMember(projectId: string, data: InviteMemberRequest): Observable<ProjectMember>
```

## 🔐 權限控制

### 專案角色
- **owner**（擁有者）: 所有權限
- **admin**（管理員）: 設定、成員管理
- **member**（成員）: 上傳、下載
- **viewer**（訪客）: 僅查看

### 守衛
- `projectAccessGuard`: 檢查專案訪問權限
- `projectAdminGuard`: 檢查管理員權限
- `projectOwnerGuard`: 檢查擁有者權限

## 🔗 系統整合

### 1. 組織上下文整合 ⭐⭐⭐⭐⭐
- 自動檢測當前組織
- 個人空間顯示個人專案
- 組織空間顯示組織專案

### 2. Tab 系統整合 ⭐⭐⭐⭐⭐
- 專案詳情支援 Tab 緩存
- 路由配置 data.key
- 狀態保持

### 3. 權限系統整合 ⭐⭐⭐⭐
- ACL 權限控制
- 守衛保護敏感路由
- UI 元素權限控制

## 📅 實施進度

### Phase 1: 基礎架構 ✅ 完成（2025-10-07）
- [x] 創建目錄結構
- [x] 定義資料模型（4個）
- [x] 實現核心服務（3個）
- [x] 配置路由
- [x] 實現守衛（3個）
- [x] Mock 資料準備
- [x] 編譯測試通過

### Phase 2: 核心功能 ⏳ 進行中
- [ ] ProjectListComponent（專案列表）
- [ ] ProjectFilesComponent（檔案空間）
- [ ] ProjectOverviewComponent（專案總覽）
- [ ] ProjectSettingsComponent（專案設定）

### Phase 3: 進階功能 ⏳ 待開始
- [ ] ProjectDashboardComponent（專案儀表板）
- [ ] MemberListComponent（成員管理）
- [ ] ActivityTimelineComponent（活動時間線）
- [ ] FileUploadComponent（檔案上傳組件）

### Phase 4: 整合與優化 ⏳ 待開始
- [ ] 組織上下文整合測試
- [ ] Tab 系統整合測試
- [ ] 性能優化
- [ ] 單元測試
- [ ] E2E 測試
- [ ] 文檔完善

## 📚 相關文檔

### 設計文檔
- [完整設計文檔](../../../memory-bank/creative-phase/design-decisions/project-feature-system-design.md)

### 專案文檔
- [專案架構](../../../memory-bank/system-patterns/architecture/projectArchitecture.md)
- [編碼標準](../../../memory-bank/implementation/code/codeStandards.md)
- [測試標準](../../../memory-bank/implementation/tests/testingStandards.md)

---

**版本**：1.0.0-alpha  
**狀態**：Phase 1 完成，Phase 2 進行中  
**最後更新**：2025-10-07

