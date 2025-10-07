# 组织切换器文件操作检查清单

**创建日期**: 2025-10-07  
**总文件数**: 10 个（4 新建 + 6 修改）  
**预计工时**: 4-6 小时

---

## ✨ 新建文件（4 个）

### 1️⃣ 组织切换服务
```
📁 src/app/core/services/organization-switcher/
   └── organization-switcher.service.ts

行数：~150 行
内容：
  - OrganizationSwitcherService 类
  - Signal 状态管理
  - switchOrganization() 方法
  - Tab 系统集成（clearTabs）
  - MenuService 集成
  - localStorage 持久化
```

### 2️⃣ 组织切换器组件
```
📁 src/app/layout/basic-layout/widgets/
   └── org-switcher.component.ts

行数：~120 行
内容：
  - Standalone Component
  - ng-zorro dropdown + avatar
  - 内联样式
  - OnPush 策略
  - Signal 响应式
```

### 3️⃣ 服务索引文件
```
📁 src/app/core/services/organization-switcher/
   └── index.ts

行数：1 行
内容：export * from './organization-switcher.service';
```

### 4️⃣ 组件索引文件（可选）
```
📁 src/app/layout/basic-layout/widgets/
   └── index.ts

行数：1 行
内容：export * from './org-switcher.component';
```

---

## 🔧 修改文件（6 个）

### 1️⃣ 扩展 Organization 模型
```
📄 src/app/features/organization/models/organization.model.ts

修改位置：文件末尾
修改内容：添加 OrganizationSwitcherItem 接口
行数：+15 行

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

### 2️⃣ 导出组织切换服务
```
📄 src/app/core/index.ts

修改位置：文件末尾
修改内容：添加导出
行数：+1 行

export * from './services/organization-switcher';
```

### 3️⃣ 布局组件集成
```
📄 src/app/layout/basic-layout/basic.component.ts

修改位置 1：Line ~21（imports）
import { OrgSwitcherComponent } from './widgets/org-switcher.component';

修改位置 2：Line ~122（Component imports 数组）
imports: [
  // ... 现有导入 ...
  OrgSwitcherComponent  // ← 新增
]

修改位置 3：Line ~83-96（asideUserTpl 模板）
<ng-template #asideUserTpl>
  <org-switcher class="mb-md" />       ← 新增
  <li nz-menu-divider></li>            ← 新增
  
  <div nz-dropdown ...>  <!-- 原有用户信息 -->
    ...
  </div>
</ng-template>

总行数：+4 行
```

### 4️⃣ Startup Service 初始化
```
📄 src/app/core/startup/startup.service.ts

修改位置 1：Line ~10（imports）
import { OrganizationSwitcherService } from './services/organization-switcher/organization-switcher.service';

修改位置 2：Line ~55-64（load() 方法）
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

总行数：+8 行
```

### 5️⃣ Mock 数据配置
```
📄 src/assets/tmp/app-data.json

修改位置：根对象
修改内容：添加 organizations、menus、defaultOrganizationId

{
  "app": { ... },
  "user": { ... },
  "menu": [ ... ],  // ← 保留原有
  
  // ✨ 新增
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
  
  // ✨ 新增
  "menus": {
    "personal": [ ... 个人空间菜单 ],
    "org-1": [ ... 组织菜单 ]
  },
  
  // ✨ 新增
  "defaultOrganizationId": "personal"
}

总行数：+60 行
```

### 6️⃣ 国际化翻译
```
📄 src/assets/tmp/i18n/*.json（12 个文件）

修改文件：
  - zh-TW.json
  - zh-CN.json
  - en-US.json
  - tr-TR.json
  - sl-SI.json
  - pl-PL.json
  - ko-KR.json
  - it-IT.json
  - hr-HR.json
  - fr-FR.json
  - es-ES.json
  - el-GR.json

修改内容（每个文件）：
{
  // ... 现有翻译 ...
  
  // ✨ 新增
  "org.switcher.personal": "個人空間",
  "org.switcher.organization": "組織",
  "org.switcher.create-new": "新增組織",
  "org.switcher.switch": "切換空間"
}

每个文件：+4 行
总计：12 文件 × 4 行 = 48 行
```

---

## 📊 实施进度跟踪

### 新建文件进度

- [ ] 1. organization-switcher.service.ts（1 小时）
- [ ] 2. org-switcher.component.ts（1.5 小时）
- [ ] 3. organization-switcher/index.ts（1 分钟）
- [ ] 4. widgets/index.ts（1 分钟，可选）

### 修改文件进度

- [ ] 5. organization.model.ts（15 分钟）
- [ ] 6. core/index.ts（1 分钟）
- [ ] 7. basic.component.ts（30 分钟）
- [ ] 8. startup.service.ts（15 分钟）
- [ ] 9. app-data.json（30 分钟）
- [ ] 10. i18n/*.json 12 文件（30 分钟）

### 测试验证进度

- [ ] 编译测试（npm run build）
- [ ] 组织列表显示测试
- [ ] 切换功能测试
- [ ] Tab 清除测试
- [ ] 菜单更新测试
- [ ] 刷新恢复测试
- [ ] 国际化测试

---

## 🎯 关键集成点

### 与 Tab 系统集成

```typescript
// OrganizationSwitcherService 中
private readonly tabService = inject(TabService);  // ← 注入 TabService

switchOrganization(orgId: string): void {
  // ...
  this.tabService.clearTabs();  // ← 调用清除方法
  // ...
}
```

### 与 MenuService 集成

```typescript
// OrganizationSwitcherService 中
private readonly menuService = inject(MenuService);

switchOrganization(orgId: string): void {
  // ...
  this.menuService.clear();              // ← 清除旧菜单
  this.loadMenuForOrganization(orgId);   // ← 加载新菜单
  // ...
}
```

### 与 Startup Service 集成

```typescript
// startup.service.ts 中
const orgSwitcherService = inject(OrganizationSwitcherService);
orgSwitcherService.initialize(
  appData.organizations,
  appData.defaultOrganizationId
);
```

---

## 📋 依赖文件检查

### 确保这些文件存在

```
✅ src/app/core/services/tab/tab.service.ts              (Phase 3 已完成)
✅ src/app/core/services/tab/simple-reuse-strategy.ts   (Phase 3 已完成)
✅ src/app/layout/widgets/tab/tab.component.ts          (Phase 3 已完成)
✅ src/app/features/organization/models/organization.model.ts
✅ src/app/core/startup/startup.service.ts
✅ src/app/layout/basic-layout/basic.component.ts
```

---

## 🔍 快速验证命令

### 检查目录是否存在
```bash
# 检查 Tab 系统（Phase 3）
ls src/app/core/services/tab/

# 检查布局 widgets
ls src/app/layout/basic-layout/widgets/

# 检查 organization 模型
ls src/app/features/organization/models/
```

### 编译测试
```bash
npm run build
```

### 启动开发服务器
```bash
npm start
```

---

## ⚡ 快速实施路径

### 最小可行路径（3 小时）

```
1. 创建 OrganizationSwitcherService          (1 小时)
2. 创建 OrgSwitcherComponent                 (1 小时)
3. 修改 basic.component.ts                   (15 分钟)
4. 修改 organization.model.ts                (5 分钟)
5. 修改 core/index.ts                        (1 分钟)
6. 准备简单 Mock 数据                        (15 分钟)
7. 修改 startup.service.ts                   (10 分钟)
8. 编译测试                                  (15 分钟)

跳过：
- 国际化（先用硬编码中文）
- 样式优化（使用基础样式）
- 完整测试（仅基本功能测试）
```

### 完整实施路径（6 小时）

```
按照上述 10 个文件逐个完成
+ 12 种语言翻译
+ 完整测试
+ 样式优化
```

---

**状态**: 📋 设计完成，清单就绪  
**下一步**: 开始实施  
**推荐**: 先实施最小可行路径（3 小时），测试通过后再完善

