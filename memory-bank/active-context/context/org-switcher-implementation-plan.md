# 组织切换器实施计划

**计划日期**: 2025-10-07  
**复杂度**: Level 3（中型功能）  
**预计时间**: 4-6 小时  
**与 Tab 系统集成**: ✅ 完全兼容

---

## 📋 实施总览

### 目标
实现个人空间/组织空间切换功能，显示在侧边栏顶部，切换时动态加载菜单，并清除所有 Tab。

### 核心特性
- ✅ 侧边栏顶部组织切换器
- ✅ 下拉选择个人/组织空间
- ✅ 切换时动态加载菜单
- ✅ **切换时清除所有 Tab**（与 Tab 系统集成）
- ✅ localStorage 持久化选择
- ✅ 刷新页面后恢复状态

---

## 📁 文件创建/修改清单

### 新建文件（4 个）

#### 1. 组织切换服务
**路径**: `src/app/core/services/organization-switcher/organization-switcher.service.ts`

**创建目录**:
```bash
mkdir src/app/core/services/organization-switcher
```

**文件内容**: ~150 行
- OrganizationSwitcherService 类
- 使用 Signals 管理状态
- 集成 MenuService、TabService
- localStorage 持久化

---

#### 2. 组织切换器组件
**路径**: `src/app/layout/basic-layout/widgets/org-switcher.component.ts`

**文件内容**: ~120 行
- Standalone Component
- ng-zorro dropdown + avatar
- 样式内联
- OnPush 策略

---

#### 3. 组织切换服务索引
**路径**: `src/app/core/services/organization-switcher/index.ts`

**文件内容**: 1 行
```typescript
export * from './organization-switcher.service';
```

---

#### 4. 组织切换器组件索引
**路径**: `src/app/layout/basic-layout/widgets/index.ts`

**文件内容**: 新建或追加
```typescript
export * from './org-switcher.component';
```

---

### 修改文件（6 个）

#### 1. 扩展 Organization 模型
**路径**: `src/app/features/organization/models/organization.model.ts`

**修改内容**: 在文件末尾添加
```typescript
/**
 * 组织切换器数据项
 */
export interface OrganizationSwitcherItem {
  id: string;
  name: string;
  type: 'personal' | 'organization';
  logo?: string;
  role?: 'owner' | 'admin' | 'member' | 'viewer';
}
```

**行数**: +15 行

---

#### 2. 导出组织切换服务
**路径**: `src/app/core/index.ts`

**修改内容**: 添加导出
```typescript
export * from './services/organization-switcher';
```

**行数**: +1 行

---

#### 3. 集成到布局组件
**路径**: `src/app/layout/basic-layout/basic.component.ts`

**修改位置 1**: imports（约 line 21）
```typescript
import { OrgSwitcherComponent } from './widgets/org-switcher.component';
```

**修改位置 2**: Component imports 数组（约 line 122）
```typescript
imports: [
  // ... 现有导入 ...
  OrgSwitcherComponent  // ← 新增
]
```

**修改位置 3**: asideUserTpl 模板（约 line 83-96）
```typescript
<ng-template #asideUserTpl>
  <!-- ✨ 新增：组织切换器 -->
  <org-switcher class="mb-md" />
  
  <li nz-menu-divider></li>
  
  <!-- 原有：用户信息 -->
  <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
    <!-- ... 保持不变 ... -->
  </div>
  <!-- ... -->
</ng-template>
```

**行数**: +4 行（导入 + 模板）

---

#### 4. Startup Service 初始化
**路径**: `src/app/core/startup/startup.service.ts`

**修改位置 1**: 导入（约 line 10）
```typescript
import { OrganizationSwitcherService } from './services/organization-switcher/organization-switcher.service';
```

**修改位置 2**: load() 方法（约 line 55-64）
```typescript
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
```

**行数**: +8 行

---

#### 5. Mock 数据配置
**路径**: `src/assets/tmp/app-data.json`

**修改内容**: 添加组织配置

```json
{
  "app": { ... },
  "user": { ... },
  "menu": [ ... ],
  
  // ✨ 新增：组织列表
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
    }
  ],
  
  // ✨ 新增：不同空间的菜单配置
  "menus": {
    "personal": [
      {
        "text": "主導航",
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
        "text": "主導航",
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
    ]
  },
  
  // ✨ 新增：默认组织
  "defaultOrganizationId": "personal"
}
```

**行数**: +60 行（JSON 配置）

---

#### 6. 国际化翻译
**路径**: `src/assets/tmp/i18n/*.json`（12 个文件）

**修改内容**: 在每个语言文件中添加

```json
{
  "org.switcher.personal": "個人空間",
  "org.switcher.organization": "組織",
  "org.switcher.create-new": "新增組織",
  "org.switcher.switch": "切換空間"
}
```

**文件数**: 12 个语言文件

---

## 🔄 Tab 系统集成详细设计

### 集成点 1：TabService 调用

在 `OrganizationSwitcherService.switchOrganization()` 中：

```typescript
switchOrganization(orgId: string): void {
  // ...
  
  // ✅ 清除所有 Tab
  this.tabService.clearTabs();
  
  // ✅ 清除菜单
  this.menuService.clear();
  
  // ✅ 加载新菜单
  this.loadMenuForOrganization(orgId);
  
  // ✅ 跳转首页
  this.router.navigateByUrl('/dashboard');
}
```

### 集成点 2：SimpleReuseStrategy 无冲突

**原理**: 
- SimpleReuseStrategy 存储在静态变量 `handlers` 中
- 调用 `tabService.clearTabs()` 会清空 handlers
- 不影响 RouteReuseStrategy 的逻辑
- 切换组织后，新打开的路由会正常创建 Tab

### 集成点 3：避免状态泄漏

```typescript
// TabService.clearTabs() 实现（已存在）
clearTabs(): void {
  this._tabList.set([]);
  SimpleReuseStrategy.handlers = {};       // ← 清除组件缓存
  SimpleReuseStrategy.scrollHandlers = {}; // ← 清除滚动位置
}
```

---

## 🧪 测试计划

### 单元测试（可选）

```typescript
// org-switcher.service.spec.ts
describe('OrganizationSwitcherService', () => {
  it('should switch organization and clear tabs', () => {
    const service = TestBed.inject(OrganizationSwitcherService);
    const tabService = TestBed.inject(TabService);
    
    spyOn(tabService, 'clearTabs');
    
    service.switchOrganization('org-1');
    
    expect(tabService.clearTabs).toHaveBeenCalled();
  });
});
```

### 集成测试

#### 测试 1：切换组织清除 Tab
```
前置条件：
1. 登录系统
2. 在组织 A 中打开 3 个 Tab

操作：
1. 点击组织切换器
2. 选择"个人空间"

验证：
✅ 所有 Tab 被清除
✅ 菜单更新为个人空间菜单
✅ 自动跳转到 /dashboard
✅ currentOrg 更新为 'personal'
```

#### 测试 2：刷新页面恢复
```
操作：
1. 切换到组织 A
2. 刷新页面（F5）

验证：
✅ 组织状态恢复（从 localStorage）
✅ 菜单正确加载（组织 A 的菜单）
✅ Tab 状态恢复（如果有保存的 Tab）
```

#### 测试 3：权限集成
```
操作：
1. 在"个人空间"访问 /organization/departments

验证：
⚠️ 路由守卫阻止访问
⚠️ 提示"请先切换到组织空间"
```

---

## 📊 工作量估算

### 总工时：4-6 小时

| 阶段 | 任务 | 时间 |
|------|------|------|
| **阶段 1** | 创建服务和组件 | 3 小时 |
| - | 创建 OrganizationSwitcherService | 1 小时 |
| - | 创建 OrgSwitcherComponent | 1.5 小时 |
| - | 修改布局集成 | 30 分钟 |
| **阶段 2** | 数据和初始化 | 1 小时 |
| - | 准备 Mock 数据 | 30 分钟 |
| - | 修改 startup.service | 15 分钟 |
| - | 更新导出文件 | 15 分钟 |
| **阶段 3** | 国际化和测试 | 1-2 小时 |
| - | 添加翻译（12 种语言） | 30 分钟 |
| - | 功能测试 | 30 分钟 |
| - | 样式优化 | 30 分钟 |

---

## 🎯 实施优先级

### P0（必须完成）
- [x] 设计方案（已完成）
- [ ] 创建 OrganizationSwitcherService
- [ ] 创建 OrgSwitcherComponent
- [ ] 修改 basic.component.ts 集成
- [ ] 准备 Mock 数据

### P1（强烈推荐）
- [ ] 添加国际化翻译
- [ ] Tab 系统集成测试
- [ ] 样式和动画优化

### P2（可选增强）
- [ ] HTTP Interceptor 集成
- [ ] 路由守卫增强
- [ ] 后端 API 对接准备

---

## 🔗 依赖关系

```
OrganizationSwitcherService
  ├── depends on: MenuService (@delon/theme)
  ├── depends on: TabService (Phase 3 已实现)
  ├── depends on: ACLService (@delon/acl)
  ├── depends on: Router (@angular/router)
  └── depends on: _HttpClient (@delon/theme)

OrgSwitcherComponent
  ├── depends on: OrganizationSwitcherService
  ├── depends on: NzDropDownModule (ng-zorro)
  ├── depends on: NzAvatarModule (ng-zorro)
  └── depends on: NzMenuModule (ng-zorro)

basic.component.ts
  └── depends on: OrgSwitcherComponent
```

---

## 🎨 与现有系统的关系

### 与 Tab 系统的关系 ⭐

```
组织切换触发 → OrganizationSwitcherService.switchOrganization()
                ↓
          调用 TabService.clearTabs()
                ↓
          清空 SimpleReuseStrategy.handlers
                ↓
          所有 Tab 被清除，组件缓存被释放
                ↓
          MenuService.clear() + add(newMenu)
                ↓
          Router.navigateByUrl('/dashboard')
                ↓
          用户在新空间中重新打开页面
```

### 与 MenuService 的关系

```
初始化：app-data.json → StartupService → MenuService.add(menu)
                                              ↓
                                        显示默认菜单

切换组织：OrganizationSwitcherService.switchOrganization()
              ↓
        MenuService.clear()  // 清除旧菜单
              ↓
        MenuService.add(newMenu)  // 添加新菜单
              ↓
        侧边栏菜单自动更新
```

### 与 ACLService 的关系（可选）

```
切换组织 → 加载新菜单 + 新权限
              ↓
        ACLService.setFull(permissions)
              ↓
        元素级权限自动生效（Auth 指令）
```

---

## 📖 使用场景

### 场景 1：个人空间使用

```
1. 用户登录 → 默认"個人空間"
2. 侧边栏显示：
   ┌────────────────┐
   │ [A] 個人空間 ▼ │
   └────────────────┘
3. 菜单仅显示：Dashboard（个人相关页面）
4. 无"组织管理"菜单项
```

### 场景 2：切换到组织空间

```
1. 点击组织切换器
2. 下拉菜单显示：
   ┌──────────────────────┐
   │ [A] 個人空間      ✓  │
   │ [M] 我的組織         │
   │ [T] 技術部門         │
   │ ──────────────────── │
   │ [+] 新增組織         │
   └──────────────────────┘
3. 选择"我的組織"
4. Tab 全部清除
5. 菜单更新：Dashboard + 組織管理
6. 自动跳转到 /dashboard
```

### 场景 3：组织空间使用

```
1. 当前空间："我的組織"
2. 打开"部門管理"→ 创建 Tab 1
3. 打开"員工管理"→ 创建 Tab 2
4. Tab 系统正常工作：
   - 点击 Tab 切换
   - 组件状态保存
   - 滚动位置记忆
```

### 场景 4：切换回个人空间

```
1. 当前在"我的組織"，有 2 个 Tab
2. 切换到"個人空間"
3. 所有 Tab 清除
4. 菜单简化为个人菜单
5. 跳转到 /dashboard
```

---

## 🔧 核心代码模板

### OrganizationSwitcherService 核心方法

```typescript
/**
 * 切换组织
 * @param orgId 目标组织 ID
 */
switchOrganization(orgId: string): void {
  const targetOrg = this._organizations().find(o => o.id === orgId);
  if (!targetOrg || targetOrg.id === this._currentOrg()?.id) {
    return;
  }
  
  // 1. 更新当前组织状态
  this._currentOrg.set(targetOrg);
  localStorage.setItem(STORAGE_KEY, orgId);
  
  // 2. ⭐ 清除所有 Tab（与 Tab 系统集成）
  this.tabService.clearTabs();
  
  // 3. 清除旧菜单
  this.menuService.clear();
  
  // 4. 加载新菜单
  this.loadMenuForOrganization(orgId);
  
  // 5. 跳转到首页
  this.router.navigateByUrl('/dashboard');
  
  // 6. 用户反馈
  this.message.success(`已切換至 ${targetOrg.name}`);
}

/**
 * 加载组织菜单
 */
private loadMenuForOrganization(orgId: string): void {
  this.http.get('./assets/tmp/app-data.json').subscribe((data: any) => {
    // 从 menus[orgId] 获取菜单，如果没有则使用默认 menu
    const menuData = data.menus?.[orgId] || data.menu;
    this.menuService.add(menuData);
  });
}
```

---

## 🎊 设计优势

### 1. 零破坏性 ✅
```
✅ 不修改 Tab 系统核心代码
✅ 不修改 MenuService
✅ 不修改 Layout 核心结构
✅ 仅添加新组件
```

### 2. Tab 系统完美兼容 ✅
```
✅ 切换组织自动清除 Tab
✅ 避免跨组织 Tab 混乱
✅ 用户体验清晰明确
✅ 实现简单可靠
```

### 3. 渐进式实现 ✅
```
阶段 1: UI + 基础切换（3 小时）
阶段 2: 菜单动态加载（1 小时）
阶段 3: 国际化和优化（1-2 小时）
```

### 4. 可扩展性 ✅
```
✅ 支持无限组织
✅ 支持角色权限
✅ 支持后端 API 迁移
✅ 支持多租户架构
```

---

## 📈 预期效果

### 用户体验提升

**Before（无组织切换）**:
```
❌ 所有用户看到相同菜单
❌ 无法区分个人/组织空间
❌ 组织功能对个人用户不友好
```

**After（有组织切换）**:
```
✅ 个人空间：简洁菜单，仅个人功能
✅ 组织空间：完整菜单，包含组织管理
✅ 清晰的空间切换，避免混淆
✅ Tab 自动清除，无跨空间污染
```

---

## 🔍 与 Phase 3 Tab 系统的对比

### Phase 3 实现的功能
- ✅ Tab 多页签管理
- ✅ 组件状态保存（RouteReuseStrategy）
- ✅ 滚动位置记忆（ScrollService）
- ✅ 右键菜单（5 种操作）
- ✅ 生命周期钩子（_onReuseInit/_onReuseDestroy）

### 组织切换器新增功能
- ✅ 个人/组织空间概念
- ✅ 组织切换 UI
- ✅ 菜单动态加载
- ✅ **与 Tab 集成：切换时清除 Tab**
- ✅ localStorage 持久化选择

### 协同工作
```
用户切换组织 → OrganizationSwitcherService
                    ↓
              清除所有 Tab (TabService.clearTabs)
                    ↓
              更新菜单 (MenuService)
                    ↓
              跳转首页 (Router)
                    ↓
用户重新打开页面 → Tab 系统正常工作
                    ↓
              组件状态保存 ✅
              滚动位置记忆 ✅
```

---

## 📋 实施检查清单

### 代码实施
- [ ] 创建 OrganizationSwitcherService
- [ ] 创建 OrgSwitcherComponent
- [ ] 修改 basic.component.ts
- [ ] 扩展 Organization 模型
- [ ] 修改 startup.service.ts
- [ ] 更新 core/index.ts

### 数据准备
- [ ] 修改 app-data.json（组织列表）
- [ ] 修改 app-data.json（菜单配置）
- [ ] 添加国际化翻译（12 种语言）

### 测试验证
- [ ] 组织列表显示正确
- [ ] 切换功能正常
- [ ] Tab 被正确清除
- [ ] 菜单动态更新
- [ ] 刷新后状态恢复
- [ ] 编译无错误

### 文档更新
- [ ] 更新 Memory Bank
- [ ] 创建使用指南
- [ ] 添加 JSDoc 注释
- [ ] 更新 README

---

## 🔗 相关文档

- [组织切换器设计决策](../../creative-phase/design-decisions/org-switcher-design.md)
- [Tab 系统使用指南](./tab-system-guide.md)
- [Organization 模块设计](../../../src/app/features/organization/DESIGN.md)
- [榨取最终总结](./extraction-final-summary.md)

---

**设计完成**: ✅  
**准备状态**: ✅ 可以开始实施  
**预计评分提升**: 92/100 → 94/100 (+2 分)



