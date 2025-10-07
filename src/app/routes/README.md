# Routes - 路由頁面（過渡期結構）

> ⚠️ **過渡期目錄** - 舊的扁平結構，正在遷移到新的分類結構  
> 📌 新開發請使用 `features/`, `auth/`, `examples/` 等新結構

---

## 🗂️ 當前模組列表

### 🎯 業務功能（→ features/）

| 模組 | 當前路徑 | 遷移目標 | 狀態 |
|------|----------|----------|------|
| Dashboard | `routes/dashboard/` | `features/dashboard/` | ⏳ 待遷移 |
| Organization | `routes/organization/` | `features/organization/` | ⏳ 待遷移 |

### 🔐 認證功能（→ auth/）

| 模組 | 當前路徑 | 遷移目標 | 狀態 |
|------|----------|----------|------|
| Passport | `routes/passport/` | `auth/` | ⏳ 待遷移 |

### 📚 示範代碼（→ examples/）

| 模組 | 當前路徑 | 遷移目標 | 狀態 |
|------|----------|----------|------|
| Delon 功能 | `routes/delon/` | `examples/delon-features/` | ⏳ 待遷移 |
| Pro 模板 | `routes/pro/` | `examples/pro-templates/` | ⏳ 待遷移 |
| 樣式指南 | `routes/style/` | `examples/style-guide/` | ⏳ 待遷移 |
| 小工具 | `routes/widgets/` | `examples/widgets-showcase/` | ⏳ 待遷移 |

### 🔧 系統頁面（→ system/）

| 模組 | 當前路徑 | 遷移目標 | 狀態 |
|------|----------|----------|------|
| Exception | `routes/exception/` | `system/exception/` | ⏳ 待遷移 |
| Extras | `routes/extras/` | `system/extras/` | ⏳ 待遷移 |
| Data-V | `routes/data-v/` | `system/data-visualization/` | ⏳ 待遷移 |

---

## 📋 遷移計劃

根據 [`ng-alain-structure-blueprint.md`](../../../memory-bank/ng-alain-structure-blueprint.md)：

### Stage 3: 頂層分類重構（預計 1 天）
- 創建新的頂層分類：`features/`, `auth/`, `examples/`, `system/`
- 遷移所有模組到對應分類
- 更新路由配置
- ⚠️ 風險等級：中（需充分測試）

### 遷移後結果
```
src/app/
├── features/              # 業務功能
│   ├── dashboard/         ← routes/dashboard/
│   └── organization/      ← routes/organization/
│
├── auth/                  # 認證功能
│   └── [passport 內容]    ← routes/passport/*
│
├── examples/              # 示範代碼
│   ├── delon-features/    ← routes/delon/
│   ├── pro-templates/     ← routes/pro/
│   ├── style-guide/       ← routes/style/
│   └── widgets-showcase/  ← routes/widgets/
│
└── system/                # 系統頁面
    ├── exception/         ← routes/exception/
    ├── extras/            ← routes/extras/
    └── data-visualization/ ← routes/data-v/
```

### 遷移完成後
- ✅ `routes/` 目錄將被刪除
- ✅ 所有路由配置已更新
- ✅ 所有導入路徑已修正

---

## 🚀 新開發指南

### 如果要開發新功能

❌ **不要這樣做**：
```typescript
// 在 routes/ 下創建新模組
src/app/routes/my-feature/
```

✅ **請這樣做**：
```typescript
// 使用新的分類結構
src/app/features/my-feature/         // 業務功能
src/app/auth/my-auth-page/           // 認證頁面
src/app/examples/my-demo/            // 示範代碼
```

### 如果要修改現有功能

1. **優先查看新結構**是否已遷移
2. **如在 routes/**：
   - 可以直接修改（短期）
   - 建議遷移後再修改（長期）
3. **參考文檔**：
   - [理想結構設計](../../../memory-bank/ng-alain-structure-final.md)
   - [重構藍圖](../../../memory-bank/ng-alain-structure-blueprint.md)

---

## 📊 遷移進度

```
總模組數：10 個
已遷移：0 個 (0%)
待遷移：10 個 (100%)

[░░░░░░░░░░░░░░░░░░░░] 0%
```

**預計完成時間**: Stage 3 實施後（約 1 天）

---

## 🔗 相關文檔

- [應用架構總覽](../README.md)
- [Features 模組](../features/README.md) - 業務功能新位置
- [Auth 模組](../auth/README.md) - 認證功能新位置
- [Examples 模組](../examples/README.md) - 示範代碼新位置
- [理想結構設計](../../../memory-bank/ng-alain-structure-final.md)
- [重構藍圖](../../../memory-bank/ng-alain-structure-blueprint.md)

---

**導航**: [首頁](../README.md) > Routes（過渡期）

**最後更新**: 2025-10-07  
**狀態**: ⚠️ 過渡期結構，待 Stage 3 遷移

