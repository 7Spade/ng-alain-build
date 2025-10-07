# ng-alain 應用架構

> Angular 20 + ng-alain + ng-zorro-antd 企業級管理系統

## 🗂️ 目錄結構

| 目錄 | 用途 | 說明文檔 |
|------|------|----------|
| **core/** | 核心服務 | 全局單例服務（i18n, HTTP, startup） |
| **shared/** | 共享組件 | 可複用的業務組件和工具 |
| **layout/** | 佈局組件 | [README](layout/README.md) - 頁面佈局（basic, blank, passport） |
| | | |
| **features/** | 業務功能 | [README](features/README.md) - 真實業務功能模組 ⭐ |
| **auth/** | 認證功能 | [README](auth/README.md) - 用戶登入註冊 🔐 |
| **examples/** | 示範代碼 | [README](examples/README.md) - ng-alain/Pro 示範（可刪除） 📚 |

## 🎯 快速導航

### 業務功能 (Features)
- 📊 [Dashboard](features/dashboard/README.md) - 儀表板與數據分析
- 🏢 [Organization](features/organization/README.md) - 組織架構管理（開發中）

### 認證功能 (Auth)
- 🔐 [登入/註冊](auth/README.md) - 用戶認證頁面

### 示範代碼 (Examples)
- 🧰 [Delon 功能](examples/README.md#-delon-功能示範-delon-features) - @delon 組件庫示範
- 🎨 [Pro 模板](examples/README.md#-pro-模板示範-pro-templates) - Ant Design Pro 頁面模板
- 📐 [樣式指南](examples/README.md#-樣式指南-style-guide) - 設計規範

### 基礎設施
- 🎨 [佈局組件](layout/README.md) - 頁面佈局與通用 UI
- 🔧 Core - 核心服務（i18n, HTTP, startup）
- 🔄 Shared - 共享組件和工具

## 📊 專案統計

- **Angular**: 20.3.0
- **ng-alain**: 20.0.2
- **ng-zorro-antd**: 20.3.1
- **架構**: Standalone Components
- **狀態管理**: RxJS + Services
- **路由**: Hash + Lazy Loading

## 🏗️ 架構原則

1. **四大分類**：features（業務）、auth（認證）、examples（示範）、layout（佈局）
2. **扁平優先**：最大深度 3 層
3. **命名清晰**：使用語義化後綴（-list, -detail, -form）
4. **文檔完善**：每個模組都有 README 導航

## 📚 開發文檔

- [專案架構](../../memory-bank/README.md) - 完整專案文檔
- [編碼標準](../../memory-bank/implementation/code/codeStandards.md)
- [測試標準](../../memory-bank/implementation/tests/testingStandards.md)
- [理想結構](../../memory-bank/ng-alain-structure-final.md) - 目標架構設計
- [重構藍圖](../../memory-bank/ng-alain-structure-blueprint.md) - 漸進式優化計劃

---

**最後更新**: 2025-10-07  
**維護者**: Memory Bank System

