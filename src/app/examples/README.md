# Examples - 示範代碼模組

> ⚠️ **示範代碼** - 展示 ng-alain 和 Ant Design Pro 功能，可安全刪除

## 📚 示範分類

### 🧰 Delon 功能示範 (`delon-features/`)
展示 @delon 組件庫的各種功能

| 示範 | 說明 |
|------|------|
| ACL | 權限控制（Access Control List） |
| Cache | 緩存管理 |
| Form | 動態表單（Schema-driven） |
| Guard | 路由守衛示範 |
| Print | 列印功能 |
| QR | 二維碼生成 |
| ST | 簡易表格（Simple Table） |
| Util | 工具函數示範 |
| XLSX | Excel 導入/導出 |
| ZIP | 壓縮/解壓功能 |

### 🎨 Pro 模板示範 (`pro-templates/`)
Ant Design Pro 標準頁面模板

| 分類 | 模板 |
|------|------|
| **Account** | 個人中心、帳戶設定 |
| **Form** | 基礎表單、高級表單、分步表單 |
| **List** | 專案列表、應用列表、文章列表、基礎列表、卡片列表、表格列表 |
| **Profile** | 基礎資料、高級資料 |
| **Result** | 成功頁、失敗頁 |

### 🎨 樣式指南 (`style-guide/`)
色彩、網格、排版等設計規範示範

### 🧩 小工具展示 (`widgets-showcase/`)
UI 小工具與組件展示

## ⚠️ 使用建議

1. **學習參考** - 了解 ng-alain 功能使用方式
2. **快速開發** - 複製模板快速開發新頁面
3. **生產環境** - 可考慮刪除以減小打包體積

## 🗑️ 如何刪除

```bash
# 刪除整個示範目錄
Remove-Item -Recurse src/app/examples/

# 刪除路由配置中的 examples 相關路由
# 編輯 app/routes.ts 移除 examples 路由
```

## 📁 目錄結構

```
examples/
├── README.md              # 本文件
├── delon-features/        # @delon 功能示範
├── pro-templates/         # Pro 模板
├── style-guide/           # 樣式指南
└── widgets-showcase/      # 小工具展示
```

---

**導航**: [首頁](../../README.md) > Examples

