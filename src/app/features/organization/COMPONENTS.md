# 組織管理模組 - 組件設計指南

> 🎨 完整的組件設計規範與實現範例

## 📋 組件清單

### 核心組件
| 組件 | 路徑 | 描述 | 狀態 |
|------|------|------|------|
| OrganizationTreeComponent | `components/organization-tree/` | 組織架構樹視圖 | 📝 設計中 |
| DepartmentListComponent | `components/department-list/` | 部門列表 | 📝 設計中 |
| DepartmentFormComponent | `components/department-form/` | 部門表單 | 📝 設計中 |
| EmployeeListComponent | `components/employee-list/` | 員工列表 | 📝 設計中 |
| EmployeeFormComponent | `components/employee-form/` | 員工表單 | 📝 設計中 |
| RoleManagementComponent | `components/role-management/` | 角色管理 | 📝 設計中 |

---

## 🌳 OrganizationTreeComponent（組織架構樹）

### 組件概述
- **功能**: 展示和管理組織架構的樹狀結構
- **使用組件**: `nz-tree` (ng-zorro-antd)
- **特性**: 拖拽調整、搜尋過濾、右鍵選單、批次操作

### 組件結構
```typescript
@Component({
  selector: 'app-organization-tree',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTreeModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzModalModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationTreeComponent {
  // Signals
  nodes = signal<NzTreeNodeOptions[]>([]);
  loading = signal(false);
  searchValue = signal('');
  selectedNode = signal<NzTreeNodeOptions | null>(null);
  
  // Services
  private readonly orgService = inject(OrganizationService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  // Lifecycle
  ngOnInit(): void {
    this.loadOrganizationTree();
  }
  
  // Methods
  loadOrganizationTree(): void { }
  onNodeClick(event: NzFormatEmitEvent): void { }
  onNodeDrop(event: NzFormatEmitEvent): void { }
  onAddNode(parentNode?: NzTreeNodeOptions): void { }
  onEditNode(node: NzTreeNodeOptions): void { }
  onDeleteNode(node: NzTreeNodeOptions): void { }
}
```

### 模板結構
```html
<div class="organization-tree-container">
  <!-- 工具列 -->
  <div class="toolbar">
    <nz-input-group [nzPrefix]="prefixIconSearch">
      <input nz-input placeholder="搜尋組織" [(ngModel)]="searchValue" />
    </nz-input-group>
    <div class="toolbar-actions">
      <button nz-button (click)="expandAll()">展開全部</button>
      <button nz-button (click)="collapseAll()">收起全部</button>
      <button nz-button nzType="primary" *aclIf="'organization.create'" (click)="onAddNode()">
        新增組織
      </button>
    </div>
  </div>

  <!-- 組織樹 -->
  @if (loading()) {
    <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
  } @else if (filteredNodes().length > 0) {
    <nz-tree
      [nzData]="filteredNodes()"
      [nzDraggable]="true"
      (nzClick)="onNodeClick($event)"
      (nzOnDrop)="onNodeDrop($event)">
      <!-- Tree template -->
    </nz-tree>
  } @else {
    <nz-empty nzNotFoundContent="無組織資料"></nz-empty>
  }
</div>
```

### 樣式設計
```less
.organization-tree-container {
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    
    nz-input-group {
      width: 300px;
    }
    
    &-actions {
      display: flex;
      gap: 8px;
    }
  }
  
  .tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &-title {
      flex: 1;
    }
    
    &-actions {
      display: none;
      gap: 4px;
    }
    
    &:hover &-actions {
      display: flex;
    }
  }
}
```

---

## 📋 DepartmentListComponent（部門列表）

### 組件概述
- **功能**: 展示部門列表，支援搜尋、排序、分頁
- **使用組件**: `st` (@delon/abc)
- **特性**: 進階搜尋、批次操作、匯出功能

### ST 欄位配置
```typescript
columns: STColumn[] = [
  { title: '部門名稱', index: 'name', width: '20%' },
  { title: '所屬組織', index: 'organizationName', width: '20%' },
  { title: '負責人', index: 'manager.name', width: '15%' },
  { title: '成員數', index: 'memberCount', type: 'number', width: '10%' },
  { 
    title: '狀態', 
    index: 'status', 
    type: 'badge',
    badge: {
      active: { text: '正常', color: 'success' },
      inactive: { text: '停用', color: 'default' },
      restructuring: { text: '重組中', color: 'processing' },
      dissolved: { text: '已解散', color: 'error' }
    },
    width: '10%'
  },
  { title: '創建時間', index: 'createdAt', type: 'date', width: '15%' },
  {
    title: '操作',
    buttons: [
      { 
        text: '查看', 
        icon: 'eye',
        click: (item: Department) => this.onView(item) 
      },
      { 
        text: '編輯', 
        icon: 'edit',
        acl: 'department.edit',
        click: (item: Department) => this.onEdit(item) 
      },
      { 
        text: '刪除', 
        icon: 'delete',
        type: 'del',
        acl: 'department.delete',
        pop: {
          title: '確定要刪除此部門嗎？',
          okType: 'danger'
        },
        click: (item: Department) => this.onDelete(item) 
      }
    ],
    width: '10%'
  }
];
```

---

## 👥 EmployeeListComponent（員工列表）

### 組件概述
- **功能**: 展示員工列表，支援進階篩選、角色管理
- **使用組件**: `st` (@delon/abc)
- **特性**: 頭像展示、狀態管理、角色分配、批次操作

### 進階功能
1. **頭像展示**: 使用 `nz-avatar` 展示員工頭像
2. **狀態篩選**: 支援按狀態（在職/離職/休假）篩選
3. **角色標籤**: 使用 `nz-tag` 展示員工角色
4. **快速操作**: 內聯編輯、快速分配角色

---

## 📝 表單組件設計原則

### 1. 使用 Reactive Forms
```typescript
@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule]
})
export class DepartmentFormComponent {
  private readonly fb = inject(FormBuilder);
  
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    organizationId: ['', Validators.required],
    managerId: ['', Validators.required],
    description: [''],
    email: ['', Validators.email],
    location: ['']
  });
  
  onSubmit(): void {
    if (this.form.valid) {
      // Handle form submission
    }
  }
}
```

### 2. 驗證規則
- **必填欄位**: 使用 `Validators.required`
- **長度限制**: 使用 `Validators.minLength` / `maxLength`
- **格式驗證**: 使用 `Validators.pattern` 或自訂驗證器
- **即時反饋**: 使用 `nz-form-control` 的 `nzValidateStatus`

### 3. 用戶體驗
- **自動聚焦**: 表單開啟時自動聚焦第一個輸入框
- **Enter 提交**: 支援 Enter 鍵提交表單
- **草稿儲存**: 長表單支援自動儲存草稿
- **取消確認**: 有修改時取消前確認

---

## 🎨 UI/UX 設計規範

### 顏色系統
```less
// 狀態顏色
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;
@info-color: #1890ff;
@processing-color: #1890ff;

// 組織管理專用顏色
@org-primary: #1890ff;
@org-hover: #40a9ff;
@org-active: #096dd9;
```

### 間距規範
- **組件間距**: 16px
- **區塊間距**: 24px
- **頁面邊距**: 24px
- **卡片內邊距**: 24px

### 響應式設計
```less
// 斷點定義
@screen-xs: 480px;
@screen-sm: 576px;
@screen-md: 768px;
@screen-lg: 992px;
@screen-xl: 1200px;
@screen-xxl: 1600px;

// 響應式工具類
.hidden-xs {
  @media (max-width: @screen-xs) {
    display: none !important;
  }
}
```

---

## ⚡ 性能優化

### 1. OnPush 策略
所有組件使用 `ChangeDetectionStrategy.OnPush`

### 2. TrackBy 函數
```typescript
trackByFn(index: number, item: any): any {
  return item.id; // 使用唯一 ID 作為 track key
}
```

### 3. Virtual Scrolling
大型列表使用 `cdk-virtual-scroll-viewport`

### 4. Lazy Loading
路由級懶載入組件

---

## 🧪 測試策略

### 單元測試範例
```typescript
describe('DepartmentListComponent', () => {
  let component: DepartmentListComponent;
  let fixture: ComponentFixture<DepartmentListComponent>;
  let mockService: jasmine.SpyObj<DepartmentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DepartmentService', ['getDepartments']);

    await TestBed.configureTestingModule({
      imports: [DepartmentListComponent],
      providers: [
        { provide: DepartmentService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentListComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load departments on init', () => {
    const mockData: PagedResult<Department> = {
      data: [{ id: '1', name: 'Test Dept' }],
      total: 1,
      page: 1,
      pageSize: 10
    };
    
    mockService.getDepartments.and.returnValue(of(mockData));
    
    component.ngOnInit();
    
    expect(mockService.getDepartments).toHaveBeenCalled();
  });
});
```

---

## 📚 下一步

1. **實現組織架構樹組件** - Phase 2
2. **實現部門列表與表單** - Phase 2
3. **實現員工管理組件** - Phase 2
4. **實現角色管理組件** - Phase 3
5. **撰寫單元測試** - Phase 4
6. **撰寫 E2E 測試** - Phase 4

---

**注意**: 此文檔為組件設計指南，實際實現時請參考 [DESIGN.md](./DESIGN.md) 和 [README.md](./README.md)。

