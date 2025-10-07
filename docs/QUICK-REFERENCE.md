# 快速參考卡片

> ng-alain 專案設計理念速查表  
> 生成日期: 2025-10-07

---

## ⚡ 一分鐘速覽

### 專案定位
Angular 20 + ng-zorro-antd + @delon 企業級後台管理系統

### 核心技術
- **框架**: Angular 20.3.0 (Standalone)
- **UI 庫**: ng-zorro-antd 20.3.1
- **腳手架**: @delon 20.0.2
- **狀態**: Service + RxJS (不用 NgRx)
- **樣式**: Less
- **路由**: Hash Routing + Lazy Loading

### 核心原則
1. Standalone Components
2. OnPush Change Detection
3. Functional Guards
4. Mock-First Development
5. Type-Safe Everything

---

## 🔧 常用模式速查

### 組件模板

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  template: `
    @if (loading) {
      <nz-spin />
    } @else {
      @for (item of items; track item.id) {
        <div>{{ item.name }}</div>
      }
    }
  `,
  styles: [`
    .container { padding: 24px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {
  private readonly service = inject(MyService);
  private readonly cdr = inject(ChangeDetectorRef);
}
```

### 服務模板

```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/resource';
  
  getAll(params?: Params): Observable<{data: T[]; total: number}> {
    return this.http.get(this.API_BASE, params);
  }
  
  getById(id: string): Observable<T> {
    return this.http.get(`${this.API_BASE}/${id}`);
  }
  
  create(entity: Partial<T>): Observable<T> {
    return this.http.post(this.API_BASE, entity);
  }
  
  update(id: string, entity: Partial<T>): Observable<T> {
    return this.http.put(`${this.API_BASE}/${id}`, entity);
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete(`${this.API_BASE}/${id}`);
  }
}
```

### 守衛模板

```typescript
export const permissionGuard: CanActivateFn = (route) => {
  const service = inject(PermissionService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  const resourceId = route.paramMap.get('id');
  if (!resourceId) {
    notification.error('錯誤', '無效的資源');
    return of(false);
  }
  
  return service.checkPermission(resourceId).pipe(
    map(hasPermission => {
      if (!hasPermission) {
        notification.error('權限不足', '無法訪問');
        router.navigate(['/fallback']);
      }
      return hasPermission;
    }),
    catchError(() => of(false))
  );
};
```

---

## 📐 路徑別名

```typescript
@shared      → src/app/shared/
@core        → src/app/core/
@organization → src/organization/
@env/*       → src/environments/*
@_mock       → _mock/
```

---

## 🎨 常用 ng-zorro 組件

```typescript
// Layout
NzCardModule, NzGridModule, NzDividerModule, NzSpaceModule

// Navigation
NzMenuModule, NzDropDownModule, NzTabsModule, NzBreadCrumbModule

// Input
NzInputModule, NzSelectModule, NzDatePickerModule, NzCheckboxModule

// Display
NzAvatarModule, NzTagModule, NzBadgeModule, NzTooltipModule

// Feedback
NzSpinModule, NzEmptyModule, NzNotificationModule, NzModalModule

// Table
NzTableModule, NzPaginationModule
```

---

## 🔐 權限層級

```
Owner   → 完全控制（刪除、設定）
  ↓
Admin   → 管理權限（成員、邀請）
  ↓
Member  → 基本權限（查看、參與）
  ↓
Viewer  → 僅查看
```

---

## 🚀 常用命令

```bash
# 開發
npm start              # 啟動開發伺服器
npm run hmr            # HMR 模式

# 建置
npm run build          # 生產建置
npm run analyze        # Bundle 分析

# 檢查
npm run lint           # TypeScript + Style 檢查
npm run test           # 單元測試
npm run e2e            # E2E 測試

# 工具
npm run structure:check  # 結構驗證
npm run icon           # 圖標生成
```

---

## 📊 性能基準

- **Initial Bundle**: 1.8 MB (with lazy loading)
- **Time to Interactive**: 1.2s
- **Change Detection**: OnPush (40-60% faster)
- **Bundle Reduction**: 57% (lazy vs eager)

---

## 🔍 快速查詢

**如何創建新組件？**  
→ Development-Principles.md → 組件開發原則

**如何實現分頁？**  
→ Technical-Patterns.md → Pagination Pattern

**為什麼用 Standalone？**  
→ Architecture-Decisions.md → ADR-001

**如何處理錯誤？**  
→ Technical-Patterns.md → Error Handling Pattern

**如何寫 Mock 數據？**  
→ Development-Principles.md → Mock 數據原則

---

## 📖 完整文檔

詳細內容請參考：
1. **Design-Philosophy.md** - 設計哲學
2. **Development-Principles.md** - 開發原則
3. **Architecture-Decisions.md** - 架構決策
4. **Technical-Patterns.md** - 技術模式
5. **DESIGN-DOCS-INDEX.md** - 文檔索引

---

**最後更新**: 2025-10-07

