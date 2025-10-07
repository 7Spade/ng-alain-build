# 🚀 代碼優化快速參考

> 快速查看所有 TODO 標記位置與修復優先級

---

## 📊 快速統計

- ✅ **已插入 TODO**: 23 個
- 📁 **涉及檔案**: 11 個  
- 🔴 **Critical**: 2 個
- 🟠 **High**: 13 個
- 🟡 **Medium**: 8 個

---

## 🔴 Critical（必須立即修復）

### 1. screen-less-hidden.directive.ts ⭐⭐⭐
**問題**: Directive 訂閱未取消訂閱（共享基礎設施）  
**位置**: Line 4, 43  
**影響**: 全站使用，記憶體洩漏累積  
**修復**: 加入 OnDestroy + takeUntilDestroyed  

### 2. app.component.ts ⭐⭐⭐
**問題**: Router.events 長期訂閱未管理  
**位置**: Line 28  
**影響**: 根組件，整個應用生命週期洩漏  
**修復**: 使用 takeUntilDestroyed  

---

## 🟠 High（優先修復）

### Auth 模組
- `login.component.ts` - 嵌套訂閱未管理 (Line 95)

### Layout 模組
- `user.component.ts` - mode$ 訂閱未管理 (Line 88)
- `org-switcher.component.ts` - 代碼重複 x2 (Line 385, 403)

### Projects 模組
- `project-dashboard.component.ts` - toPromise() 反模式 + 代碼重複 (Line 84, 116)
- `project-list.component.ts` - HTTP 訂閱 + 代碼重複 (Line 142, 208)
- `project-overview.component.ts` - HTTP 訂閱 + 代碼重複 x4 (Line 88, 118, 138, 157)
- `project-settings.component.ts` - HTTP 訂閱 x4 (Line 107, 144, 173, 206)
- `member-list.component.ts` - HTTP 訂閱 x2 + 代碼重複 x2 (Line 80, 107, 130, 151)

### Examples 模組
- `table-list.component.ts` - HTTP 訂閱 x2 (Line 112, 147)

---

## 🟡 Medium（建議修復）

### 代碼重複待提取

**檔案大小工具** (3 處重複):
```
src/app/shared/utils/file-size.util.ts
```
- project-list.component.ts
- project-overview.component.ts  
- project-dashboard.component.ts

**組織角色常數** (2 處重複):
```
src/app/features/organization/models/organization.constants.ts
```
- org-switcher.component.ts

**專案成員角色常數** (2 處重複):
```
src/app/features/projects/models/project-member.constants.ts
```
- member-list.component.ts

**專案屬性常數** (2 處重複):
```
src/app/features/projects/models/project.constants.ts
```
- project-overview.component.ts

---

## 🎯 修復順序建議

### Day 1: Critical
1. ✅ screen-less-hidden.directive.ts
2. ✅ app.component.ts
3. ✅ user.component.ts

### Day 2: 建立共享工具
1. ✅ file-size.util.ts
2. ✅ organization.constants.ts
3. ✅ project-member.constants.ts
4. ✅ project.constants.ts
5. ✅ 更新所有引用

### Day 3: Projects 模組
1. ✅ project-dashboard (toPromise → forkJoin)
2. ✅ 其他 4 個 project 組件

### Day 4: 其餘組件
1. ✅ login.component.ts
2. ✅ table-list.component.ts
3. ✅ 其他 40+ 組件掃描

---

## 🛠️ 快速修復模板

### 修復 HTTP 訂閱
```typescript
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

private destroyRef = inject(DestroyRef);

loadData(): void {
  this.http.get('/api/data')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      // ...
    });
}
```

### 修復 Directive 訂閱
```typescript
import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({...})
export class MyDirective implements OnDestroy {
  private subscription?: Subscription;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
```

### 修復 toPromise()
```typescript
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

forkJoin({
  data1: this.service1.getData(),
  data2: this.service2.getData()
})
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(({ data1, data2 }) => {
    // ...
  });
```

---

## 📋 檢查清單

修復後驗證:
- [ ] 加入 takeUntilDestroyed() 或 ngOnDestroy
- [ ] 移除 toPromise() 使用
- [ ] 測試功能正常運作
- [ ] 檢查無 linter 錯誤
- [ ] 記憶體分析（Chrome DevTools）
- [ ] 移除對應的 TODO 標記

---

**完整報告**: 請參閱 `OPTIMIZATION_SUMMARY.md`

