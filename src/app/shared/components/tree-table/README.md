# TreeTable 樹狀表格組件

> **來源**: ng-antd-admin-ng17-mock  
> **用途**: 顯示樹狀結構數據（如組織架構、部門層級）

---

## 📋 功能特性

- ✅ 樹狀展開/收合
- ✅ 拖動列寬調整（NzResizable）
- ✅ 排序功能
- ✅ 分頁功能
- ✅ Checkbox 全選/單選
- ✅ 緩存展開狀態
- ✅ OnPush 性能優化
- ✅ Standalone 組件

---

## 🚀 使用範例

### 基本使用

```typescript
import { TreeTableComponent, AntTableConfig, TreeNodeInterface } from '@shared';

export class DeptComponent {
  tableConfig!: AntTableConfig;
  dataList: TreeNodeInterface[] = [];
  
  ngOnInit() {
    this.initTable();
    this.loadData();
  }
  
  private initTable(): void {
    this.tableConfig = {
      headers: [
        { title: '部門名稱', width: 230, field: 'departmentName' },
        { title: '排序', field: 'orderNum', width: 100 },
        { title: '創建時間', field: 'createTime', pipe: 'date:yyyy-MM-dd HH:mm', width: 180 },
        { title: '操作', tdTemplate: this.operationTpl, width: 180 }
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }
  
  loadData(): void {
    // 從 API 獲取扁平數據
    this.service.getDepts().subscribe(flatData => {
      // 轉換為樹狀結構
      const treeData = fnFlatDataHasParentToTree(flatData);
      // 扁平化為表格可用格式
      this.dataList = fnFlattenTreeDataByDataList(treeData);
    });
  }
}
```

### HTML 模板

```html
<app-tree-table
  [tableData]="dataList"
  [tableConfig]="tableConfig"
  (changePageNum)="getDataList($event)"
  (changePageSize)="changePageSize($event)">
</app-tree-table>

<!-- 操作列模板 -->
<ng-template #operationTpl let-id="id" let-fatherId="fatherId">
  <span class="operate-text" (click)="edit(id)">編輯</span>
  <span class="operate-text" (click)="delete(id)">刪除</span>
  <span class="operate-text" (click)="addChild(id)">添加下級</span>
</ng-template>
```

---

## 📊 配置項

### AntTableConfig

| 屬性 | 類型 | 必填 | 說明 |
|------|------|------|------|
| headers | `TableHeader[]` | 是 | 列配置數組 |
| total | `number` | 是 | 數據總數（分頁用） |
| pageSize | `number` | 是 | 每頁顯示數量 |
| pageIndex | `number` | 是 | 當前頁碼 |
| loading | `boolean` | 是 | 是否加載中 |
| showCheckbox | `boolean` | 否 | 是否顯示複選框 |
| needNoScroll | `boolean` | 否 | 是否不需要滾動條 |

### TableHeader

| 屬性 | 類型 | 必填 | 說明 |
|------|------|------|------|
| title | `string` | 是 | 列標題 |
| field | `string` | 否 | 數據字段名 |
| width | `number` | 否 | 列寬度（px） |
| pipe | `string` | 否 | 管道（如 `date:yyyy-MM-dd`） |
| tdTemplate | `TemplateRef` | 否 | 自定義單元格模板 |
| showSort | `boolean` | 否 | 是否顯示排序 |
| fixed | `boolean` | 否 | 是否固定列 |
| fixedDir | `'left' \| 'right'` | 否 | 固定方向 |

---

## 🔧 工具函數

### fnFlatDataHasParentToTree

將具有父子關係的扁平數據轉換為樹狀結構

```typescript
import { fnFlatDataHasParentToTree } from '@shared';

const flatData = [
  { id: 1, name: '總公司', fatherId: 0 },
  { id: 2, name: '研發部', fatherId: 1 },
  { id: 3, name: '前端組', fatherId: 2 }
];

const treeData = fnFlatDataHasParentToTree(flatData);
// 結果: [{ id: 1, name: '總公司', children: [...] }]
```

### fnFlattenTreeDataByDataList

將樹狀數據扁平化為表格可用格式

```typescript
import { fnFlattenTreeDataByDataList } from '@shared';

const tableData = fnFlattenTreeDataByDataList(treeData);
// 適合傳入 TreeTable 組件
```

---

## ⚠️ 注意事項

1. **數據格式**: 扁平數據必須包含 `id` 和 `fatherId` 字段
2. **頂層節點**: `fatherId` 為 `0` 或 `null` 的為頂層節點
3. **性能**: 使用 OnPush 變更檢測，需手動觸發 `markForCheck()`
4. **展開狀態**: 組件會自動緩存用戶的展開/收合狀態

---

**最後更新**: 2025-10-07  
**來源**: ng-antd-admin-ng17-mock  
**狀態**: ✅ 移植完成

