---
type: creative-phase
category: design-decision
complexity: level-3
target_audience: [developer, architect]
reading_time: 30min
tags: [project-feature, github-like, file-management, design]
summary: 專案功能系統完整設計文檔（類似 GitHub Repository），包含資料模型、組件架構、UI/UX 決策、實施計劃
related_files:
  - multi-organization-system-design.md
  - org-switcher-design.md
last_updated: 2025-10-07
---

# 專案功能系統設計文檔
> **類似 GitHub Repository 的專案管理系統**

## 📋 設計概述

### 需求定義
設計並實現一個類似 GitHub Repository 的專案管理系統，支援：
- ✅ 建立專案
- ✅ 專案清單
- ✅ 檔案空間（上傳/下載/展示檔案列表）
- ✅ 專案設定
- ✅ 專案總覽
- ✅ 組織/個人通用（與現有組織系統無縫整合）

### 複雜度評估
- **級別**：Level 3（Intermediate Feature）
- **預計時間**：2-3 週（11-15 天）
- **風險等級**：中等
- **影響範圍**：多個組件、完整功能

---

## 🏗️ 系統架構

### 核心功能模組（5個）

#### 1. 專案總覽（Project Overview）
**職責**：顯示專案核心資訊和快速操作
- 專案基本資訊（名稱、描述、創建時間、擁有者）
- 統計數據（檔案數量、儲存空間、成員數量）
- 最近活動記錄
- 快速操作按鈕

#### 2. 專案列表（Project List）
**職責**：展示用戶可訪問的所有專案
- 個人專案列表
- 組織專案列表（根據組織上下文）
- 搜尋與篩選（按名稱、標籤、狀態）
- 排序（按創建時間、更新時間、名稱）
- 新建專案按鈕

#### 3. 檔案空間（File Space）
**職責**：管理專案檔案的上傳、下載、展示
- 檔案列表展示（表格視圖 + 卡片視圖）
- 檔案上傳（拖拽 + 選擇）
- 檔案下載
- 檔案預覽（圖片、PDF）
- 資料夾結構支援
- 檔案搜尋

#### 4. 專案設定（Project Settings）
**職責**：管理專案配置和危險操作
- 基本資訊編輯
- 成員管理
- 權限設定
- 危險操作（刪除專案、歸檔專案）

#### 5. 專案儀表板（Project Dashboard）
**職責**：視覺化專案數據和活動
- 儲存空間使用情況
- 活動時間線
- 檔案類型分布
- 成員貢獻統計

---

## 📦 資料模型設計

### 1. Project（專案）
```typescript
interface Project {
  // 基本資訊
  id: string;                    // 專案 ID
  name: string;                  // 專案名稱
  description?: string;          // 專案描述
  ownerId: string;               // 擁有者 ID
  ownerType: 'personal' | 'organization'; // 擁有者類型
  organizationId?: string;       // 組織 ID（如果是組織專案）
  
  // 統計資訊
  fileCount: number;             // 檔案數量
  storageUsed: number;           // 使用儲存空間（bytes）
  memberCount: number;           // 成員數量
  
  // 狀態
  status: 'active' | 'archived' | 'deleted';
  visibility: 'public' | 'private' | 'internal';
  
  // 時間戳
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  
  // 標籤與分類
  tags?: string[];
  category?: string;
  
  // 圖標與顏色
  avatar?: string;
  color?: string;
}
```

### 2. ProjectFile（專案檔案）
```typescript
interface ProjectFile {
  // 基本資訊
  id: string;                    // 檔案 ID
  projectId: string;             // 所屬專案 ID
  name: string;                  // 檔案名稱
  path: string;                  // 檔案路徑（支援資料夾）
  size: number;                  // 檔案大小（bytes）
  mimeType: string;              // MIME 類型
  
  // 上傳資訊
  uploadedBy: string;            // 上傳者 ID
  uploadedAt: Date;
  
  // 下載資訊
  downloadUrl?: string;          // 下載 URL
  downloadCount: number;         // 下載次數
  
  // 檔案狀態
  status: 'uploading' | 'done' | 'error';
  progress?: number;             // 上傳進度（0-100）
  
  // 預覽
  thumbnailUrl?: string;         // 縮圖 URL
  isImage: boolean;              // 是否為圖片
}
```

### 3. ProjectMember（專案成員）
```typescript
interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
  invitedBy?: string;
}
```

### 4. ProjectActivity（專案活動）
```typescript
interface ProjectActivity {
  id: string;
  projectId: string;
  userId: string;
  action: 'create' | 'update' | 'delete' | 'upload' | 'download';
  targetType: 'project' | 'file' | 'member';
  targetId: string;
  description: string;
  createdAt: Date;
}
```

---

## 🎨 組件架構設計

### 目錄結構
```
src/app/features/projects/
├── models/                      # 資料模型
│   ├── project.model.ts
│   ├── project-file.model.ts
│   ├── project-member.model.ts
│   ├── project-activity.model.ts
│   └── index.ts
├── services/                    # 服務層
│   ├── project.service.ts
│   ├── project-file.service.ts
│   ├── project-member.service.ts
│   └── index.ts
├── components/                  # 組件層
│   ├── project-list/           # 專案列表
│   │   ├── project-list.component.ts
│   │   ├── project-list.component.html
│   │   ├── project-list.component.less
│   │   └── index.ts
│   ├── project-card/           # 專案卡片
│   ├── project-overview/       # 專案總覽
│   ├── project-files/          # 檔案空間
│   ├── project-settings/       # 專案設定
│   ├── project-dashboard/      # 專案儀表板
│   ├── file-upload/            # 檔案上傳組件
│   ├── file-list/              # 檔案列表
│   ├── member-list/            # 成員列表
│   └── activity-timeline/      # 活動時間線
├── guards/
│   └── project-access.guard.ts
├── README.md
└── routes.ts
```

### 核心組件（10個）

#### 1. ProjectListComponent ⭐⭐⭐⭐⭐
**職責**：顯示專案列表，支援搜尋、篩選、排序

**技術棧**：
- `@delon/abc` ST 組件（表格視圖）
- `nz-card` + `nz-grid`（卡片視圖）
- `nz-input`（搜尋）
- `nz-select`（篩選）
- `nz-segmented`（視圖切換）

**特性**：
- 響應式網格（Desktop: 3列，Tablet: 2列，Mobile: 1列）
- 視圖切換（卡片 ⇄ 表格）
- 搜尋、篩選、排序
- 懶加載分頁

#### 2. ProjectOverviewComponent ⭐⭐⭐⭐⭐
**職責**：專案詳情主頁面，包含 Tab 導航

**技術棧**：
- `nz-tabs`（Tab 導航）
- `router-outlet`（嵌套路由）
- `nz-breadcrumb`（麵包屑）
- `nz-statistic`（統計卡片）

**特性**：
- Tab 導航（總覽、檔案、成員、設定）
- 與 Tab 系統整合（TabService）
- 路由狀態保持

#### 3. ProjectFilesComponent ⭐⭐⭐⭐⭐
**職責**：檔案管理（上傳、下載、展示）

**技術棧**：
- `nz-upload`（檔案上傳，dragger 模式）
- `nz-table`（檔案列表，支援虛擬滾動）
- `nz-modal`（檔案預覽）
- `nz-breadcrumb`（資料夾導航）

**特性**：
- 拖拽上傳
- 批量上傳
- 進度追蹤
- 檔案預覽（圖片、PDF）
- 虛擬滾動（大量檔案）

#### 4. ProjectSettingsComponent
**職責**：專案設定管理

**技術棧**：
- `@delon/form` SF 組件（表單）
- `nz-alert`（危險操作警告）
- `nz-modal`（確認對話框）

**特性**：
- 基本資訊編輯
- 成員管理
- 權限設定
- 危險操作區（刪除、歸檔）

#### 5. ProjectDashboardComponent
**職責**：專案數據視覺化

**技術棧**：
- `@delon/chart` ECharts 整合
- `nz-statistic`（統計數據）
- `nz-card`（卡片佈局）

**特性**：
- 儲存空間餅圖
- 活動趨勢線圖
- 檔案類型分布
- 成員貢獻統計

#### 6-10. 其他組件
- **FileUploadComponent**：檔案上傳組件（可復用）
- **FileListComponent**：檔案列表組件（可復用）
- **MemberListComponent**：成員列表組件
- **ActivityTimelineComponent**：活動時間線（nz-timeline）
- **ProjectCardComponent**：專案卡片組件（可復用）

---

## 🛣️ 路由設計

### 路由配置
```typescript
// src/app/features/projects/routes.ts
export const routes: Routes = [
  {
    path: '',
    children: [
      // 專案列表（個人/組織通用）
      {
        path: '',
        loadComponent: () => import('./components/project-list').then(m => m.ProjectListComponent),
        data: { title: '我的專案', key: 'project-list' }
      },
      
      // 專案詳情（Tab 系統）
      {
        path: ':id',
        loadComponent: () => import('./components/project-overview').then(m => m.ProjectOverviewComponent),
        data: { title: '專案總覽', key: 'project-detail' },
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            loadComponent: () => import('./components/project-dashboard').then(m => m.ProjectDashboardComponent),
            data: { title: '總覽' }
          },
          {
            path: 'files',
            loadComponent: () => import('./components/project-files').then(m => m.ProjectFilesComponent),
            data: { title: '檔案空間' }
          },
          {
            path: 'members',
            loadComponent: () => import('./components/member-list').then(m => m.MemberListComponent),
            data: { title: '成員' }
          },
          {
            path: 'settings',
            loadComponent: () => import('./components/project-settings').then(m => m.ProjectSettingsComponent),
            data: { title: '設定' },
            canActivate: [projectAdminGuard]
          }
        ]
      }
    ]
  }
];
```

### URL 結構
```
/projects                           # 專案列表
/projects/proj-123/overview         # 專案總覽
/projects/proj-123/files            # 檔案空間
/projects/proj-123/members          # 成員管理
/projects/proj-123/settings         # 專案設定
```

### 路由特點
- ✅ 完整懶加載（所有組件）
- ✅ 嵌套路由（專案詳情的 Tab）
- ✅ 守衛保護（設定頁面需 admin 權限）
- ✅ 與 Tab 系統整合（data.key）
- ✅ 麵包屑支援

---

## 🔧 服務層設計

### 1. ProjectService（核心服務）
```typescript
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private orgContext = inject(OrganizationContextService);
  
  /**
   * 獲取專案列表（自動適配個人/組織）
   */
  getProjects(params?: {
    search?: string;
    tags?: string[];
    status?: string;
    sortBy?: string;
  }): Observable<Project[]> {
    const orgId = this.orgContext.currentOrgId();
    const url = orgId 
      ? `/api/organizations/${orgId}/projects`
      : `/api/users/me/projects`;
    return this.http.get<Project[]>(url, { params });
  }
  
  /**
   * 創建專案
   */
  createProject(data: CreateProjectRequest): Observable<Project> {
    const orgId = this.orgContext.currentOrgId();
    return orgId
      ? this.http.post<Project>(`/api/organizations/${orgId}/projects`, data)
      : this.http.post<Project>(`/api/users/me/projects`, data);
  }
  
  /**
   * 獲取專案詳情
   */
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`);
  }
  
  /**
   * 更新專案
   */
  updateProject(id: string, data: UpdateProjectRequest): Observable<Project> {
    return this.http.put<Project>(`/api/projects/${id}`, data);
  }
  
  /**
   * 刪除專案
   */
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${id}`);
  }
  
  /**
   * 歸檔專案
   */
  archiveProject(id: string): Observable<Project> {
    return this.http.post<Project>(`/api/projects/${id}/archive`, {});
  }
}
```

### 2. ProjectFileService（檔案服務）
```typescript
@Injectable({ providedIn: 'root' })
export class ProjectFileService {
  private http = inject(HttpClient);
  
  /**
   * 獲取專案檔案列表
   */
  getFiles(projectId: string, path?: string): Observable<ProjectFile[]> {
    return this.http.get<ProjectFile[]>(`/api/projects/${projectId}/files`, {
      params: { path: path || '/' }
    });
  }
  
  /**
   * 上傳檔案
   */
  uploadFile(projectId: string, file: File, path?: string): Observable<HttpEvent<ProjectFile>> {
    const formData = new FormData();
    formData.append('file', file);
    if (path) formData.append('path', path);
    
    return this.http.post<ProjectFile>(
      `/api/projects/${projectId}/files`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
  
  /**
   * 下載檔案
   */
  downloadFile(projectId: string, fileId: string): Observable<Blob> {
    return this.http.get(`/api/projects/${projectId}/files/${fileId}/download`, {
      responseType: 'blob'
    });
  }
  
  /**
   * 刪除檔案
   */
  deleteFile(projectId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${projectId}/files/${fileId}`);
  }
}
```

### 3. ProjectMemberService（成員服務）
```typescript
@Injectable({ providedIn: 'root' })
export class ProjectMemberService {
  private http = inject(HttpClient);
  
  /**
   * 獲取專案成員
   */
  getMembers(projectId: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`/api/projects/${projectId}/members`);
  }
  
  /**
   * 邀請成員
   */
  inviteMember(projectId: string, data: {
    userId: string;
    role: string;
  }): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(`/api/projects/${projectId}/members`, data);
  }
  
  /**
   * 更新成員角色
   */
  updateMemberRole(projectId: string, memberId: string, role: string): Observable<ProjectMember> {
    return this.http.put<ProjectMember>(`/api/projects/${projectId}/members/${memberId}`, { role });
  }
  
  /**
   * 移除成員
   */
  removeMember(projectId: string, memberId: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${projectId}/members/${memberId}`);
  }
}
```

---

## 🎨 UI/UX 設計決策

### 1. 專案列表頁面
**佈局**：
- 響應式網格（Desktop: 3列，Tablet: 2列，Mobile: 1列）
- 視圖切換：卡片視圖 ⇄ 表格視圖（使用 nz-segmented）

**卡片設計**：
- 頂部：專案圖標 + 名稱
- 中間：描述 + 標籤
- 底部：統計數據（檔案數、儲存空間、成員數） + 最後更新時間
- 懸停效果：陰影提升 + 快速操作按鈕顯示

**操作區**：
- 搜尋框（全文搜尋）
- 篩選器（標籤、狀態）
- 排序下拉（創建時間、更新時間、名稱）
- 新建專案按鈕（Primary Button，右上角）

### 2. 專案總覽頁面
**頂部麵包屑**：首頁 > 專案 > [專案名稱]

**專案標題區**：
- 左側：專案圖標 + 名稱 + 描述
- 右側：設定按鈕 + 分享按鈕 + 星標按鈕

**Tab 導航**：
- 總覽、檔案空間、成員、設定
- 使用 nz-tabs，與 router-outlet 整合

**總覽內容**（4個卡片區域）：
- 統計卡片（檔案數、儲存空間、成員數、活動數）
- 最近檔案（列表，最多顯示 5 個）
- 專案成員（頭像列表，最多顯示 8 個）
- 活動時間線（最近 10 條）

### 3. 檔案空間頁面
**操作工具列**：
- 上傳按鈕（支援拖拽）
- 新建資料夾按鈕
- 視圖切換（列表 ⇄ 網格）
- 搜尋框

**麵包屑導航**：/根目錄/子資料夾/...

**檔案列表**（nz-table）：
- 列：圖標、名稱、大小、上傳者、上傳時間、操作
- 行操作：下載、預覽、刪除
- 批量操作：批量下載、批量刪除

**上傳區域**：
- nz-upload 組件（dragger 模式）
- 進度條顯示
- 支援多檔案

### 4. 設定頁面
**分組設定**：
- 基本資訊（名稱、描述、標籤）
- 可見性（公開、私有、內部）
- 成員管理（邀請、角色）
- 危險操作區（歸檔、刪除）- 使用 nz-alert danger

**設計原則**：
- 遵循 ng-zorro-antd 設計規範
- 使用現有的 @shared 組件（PageHeader）
- 響應式設計（Mobile First）
- 無障礙設計（ARIA）

---

## 🔗 系統整合策略

### 1. 組織上下文整合 ⭐⭐⭐⭐⭐
**策略**：ProjectService 自動檢測當前組織上下文

```typescript
// 範例：根據組織上下文獲取專案
const orgId = this.orgContext.currentOrgId();
const url = orgId 
  ? `/api/organizations/${orgId}/projects`  // 組織專案
  : `/api/users/me/projects`;                // 個人專案
```

**整合點**：
- ✅ 個人空間：顯示個人專案
- ✅ 組織空間：顯示組織專案
- ✅ 切換組織時，專案列表自動更新
- ✅ 使用現有的 OrganizationContextService.currentOrgId()

### 2. Tab 系統整合 ⭐⭐⭐⭐⭐
**策略**：專案詳情頁面支援 Tab 緩存

```typescript
// 路由配置添加 data.key
data: { title: '專案總覽', key: 'project-detail' }
```

**整合點**：
- ✅ 專案詳情頁面支援 Tab 緩存
- ✅ 切換專案時，Tab 保持打開
- ✅ 利用現有的 TabService
- ✅ 路由快照保存

### 3. 權限系統整合 ⭐⭐⭐⭐
**策略**：使用 @delon/acl ACLService

**專案角色映射到權限**：
- `owner` → `project.delete`, `project.settings`
- `admin` → `project.settings`, `project.members`
- `member` → `project.upload`, `project.download`
- `viewer` → `project.view`

**整合點**：
- ✅ 守衛保護敏感路由
- ✅ UI 元素權限控制（*appAuth 指令）
- ✅ 後端雙重驗證

### 4. 菜單系統整合 ⭐⭐⭐⭐
**策略**：添加專案菜單項到主菜單

```typescript
{
  text: '專案',
  icon: 'folder',
  link: '/projects',
  children: [
    { text: '我的專案', link: '/projects' },
    { text: '新建專案', link: '/projects/new' }
  ]
}
```

**整合點**：
- ✅ 根據組織上下文動態顯示
- ✅ 使用現有的 MenuService

### 5. 儲存空間整合 ⭐⭐⭐
**策略**：顯示組織總儲存空間配額

**整合點**：
- ✅ 專案儲存空間限制
- ✅ 上傳前檢查空間
- ✅ 儲存空間警告（80%、90%、95%）

---

## ⚡ 性能優化策略

### 1. 虛擬滾動
**應用場景**：大量檔案列表

```html
<nz-table [nzVirtualScroll]="true" 
          [nzVirtualItemSize]="54"
          [nzVirtualMaxBufferPx]="300"
          [nzVirtualMinBufferPx]="100">
  <!-- 表格內容 -->
</nz-table>
```

### 2. 懶加載
**應用場景**：所有組件

```typescript
loadComponent: () => import('./components/project-list').then(m => m.ProjectListComponent)
```

### 3. OnPush 變更檢測
**應用場景**：所有組件

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 4. TrackBy 函數
**應用場景**：@for 迴圈

```html
@for (project of projects; track project.id) {
  <app-project-card [project]="project" />
}
```

### 5. 圖片懶加載
**應用場景**：檔案縮圖

```html
<img [src]="file.thumbnailUrl" loading="lazy" />
```

### 6. 分頁
**應用場景**：專案列表、檔案列表

```html
<nz-table [nzPageSize]="pageSize" 
          [nzPageIndex]="pageIndex"
          (nzPageIndexChange)="onPageChange($event)">
</nz-table>
```

---

## 📤 檔案上傳最佳實踐

### 1. 分片上傳
**應用場景**：大檔案（>10MB）

```typescript
// 分片上傳邏輯
const chunkSize = 1024 * 1024 * 5; // 5MB
const chunks = Math.ceil(file.size / chunkSize);

for (let i = 0; i < chunks; i++) {
  const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
  await uploadChunk(chunk, i, chunks);
}
```

### 2. 斷點續傳
**策略**：保存上傳進度，失敗後從斷點繼續

### 3. 並發控制
**策略**：最多同時上傳 3 個檔案

```typescript
const maxConcurrent = 3;
const queue = new UploadQueue(maxConcurrent);
```

### 4. 進度追蹤
**策略**：使用 HttpClient reportProgress

```typescript
this.http.post(url, formData, {
  reportProgress: true,
  observe: 'events'
}).subscribe(event => {
  if (event.type === HttpEventType.UploadProgress) {
    const progress = Math.round(100 * event.loaded / event.total!);
    // 更新進度
  }
});
```

### 5. 檔案校驗
**策略**：上傳前檢查檔案類型和大小

```typescript
const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
const maxSize = 50 * 1024 * 1024; // 50MB

beforeUpload = (file: File) => {
  const isAllowed = allowedTypes.includes(file.type);
  const isLt50M = file.size < maxSize;
  
  if (!isAllowed) {
    this.message.error('只允許上傳圖片和 PDF 檔案！');
  }
  if (!isLt50M) {
    this.message.error('檔案大小不能超過 50MB！');
  }
  
  return isAllowed && isLt50M;
};
```

### 6. 縮圖生成
**策略**：圖片上傳後自動生成縮圖

---

## 🚨 風險評估與緩解

### 技術風險

#### 1. 大檔案上傳失敗
- **風險等級**：中
- **緩解策略**：
  - 實施分片上傳
  - 斷點續傳
  - 進度保存

#### 2. 大量檔案性能問題
- **風險等級**：中
- **緩解策略**：
  - 虛擬滾動
  - 分頁
  - 懶加載

#### 3. 組織切換時資料混亂
- **風險等級**：低
- **緩解策略**：
  - OrganizationContextService 嚴格管理
  - 清除緩存

#### 4. 權限檢查漏洞
- **風險等級**：高 ⚠️⚠️
- **緩解策略**：
  - 後端雙重驗證
  - 守衛保護
  - ACL 檢查

### 業務風險

#### 1. 儲存空間超額
- **風險等級**：中
- **緩解策略**：
  - 上傳前檢查
  - 配額警告
  - 自動清理

#### 2. 檔案類型安全
- **風險等級**：高 ⚠️⚠️
- **緩解策略**：
  - 檔案類型白名單
  - 病毒掃描
  - 沙箱預覽

### 實施風險

#### 1. 時程延誤
- **風險等級**：中
- **緩解策略**：
  - MVP 優先
  - 分階段交付

#### 2. 與現有系統衝突
- **風險等級**：低
- **緩解策略**：
  - 完整測試
  - 漸進式部署

---

## 📅 實施計劃

### Phase 1: 基礎架構（2-3 天）⭐⭐⭐⭐⭐
- [ ] 創建目錄結構（models, services, components, guards）
- [ ] 定義資料模型（Project, ProjectFile, ProjectMember, ProjectActivity）
- [ ] 實現核心服務（ProjectService, ProjectFileService, ProjectMemberService）
- [ ] 配置路由（懶加載）
- [ ] 實現守衛（ProjectAccessGuard）
- [ ] Mock 資料準備（_project.ts）

### Phase 2: 核心功能（4-5 天）⭐⭐⭐⭐⭐
- [ ] ProjectListComponent（專案列表）
  - ST 表格視圖
  - 卡片視圖
  - 搜尋、篩選、排序
- [ ] ProjectOverviewComponent（專案總覽）
  - Tab 導航
  - 統計卡片
  - 麵包屑導航
- [ ] ProjectFilesComponent（檔案空間）⭐⭐⭐⭐⭐
  - nz-upload 上傳組件
  - nz-table 檔案列表
  - 檔案預覽 Modal
  - 下載功能
- [ ] ProjectSettingsComponent（專案設定）
  - 基本資訊表單
  - 危險操作區

### Phase 3: 進階功能（3-4 天）⭐⭐⭐⭐
- [ ] ProjectDashboardComponent（專案儀表板）
  - ECharts 圖表整合
  - 儲存空間視覺化
  - 活動趨勢
- [ ] MemberListComponent（成員管理）
  - 成員表格
  - 邀請成員 Modal
  - 角色管理
- [ ] ActivityTimelineComponent（活動時間線）
  - nz-timeline 組件
  - 即時更新
- [ ] FileUploadComponent（檔案上傳組件）
  - 進度追蹤
  - 批量上傳
  - 錯誤處理

### Phase 4: 整合與優化（2-3 天）⭐⭐⭐⭐
- [ ] 組織上下文整合
- [ ] Tab 系統整合
- [ ] 權限系統整合
- [ ] 菜單系統整合
- [ ] 性能優化（虛擬滾動、懶加載）
- [ ] 響應式設計優化
- [ ] 錯誤處理完善
- [ ] 單元測試（80% 覆蓋率）
- [ ] E2E 測試（關鍵流程）
- [ ] 文檔完善

### 總預計時間：11-15 天（約 2-3 週）

### 關鍵里程碑
- ✅ Day 3: 基礎架構完成
- ✅ Day 8: 核心功能完成
- ✅ Day 12: 進階功能完成
- ✅ Day 15: 整合優化完成

---

## 🎯 MVP（最小可行產品）定義

### MVP 範圍（Phase 1-2，約 1 週）
1. ✅ 專案列表（卡片視圖）
2. ✅ 創建專案
3. ✅ 專案總覽（基本資訊）
4. ✅ 檔案上傳（基本上傳，無分片）
5. ✅ 檔案列表（表格視圖）
6. ✅ 檔案下載
7. ✅ 基本權限控制（owner/member）

### MVP 延後功能（Phase 3-4）
- 專案儀表板（圖表）
- 活動時間線
- 成員管理（邀請）
- 進階檔案功能（預覽、批量操作）
- 虛擬滾動優化
- 完整測試

### 交付策略
**選項 A（漸進式）**：
- 先完成 MVP（1週）→ 用戶驗證 → 再實施進階功能（1-2週）

**選項 B（一次性）**：
- 完整實施（2-3週）→ 一次性交付完整功能

**建議**：選擇選項 A，快速獲得用戶反饋

---

## ✅ 驗證檢查清單

### 架構設計驗證
- [x] 所有系統需求已 addressed
- [x] 組件職責明確定義
- [x] 介面規範完整
- [x] 資料流程已文檔化
- [x] 安全考量已 addressed（權限、檔案類型）
- [x] 可擴展性需求已滿足
- [x] 性能需求已滿足（虛擬滾動、懶加載）
- [x] 維護方法已定義

### 實施就緒
- [x] 所有組件已識別（10個核心組件）
- [x] 依賴關係已映射（OrganizationContext, Tab, ACL）
- [x] 技術限制已文檔化
- [x] 風險評估已完成
- [x] 資源需求已定義（2-3週）
- [x] 時間表估算已提供

### 與現有系統整合
- [x] 組織上下文整合策略
- [x] Tab 系統整合策略
- [x] 權限系統整合策略
- [x] 菜單系統整合策略
- [x] 路由系統兼容

### 技術選型
- [x] Angular 20 + Signals
- [x] ng-zorro-antd 組件
- [x] @delon/abc 整合
- [x] 現有共享組件復用
- [x] OnPush 變更檢測策略

---

## 📚 參考文檔

### 官方文件
- [ng-zorro-antd Upload](https://ng.ant.design/components/upload)
- [ng-zorro-antd Table](https://ng.ant.design/components/table)
- [Angular Router](https://angular.dev/guide/routing)
- [@delon/abc ST Component](https://ng-alain.com/components/st)

### 相關設計文檔
- [多組織系統設計](./multi-organization-system-design.md)
- [組織切換器設計](./org-switcher-design.md)
- [Tab 系統指南](../exploration/tab-system-guide.md)

### 專案文檔
- [專案架構](../../system-patterns/architecture/projectArchitecture.md)
- [開發原則](../../system-patterns/patterns/developmentPrinciples.md)
- [編碼標準](../../implementation/code/codeStandards.md)
- [測試標準](../../implementation/tests/testingStandards.md)

---

## 🎉 設計總結

### 設計亮點 ⭐⭐⭐⭐⭐
1. **完全兼容現有系統**
   - 組織/個人空間無縫切換
   - Tab 系統完美整合
   - 權限系統一致性

2. **充分利用現有資源**
   - 復用現有組件（PageHeader, TreeTable）
   - 復用現有服務（OrganizationContext, Tab, ACL）
   - 遵循現有設計模式

3. **遵循最佳實踐**
   - Angular 20 + Signals
   - Standalone Components
   - OnPush 變更檢測
   - 懶加載路由

4. **完整的性能優化**
   - 虛擬滾動
   - 懶加載
   - 分頁
   - TrackBy 函數

5. **清晰的實施路徑**
   - 4 個階段
   - 明確的里程碑
   - MVP 定義
   - 風險緩解策略

### 下一步行動
1. ✅ 設計文檔已完成
2. ⏭️ 等待用戶確認
3. ⏭️ 開始 Phase 1 實施（創建基礎架構）

---

**文檔版本**：1.0.0  
**創建日期**：2025-10-07  
**作者**：AI Design Assistant  
**狀態**：✅ 設計完成，等待實施

