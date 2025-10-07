---
type: implementation-guide
category: testing
complexity: level-4
target_audience: [developer, tester]
reading_time: 10min
tags: [multi-org, testing, github-like, local-cache]
summary: 多組織切換系統實施完成指南與本地測試說明
related_files:
  - ./multi-organization-system-design.md
  - ../../../src/app/core/services/organization-context/
  - ../../../src/assets/tmp/app-data.json
implementation_date: 2025-10-07
status: completed
---

# 多組織切換系統實施完成指南

## 🎉 **實施狀態**

### ✅ **已完成的功能**（11/11）

| 階段 | 任務 | 狀態 |
|-----|------|------|
| **階段 1** | 創建數據模型 | ✅ 完成 |
| **階段 1** | 創建 OrganizationContextService | ✅ 完成 |
| **階段 1** | 創建 UserOrganizationService | ✅ 完成 |
| **階段 1** | 準備 Mock 數據 | ✅ 完成 |
| **階段 2** | 創建 OrgSwitcherComponent | ✅ 完成 |
| **階段 2** | 整合到 BasicLayout | ✅ 完成 |
| **階段 3** | 創建 HTTP Interceptor | ✅ 完成 |
| **階段 3** | 整合 StartupService | ✅ 完成 |
| **階段 3** | 配置 app.config.ts | ✅ 完成 |
| **階段 3** | 更新導出檔案 | ✅ 完成 |
| **階段 4** | Linter 檢查 | ✅ 通過 |

---

## 📋 **已創建/修改的檔案清單**

### ✨ **新增檔案（10 個）**

```
src/app/features/organization/models/
├── user-organization.model.ts              # 用戶所屬組織模型
├── organization-context.model.ts           # 組織上下文模型
└── organization-membership.model.ts        # 組織成員關係模型

src/app/core/services/organization-context/
├── organization-context.service.ts         # 組織上下文服務（核心）
└── index.ts                                # 導出

src/app/features/organization/services/
└── user-organization.service.ts            # 用戶組織服務

src/app/layout/basic-layout/widgets/
└── org-switcher.component.ts               # 組織切換器組件

src/app/core/net/
└── organization.interceptor.ts             # HTTP 攔截器

memory-bank/creative-phase/design-decisions/
├── multi-organization-system-design.md     # 完整設計文檔
└── multi-org-implementation-guide.md       # 本文檔
```

### 🔧 **修改檔案（6 個）**

```
src/app/features/organization/models/index.ts       # 導出新模型
src/app/core/index.ts                               # 導出新服務
src/app/layout/basic-layout/basic.component.ts      # 添加組織切換器
src/app/core/startup/startup.service.ts             # 初始化組織上下文
src/app/app.config.ts                               # 配置 Interceptor
src/assets/tmp/app-data.json                        # Mock 數據
```

---

## 🚀 **本地測試指南**

### ✅ **功能已配置為本地快取測試**

所有服務已修改為**優先使用本地數據**，無需後端 API：

#### 1. **組織列表**
```typescript
// UserOrganizationService.getUserOrganizations()
// ✅ 從 app-data.json 的 userOrganizations 讀取
```

#### 2. **組織菜單**
```typescript
// UserOrganizationService.getOrganizationMenu(orgId)
// ✅ 從 app-data.json 的 organizationMenus[orgId] 讀取
```

#### 3. **新增組織**
```typescript
// HeaderUserComponent.createOrganization()
// ✅ 直接添加到 OrganizationContextService 的 Signal
// ✅ 無需 API 調用，立即生效
```

---

## 🎯 **測試步驟**

### 第一步：啟動應用

```bash
npm start
# 或指定端口
ng serve --port 4201 --open
```

### 第二步：查看左側邊欄

登入後，您應該在**左側邊欄頂部**看到：

```
┌─────────────────────────┐
│ [頭像] 個人空間      ▼  │ ← 組織切換器
│       個人空間           │
└─────────────────────────┘
```

### 第三步：點擊組織切換器

下拉菜單應該顯示：

```
┌───────────────────────────────┐
│ 👤 個人空間               ✓   │ ← 當前選中
├───────────────────────────────┤
│ 您的組織                      │
├───────────────────────────────┤
│ [圖] 技術部 [擁有者]          │
│ [圖] 業務部 [管理員]          │
│ [圖] 產品部 [成員]            │
├───────────────────────────────┤
│ ➕ 新增組織                   │
└───────────────────────────────┘
```

### 第四步：測試組織切換

1. **點擊「技術部」**
   - ✅ 所有 Tab 應該清除
   - ✅ 頁面跳轉到 `/dashboard/workplace`
   - ✅ 側邊欄菜單更新為：
     ```
     • 儀表板
     • 組織管理
       - 部門管理
       - 員工管理
       - 角色管理
     • 快捷菜單
     ```
   - ✅ 切換器顯示「技術部」
   - ✅ 提示訊息：「已切換至 技術部」

2. **點擊「業務部」**
   - ✅ 側邊欄菜單更新為：
     ```
     • 儀表板
     • 組織管理
       - 員工管理
     ```
   - ✅ 切換器顯示「業務部」

3. **點擊「個人空間」**
   - ✅ 側邊欄菜單更新為：
     ```
     • 儀表板
     • 快捷菜單
     ```
   - ✅ 切換器顯示「個人空間」

### 第五步：測試新增組織

1. **點擊右上角頭像**
2. **選擇「新增組織」**
3. **填寫表單**：
   - 組織名稱：測試組織
   - 組織類型：部門
   - 其他欄位：可選
4. **點擊「確定」**
5. **驗證**：
   - ✅ 提示訊息：「組織「測試組織」創建成功」
   - ✅ 組織切換器下拉菜單中出現「測試組織」
   - ✅ 角色顯示為「擁有者」（紫色標籤）

---

## 🏗️ **GitHub Teams 功能對應**

### 問題：組織內是否需要 Teams 分組？

**答案：✅ 已經有了！**

### 概念對應

| GitHub 概念 | 我們的系統 | 說明 |
|-----------|----------|------|
| **Organization** | **UserOrganization** | 用戶所屬的頂層組織（用於切換） |
| **Teams** | **Organization** | 組織內部的團隊/部門分組 |
| **Members** | **Employee** | 組織/團隊的成員 |

### 結構對應

#### GitHub 結構：
```
Organization: Acme Corp
├── Teams
│   ├── Engineering Team
│   │   ├── Frontend Team
│   │   ├── Backend Team
│   │   └── DevOps Team
│   ├── Product Team
│   └── Marketing Team
└── Members
```

#### 我們的系統結構：
```
UserOrganization: 技術部（用於切換）
└── Organizations（內部結構）
    ├── Organization: 前端組（Department）
    │   └── Employees: 前端工程師
    ├── Organization: 後端組（Department）
    │   └── Employees: 後端工程師
    └── Organization: 測試組（Team）
        └── Employees: 測試工程師
```

### 數據模型對應

```typescript
// GitHub Organization = 我們的 UserOrganization
interface UserOrganization {
  id: string | null;
  name: string;              // 組織名稱
  type: 'personal' | 'organization';
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

// GitHub Team = 我們的 Organization
interface Organization {
  id: string;
  name: string;              // 團隊/部門名稱
  parentId: string | null;   // 上級團隊
  type: OrganizationType;    // 類型：部門/團隊/小組
  children?: Organization[]; // 子團隊
}

// GitHub Member = 我們的 Employee
interface Employee {
  id: string;
  name: string;
  departmentId: string;      // 所屬團隊/部門
  role: string;
}
```

---

## 🎨 **側邊欄菜單配置**

### 每個組織都有獨立的側邊欄菜單

#### 個人空間菜單
```json
{
  "personalMenu": [
    {
      "text": "個人導航",
      "children": [
        { "text": "儀表板", "link": "/dashboard/v1" },
        { "text": "快捷菜單", "shortcutRoot": true }
      ]
    }
  ]
}
```

#### 組織菜單（org-001: 技術部）
```json
{
  "organizationMenus": {
    "org-001": [
      {
        "text": "組織導航",
        "children": [
          { "text": "儀表板", "link": "/dashboard/workplace" },
          {
            "text": "組織管理",
            "children": [
              { "text": "部門管理", "link": "/organization/departments" },
              { "text": "員工管理", "link": "/organization/employees" },
              { "text": "角色管理", "link": "/organization/roles" }
            ]
          },
          { "text": "快捷菜單", "shortcutRoot": true }
        ]
      }
    ]
  }
}
```

---

## 🔍 **如何添加組織專屬菜單**

### 方法一：直接修改 app-data.json

```json
{
  "organizationMenus": {
    "org-001": [
      {
        "text": "技術部導航",
        "group": true,
        "children": [
          {
            "text": "專案管理",
            "icon": "anticon-project",
            "children": [
              { "text": "前端專案", "link": "/projects/frontend" },
              { "text": "後端專案", "link": "/projects/backend" }
            ]
          },
          {
            "text": "技術文檔",
            "icon": "anticon-book",
            "link": "/docs/tech"
          }
        ]
      }
    ],
    "org-002": [
      {
        "text": "業務部導航",
        "group": true,
        "children": [
          {
            "text": "客戶管理",
            "icon": "anticon-contacts",
            "link": "/customers"
          }
        ]
      }
    ]
  }
}
```

### 方法二：動態生成菜單（生產環境）

```typescript
// 後端 API
GET /api/organizations/:orgId/menu

Response:
[
  {
    "text": "組織專屬菜單",
    "children": [
      // 根據組織類型和權限動態生成
    ]
  }
]
```

---

## 🎯 **當前系統功能清單**

### ✅ **已實現功能**

| 功能 | 狀態 | 說明 |
|-----|------|------|
| 個人空間 | ✅ | 預設空間，全權限 |
| 多組織支持 | ✅ | 支持無限組織 |
| 組織切換器 | ✅ | 側邊欄頂部下拉選擇 |
| 組織角色 | ✅ | Owner/Admin/Member/Viewer |
| 角色標籤 | ✅ | 彩色標籤顯示角色 |
| 獨立菜單 | ✅ | 每個組織有獨立側邊欄菜單 |
| 權限控制 | ✅ | 根據角色設置 ACL 權限 |
| Tab 清除 | ✅ | 切換時清除所有 Tab |
| 持久化 | ✅ | localStorage 保存當前組織 |
| 刷新恢復 | ✅ | 刷新頁面恢復上次選擇 |
| HTTP 隔離 | ✅ | 自動添加 X-Organization-Id |
| 本地測試 | ✅ | 使用 app-data.json，無需後端 |
| 新增組織 | ✅ | Modal 彈窗，本地即時生效 |

---

## 🧪 **完整測試流程**

### 測試 1：組織切換與側邊欄菜單

```
1. 啟動應用：npm start
2. 登入系統
3. 查看左側邊欄：
   ✅ 頂部應顯示「個人空間」組織切換器
   ✅ 菜單顯示：儀表板、快捷菜單

4. 點擊組織切換器：
   ✅ 下拉菜單顯示：
      - 👤 個人空間 ✓
      - 您的組織
        - [圖] 技術部 [擁有者]
        - [圖] 業務部 [管理員]  
        - [圖] 產品部 [成員]
      - ➕ 新增組織

5. 選擇「技術部」：
   ✅ 提示：「已切換至 技術部」
   ✅ 所有 Tab 清除
   ✅ 跳轉到 /dashboard/workplace
   ✅ 側邊欄菜單更新為：
      • 儀表板
      • 組織管理
        - 部門管理
        - 員工管理
        - 角色管理
      • 快捷菜單
   ✅ 組織切換器顯示「技術部」

6. 選擇「業務部」：
   ✅ 提示：「已切換至 業務部」
   ✅ 側邊欄菜單更新為：
      • 儀表板
      • 組織管理
        - 員工管理（僅此一項）
   ✅ 組織切換器顯示「業務部」

7. 選擇「產品部」：
   ✅ 提示：「已切換至 產品部」
   ✅ 側邊欄菜單更新為：
      • 儀表板（僅此一項）
   ✅ 組織切換器顯示「產品部」

8. 切換回「個人空間」：
   ✅ 提示：「已切換至個人空間」
   ✅ 側邊欄菜單恢復為：
      • 儀表板
      • 快捷菜單
```

---

### 測試 2：新增組織

```
1. 點擊右上角頭像 → 選擇「新增組織」
2. 填寫表單：
   - 組織名稱：測試組織 ✅ 必填
   - 組織類型：部門 ✅ 必填
   - 組織編碼：TEST-001
   - 組織描述：這是測試組織
   - 排序順序：0

3. 點擊「確定」

4. 驗證：
   ✅ 提示：「組織「測試組織」創建成功」
   ✅ Modal 關閉
   ✅ 點擊組織切換器，下拉菜單中出現「測試組織 [擁有者]」
   ✅ 角色標籤為紫色（擁有者）

5. 切換到「測試組織」：
   ✅ 成功切換
   ✅ 組織切換器顯示「測試組織」
```

---

### 測試 3：持久化與刷新

```
1. 切換到「技術部」
2. 刷新頁面（F5）
3. 驗證：
   ✅ 自動恢復到「技術部」
   ✅ 側邊欄菜單正確顯示組織菜單
   ✅ 組織切換器顯示「技術部」
```

---

### 測試 4：HTTP Interceptor

```
1. 切換到「技術部」
2. 打開瀏覽器開發者工具 → Network
3. 操作任何功能（如查看部門列表）
4. 檢查 HTTP 請求頭：
   ✅ 應包含：X-Organization-Id: org-001
   ✅ 排除的請求（/auth/, /assets/ 等）不應有此頭

5. 切換到「個人空間」
6. 再次檢查 HTTP 請求：
   ✅ 不應包含 X-Organization-Id 頭
```

---

## ⚠️ **常見問題排查**

### 問題 1：左側邊欄沒有顯示組織切換器

**原因**：
- 可能是 OrganizationContextService 初始化失敗
- 可能是 app-data.json 沒有 userOrganizations 欄位

**解決方案**：
```typescript
// 1. 檢查瀏覽器控制台是否有錯誤
// 2. 確認 app-data.json 包含 userOrganizations
// 3. 檢查 StartupService.load() 是否正常執行
```

---

### 問題 2：新增組織後沒有出現

**原因**：
- 可能是 addOrganizationLocally() 沒有正確更新 Signal
- 可能是組件沒有訂閱 Signal 變化

**解決方案**：
```typescript
// 已修復：使用 Signal 自動響應式更新
// OrgSwitcherComponent 使用 computed() 過濾組織列表
```

---

### 問題 3：切換組織後菜單沒有更新

**原因**：
- OrganizationContextService.loadOrganizationMenu() 可能失敗
- app-data.json 的 organizationMenus[orgId] 不存在

**解決方案**：
```json
// 確保 app-data.json 包含所有組織的菜單配置
{
  "organizationMenus": {
    "org-001": [ ... ],
    "org-002": [ ... ],
    "org-003": [ ... ]
  }
}
```

---

## 📊 **數據流程圖**

### 組織切換完整流程

```
用戶點擊「技術部」
    ↓
OrgSwitcherComponent.switchToOrg(org)
    ↓
OrganizationContextService.switchToOrganization('org-001')
    ├─ 1. 更新 _currentContext Signal
    │     ✅ UI 自動響應式更新
    ├─ 2. localStorage.setItem('current_organization_id', 'org-001')
    ├─ 3. TabService.clearTabs()
    ├─ 4. loadOrganizationMenu('org-001')
    │     ├─ UserOrganizationService.getOrganizationMenu('org-001')
    │     ├─ 從 app-data.json.organizationMenus['org-001'] 讀取
    │     ├─ MenuService.clear()
    │     └─ MenuService.add(menuData)
    │         ✅ 側邊欄菜單更新
    ├─ 5. updateACL('owner')
    │     └─ ACLService.setAbility(['admin', 'user', ...])
    │         ✅ 權限更新
    └─ 6. Router.navigateByUrl('/dashboard')
        ✅ 頁面跳轉
```

---

## 🎊 **功能完成總結**

### ✅ **實現的 GitHub 功能對比**

| GitHub 功能 | 實現狀態 | 說明 |
|-----------|---------|------|
| 組織切換器（左上角） | ✅ 完成 | 下拉選擇器 |
| 個人空間 | ✅ 完成 | 預設空間 |
| 多組織支持 | ✅ 完成 | 無限組織 |
| 組織角色 | ✅ 完成 | 4 種角色 + 彩色標籤 |
| 組織菜單 | ✅ 完成 | 每個組織獨立側邊欄 |
| Teams（團隊分組） | ✅ 完成 | Organization 模型（部門/團隊/小組） |
| Members（成員管理） | ✅ 完成 | Employee 模型 + 員工管理頁面 |
| 權限隔離 | ✅ 完成 | ACL + HTTP Interceptor |
| 數據隔離 | ✅ 完成 | X-Organization-Id 頭 |
| 創建組織 | ✅ 完成 | Modal 彈窗 + 本地測試 |

---

## 🚀 **下一步增強（可選）**

### 1. 組織設定頁面
```
/organization/settings
- 組織名稱、Logo
- 成員權限設定
- 功能開關
```

### 2. 成員邀請功能
```
- 通過郵箱邀請
- 角色分配
- 邀請管理
```

### 3. 組織內部 Teams 管理
```
/organization/teams
- 創建團隊（Department/Team/Group）
- 團隊成員分配
- 團隊權限設定
```

### 4. 組織切換動畫
```typescript
// 添加切換動畫效果
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📝 **總結**

### ✅ **回答您的兩個問題**

#### Q1: 組織裡面要有建立團隊的分組功能對吧？

**A: ✅ 是的，而且已經有了！**

- **UserOrganization**：用戶所屬的頂層組織（類似 GitHub Organization）
- **Organization**：組織內部的團隊/部門分組（類似 GitHub Teams）
- 當前已有：
  - 部門管理（/organization/departments）
  - 員工管理（/organization/employees）
  - 角色管理（/organization/roles）

#### Q2: 現在組織能先用本地快取測試功能嗎？

**A: ✅ 完全可以！已全部配置為本地測試：**

- ✅ 組織列表：從 `app-data.json.userOrganizations` 讀取
- ✅ 組織菜單：從 `app-data.json.organizationMenus[orgId]` 讀取
- ✅ 新增組織：直接添加到 Signal，無需 API
- ✅ 所有功能都可以在**沒有後端**的情況下測試

---

**實施狀態**: ✅ 100% 完成  
**測試狀態**: ✅ 可立即測試  
**生產就緒**: ⚠️ 需要後端 API（已標註 TODO）

