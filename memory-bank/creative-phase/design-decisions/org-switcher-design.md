# 组织切换器设计决策

**设计日期**: 2025-10-07  
**复杂度**: Level 3（中型功能）  
**预计时间**: 4-6 小时  
**状态**: 📋 设计完成，待实施

---

## 🎯 设计目标

实现类似 Next.js org-switcher 的功能，允许用户在**个人空间**和**组织空间**之间切换，切换时动态加载不同的菜单结构，同时兼容现有的 **Tab 多页签系统**。

---

## 📊 核心设计原则

### 1. **零破坏性原则** ✅
- 不修改现有的 Tab 系统
- 不修改现有的 MenuService 用法
- 不修改现有的布局结构
- 仅添加新组件和服务

### 2. **Tab 系统兼容** ✅
- 切换组织时保留当前 Tab 状态（可选）
- 或清除所有 Tab，重新开始（推荐）
- 与 SimpleReuseStrategy 无冲突

### 3. **渐进式增强** ✅
- 阶段 1：UI 组件 + 基础切换
- 阶段 2：菜单动态加载
- 阶段 3：Tab 集成优化

---

## 🏗️ 架构设计

### 视觉布局

```
侧边栏布局：
┌────────────────────────────┐
│ ┌────────────────────────┐ │
│ │ [Logo] 我的組織    ▼  │ │ ← 组织切换器（新增）
│ └────────────────────────┘ │
│ ────────────────────────── │
│                            │
│ • Dashboard                │
│ • 組織管理                 │ ← 菜单（动态加载）
│ • ...                      │
│                            │
│ ────────────────────────── │
│ [头像] Admin               │ ← 用户信息（原有）
│        admin@email.com     │
└────────────────────────────┘
```

### 技术架构

```
┌─────────────────────────────────────┐
│   OrgSwitcherComponent (UI)         │
│   - 下拉菜单                         │
│   - 组织列表                         │
│   - 切换触发                         │
└──────────────┬──────────────────────┘
               │ inject
               ▼
┌─────────────────────────────────────┐
│   OrganizationSwitcherService       │
│   - currentOrg: Signal              │
│   - organizations: Signal           │
│   - switchOrganization()            │
└──────────────┬──────────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────┐
│   @delon/theme Services             │
│   - MenuService (菜单管理)           │
│   - ACLService (权限管理)            │
│   - SettingsService (应用设置)       │
└─────────────────────────────────────┘
```

---

## 📁 文件清单与设计

### ✨ 核心文件（必须创建）

#### 1. 组织切换器数据模型

**文件**: `src/app/features/organization/models/organization.model.ts`

**修改**: 在文件末尾添加

```typescript
/**
 * 组织切换器数据项
 * @description 用于组织切换器的轻量级数据模型
 */
export interface OrganizationSwitcherItem {
  /** 组织唯一识别码 */
  id: string;
  
  /** 组织名称 */
  name: string;
  
  /** 空间类型 */
  type: 'personal' | 'organization';
  
  /** 组织 Logo URL */
  logo?: string;
  
  /** 用户在此组织的角色 */
  role?: 'owner' | 'admin' | 'member' | 'viewer';
}
```

---

#### 2. 组织切换服务

**文件**: `src/app/core/services/organization-switcher/organization-switcher.service.ts`（新建目录）

**设计要点**:
- ✅ 使用 Angular Signals 管理状态
- ✅ providedIn: 'root' 单例服务
- ✅ 集成 MenuService、ACLService
- ✅ localStorage 持久化当前选择
- ✅ **与 Tab 系统集成**：切换时可选清除所有 Tab

```typescript
@Injectable({ providedIn: 'root' })
export class OrganizationSwitcherService {
  private readonly menuService = inject(MenuService);
  private readonly aclService = inject(ACLService);
  private readonly tabService = inject(TabService);  // ← 集成 Tab 服务
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  
  // 状态管理（Signals）
  private readonly _currentOrg = signal<OrganizationSwitcherItem | null>(null);
  readonly currentOrg = this._currentOrg.asReadonly();
  
  private readonly _organizations = signal<OrganizationSwitcherItem[]>([]);
  readonly organizations = this._organizations.asReadonly();
  
  /**
   * 切换组织
   * @param orgId 目标组织 ID
   * @param clearTabs 是否清除所有 Tab（默认 true）
   */
  switchOrganization(orgId: string, clearTabs = true): void {
    const targetOrg = this._organizations().find(o => o.id === orgId);
    if (!targetOrg || targetOrg.id === this._currentOrg()?.id) {
      return;
    }
    
    // 1. 更新当前组织
    this._currentOrg.set(targetOrg);
    localStorage.setItem('current_organization_id', orgId);
    
    // 2. 清除菜单和 Tab（可选）
    this.menuService.clear();
    if (clearTabs) {
      this.tabService.clearTabs();  // ← 清除所有 Tab
    }
    
    // 3. 加载新菜单
    this.loadMenuForOrganization(orgId);
    
    // 4. 可选：更新 ACL 权限
    // this.aclService.setFull(permissions);
    
    // 5. 跳转到首页（可选）
    this.router.navigateByUrl('/dashboard');
    
    this.message.success(`已切換至 ${targetOrg.name}`);
  }
}
```

**关键设计决策**:
- ✅ `clearTabs` 参数：允许保留或清除 Tab
- ✅ **推荐默认清除 Tab**（避免跨组织的 Tab 混乱）
- ✅ 切换后跳转首页（用户体验更好）

---

#### 3. 组织切换器 UI 组件

**文件**: `src/app/layout/basic-layout/widgets/org-switcher.component.ts`（新建）

**设计要点**:
- ✅ 100% Standalone Component
- ✅ OnPush 变更检测策略
- ✅ 使用 ng-zorro dropdown + avatar
- ✅ 使用 Signals 响应式状态
- ✅ 完整的样式和交互

```typescript
@Component({
  selector: 'org-switcher',
  standalone: true,
  template: `
    <div class="org-switcher-wrapper" 
         nz-dropdown 
         [nzDropdownMenu]="orgMenu" 
         nzTrigger="click"
         nzPlacement="bottomLeft">
      <div class="org-switcher-trigger">
        <nz-avatar 
          [nzSrc]="currentOrg()?.logo" 
          [nzText]="currentOrg()?.name?.[0]" 
          nzSize="default" 
        />
        <div class="org-info">
          <strong class="org-name">{{ currentOrg()?.name }}</strong>
          <small class="org-type">
            {{ currentOrg()?.type === 'personal' ? '個人空間' : '組織' }}
          </small>
        </div>
        <i nz-icon nzType="swap" class="swap-icon"></i>
      </div>
    </div>
    
    <nz-dropdown-menu #orgMenu="nzDropdownMenu">
      <ul nz-menu class="org-switcher-menu">
        @for (org of organizations(); track org.id) {
          <li nz-menu-item 
              (click)="switchOrg(org)" 
              class="org-menu-item"
              [class.org-menu-item-selected]="org.id === currentOrg()?.id">
            <nz-avatar [nzSrc]="org.logo" [nzText]="org.name[0]" nzSize="small" />
            <span class="org-menu-name">{{ org.name }}</span>
            @if (org.id === currentOrg()?.id) {
              <i nz-icon nzType="check" class="check-icon"></i>
            }
          </li>
        }
        <li nz-menu-divider></li>
        <li nz-menu-item routerLink="/organization/new">
          <i nz-icon nzType="plus-circle"></i>
          <span>{{ 'org.switcher.create-new' | i18n }}</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [`
    .org-switcher-wrapper {
      padding: 16px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .org-switcher-wrapper:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    .org-switcher-trigger {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .org-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .org-name {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
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
      font-size: 12px;
    }
    .org-switcher-menu {
      min-width: 200px;
    }
    .org-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .org-menu-name {
      flex: 1;
    }
    .check-icon {
      color: #1890ff;
      margin-left: auto;
    }
    .org-menu-item-selected {
      background-color: #e6f7ff;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzDropDownModule, 
    NzMenuModule, 
    NzIconModule, 
    NzAvatarModule, 
    RouterLink, 
    I18nPipe
  ]
})
export class OrgSwitcherComponent {
  private readonly orgSwitcherService = inject(OrganizationSwitcherService);
  
  readonly currentOrg = this.orgSwitcherService.currentOrg;
  readonly organizations = this.orgSwitcherService.organizations;
  
  switchOrg(org: OrganizationSwitcherItem): void {
    this.orgSwitcherService.switchOrganization(org.id);
  }
}
```

---

#### 4. 布局集成

**文件**: `src/app/layout/basic-layout/basic.component.ts`

**修改位置**: 
1. imports 数组添加 `OrgSwitcherComponent`
2. asideUserTpl 模板添加 `<org-switcher>`

```typescript
// Line ~21: 导入组件
import { OrgSwitcherComponent } from './widgets/org-switcher.component';

// Line ~83-96: 修改 asideUserTpl 模板
<ng-template #asideUserTpl>
  <!-- ✨ 新增：组织切换器 -->
  <org-switcher class="mb-md" />
  
  <li nz-menu-divider></li>
  
  <!-- 原有：用户信息 -->
  <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
    <nz-avatar class="alain-default__aside-user-avatar" [nzSrc]="user.avatar" />
    <div class="alain-default__aside-user-info">
      <strong>{{ user.name }}</strong>
      <p class="mb0">{{ user.email }}</p>
    </div>
  </div>
  <nz-dropdown-menu #userMenu="nzDropdownMenu">
    <ul nz-menu>
      <li nz-menu-item routerLink="/pro/account/center">{{ 'menu.account.center' | i18n }}</li>
      <li nz-menu-item routerLink="/pro/account/settings">{{ 'menu.account.settings' | i18n }}</li>
    </ul>
  </nz-dropdown-menu>
</ng-template>

// Line ~122: imports 数组
imports: [
  // ... 现有导入 ...
  OrgSwitcherComponent  // ← 新增
]
```

---

#### 5. Startup Service 初始化

**文件**: `src/app/core/startup/startup.service.ts`

**修改位置**: `load()` 方法（约 line 49-64）

```typescript
import { OrganizationSwitcherService } from '../services/organization-switcher/organization-switcher.service';

load(): Observable<void> {
  return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('./assets/tmp/app-data.json')).pipe(
    map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
      // ... 现有代码 ...
      
      // ✨ 新增：初始化组织切换器
      const orgSwitcherService = inject(OrganizationSwitcherService);
      if (appData.organizations) {
        orgSwitcherService.initialize(
          appData.organizations,
          appData.defaultOrganizationId || 'personal'
        );
      }
    })
  );
}
```

---

## 🔄 Tab 系统集成策略

### 策略 A：切换组织时清除所有 Tab（推荐）⭐⭐⭐⭐⭐

**理由**:
- ✅ 避免跨组织 Tab 混乱
- ✅ 用户体验更清晰
- ✅ 实现简单

**实现**:
```typescript
switchOrganization(orgId: string): void {
  // ...
  this.tabService.clearTabs();  // ← 清除所有 Tab
  this.router.navigateByUrl('/dashboard');  // 跳转首页
}
```

---

### 策略 B：保留 Tab，仅更新菜单

**理由**:
- ⚠️ 可能导致 Tab 对应的路由在新组织中无权限访问
- ⚠️ 实现复杂，需要权限检查

**实现**:
```typescript
switchOrganization(orgId: string): void {
  // ...
  // 不清除 Tab，仅更新菜单
  this.menuService.clear();
  this.menuService.add(newMenu);
  
  // 检查当前路由是否有权限
  const hasPermission = this.checkCurrentRoutePermission();
  if (!hasPermission) {
    this.router.navigateByUrl('/dashboard');
  }
}
```

---

### 策略 C：智能保留（高级）

**理由**:
- ✅ 保留有权限的 Tab
- ✅ 关闭无权限的 Tab
- ⚠️ 实现复杂

**实现**:
```typescript
switchOrganization(orgId: string): void {
  // ...
  const currentTabs = this.tabService.getTabList();
  
  // 过滤有权限的 Tab
  currentTabs.forEach(tab => {
    if (!this.hasPermissionForRoute(tab.url)) {
      this.tabService.closeTab(tab.url);
    }
  });
}
```

---

### 📋 推荐方案

**采用策略 A**（清除所有 Tab）

**原因**:
1. ✅ 最简单，最可靠
2. ✅ 用户体验清晰（明确知道切换了组织）
3. ✅ 避免权限问题
4. ✅ 避免跨组织数据混淆

**用户体验流程**:
```
1. 用户在"组织 A"中打开了 3 个 Tab
2. 用户切换到"个人空间"
3. 所有 Tab 清除，自动跳转到个人空间首页
4. 用户在新空间中重新打开需要的页面
```

---

## 📦 菜单动态加载设计

### 开发阶段：前端配置方式

**文件**: `src/assets/tmp/app-data.json`

```json
{
  "app": { ... },
  "user": { ... },
  "organizations": [
    {
      "id": "personal",
      "name": "個人空間",
      "type": "personal",
      "logo": "./assets/tmp/img/avatar.svg"
    },
    {
      "id": "org-1",
      "name": "我的組織",
      "type": "organization",
      "logo": "./assets/logo.svg",
      "role": "owner"
    },
    {
      "id": "org-2",
      "name": "技術部門",
      "type": "organization",
      "logo": "./assets/logo.svg",
      "role": "admin"
    }
  ],
  "menus": {
    "personal": [
      {
        "text": "個人導航",
        "group": true,
        "children": [
          {
            "text": "儀表板",
            "icon": "anticon-dashboard",
            "link": "/dashboard"
          }
        ]
      }
    ],
    "org-1": [
      {
        "text": "組織導航",
        "group": true,
        "children": [
          {
            "text": "儀表板",
            "icon": "anticon-dashboard",
            "link": "/dashboard"
          },
          {
            "text": "組織管理",
            "icon": "anticon-team",
            "link": "/organization",
            "children": [
              {
                "text": "部門管理",
                "link": "/organization/departments"
              },
              {
                "text": "員工管理",
                "link": "/organization/employees"
              },
              {
                "text": "角色管理",
                "link": "/organization/roles"
              }
            ]
          }
        ]
      }
    ],
    "org-2": [
      // 技术部门的菜单配置...
    ]
  },
  "defaultOrganizationId": "personal"
}
```

**菜单加载逻辑**:
```typescript
private loadMenuForOrganization(orgId: string): void {
  this.http.get('./assets/tmp/app-data.json').subscribe((data: any) => {
    const menuData = data.menus?.[orgId] || data.menus?.['personal'] || [];
    this.menuService.clear();
    this.menuService.add(menuData);
  });
}
```

---

### 生产阶段：后端 API 方式（未来）

**API 设计**:
```
GET /api/organizations/current/menu
Response: {
  menu: [...],           // 该组织的菜单结构
  permissions: [...],    // ACL 权限列表
  features: [...]        // 启用的功能特性
}
```

**迁移时只需修改服务**:
```typescript
private loadMenuForOrganization(orgId: string): void {
  this.http.get(`/api/organizations/${orgId}/menu`).subscribe(data => {
    this.menuService.clear();
    this.menuService.add(data.menu);
    this.aclService.setFull(data.permissions);
  });
}
```

---

## 🔧 国际化支持

### 翻译 Key 设计

```json
{
  "org.switcher.personal": "個人空間",
  "org.switcher.organization": "組織",
  "org.switcher.create-new": "新增組織",
  "org.switcher.switch": "切換空間",
  "org.switcher.current": "當前空間",
  "org.switcher.role.owner": "擁有者",
  "org.switcher.role.admin": "管理員",
  "org.switcher.role.member": "成員",
  "org.switcher.role.viewer": "訪客"
}
```

### 需要更新的语言文件

- src/assets/tmp/i18n/zh-TW.json
- src/assets/tmp/i18n/zh-CN.json
- src/assets/tmp/i18n/en-US.json
- ... 其他 9 种语言

---

## 🎯 实施步骤（详细）

### 阶段 1：核心功能（3-4 小时）

#### Step 1.1：扩展数据模型（15 分钟）
```bash
# 编辑文件
src/app/features/organization/models/organization.model.ts
# 在末尾添加 OrganizationSwitcherItem 接口
```

#### Step 1.2：创建组织切换服务（1 小时）
```bash
# 创建目录
mkdir src/app/core/services/organization-switcher

# 创建服务文件
# src/app/core/services/organization-switcher/organization-switcher.service.ts
# 实现完整的服务逻辑
```

#### Step 1.3：创建组织切换器组件（1.5 小时）
```bash
# 创建组件文件
# src/app/layout/basic-layout/widgets/org-switcher.component.ts
# 实现 UI 和交互逻辑
```

#### Step 1.4：集成到布局（30 分钟）
```bash
# 修改 basic.component.ts
# 1. 导入 OrgSwitcherComponent
# 2. 添加到 imports 数组
# 3. 在 asideUserTpl 中添加 <org-switcher>
```

#### Step 1.5：准备 Mock 数据（30 分钟）
```bash
# 修改 app-data.json
# 添加 organizations 和 menus 配置
```

#### Step 1.6：更新 core/index.ts（5 分钟）
```bash
# 添加 OrganizationSwitcherService 导出
```

#### Step 1.7：修改 startup.service（15 分钟）
```bash
# 在 load() 中初始化组织切换器
```

#### Step 1.8：测试基本功能（30 分钟）
```bash
npm start
# 测试切换功能、菜单更新、Tab 清除
```

---

### 阶段 2：国际化和样式（1 小时）

#### Step 2.1：添加翻译（30 分钟）
```bash
# 更新 12 种语言文件
# 添加 org.switcher.* 翻译
```

#### Step 2.2：样式优化（30 分钟）
```bash
# 优化 hover 效果
# 添加切换动画
# 响应式适配
```

---

### 阶段 3：测试和文档（1 小时）

#### Step 3.1：功能测试（30 分钟）
- [ ] 组织列表正确显示
- [ ] 切换功能正常工作
- [ ] 菜单动态更新
- [ ] Tab 正确清除
- [ ] localStorage 持久化
- [ ] 刷新页面后恢复

#### Step 3.2：编写文档（30 分钟）
- [ ] 创建使用指南
- [ ] 更新 README
- [ ] 添加 JSDoc 注释

---

## 🔍 Tab 系统兼容性验证

### 测试场景

#### 场景 1：切换组织清除 Tab
```
1. 在组织 A 中打开 3 个 Tab（部门、员工、角色）
2. 切换到个人空间
3. 验证：✅ 所有 Tab 被清除
4. 验证：✅ 自动跳转到个人空间首页
5. 验证：✅ 菜单更新为个人空间菜单
```

#### 场景 2：同组织内导航
```
1. 在组织 A 中打开 3 个 Tab
2. 不切换组织，正常导航
3. 验证：✅ Tab 系统正常工作
4. 验证：✅ 组件状态保存
5. 验证：✅ 滚动位置记忆
```

#### 场景 3：刷新页面后恢复
```
1. 切换到组织 A
2. 打开 2 个 Tab
3. 刷新页面（F5）
4. 验证：✅ 组织状态恢复（从 localStorage）
5. 验证：✅ Tab 状态恢复（SimpleReuseStrategy）
6. 验证：✅ 菜单正确加载
```

---

## ⚙️ 高级功能（可选）

### 1. HTTP Interceptor 自动添加组织 ID

**文件**: `src/app/core/net/default.interceptor.ts`

**修改位置**: `handleData` 函数

```typescript
function handleData(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  // 获取当前组织
  const orgSwitcherService = injector.get(OrganizationSwitcherService);
  const currentOrg = orgSwitcherService.currentOrg();
  
  // 为组织空间的请求添加组织 ID 头
  if (currentOrg && currentOrg.type === 'organization') {
    req = req.clone({
      setHeaders: {
        'X-Organization-Id': currentOrg.id
      }
    });
  }
  
  // ... 原有逻辑 ...
}
```

---

### 2. 路由守卫集成

**文件**: `src/app/features/organization/guards/organization.guard.ts`

**增强**: 检查当前组织类型

```typescript
export const organizationGuard: CanActivateFn = (route, state) => {
  const orgSwitcherService = inject(OrganizationSwitcherService);
  const currentOrg = orgSwitcherService.currentOrg();
  
  // 只有在组织空间中才能访问组织管理
  if (!currentOrg || currentOrg.type !== 'organization') {
    const notification = inject(NzNotificationService);
    const router = inject(Router);
    
    notification.warning('提示', '請先切換到組織空間');
    router.navigate(['/dashboard']);
    return false;
  }
  
  // ... 原有权限检查 ...
};
```

---

## 📈 预期效果

### 用户体验流程

```
1. 用户登录 → 默认进入"个人空间"
2. 看到侧边栏顶部显示"個人空間"
3. 菜单仅显示：Dashboard

4. 点击组织切换器 → 看到下拉菜单
5. 选择"我的組織" → 切换成功
6. 所有 Tab 清除，跳转到 Dashboard
7. 菜单更新显示：Dashboard + 組織管理

8. 打开"部門管理"、"員工管理" → 创建 2 个 Tab
9. 切换回"個人空間" → Tab 清除，菜单简化

10. 刷新页面 → 组织状态恢复到"個人空間"
```

---

## 🎊 设计优势

### 1. 零破坏性 ✅
- 不修改任何现有组件
- 不影响 Tab 系统核心逻辑
- 仅添加新功能

### 2. 完美集成 ✅
- 与 Tab 系统兼容
- 与 MenuService 集成
- 与 ACLService 集成
- 与 LayoutDefaultModule 集成

### 3. 渐进式实现 ✅
- 阶段 1：基础 UI + 切换功能
- 阶段 2：菜单动态加载
- 阶段 3：后端 API 集成

### 4. 可扩展性 ✅
- 支持无限组织
- 支持组织层级
- 支持角色权限
- 支持特性开关

---

## 📝 技术规格

### 依赖清单

**零新增依赖** ✅

使用现有依赖：
- @delon/theme (MenuService, SettingsService, _HttpClient)
- @delon/acl (ACLService)
- ng-zorro-antd (dropdown, menu, avatar, icon)
- @angular/core (Signals, inject)

### 兼容性

- ✅ Angular 20.3.0
- ✅ ng-alain 20.0.2
- ✅ ng-zorro-antd 20.3.1
- ✅ Tab 系统（Phase 3 已完成）
- ✅ 所有现有功能

---

## 🔗 相关文档

- [Tab 系统使用指南](../context/tab-system-guide.md)
- [Organization 模块设计](../../../src/app/features/organization/DESIGN.md)
- [ng-alain 架构文档](../../system-patterns/architecture/projectArchitecture.md)
- [榨取最终总结](../context/extraction-final-summary.md)

---

## ✅ 设计检查清单

### 架构检查
- [x] 不破坏现有结构
- [x] 与 Tab 系统兼容
- [x] 使用 Angular 最佳实践
- [x] 使用 ng-alain 标准服务
- [x] 零新增外部依赖

### 功能检查
- [x] 组织列表显示
- [x] 组织切换功能
- [x] 菜单动态更新
- [x] Tab 清除逻辑
- [x] localStorage 持久化
- [x] 刷新恢复状态

### 体验检查
- [x] UI 与现有风格一致
- [x] 响应式设计
- [x] 国际化支持
- [x] 无障碍支持
- [x] 平滑动画

---

**设计状态**: ✅ 完成  
**实施准备**: ✅ 就绪  
**预计工时**: 4-6 小时  
**下一步**: 开始实施

