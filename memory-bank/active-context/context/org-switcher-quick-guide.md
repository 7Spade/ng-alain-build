# 组织切换器快速实施指南（2 分钟速览）

> **⚡ 快速版** - 详细文档见 [完整设计](../../creative-phase/design-decisions/org-switcher-design.md)

---

## 🎯 一句话总结

在侧边栏顶部添加组织切换器，实现个人空间/组织空间切换，切换时清除所有 Tab 并动态加载菜单。

---

## 📁 文件清单（10 个）

### 新建文件（4 个）

```
1. core/services/organization-switcher/organization-switcher.service.ts  (150 行)
2. layout/basic-layout/widgets/org-switcher.component.ts                (120 行)
3. core/services/organization-switcher/index.ts                         (1 行)
4. layout/basic-layout/widgets/index.ts                                 (新建或追加)
```

### 修改文件（6 个）

```
5. features/organization/models/organization.model.ts      (+15 行：添加 OrganizationSwitcherItem 接口)
6. core/index.ts                                           (+1 行：导出服务)
7. layout/basic-layout/basic.component.ts                  (+4 行：导入组件 + 模板)
8. core/startup/startup.service.ts                         (+8 行：初始化)
9. assets/tmp/app-data.json                                (+60 行：organizations + menus)
10. assets/tmp/i18n/*.json                                 (12 个文件，每个 +4 行翻译)
```

---

## 🔄 Tab 系统集成（核心）

### 切换流程

```
用户切换组织
    ↓
TabService.clearTabs()        ← 清除所有 Tab
    ↓
MenuService.clear()           ← 清除旧菜单
    ↓
MenuService.add(newMenu)      ← 加载新菜单
    ↓
Router.navigateByUrl('/dashboard')  ← 跳转首页
```

### 为什么要清除 Tab？

```
✅ 避免跨组织 Tab 混乱
✅ 用户体验清晰（明确知道切换了空间）
✅ 避免权限问题（组织 A 的页面在组织 B 可能无权限）
✅ 避免数据混淆
```

---

## 🎨 视觉效果

### 侧边栏布局

```
┌────────────────────┐
│ [Logo] 我的組織 ▼  │ ← 组织切换器（新增）
├────────────────────┤
│ • Dashboard        │
│ • 組織管理         │ ← 菜单（动态）
├────────────────────┤
│ [头像] Admin       │ ← 用户信息（原有）
└────────────────────┘
```

### 下拉菜单

```
┌──────────────────────┐
│ [A] 個人空間      ✓  │ ← 当前选中
│ [M] 我的組織         │
│ [T] 技術部門         │
│ ──────────────────── │
│ [+] 新增組織         │
└──────────────────────┘
```

---

## ⏱️ 实施时间表

### 阶段 1：核心功能（3-4 小时）

```
1. 创建 OrganizationSwitcherService          (1 小时)
2. 创建 OrgSwitcherComponent                 (1.5 小时)
3. 修改 basic.component.ts 集成              (30 分钟)
4. 扩展 Organization 模型                    (15 分钟)
5. 准备 Mock 数据                            (30 分钟)
6. 测试基本功能                              (30 分钟)
```

### 阶段 2：国际化（1 小时）

```
7. 添加翻译（12 种语言）                     (30 分钟)
8. 样式优化                                  (30 分钟)
```

### 阶段 3：测试文档（1 小时）

```
9. 功能测试                                  (30 分钟)
10. 编写文档                                 (30 分钟)
```

**总计**: 4-6 小时

---

## ✅ 核心代码片段

### 服务核心方法

```typescript
switchOrganization(orgId: string): void {
  // 1. 更新状态
  this._currentOrg.set(targetOrg);
  localStorage.setItem('current_organization_id', orgId);
  
  // 2. ⭐ 清除 Tab（关键）
  this.tabService.clearTabs();
  
  // 3. 更新菜单
  this.menuService.clear();
  this.loadMenuForOrganization(orgId);
  
  // 4. 跳转首页
  this.router.navigateByUrl('/dashboard');
}
```

### 布局集成

```html
<ng-template #asideUserTpl>
  <!-- ✨ 新增 -->
  <org-switcher class="mb-md" />
  <li nz-menu-divider></li>
  
  <!-- 原有 -->
  <div nz-dropdown ...>
    <nz-avatar ... />
    ...
  </div>
</ng-template>
```

---

## 🎯 测试场景

### 场景 1：基本切换

```
1. 登录 → 显示"個人空間"
2. 点击切换器 → 看到下拉菜单
3. 选择"我的組織" → 切换成功
4. 验证：Tab 清除，菜单更新，跳转首页
```

### 场景 2：Tab 集成

```
1. 在组织 A 打开 3 个 Tab
2. 切换到个人空间
3. 验证：所有 Tab 被清除
4. 重新打开页面 → Tab 系统正常工作
```

### 场景 3：刷新恢复

```
1. 切换到组织 A
2. 刷新页面（F5）
3. 验证：组织状态恢复，菜单正确加载
```

---

## 🔗 快速导航

- **完整设计文档** → [org-switcher-design.md](../../creative-phase/design-decisions/org-switcher-design.md)
- **详细实施计划** → [org-switcher-implementation-plan.md](./org-switcher-implementation-plan.md)
- **Tab 系统文档** → [tab-system-guide.md](./tab-system-guide.md)
- **Organization 模块** → [../../../src/app/features/organization/README.md](../../../src/app/features/organization/README.md)

---

## ⚙️ 技术栈

```
零新增依赖 ✅

使用现有：
- Angular Signals（状态管理）
- @delon/theme（MenuService）
- TabService（Phase 3 已实现）
- ng-zorro（dropdown, avatar, menu）
```

---

**准备状态**: ✅ 设计完成，可立即实施  
**预计工时**: 4-6 小时  
**风险评估**: 低（零破坏性）



