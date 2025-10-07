# 路由復用策略修復 - 2025-10-07

## 問題描述

用戶報告：頁面切換時只有 URL 變化，但內容沒有更新。具體表現在認證頁面（landing, login, register 等）之間切換時。

## 根本原因分析

通過 **VAN 模式** + **Context7** + **Sequential-thinking** 協作診斷：

1. **`fnGetReuseStrategyKeyFn`** 函數需要 `route.data['key']` 才能生成復用策略的 key
2. 如果沒有 `key`，則返回空字串 `''`
3. **`auth/routes.ts`** 中所有路由都設置了 `shouldDetach: 'no'`，但**沒有設置 `key`**
4. `shouldReuseRoute()` 方法比較時：
   ```typescript
   futureKey === currKey  // '' === '' → true
   ```
5. Angular 認為是同一路由，不重新渲染組件，只改變 URL

## 解決方案

修改 `SimpleReuseStrategy.shouldReuseRoute()` 方法：

```typescript
shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  // 如果路由配置了 shouldDetach: 'no'，則強制不復用（透過比較路由配置）
  if (future.data['shouldDetach'] === 'no' || curr.data['shouldDetach'] === 'no') {
    // 不同的路由配置應該重新渲染
    return future.routeConfig === curr.routeConfig;
  }
  
  // ... 原有邏輯
}
```

### 修改邏輯

- **當路由配置 `shouldDetach: 'no'` 時**：
  - 透過 `future.routeConfig === curr.routeConfig` 比較路由配置
  - 不同的路由配置（如 landing vs login）會返回 `false`
  - Angular 會重新渲染組件
  
- **其他路由**：
  - 保持原有的 key 比較邏輯
  - 向後兼容，不影響現有功能

## 技術細節

### 路由復用策略關鍵方法

1. **`shouldDetach()`**：決定是否允許復用路由
2. **`store()`**：存儲路由快照
3. **`shouldAttach()`**：決定是否允許還原路由
4. **`retrieve()`**：獲取存儲的路由快照
5. **`shouldReuseRoute()`**：決定是否復用路由（**本次修改的方法**）

### Angular 20 控制流語法

用戶提到的 `@if` vs `*ngIf` 在本次問題中不是根本原因，但確實是 Angular 20 推薦的最佳實踐：

| 特性 | 舊結構指令（`*ngIf`） | 新控制流語法（`@if`） |
|------|----------------------|----------------------|
| 可讀性 | 較多 ng-template、巢狀複雜 | 結構清晰、類似程式語法 |
| 型別支援 | 較弱 | 更好，IDE 智能提示 |
| 模板結構 | 隱式生成模板 | 顯式、可巢狀 |
| Angular 版本 | 所有版本 | 17+（含 20） |

## 驗證

- ✅ 建置成功，無編譯錯誤
- ✅ 無 linter 錯誤
- ✅ 保持向後兼容性

## 影響範圍

- **直接影響**：`src/app/auth/routes.ts` 中的所有認證路由
- **間接影響**：所有設置 `shouldDetach: 'no'` 但沒有 `key` 的路由
- **不受影響**：使用 `key` 的路由（原有業務邏輯保持不變）

## 參考文件

- Angular 20 Router API：[Context7 /angular/angular/20.0.0]
- 路由復用策略：SimpleReuseStrategy
- 工具函數：fnGetReuseStrategyKeyFn, getDeepReuseStrategyKeyFn

## 標籤

`#路由復用` `#Angular20` `#bug修復` `#SimpleReuseStrategy` `#認證頁面`

