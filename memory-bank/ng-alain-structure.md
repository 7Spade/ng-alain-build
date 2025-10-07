---
# AI Agent 元數據 (YAML Frontmatter)
type: ng-alain-project-structure
format_version: "3.0"
generated_at: "2025-10-07T05:49:54.845Z"
generated_by: "ng-alain-structure-generator"
ai_friendly: true
optimized_for_ai: true

# 專案基本信息
project:
  name: "ng-alain"
  version: "20.0.2"
  description: "ng-zorro-antd admin panel front-end framework"
  framework:
    - "Angular ^20.3.0"
    - "ng-alain ^20.0.2"
    - "ng-zorro-antd 20.3.1"

# 統計摘要 (快速理解專案規模)
statistics:
  total_files: 408
  total_directories: 137
  total_size_bytes: 6197286
  total_size_human: "5.9 MB"
  directory_depth: 7
  
  # Angular 文件類型統計
  angular_types:
    Angular 組件: 152
    Angular 服務: 8
    Angular 守衛: 2
    Angular 模組: 2
  
  # 文件副檔名統計 (Top 10)
  file_extensions:
    .ts: 133
    .mdc: 59
    .html: 57
    .md: 54
    .less: 25
    .json: 22
    .jpg: 12
    (無副檔名): 10
    .yml: 9
    .png: 6

# 關鍵路徑標記 (AI 快速定位)
key_paths:
  entry_point: "src/main.ts"
  app_root: "src/app"
  business_routes: "src/app/routes"
  core_services: "src/app/core"
  shared_components: "src/app/shared"
  layouts: "src/app/layout"
  mock_data: "_mock"
  config_files:
    - "angular.json"
    - "package.json"
    - "tsconfig.json"
    - "ng-alain.json"

# 專案標籤 (語義化分類)
tags:
  - "Angular 20"
  - "ng-alain"
  - "ng-zorro-antd"
  - "TypeScript"
  - "Admin Panel"
  - "Enterprise"
  - "@delon"
---

# 📁 ng-alain 專案結構摘要

> **🤖 AI Agent 友好格式（精簡版）**  
> 此文件包含結構化元數據、統計摘要、快速導航索引  
> 完整的目錄樹狀圖請參考：`archive/historical-data/ng-alain-structure-full.md`

---

## 📋 專案概覽

- **專案名稱**: ng-alain
- **專案版本**: 20.0.2
- **專案描述**: ng-zorro-antd admin panel front-end framework
- **Angular 版本**: ^20.3.0
- **ng-alain 版本**: ^20.0.2
- **Framework**: ng-alain + ng-zorro-antd + @delon/*

---

## 📊 統計摘要 (AI 快速理解)

### 專案規模
- **文件總數**: 408
- **目錄總數**: 137
- **專案大小**: 5.9 MB
- **目錄深度**: 7 層

### Angular 文件類型分布
```
  Angular 組件: 152
  Angular 服務: 8
  Angular 守衛: 2
  Angular 模組: 2
```

### 文件副檔名統計 (Top 10)
```
  .ts: 133
  .mdc: 59
  .html: 57
  .md: 54
  .less: 25
  .json: 22
  .jpg: 12
  (無副檔名): 10
  .yml: 9
  .png: 6
```

---

## 🧭 快速導航索引 (AI 關鍵路徑定位)

| 標籤 | 路徑 | 用途 |
|------|------|------|
| **[ENTRY, BOOTSTRAP]** | `src/main.ts` | Angular 應用入口 |
| **[CORE, APP]** | `src/app` | Angular 應用主目錄 |
| **[BUSINESS, ROUTES]** | `src/app/routes` | 業務路由模塊 |
| **[CORE, SERVICE]** | `src/app/core` | 核心服務、守衛、攔截器 |
| **[LAYOUT, UI]** | `src/app/layout` | basic/blank/passport 布局 |
| **[SHARED, REUSABLE]** | `src/app/shared` | 共用組件和模塊 |
| **[CONFIG, ENV]** | `src/environments` | 環境配置 |
| **[CONFIG, BUILD]** | `angular.json` | Angular CLI 配置 |
| **[CONFIG, DEP]** | `package.json` | NPM 依賴配置 |
| **[CONFIG, TS]** | `tsconfig.json` | TypeScript 配置 |
| **[CONFIG, ALAIN]** | `ng-alain.json` | ng-alain 配置 |
| **[DOC, AI]** | `memory-bank` | AI 專案知識庫 |
| **[MOCK, DEV]** | `_mock` | Mock 數據服務 |

---

## 🏗️ 核心目錄結構

### src/app/ 架構
```
src/app/
├── core/                    # [CORE, SERVICE] 核心服務
│   ├── i18n/               # 國際化服務
│   ├── net/                # HTTP 攔截器
│   └── startup/            # 啟動服務
│
├── layout/                  # [LAYOUT, UI] 佈局組件
│   ├── basic/              # 基本佈局（含側邊欄）
│   ├── blank/              # 空白佈局
│   └── passport/           # 認證頁佈局
│
├── routes/                  # [BUSINESS, ROUTES] 業務路由
│   ├── dashboard/          # 儀表板（analysis, monitor, workplace）
│   ├── passport/           # 認證（login, register）
│   ├── pro/                # Pro 示例（form, list, profile）
│   ├── delon/              # @delon 功能示例
│   ├── organization/       # 組織架構管理
│   ├── exception/          # 異常頁面
│   └── ...                 # 其他功能模組
│
└── shared/                  # [SHARED, REUSABLE] 共用組件
    ├── cell-widget/        # Cell 小工具
    ├── st-widget/          # ST 表格小工具
    ├── json-schema/        # JSON Schema
    └── utils/              # 工具函數
```

---

## 🎯 Angular 20 + ng-alain 最佳實踐

### 1. 專案結構規範
- ✅ 遵循 ng-alain 目錄命名規範
- ✅ 使用 @delon/* 模組進行功能開發
- ✅ 合理組織 routes 模組化結構

### 2. 代碼組織原則
- ✅ 單一職責原則 (SRP)
- ✅ 依賴注入 (DI) 合理使用
- ✅ 組件重用與模組化設計

### 3. ng-alain 開發規範
- ✅ 使用 ng-zorro-antd 組件庫
- ✅ 遵循 Ant Design 設計規範
- ✅ 充分利用 @delon/* 生態

---

## 🔄 自動化腳本使用

### 手動生成結構報告
```bash
npm run structure:generate
```

### 腳本特色功能 (v3.0 AI 友好版)
- 🤖 **AI Agent 友好**: YAML frontmatter、結構化元數據
- 📊 **統計摘要**: 快速理解專案規模和文件分布
- 🧭 **快速導航**: 關鍵路徑快速定位
- 🏷️ **語義化標籤**: 目錄用途和功能說明

### 完整目錄樹
如需查看完整的目錄樹狀圖（包含每個文件），請參考：
- `archive/historical-data/ng-alain-structure-full.md` (839行完整版)

---

*Generated by ng-alain Structure Generator v3.0 (AI-Friendly Optimized Edition)*  
*Optimized: 2025-10-07 - Reduced from 839 to 200 lines for AI efficiency*
