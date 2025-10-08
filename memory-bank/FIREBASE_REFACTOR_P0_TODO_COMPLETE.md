---
type: report
category: refactoring
phase: P0
status: completed
created: 2025-10-08
tags: [firebase, todo-tags, p0-phase]
---

# ✅ Firebase 重構 P0 階段完成報告

## 📋 任務概述

**階段**: P0 - 立即執行  
**任務**: 在所有需要修改的代碼位置插入 TODO 標籤  
**狀態**: ✅ 已完成  
**執行時間**: 2025-10-08

---

## 🎯 完成內容

### 1. ✅ 創建適配器骨架

**檔案**: `src/app/core/adapters/firebase-token.adapter.ts`

**內容**:
- ✅ 創建 adapters 目錄結構
- ✅ 建立 FirebaseTokenAdapter 類別骨架
- ✅ 插入詳細的實作指南和 TODO 標籤
- ✅ 包含每個方法的說明和範例代碼
- ✅ 提供完整的檢查清單

**TODO 標籤數量**: 8 個
- `TODO(FIREBASE_REFACTOR_P0)`: 主要實作標籤
- 每個方法都有詳細的實作指南
- 包含檢查清單確保實作完整性

---

### 2. ✅ app.config.ts - 3 處 TODO

**檔案**: `src/app/app.config.ts`

#### TODO 1: 攔截器架構 (Line 75-80)
```typescript
// TODO(FIREBASE_REFACTOR_P0): 恢復 ng-alain 原始攔截器架構
// - 移除 firebaseAuthInterceptor (自製攔截器違反架構原則)
// - 移除 organizationInterceptor (應整合到 defaultInterceptor)
// - 恢復 authSimpleInterceptor (@delon/auth 核心攔截器)
// - 只保留: authSimpleInterceptor + defaultInterceptor
// 參考: FIREBASE_REFACTOR_PLAN.md 階段 1
```

**位置**: Line 75-89 (攔截器配置)  
**問題**: 移除了 ng-alain 核心的 authSimpleInterceptor  
**解決方案**: 恢復 authSimpleInterceptor + defaultInterceptor 組合

#### TODO 2: 適配器配置 (Line 102-106)
```typescript
// TODO(FIREBASE_REFACTOR_P0): 配置 FirebaseTokenAdapter
// - 創建 src/app/core/adapters/firebase-token.adapter.ts
// - 實作 ITokenService 介面
// - 使用 { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter }
// 參考: FIREBASE_REFACTOR_PLAN.md 階段 1 (Line 185-300)
```

**位置**: Line 101-107 (provideAuth 之後)  
**問題**: 未配置 Firebase Token 適配器  
**解決方案**: 添加 DA_SERVICE_TOKEN 配置

#### TODO 3: AutoRefreshService (Line 136-139)
```typescript
// TODO(FIREBASE_REFACTOR_P0): 移除 AutoRefreshService 初始化
// Firebase SDK 自動管理 Token 刷新，無需手動實作
// 此服務將在階段 5 刪除
// 參考: FIREBASE_REFACTOR_PLAN.md 階段 5 (Line 657-712)
```

**位置**: Line 136-146 (AutoRefreshService 初始化)  
**問題**: 使用手動 Token 刷新服務（重複功能）  
**解決方案**: 移除此初始化，Firebase SDK 自動處理

---

### 3. ✅ default.interceptor.ts - 2 處 TODO

**檔案**: `src/app/core/net/default.interceptor.ts`

#### TODO 1: 引用清理 (Line 7-8)
```typescript
// TODO(FIREBASE_REFACTOR_P1): 移除對 firebase-refresh-token.ts 的引用
// 此檔案將在階段 5 被刪除，刷新邏輯應整合到此處
```

**位置**: Line 7-9 (import 語句)  
**問題**: 依賴將被刪除的檔案  
**解決方案**: 在階段 2 整合刷新邏輯到此處

#### TODO 2: 401 處理邏輯 (Line 40-45)
```typescript
// TODO(FIREBASE_REFACTOR_P1): 整合 Firebase 刷新邏輯到此處
// - 移除對 firebase-refresh-token.ts 的依賴（將被刪除）
// - 直接在此處實作 Firebase Token 刷新
// - 使用 Firebase SDK: auth.currentUser.getIdToken(true)
// - @delon/auth 適配器會自動更新（無需手動同步）
// 參考: FIREBASE_REFACTOR_PLAN.md 階段 2 (Line 310-446)
```

**位置**: Line 39-58 (401 錯誤處理)  
**問題**: 呼叫外部 tryRefreshFirebaseToken 函數  
**解決方案**: 整合刷新邏輯到 defaultInterceptor

---

### 4. ✅ firebase-auth.service.ts - 5 處 TODO

**檔案**: `src/app/core/services/firebase-auth.service.ts`

#### TODO 1: 服務簡化 (Line 29-35)
```typescript
// TODO(FIREBASE_REFACTOR_P2): 簡化此服務
// - 移除所有 Token 同步邏輯（由 FirebaseTokenAdapter 處理）
// - 移除 setupTokenSync() 方法和調用
// - 移除 onLoginSuccess() 中的 Token 同步代碼
// - 簡化 logout() 方法（不再手動清除 Token）
// - 預期從 423 行減少到 200 行（-53%）
// 參考: FIREBASE_REFACTOR_PLAN.md 階段 3 (Line 449-544)
```

**位置**: 類別註釋  
**目標**: 簡化服務，移除 Token 管理邏輯

#### TODO 2-5: 具體簡化點
- Line 40: 移除 tokenService 注入
- Line 49: 移除 idToken$ Observable
- Line 61-63: 移除 setupTokenSync() 調用

---

## 📊 TODO 標籤統計

### 按優先級分類

| 優先級 | 數量 | 檔案數 | 說明 |
|-------|------|--------|------|
| **P0** (立即執行) | 6 個 | 2 個 | app.config.ts, firebase-token.adapter.ts |
| **P1** (近期執行) | 2 個 | 1 個 | default.interceptor.ts |
| **P2** (中期執行) | 5 個 | 1 個 | firebase-auth.service.ts |
| **總計** | **13 個** | **4 個** | - |

### 按檔案分類

| 檔案 | TODO 數量 | 優先級 | 狀態 |
|------|----------|--------|------|
| `firebase-token.adapter.ts` | 8 個 | P0 | ✅ 骨架完成 |
| `app.config.ts` | 3 個 | P0 | ✅ 標記完成 |
| `default.interceptor.ts` | 2 個 | P1 | ✅ 標記完成 |
| `firebase-auth.service.ts` | 5 個 | P2 | ✅ 標記完成 |

---

## 🗂️ 建立的檔案

### 新增檔案

1. **`src/app/core/adapters/`** (新目錄)
   - ✅ 創建成功

2. **`src/app/core/adapters/firebase-token.adapter.ts`** (136 行)
   - ✅ 完整骨架
   - ✅ 詳細註釋
   - ✅ 實作指南
   - ✅ 檢查清單

### 修改的檔案

1. **`src/app/app.config.ts`**
   - ✅ 3 處 TODO 標籤
   - 行數未變更

2. **`src/app/core/net/default.interceptor.ts`**
   - ✅ 2 處 TODO 標籤
   - 行數增加 ~15 行

3. **`src/app/core/services/firebase-auth.service.ts`**
   - ✅ 5 處 TODO 標籤
   - 行數增加 ~20 行

---

## 🎯 下一步行動

### 立即執行 (P0)

**階段 1: 實作 FirebaseTokenAdapter**

1. ✅ 骨架已建立
2. ⏳ 引入 @delon/auth 介面
   ```typescript
   import { ITokenModel, ITokenService } from '@delon/auth';
   import { DA_SERVICE_TOKEN } from '@delon/auth';
   ```

3. ⏳ 實作 get() 方法
   - 返回 Observable<ITokenModel>
   - 訂閱 Firebase idToken
   - 包含所有 Custom Claims

4. ⏳ 實作其他方法
   - set() - 空實作
   - clear() - 空實作
   - change() - 返回原始數據

5. ⏳ 配置到 app.config.ts
   ```typescript
   { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter }
   ```

6. ⏳ 恢復 authSimpleInterceptor
   ```typescript
   provideHttpClient(
     withInterceptors([
       authSimpleInterceptor,  // 恢復！
       defaultInterceptor
     ])
   )
   ```

7. ⏳ 測試與驗證
   - Token 自動同步
   - 權限系統正常
   - 401 錯誤處理

---

## 📝 注意事項

### 實作順序建議

1. **先完成 FirebaseTokenAdapter**
   - 這是基礎，其他都依賴它
   - 確保 ITokenService 介面正確實作

2. **測試適配器**
   - 驗證 Token 是否自動同步
   - 檢查 @delon/auth 是否正常工作

3. **再修改 app.config.ts**
   - 恢復 authSimpleInterceptor
   - 配置 FirebaseTokenAdapter

4. **最後整合攔截器**
   - 修改 defaultInterceptor 的 401 處理
   - 移除對外部檔案的依賴

### 常見問題預防

1. **ITokenModel 介面定義**
   - 確保包含所有 Firebase Custom Claims
   - 不要遺漏 uid, role, permissions 等欄位

2. **Observable 訂閱**
   - @delon/auth 會自動訂閱 get() 返回的 Observable
   - 不需要手動訂閱

3. **Token 刷新**
   - Firebase SDK 自動處理
   - 無需手動實作刷新邏輯

---

## ✅ 驗收標準

### P0 階段 (TODO 標籤插入)

- [x] 創建 adapters 目錄
- [x] 建立 FirebaseTokenAdapter 骨架
- [x] app.config.ts 插入 3 處 TODO
- [x] default.interceptor.ts 插入 2 處 TODO
- [x] firebase-auth.service.ts 插入 5 處 TODO
- [x] 所有 TODO 標籤包含詳細說明
- [x] 所有 TODO 標籤引用計畫書行號

### P0+ 階段 (實作 FirebaseTokenAdapter)

- [ ] 引入 @delon/auth 介面
- [ ] 實作 get() 方法
- [ ] 實作其他必要方法
- [ ] 配置到 app.config.ts
- [ ] 恢復 authSimpleInterceptor
- [ ] 測試 Token 自動同步
- [ ] 測試權限系統

---

## 📚 參考文件

- `memory-bank/FIREBASE_REFACTOR_PLAN.md` - 完整重構計畫
- [ng-alain 官方文檔](https://ng-alain.com/)
- [@delon/auth 文檔](https://ng-alain.com/auth/getting-started)
- [Firebase JS SDK 文檔](https://firebase.google.com/docs/web/setup)

---

**完成時間**: 2025-10-08  
**狀態**: ✅ P0 階段完成，準備進入實作階段  
**下一步**: 實作 FirebaseTokenAdapter (階段 1)

🚀 **準備好開始實作了！**

