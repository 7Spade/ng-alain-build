# OrganizationFormComponent 使用指南

## 📋 組件概述

`OrganizationFormComponent` 是一個用於新增/編輯組織的 **Modal 表單組件**，設計為配合 `NzModalService` 使用。

## 🎯 設計決策

### 為什麼使用 Modal（彈窗）而非獨立頁面？

**經過 VAN 模式 + Context7 + Sequential Thinking 三方協作分析，決定使用 Modal：**

1. ✅ **表單複雜度適中**：6 個欄位（2 必填 + 4 可選），完全適合 Modal
2. ✅ **用戶體驗流暢**：不離開當前頁面，完成即關閉
3. ✅ **符合專案模式**：部門/員工管理都使用 Modal
4. ✅ **Tab 系統兼容**：不產生額外 Tab，避免手動關閉
5. ✅ **ng-zorro-antd 最佳實踐**：官方推薦 Modal 用於表單操作

---

## 🚀 基本使用

### 方式一：使用 NzModalService（推薦）

```typescript
import { Component, inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrganizationFormComponent } from '@features/organization/components/organization-form';
import { OrganizationService } from '@features/organization/services/organization.service';

@Component({
  selector: 'app-example',
  template: `
    <button nz-button nzType="primary" (click)="openCreateModal()">
      <i nz-icon nzType="plus"></i>
      新增組織
    </button>
  `
})
export class ExampleComponent {
  private modalSrv = inject(NzModalService);
  private orgService = inject(OrganizationService);
  private message = inject(NzMessageService);

  /**
   * 打開新增組織 Modal
   */
  openCreateModal(): void {
    const modal = this.modalSrv.create({
      nzTitle: '新增組織',
      nzContent: OrganizationFormComponent,
      nzWidth: window.innerWidth < 768 ? '90%' : 600,  // 響應式寬度
      nzMaskClosable: false,  // 防止誤觸關閉
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        },
        {
          label: '確定',
          type: 'primary',
          autoLoading: true,  // 自動處理 loading 狀態
          onClick: (componentInstance) => {
            // 調用組件的 submit 方法
            return componentInstance.submit().then((formValue) => {
              // 提交到後端
              return this.orgService.createOrganization(formValue).toPromise().then(() => {
                this.message.success('組織創建成功');
                // 重新加載列表
                this.reloadList();
                modal.destroy();
              });
            }).catch((error) => {
              // 驗證失敗時不關閉 Modal
              console.error('表單驗證失敗', error);
            });
          }
        }
      ]
    });
  }

  reloadList(): void {
    // 重新加載組織列表
  }
}
```

---

### 方式二：編輯模式

```typescript
/**
 * 打開編輯組織 Modal
 */
openEditModal(orgId: string): void {
  // 先獲取組織數據
  this.orgService.getOrganizationById(orgId).subscribe((org) => {
    const modal = this.modalSrv.create({
      nzTitle: '編輯組織',
      nzContent: OrganizationFormComponent,
      nzWidth: 600,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        },
        {
          label: '保存',
          type: 'primary',
          autoLoading: true,
          onClick: (componentInstance) => {
            return componentInstance.submit().then((formValue) => {
              return this.orgService.updateOrganization(orgId, formValue).toPromise().then(() => {
                this.message.success('組織更新成功');
                this.reloadList();
                modal.destroy();
              });
            });
          }
        }
      ]
    });

    // 設置表單初始值
    const formInstance = modal.getContentComponent() as OrganizationFormComponent;
    formInstance.setValue({
      name: org.name,
      type: org.type,
      parentId: org.parentId,
      code: org.code,
      description: org.description,
      order: org.order
    });
  });
}
```

---

## 🏗️ 組件 API

### 公開方法

#### `submit(): Promise<CreateOrganizationRequest>`

提交表單並返回表單數據。

**返回值**：
- 成功：`Promise<CreateOrganizationRequest>` 表單數據
- 失敗：`Promise.reject(Error)` 驗證失敗

**示例**：
```typescript
const formInstance = modal.getContentComponent() as OrganizationFormComponent;
formInstance.submit().then((data) => {
  console.log('表單數據:', data);
  // { name: '技術部', type: 'department', ... }
});
```

---

#### `setValue(data: Partial<CreateOrganizationRequest>): void`

設置表單值（用於編輯模式）。

**參數**：
- `data`: 部分或完整的組織數據

**示例**：
```typescript
formInstance.setValue({
  name: '技術部',
  type: OrganizationType.Department,
  description: '負責技術開發'
});
```

---

#### `reset(): void`

重置表單到初始狀態。

**示例**：
```typescript
formInstance.reset();
```

---

### 表單欄位

| 欄位 | 類型 | 必填 | 驗證規則 | 說明 |
|-----|------|------|---------|------|
| `name` | string | ✅ | maxLength(50) | 組織名稱 |
| `type` | OrganizationType | ✅ | - | 組織類型（公司/事業部/部門/團隊/小組） |
| `parentId` | string \| null | ❌ | - | 父組織 ID（樹狀選擇） |
| `code` | string | ❌ | maxLength(20) | 組織編碼 |
| `description` | string | ❌ | maxLength(200) | 組織描述 |
| `order` | number | ❌ | min(0) | 排序順序 |

---

## 🎨 樣式自定義

### 自定義 Modal 寬度

```typescript
this.modalSrv.create({
  nzWidth: 700,  // 固定寬度
  // 或
  nzWidth: '80%',  // 百分比寬度
  // 或
  nzWidth: window.innerWidth < 768 ? '95%' : 600,  // 響應式
});
```

---

### 自定義 Modal 樣式

```typescript
this.modalSrv.create({
  nzClassName: 'custom-org-modal',  // 自定義 CSS 類
  nzStyle: { top: '20px' },  // 自定義內聯樣式
});
```

---

## 📱 響應式設計

組件內建響應式支持，在移動端自動調整：

- **桌面端**（> 768px）：固定寬度 600px
- **移動端**（≤ 768px）：寬度 90%，自適應屏幕

**建議配置**：
```typescript
nzWidth: window.innerWidth < 768 ? '90%' : 600
```

---

## ⚠️ 注意事項

### 1. 驗證失敗處理

```typescript
onClick: (componentInstance) => {
  return componentInstance.submit()
    .then((data) => {
      // 驗證成功，提交數據
    })
    .catch((error) => {
      // 驗證失敗，不關閉 Modal
      console.error('驗證失敗:', error);
      // 不需要手動處理，組件已標記錯誤欄位
    });
}
```

---

### 2. 父組織數據加載

組件內建 Mock 數據，生產環境需替換為實際 API：

```typescript
// organization-form.component.ts Line 74-75
private loadParentOrgTree(): void {
  this.orgService.getOrganizationTree().subscribe(tree => {
    this.parentOrgNodes = this.convertToTreeSelectNodes(tree);
  });
}
```

---

### 3. autoLoading 特性

使用 `autoLoading: true` 時，Modal 會自動處理按鈕 loading 狀態：

```typescript
{
  label: '確定',
  type: 'primary',
  autoLoading: true,  // ← 自動 loading
  onClick: (instance) => {
    // 返回 Promise，自動顯示 loading
    return this.apiCall();
  }
}
```

---

## 🔗 相關文檔

- [組織切換器設計](../../../memory-bank/creative-phase/design-decisions/org-switcher-design.md)
- [ng-zorro-antd Modal 文檔](https://ng.ant.design/components/modal/zh)
- [組織管理模組設計](../../DESIGN.md)

---

## 📊 設計評分

| 維度 | 評分 | 說明 |
|-----|------|------|
| 用戶體驗 | ⭐⭐⭐⭐⭐ | 流暢、不離開當前頁面 |
| Tab 兼容性 | ⭐⭐⭐⭐⭐ | 不產生額外 Tab |
| 響應式設計 | ⭐⭐⭐⭐⭐ | 移動端自適應 |
| 可復用性 | ⭐⭐⭐⭐⭐ | 新增/編輯通用 |
| 開發效率 | ⭐⭐⭐⭐⭐ | 配置簡單、維護容易 |

---

**版本**: 1.0.0  
**創建日期**: 2025-10-07  
**設計決策**: VAN + Context7 + Sequential Thinking 協作分析

