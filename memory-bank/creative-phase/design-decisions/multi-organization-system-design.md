---
type: design-decision
category: architecture
complexity: level-4
target_audience: [developer, architect]
reading_time: 15min
tags: [multi-org, github-like, organization-switching, architecture]
summary: 類似 GitHub 的多組織切換系統完整設計方案
related_files:
  - ./org-switcher-design.md
  - ../../../src/app/core/services/organization-context/
  - ../../../src/app/features/organization/models/
decision_date: 2025-10-07
status: designed
---

# 多組織切換系統設計方案

## 🎯 **設計目標**

實現類似 **GitHub** 的多組織功能，允許用戶：
1. 擁有個人空間（Personal Space）
2. 加入多個組織（Organizations）
3. 在個人空間和組織間自由切換
4. 每個組織有獨立的資源、權限、菜單

---

## 📊 **核心概念對比**

### GitHub 模式 vs 當前系統

| 維度 | GitHub 模式 | 當前系統 | 需要改進 |
|-----|-----------|---------|---------|
| 用戶空間 | 個人 + 多組織 | user/org/demo 模式 | ✅ 需要重新設計 |
| 組織定義 | 用戶所屬的頂層組織 | 內部層級結構（部門） | ✅ 需要區分兩種概念 |
| 切換機制 | 下拉選擇器 | 模式切換 | ✅ 需要新增組件 |
| 菜單 | 組織獨立菜單 | 模式獨立菜單 | ✅ 可復用機制 |
| 權限 | 組織角色（owner/admin/member） | ACL 全局權限 | ✅ 需要整合 |
| 數據隔離 | 組織隔離 | 無 | ✅ 需要 HTTP Interceptor |

---

## 🏗️ **架構設計**

### 1. 概念模型

```
用戶 (User)
├── 個人空間 (Personal)
│   ├── ID: null
│   ├── 類型: personal
│   ├── 角色: owner
│   └── 資源: 個人項目、設定
│
└── 所屬組織 (UserOrganizations[])
    ├── 組織 A
    │   ├── ID: org-001
    │   ├── 名稱: 技術部
    │   ├── 角色: owner
    │   ├── 資源: 組織項目、成員管理
    │   └── 內部結構 (Organizations[])
    │       ├── 前端組 (Department)
    │       ├── 後端組 (Department)
    │       └── 測試組 (Team)
    │
    └── 組織 B
        ├── ID: org-002
        ├── 名稱: 業務部
        ├── 角色: admin
        └── ...
```

**關鍵區分**：
- **UserOrganization**：用戶所屬的頂層組織（用於切換）
- **Organization**：組織內部結構（部門、團隊等）

---

### 2. 數據模型設計

#### **UserOrganization**（用戶所屬組織）

```typescript
/**
 * 用戶所屬組織
 * @description 用於組織切換器的頂層組織數據
 */
export interface UserOrganization {
  /** 組織 ID（null 表示個人空間） */
  id: string | null;
  
  /** 組織名稱 */
  name: string;
  
  /** 組織類型 */
  type: 'personal' | 'organization';
  
  /** 組織 Logo */
  logo?: string;
  
  /** 用戶在此組織的角色 */
  role: 'owner' | 'admin' | 'member' | 'viewer';
  
  /** 加入時間 */
  joinedAt: Date;
  
  /** 組織描述 */
  description?: string;
}
```

---

#### **OrganizationContext**（當前組織上下文）

```typescript
/**
 * 組織上下文
 * @description 當前用戶所在的組織環境
 */
export interface OrganizationContext {
  /** 當前組織 ID（null = 個人空間） */
  currentOrgId: string | null;
  
  /** 當前組織資訊 */
  currentOrg: UserOrganization | null;
  
  /** 用戶在當前組織的角色 */
  currentRole: 'owner' | 'admin' | 'member' | 'viewer';
  
  /** 是否為個人空間 */
  isPersonalSpace: boolean;
}
```

---

#### **OrganizationMembership**（組織成員關係）

```typescript
/**
 * 組織成員關係
 * @description 用戶與組織的關聯關係
 */
export interface OrganizationMembership {
  id: string;
  userId: string;
  organizationId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
  invitedBy?: string;
}
```

---

### 3. 核心服務設計

#### **OrganizationContextService**（組織上下文服務）

**文件**: `src/app/core/services/organization-context/organization-context.service.ts`

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabService } from '@core';
import { UserOrganizationService } from '@features/organization/services/user-organization.service';

@Injectable({ providedIn: 'root' })
export class OrganizationContextService {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);
  private readonly aclService = inject(ACLService);
  private readonly tabService = inject(TabService);
  private readonly message = inject(NzMessageService);
  private readonly userOrgService = inject(UserOrganizationService);
  
  // Signals 狀態管理
  private readonly _currentContext = signal<OrganizationContext>({
    currentOrgId: null,
    currentOrg: null,
    currentRole: 'owner',
    isPersonalSpace: true
  });
  
  private readonly _availableOrgs = signal<UserOrganization[]>([]);
  
  // 公開只讀 Signals
  readonly currentContext = this._currentContext.asReadonly();
  readonly availableOrgs = this._availableOrgs.asReadonly();
  
  // Computed Signals
  readonly isPersonalSpace = computed(() => this._currentContext().isPersonalSpace);
  readonly currentOrgId = computed(() => this._currentContext().currentOrgId);
  readonly currentRole = computed(() => this._currentContext().currentRole);
  
  constructor() {
    this.initializeFromStorage();
  }
  
  /**
   * 初始化組織列表
   */
  async initialize(): Promise<void> {
    try {
      // 獲取用戶所屬的所有組織
      const orgs = await this.userOrgService.getUserOrganizations().toPromise();
      this._availableOrgs.set(orgs || []);
      
      // 恢復上次選擇的組織
      const savedOrgId = localStorage.getItem('current_organization_id');
      if (savedOrgId && savedOrgId !== 'null') {
        const org = orgs?.find(o => o.id === savedOrgId);
        if (org) {
          await this.switchToOrganization(savedOrgId, false);
          return;
        }
      }
      
      // 默認切換到個人空間
      this.switchToPersonal(false);
    } catch (error) {
      console.error('初始化組織上下文失敗', error);
      this.switchToPersonal(false);
    }
  }
  
  /**
   * 切換到指定組織
   * @param orgId 組織 ID
   * @param clearTabs 是否清除所有 Tab（預設 true）
   */
  async switchToOrganization(orgId: string, clearTabs = true): Promise<void> {
    const targetOrg = this._availableOrgs().find(o => o.id === orgId);
    if (!targetOrg || targetOrg.id === this._currentContext().currentOrgId) {
      return;
    }
    
    // 1. 更新上下文
    this._currentContext.set({
      currentOrgId: targetOrg.id,
      currentOrg: targetOrg,
      currentRole: targetOrg.role,
      isPersonalSpace: false
    });
    
    // 2. 持久化
    localStorage.setItem('current_organization_id', orgId);
    
    // 3. 清除 Tab（可選）
    if (clearTabs) {
      this.tabService.clearTabs();
    }
    
    // 4. 加載組織菜單
    await this.loadOrganizationMenu(orgId);
    
    // 5. 更新 ACL 權限
    this.updateACL(targetOrg.role);
    
    // 6. 跳轉到組織首頁
    this.router.navigateByUrl('/dashboard');
    
    this.message.success(`已切換至 ${targetOrg.name}`);
  }
  
  /**
   * 切換到個人空間
   * @param clearTabs 是否清除所有 Tab（預設 true）
   */
  switchToPersonal(clearTabs = true): void {
    // 1. 更新上下文
    this._currentContext.set({
      currentOrgId: null,
      currentOrg: {
        id: null,
        name: '個人空間',
        type: 'personal',
        role: 'owner',
        joinedAt: new Date()
      },
      currentRole: 'owner',
      isPersonalSpace: true
    });
    
    // 2. 持久化
    localStorage.setItem('current_organization_id', 'null');
    
    // 3. 清除 Tab
    if (clearTabs) {
      this.tabService.clearTabs();
    }
    
    // 4. 加載個人菜單
    this.loadPersonalMenu();
    
    // 5. 更新 ACL 權限（個人空間全權限）
    this.aclService.setFull(true);
    
    // 6. 跳轉到首頁
    this.router.navigateByUrl('/dashboard');
    
    this.message.success('已切換至個人空間');
  }
  
  /**
   * 從 localStorage 恢復狀態
   */
  private initializeFromStorage(): void {
    const savedOrgId = localStorage.getItem('current_organization_id');
    // 初始狀態，等待 initialize() 完成
  }
  
  /**
   * 加載組織菜單
   */
  private async loadOrganizationMenu(orgId: string): Promise<void> {
    try {
      // 從 API 獲取組織菜單
      // const menuData = await this.userOrgService.getOrganizationMenu(orgId).toPromise();
      
      // 臨時：從 app-data.json 讀取
      const response = await fetch('./assets/tmp/app-data.json');
      const appData = await response.json();
      const menuData = appData.organizationMenus?.[orgId] || appData.menu;
      
      this.menuService.clear();
      this.menuService.add(menuData);
    } catch (error) {
      console.error('加載組織菜單失敗', error);
    }
  }
  
  /**
   * 加載個人菜單
   */
  private loadPersonalMenu(): void {
    // 從 app-data.json 讀取個人菜單
    fetch('./assets/tmp/app-data.json')
      .then(res => res.json())
      .then(appData => {
        const menuData = appData.personalMenu || appData.menu;
        this.menuService.clear();
        this.menuService.add(menuData);
      })
      .catch(error => console.error('加載個人菜單失敗', error));
  }
  
  /**
   * 更新 ACL 權限
   */
  private updateACL(role: string): void {
    // 根據角色設置權限
    const permissions = this.getRolePermissions(role);
    this.aclService.setAbility(permissions);
  }
  
  /**
   * 獲取角色權限
   */
  private getRolePermissions(role: string): string[] {
    switch (role) {
      case 'owner':
        return ['admin', 'user', 'manage_members', 'manage_settings'];
      case 'admin':
        return ['admin', 'user', 'manage_members'];
      case 'member':
        return ['user'];
      case 'viewer':
        return ['viewer'];
      default:
        return [];
    }
  }
}
```

---

### 4. UI 組件設計

#### **OrgSwitcherComponent**（組織切換器）

**文件**: `src/app/layout/basic-layout/widgets/org-switcher.component.ts`

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { I18nPipe } from '@delon/theme';
import { OrganizationContextService } from '@core';

@Component({
  selector: 'org-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    NzDropDownModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzDividerModule,
    I18nPipe
  ],
  template: `
    <div class="org-switcher-wrapper"
         nz-dropdown
         [nzDropdownMenu]="orgMenu"
         nzTrigger="click"
         nzPlacement="bottomLeft">
      <div class="org-switcher-trigger">
        <nz-avatar
          [nzSrc]="currentContext().currentOrg?.logo"
          [nzText]="currentContext().currentOrg?.name?.[0]"
          nzSize="small"
          class="org-avatar" />
        <div class="org-info">
          <strong class="org-name">{{ currentContext().currentOrg?.name }}</strong>
          <small class="org-type">
            {{ currentContext().isPersonalSpace ? '個人空間' : '組織' }}
          </small>
        </div>
        <i nz-icon nzType="swap" class="swap-icon"></i>
      </div>
    </div>
    
    <nz-dropdown-menu #orgMenu="nzDropdownMenu">
      <ul nz-menu class="org-switcher-menu">
        <!-- 個人空間 -->
        <li nz-menu-item
            (click)="switchToPersonal()"
            [class.org-menu-item-selected]="currentContext().isPersonalSpace">
          <i nz-icon nzType="user" class="menu-icon"></i>
          <span class="org-menu-name">個人空間</span>
          @if (currentContext().isPersonalSpace) {
            <i nz-icon nzType="check" class="check-icon"></i>
          }
        </li>
        
        <li nz-menu-divider></li>
        
        <!-- 組織列表 -->
        <li nz-submenu nzTitle="您的組織" nzIcon="team">
          <ul>
            @for (org of availableOrgs(); track org.id) {
              <li nz-menu-item
                  (click)="switchToOrg(org)"
                  [class.org-menu-item-selected]="org.id === currentContext().currentOrgId">
                <nz-avatar [nzSrc]="org.logo" [nzText]="org.name[0]" nzSize="small" />
                <span class="org-menu-name">{{ org.name }}</span>
                <nz-tag [nzColor]="getRoleColor(org.role)" class="role-tag">
                  {{ getRoleLabel(org.role) }}
                </nz-tag>
                @if (org.id === currentContext().currentOrgId) {
                  <i nz-icon nzType="check" class="check-icon"></i>
                }
              </li>
            }
          </ul>
        </li>
        
        <li nz-menu-divider></li>
        
        <!-- 新增組織 -->
        <li nz-menu-item (click)="createOrganization()">
          <i nz-icon nzType="plus-circle" class="menu-icon"></i>
          <span>新增組織</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [`
    .org-switcher-wrapper {
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      border: 1px solid transparent;
    }
    .org-switcher-wrapper:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.1);
    }
    .org-switcher-trigger {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .org-avatar {
      flex-shrink: 0;
    }
    .org-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 2px;
    }
    .org-name {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.88);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .org-type {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
    }
    .swap-icon {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      flex-shrink: 0;
    }
    .org-switcher-menu {
      min-width: 260px;
      max-height: 400px;
      overflow-y: auto;
    }
    .org-menu-item-selected {
      background-color: #e6f4ff;
    }
    .check-icon {
      color: #1890ff;
      margin-left: auto;
    }
    .menu-icon {
      margin-right: 8px;
    }
    .role-tag {
      margin-left: 8px;
      font-size: 11px;
    }
  `]
})
export class OrgSwitcherComponent {
  private readonly contextService = inject(OrganizationContextService);
  
  readonly currentContext = this.contextService.currentContext;
  readonly availableOrgs = this.contextService.availableOrgs;
  
  switchToPersonal(): void {
    this.contextService.switchToPersonal();
  }
  
  switchToOrg(org: UserOrganization): void {
    if (org.id) {
      this.contextService.switchToOrganization(org.id);
    }
  }
  
  createOrganization(): void {
    // TODO: 打開新增組織 Modal
  }
  
  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      owner: '擁有者',
      admin: '管理員',
      member: '成員',
      viewer: '訪客'
    };
    return labels[role] || role;
  }
  
  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      owner: 'purple',
      admin: 'blue',
      member: 'green',
      viewer: 'default'
    };
    return colors[role] || 'default';
  }
}
```

---

## 📁 **需要修改/新增的檔案清單**

### ✨ **新增檔案**

#### 1. 數據模型
```
src/app/features/organization/models/
├── user-organization.model.ts          # UserOrganization 定義
├── organization-context.model.ts       # OrganizationContext 定義
└── organization-membership.model.ts    # OrganizationMembership 定義
```

#### 2. 核心服務
```
src/app/core/services/organization-context/
├── organization-context.service.ts     # 組織上下文服務（核心）
├── organization-context.service.spec.ts
└── index.ts
```

#### 3. 業務服務
```
src/app/features/organization/services/
└── user-organization.service.ts        # 用戶組織服務（API 調用）
```

#### 4. UI 組件
```
src/app/layout/basic-layout/widgets/
├── org-switcher.component.ts           # 組織切換器組件
└── org-switcher.component.less         # 樣式（可選）
```

#### 5. HTTP Interceptor
```
src/app/core/net/
└── organization.interceptor.ts         # 自動添加組織 ID 到 HTTP 請求
```

---

### 🔧 **修改檔案**

#### 1. 更新模型導出
```typescript
// src/app/features/organization/models/index.ts
export * from './organization.model';
export * from './user-organization.model';        // ✅ 新增
export * from './organization-context.model';     // ✅ 新增
export * from './organization-membership.model';  // ✅ 新增
export * from './department.model';
export * from './employee.model';
export * from './role.model';
```

#### 2. 更新服務導出
```typescript
// src/app/core/index.ts
export * from './services/tab/tab.service';
export * from './services/mode/mode.service';
export * from './services/organization-context/organization-context.service';  // ✅ 新增
// ... 其他導出
```

#### 3. 整合到布局
```typescript
// src/app/layout/basic-layout/basic.component.ts
// Line ~20: 新增導入
import { OrgSwitcherComponent } from './widgets/org-switcher.component';

// Line ~80: 修改 asideUserTpl 模板
<ng-template #asideUserTpl>
  <!-- ✅ 新增：組織切換器 -->
  <org-switcher />
  
  <li nz-menu-divider></li>
  
  <!-- 原有：用戶信息 -->
  <div class="alain-default__aside-user">
    <!-- ... -->
  </div>
</ng-template>

// Line ~120: 添加到 imports
imports: [
  // ... 現有導入
  OrgSwitcherComponent  // ✅ 新增
]
```

#### 4. 初始化服務
```typescript
// src/app/core/startup/startup.service.ts
import { OrganizationContextService } from '../services/organization-context/organization-context.service';

@Injectable()
export class StartupService {
  // ...
  private orgContextService = inject(OrganizationContextService);  // ✅ 新增
  
  load(): Observable<void> {
    return zip(...).pipe(
      map(([langData, appData]) => {
        // ... 現有邏輯 ...
        
        // ✅ 新增：初始化組織上下文
        this.orgContextService.initialize();
      })
    );
  }
}
```

#### 5. 配置 HTTP Interceptor
```typescript
// src/app/app.config.ts
import { organizationInterceptor } from '@core/net/organization.interceptor';

const providers: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(withInterceptors([
    ...(environment.interceptorFns ?? []),
    authSimpleInterceptor,
    defaultInterceptor,
    organizationInterceptor  // ✅ 新增
  ])),
  // ...
];
```

#### 6. Mock 數據準備
```json
// src/assets/tmp/app-data.json
{
  "app": { ... },
  "user": { ... },
  "menu": [ ... ],
  
  // ✅ 新增：用戶所屬組織列表
  "userOrganizations": [
    {
      "id": null,
      "name": "個人空間",
      "type": "personal",
      "role": "owner",
      "joinedAt": "2025-01-01T00:00:00Z"
    },
    {
      "id": "org-001",
      "name": "技術部",
      "type": "organization",
      "logo": "./assets/tmp/img/org1.png",
      "role": "owner",
      "joinedAt": "2025-01-01T00:00:00Z",
      "description": "負責技術研發"
    },
    {
      "id": "org-002",
      "name": "業務部",
      "type": "organization",
      "logo": "./assets/tmp/img/org2.png",
      "role": "admin",
      "joinedAt": "2025-02-01T00:00:00Z"
    }
  ],
  
  // ✅ 新增：個人空間菜單
  "personalMenu": [
    {
      "text": "個人導航",
      "group": true,
      "children": [
        {
          "text": "儀表板",
          "icon": "dashboard",
          "link": "/dashboard"
        }
      ]
    }
  ],
  
  // ✅ 新增：組織菜單映射
  "organizationMenus": {
    "org-001": [
      {
        "text": "組織導航",
        "group": true,
        "children": [
          {
            "text": "儀表板",
            "icon": "dashboard",
            "link": "/dashboard"
          },
          {
            "text": "組織管理",
            "icon": "team",
            "children": [
              { "text": "部門管理", "link": "/organization/departments" },
              { "text": "員工管理", "link": "/organization/employees" },
              { "text": "角色管理", "link": "/organization/roles" }
            ]
          }
        ]
      }
    ],
    "org-002": [ ... ]
  }
}
```

---

## 🔄 **數據流設計**

### 用戶切換組織流程

```
1. 用戶點擊組織切換器
   ↓
2. 選擇目標組織（或個人空間）
   ↓
3. OrganizationContextService.switchToOrganization(orgId)
   ├─ 更新 currentContext (Signal)
   ├─ localStorage 持久化
   ├─ TabService.clearTabs() 清除所有 Tab
   ├─ 加載組織菜單（MenuService）
   ├─ 更新 ACL 權限（ACLService）
   └─ 路由跳轉到 /dashboard
   ↓
4. HTTP Interceptor 自動添加 X-Organization-Id 到所有請求
   ↓
5. 後端根據組織 ID 返回對應數據
   ↓
6. UI 更新，顯示組織專屬內容
```

---

## 🎯 **實施步驟**（分階段）

### **階段 1：核心架構（2-3 小時）**

1. ✅ 創建數據模型（user-organization.model.ts 等）
2. ✅ 創建 OrganizationContextService（核心服務）
3. ✅ 創建 UserOrganizationService（API 調用）
4. ✅ 準備 Mock 數據（app-data.json）

### **階段 2：UI 整合（1-2 小時）**

5. ✅ 創建 OrgSwitcherComponent（組織切換器）
6. ✅ 整合到 BasicLayout（側邊欄）
7. ✅ 測試切換功能

### **階段 3：系統整合（2-3 小時）**

8. ✅ 整合 MenuService（動態菜單）
9. ✅ 整合 ACLService（權限控制）
10. ✅ 整合 TabService（清除 Tab）
11. ✅ 創建 HTTP Interceptor（自動添加組織 ID）

### **階段 4：測試與優化（1-2 小時）**

12. ✅ 功能測試（切換、菜單、權限）
13. ✅ 持久化測試（刷新頁面恢復狀態）
14. ✅ 樣式優化（響應式設計）

---

## 📊 **與現有系統的兼容性**

### 1. ModeService 的關係

**選項 A：保留 ModeService（推薦）** ⭐
- OrganizationContext 和 ModeService 並存
- ModeService 用於 demo 模式切換
- OrganizationContext 用於組織切換

**選項 B：廢棄 ModeService**
- 將 demo 模式整合到 OrganizationContext
- 簡化架構，但需要大量重構

**建議**：採用選項 A，保持向後兼容。

---

### 2. Tab 系統兼容性

**策略：切換組織時清除所有 Tab** ✅
- 避免跨組織 Tab 混亂
- 用戶體驗清晰
- 實施簡單

---

### 3. 權限系統整合

```typescript
// 角色權限映射
const ROLE_PERMISSIONS = {
  owner: ['admin', 'user', 'manage_members', 'manage_settings'],
  admin: ['admin', 'user', 'manage_members'],
  member: ['user'],
  viewer: ['viewer']
};

// 切換組織時更新 ACL
this.aclService.setAbility(ROLE_PERMISSIONS[currentRole]);
```

---

## ⚠️ **注意事項**

### 1. 數據隔離

**問題**：如何確保組織間數據隔離？

**解決方案**：HTTP Interceptor
```typescript
// organization.interceptor.ts
export const organizationInterceptor: HttpInterceptorFn = (req, next) => {
  const contextService = inject(OrganizationContextService);
  const currentOrgId = contextService.currentOrgId();
  
  // 為組織請求添加組織 ID
  if (currentOrgId && !req.url.includes('/auth/')) {
    req = req.clone({
      setHeaders: {
        'X-Organization-Id': currentOrgId
      }
    });
  }
  
  return next(req);
};
```

---

### 2. 持久化策略

**localStorage 存儲**：
- `current_organization_id`：當前組織 ID
- 刷新頁面後恢復狀態

**SessionStorage 可選**：
- 如果希望每次登入重置到個人空間

---

### 3. 後端 API 設計

**必需的 API**：
```
GET  /api/user/organizations          # 獲取用戶所屬組織列表
GET  /api/organizations/:id/menu      # 獲取組織菜單
GET  /api/organizations/:id/members   # 獲取組織成員
POST /api/organizations               # 創建組織
PUT  /api/organizations/:id           # 更新組織
```

**請求頭**：
```
X-Organization-Id: org-001
```

---

## 🎊 **預期效果**

### 用戶體驗流程

```
1. 用戶登入 → 自動進入上次選擇的組織（或個人空間）
2. 側邊欄頂部顯示「組織切換器」
3. 點擊切換器 → 看到：
   - 個人空間 ✓（當前）
   - 您的組織 ▶
     - 技術部 [擁有者]
     - 業務部 [管理員]
   - ➕ 新增組織

4. 選擇「技術部」→ 切換成功
5. 所有 Tab 清除
6. 菜單更新為組織菜單（部門管理、員工管理等）
7. 權限更新為「擁有者」權限
8. 所有 API 請求自動帶上 X-Organization-Id

9. 切換回「個人空間」→ 菜單簡化為個人菜單
10. 權限變為全權限
11. API 請求不帶組織 ID
```

---

## 📝 **總結**

### 核心改動

| 類別 | 改動 | 檔案數 |
|-----|------|-------|
| 新增模型 | UserOrganization, OrganizationContext, Membership | 3 |
| 新增服務 | OrganizationContextService, UserOrganizationService | 2 |
| 新增組件 | OrgSwitcherComponent | 1 |
| 新增 Interceptor | organizationInterceptor | 1 |
| 修改檔案 | basic.component, startup.service, app.config, index.ts | 4 |
| Mock 數據 | app-data.json | 1 |
| **總計** | | **12 個檔案** |

### 預計工時

- **階段 1（核心架構）**：2-3 小時
- **階段 2（UI 整合）**：1-2 小時
- **階段 3（系統整合）**：2-3 小時
- **階段 4（測試優化）**：1-2 小時
- **總計**：**6-10 小時**

---

**設計狀態**: ✅ 完成  
**複雜度**: Level 4（複雜系統）  
**下一步**: 開始實施階段 1  
**設計者**: VAN + Context7 + Sequential Thinking 協作

