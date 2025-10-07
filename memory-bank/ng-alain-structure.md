---
# AI Agent 元數據 (YAML Frontmatter)
type: ng-alain-project-structure
format_version: "3.0"
generated_at: "2025-10-07T05:49:17.299Z"
generated_by: "ng-alain-structure-generator"
ai_friendly: true

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
  total_size_bytes: 6196919
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

# 📁 ng-alain 專案結構分析報告

> **🤖 AI Agent 友好格式**  
> 此文件包含結構化元數據 (YAML Frontmatter)、統計摘要、快速導航索引  
> 適合 AI Agent 快速理解專案架構和關鍵路徑

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

- **[ENTRY, SOURCE]** `src` - 源代碼根目錄
- **[CORE, APP]** `src/app` - Angular 應用主目錄
- **[ENTRY, BOOTSTRAP]** `src/main.ts` - Angular 應用入口文件
- **[BUSINESS, ROUTES]** `src/app/routes` - 業務路由模塊 - ng-alain 業務邏輯主目錄
- **[CORE, SERVICE]** `src/app/core` - 核心服務模塊 - 全局服務、攔截器、啟動服務
- **[LAYOUT, UI]** `src/app/layout` - 布局組件 - basic/blank/passport 三種布局
- **[SHARED, REUSABLE]** `src/app/shared` - 共用組件和模塊 - 可復用的組件、指令、管道
- **[CONFIG, ENV]** `src/environments` - 環境配置文件 - 開發/生產環境配置
- **[CONFIG, BUILD]** `angular.json` - Angular CLI 配置文件
- **[CONFIG, DEP]** `package.json` - NPM 依賴配置文件
- **[CONFIG, TS]** `tsconfig.json` - TypeScript 編譯配置
- **[CONFIG, ALAIN]** `ng-alain.json` - ng-alain 框架配置
- **[DOC, AI]** `memory-bank` - AI 專案知識庫 - 專案文檔和記憶系統
- **[BUSINESS, DASHBOARD]** `src/app/routes/dashboard` - 儀表板頁面 - 數據分析和監控
- **[BUSINESS, AUTH]** `src/app/routes/passport` - 用戶認證頁面 - 登入、註冊、找回密碼
- **[BUSINESS, ORG]** `src/app/routes/organization` - 組織架構管理模塊

---

## 🏗️ 目錄用途說明 (語義化信息)

### 🔴 `src`
**標籤**: `ENTRY`, `SOURCE`  
**用途**: 源代碼根目錄

### 🔴 `src/app`
**標籤**: `CORE`, `APP`  
**用途**: Angular 應用主目錄

### 🔴 `src/main.ts`
**標籤**: `ENTRY`, `BOOTSTRAP`  
**用途**: Angular 應用入口文件

### 🔴 `src/app/routes`
**標籤**: `BUSINESS`, `ROUTES`  
**用途**: 業務路由模塊 - ng-alain 業務邏輯主目錄

### 🔴 `src/app/core`
**標籤**: `CORE`, `SERVICE`  
**用途**: 核心服務模塊 - 全局服務、攔截器、啟動服務

### 🟠 `src/app/layout`
**標籤**: `LAYOUT`, `UI`  
**用途**: 布局組件 - basic/blank/passport 三種布局

### 🟠 `src/app/shared`
**標籤**: `SHARED`, `REUSABLE`  
**用途**: 共用組件和模塊 - 可復用的組件、指令、管道

### 🟡 `src/assets`
**標籤**: `ASSETS`, `STATIC`  
**用途**: 靜態資源目錄 - 圖片、樣式、多語言文件

### 🟠 `src/environments`
**標籤**: `CONFIG`, `ENV`  
**用途**: 環境配置文件 - 開發/生產環境配置

### 🟡 `src/styles`
**標籤**: `STYLE`, `THEME`  
**用途**: 全局樣式文件 - Less 主題和樣式

### 🟡 `_mock`
**標籤**: `MOCK`, `DEV`  
**用途**: Mock 數據服務 - @delon/mock 假數據接口

### 🔴 `angular.json`
**標籤**: `CONFIG`, `BUILD`  
**用途**: Angular CLI 配置文件

### 🔴 `package.json`
**標籤**: `CONFIG`, `DEP`  
**用途**: NPM 依賴配置文件

### 🟠 `tsconfig.json`
**標籤**: `CONFIG`, `TS`  
**用途**: TypeScript 編譯配置

### 🟠 `ng-alain.json`
**標籤**: `CONFIG`, `ALAIN`  
**用途**: ng-alain 框架配置

### 🟡 `scripts`
**標籤**: `BUILD`, `SCRIPT`  
**用途**: 構建和部署腳本

### ⚪ `proxy.conf.js`
**標籤**: `CONFIG`, `DEV`  
**用途**: 開發代理配置

### 🟠 `memory-bank`
**標籤**: `DOC`, `AI`  
**用途**: AI 專案知識庫 - 專案文檔和記憶系統

### ⚪ `docs`
**標籤**: `DOC`  
**用途**: 專案文檔目錄

### 🟠 `src/app/routes/dashboard`
**標籤**: `BUSINESS`, `DASHBOARD`  
**用途**: 儀表板頁面 - 數據分析和監控

### 🟠 `src/app/routes/passport`
**標籤**: `BUSINESS`, `AUTH`  
**用途**: 用戶認證頁面 - 登入、註冊、找回密碼

### 🟡 `src/app/routes/exception`
**標籤**: `BUSINESS`, `ERROR`  
**用途**: 異常頁面 - 403/404/500 錯誤頁

### 🟡 `src/app/routes/pro`
**標籤**: `BUSINESS`, `EXAMPLE`  
**用途**: Pro 進階示例 - 表單、列表、詳情頁

### 🟠 `src/app/routes/organization`
**標籤**: `BUSINESS`, `ORG`  
**用途**: 組織架構管理模塊


---

## 📂 詳細目錄結構 (完整樹狀圖)

```
└── src [ENTRY, SOURCE, Angular]/
    ├── app [ENTRY, SOURCE]/
    │   ├── core [ENTRY, SOURCE]/
    │   │   ├── i18n [ENTRY, SOURCE]/
    │   │   │   ├── i18n.service.ts [ENTRY, SOURCE] (3.1 KB, 今天, Angular 服務)
    │   │   ├── net [ENTRY, SOURCE]/
    │   │   │   ├── default.interceptor.ts [ENTRY, SOURCE] (3.6 KB, 今天, TypeScript)
    │   │   │   ├── helper.ts [ENTRY, SOURCE] (2.2 KB, 今天, TypeScript)
    │   │   │   ├── index.ts [ENTRY, SOURCE] (97 B, 今天, TypeScript)
    │   │   │   ├── refresh-token.ts [ENTRY, SOURCE] (3.3 KB, 今天, TypeScript)
    │   │   ├── startup [ENTRY, SOURCE]/
    │   │   │   ├── startup.service.ts [ENTRY, SOURCE] (2.6 KB, 今天, Angular 服務)
    │   │   ├── index.ts [ENTRY, SOURCE] (145 B, 今天, TypeScript)
    │   │   ├── README.md [ENTRY, SOURCE] (137 B, 今天, Markdown 文檔)
    │   │   ├── start-page.guard.ts [ENTRY, SOURCE] (620 B, 今天, Angular 守衛)
    │   ├── layout [ENTRY, SOURCE]/
    │   │   ├── basic [ENTRY, SOURCE]/
    │   │   │   ├── widgets [ENTRY, SOURCE]/
    │   │   │   │   ├── clear-storage.component.ts [ENTRY, SOURCE] (982 B, 今天, Angular 組件)
    │   │   │   │   ├── fullscreen.component.ts [ENTRY, SOURCE] (831 B, 今天, Angular 組件)
    │   │   │   │   ├── i18n.component.ts [ENTRY, SOURCE] (2.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── icon.component.ts [ENTRY, SOURCE] (2.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── notify.component.ts [ENTRY, SOURCE] (6.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── rtl.component.ts [ENTRY, SOURCE] (705 B, 今天, Angular 組件)
    │   │   │   │   ├── search.component.ts [ENTRY, SOURCE] (3.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── task.component.ts [ENTRY, SOURCE] (4.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── user.component.ts [ENTRY, SOURCE] (2.1 KB, 今天, Angular 組件)
    │   │   │   ├── basic.component.ts [ENTRY, SOURCE] (5.2 KB, 今天, Angular 組件)
    │   │   │   ├── README.md [ENTRY, SOURCE] (54 B, 今天, Markdown 文檔)
    │   │   ├── blank [ENTRY, SOURCE]/
    │   │   │   ├── blank.component.ts [ENTRY, SOURCE] (281 B, 今天, Angular 組件)
    │   │   │   ├── README.md [ENTRY, SOURCE] (45 B, 今天, Markdown 文檔)
    │   │   ├── passport [ENTRY, SOURCE]/
    │   │   │   ├── passport.component.less [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   ├── passport.component.ts [ENTRY, SOURCE] (1.6 KB, 今天, Angular 組件)
    │   │   ├── index.ts [ENTRY, SOURCE] (129 B, 今天, TypeScript)
    │   ├── routes [ENTRY, SOURCE]/
    │   │   ├── dashboard [ENTRY, SOURCE]/
    │   │   │   ├── analysis [ENTRY, SOURCE]/
    │   │   │   │   ├── analysis.component.html [ENTRY, SOURCE] (9.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── analysis.component.less [ENTRY, SOURCE] (3.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── analysis.component.ts [ENTRY, SOURCE] (4.1 KB, 今天, Angular 組件)
    │   │   │   ├── monitor [ENTRY, SOURCE]/
    │   │   │   │   ├── monitor.component.html [ENTRY, SOURCE] (4 KB, 今天, Angular 組件)
    │   │   │   │   ├── monitor.component.less [ENTRY, SOURCE] (1.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── monitor.component.ts [ENTRY, SOURCE] (3 KB, 今天, Angular 組件)
    │   │   │   ├── v1 [ENTRY, SOURCE]/
    │   │   │   │   ├── v1.component.html [ENTRY, SOURCE] (7 KB, 今天, Angular 組件)
    │   │   │   │   ├── v1.component.ts [ENTRY, SOURCE] (3 KB, 今天, Angular 組件)
    │   │   │   ├── workplace [ENTRY, SOURCE]/
    │   │   │   │   ├── workplace.component.html [ENTRY, SOURCE] (4.7 KB, 今天, Angular 組件)
    │   │   │   │   ├── workplace.component.less [ENTRY, SOURCE] (4.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── workplace.component.ts [ENTRY, SOURCE] (2.7 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (657 B, 今天, TypeScript)
    │   │   ├── data-v [ENTRY, SOURCE]/
    │   │   │   ├── relation [ENTRY, SOURCE]/
    │   │   │   │   ├── relation.component.html [ENTRY, SOURCE] (33 B, 今天, Angular 組件)
    │   │   │   │   ├── relation.component.ts [ENTRY, SOURCE] (241 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (195 B, 今天, TypeScript)
    │   │   ├── delon [ENTRY, SOURCE]/
    │   │   │   ├── acl [ENTRY, SOURCE]/
    │   │   │   │   ├── acl.component.html [ENTRY, SOURCE] (1.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── acl.component.ts [ENTRY, SOURCE] (1.1 KB, 今天, Angular 組件)
    │   │   │   ├── cache [ENTRY, SOURCE]/
    │   │   │   │   ├── cache.component.html [ENTRY, SOURCE] (321 B, 今天, Angular 組件)
    │   │   │   │   ├── cache.component.ts [ENTRY, SOURCE] (591 B, 今天, Angular 組件)
    │   │   │   ├── downfile [ENTRY, SOURCE]/
    │   │   │   │   ├── downfile.component.html [ENTRY, SOURCE] (308 B, 今天, Angular 組件)
    │   │   │   │   ├── downfile.component.ts [ENTRY, SOURCE] (425 B, 今天, Angular 組件)
    │   │   │   ├── form [ENTRY, SOURCE]/
    │   │   │   │   ├── form.component.html [ENTRY, SOURCE] (262 B, 今天, Angular 組件)
    │   │   │   │   ├── form.component.ts [ENTRY, SOURCE] (740 B, 今天, Angular 組件)
    │   │   │   ├── guard [ENTRY, SOURCE]/
    │   │   │   │   ├── admin.component.ts [ENTRY, SOURCE] (174 B, 今天, Angular 組件)
    │   │   │   │   ├── auth.component.ts [ENTRY, SOURCE] (172 B, 今天, Angular 組件)
    │   │   │   │   ├── can-leave.ts [ENTRY, SOURCE] (799 B, 今天, TypeScript)
    │   │   │   │   ├── guard.component.html [ENTRY, SOURCE] (874 B, 今天, Angular 組件)
    │   │   │   │   ├── guard.component.ts [ENTRY, SOURCE] (851 B, 今天, Angular 組件)
    │   │   │   │   ├── leave.component.ts [ENTRY, SOURCE] (369 B, 今天, Angular 組件)
    │   │   │   ├── print [ENTRY, SOURCE]/
    │   │   │   │   ├── print.component.html [ENTRY, SOURCE] (2.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── print.component.ts [ENTRY, SOURCE] (2.4 KB, 今天, Angular 組件)
    │   │   │   ├── qr [ENTRY, SOURCE]/
    │   │   │   │   ├── qr.component.html [ENTRY, SOURCE] (2.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── qr.component.ts [ENTRY, SOURCE] (477 B, 今天, Angular 組件)
    │   │   │   ├── st [ENTRY, SOURCE]/
    │   │   │   │   ├── st.component.html [ENTRY, SOURCE] (2 KB, 今天, Angular 組件)
    │   │   │   │   ├── st.component.ts [ENTRY, SOURCE] (2.2 KB, 今天, Angular 組件)
    │   │   │   ├── util [ENTRY, SOURCE]/
    │   │   │   │   ├── util.component.html [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── util.component.ts [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   ├── xlsx [ENTRY, SOURCE]/
    │   │   │   │   ├── xlsx.component.html [ENTRY, SOURCE] (554 B, 今天, Angular 組件)
    │   │   │   │   ├── xlsx.component.ts [ENTRY, SOURCE] (1.4 KB, 今天, Angular 組件)
    │   │   │   ├── zip [ENTRY, SOURCE]/
    │   │   │   │   ├── zip.component.html [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── zip.component.ts [ENTRY, SOURCE] (2 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (1.9 KB, 今天, TypeScript)
    │   │   ├── exception [ENTRY, SOURCE]/
    │   │   │   ├── exception.component.ts [ENTRY, SOURCE] (573 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (477 B, 今天, TypeScript)
    │   │   │   ├── trigger.component.ts [ENTRY, SOURCE] (1.2 KB, 今天, Angular 組件)
    │   │   ├── extras [ENTRY, SOURCE]/
    │   │   │   ├── helpcenter [ENTRY, SOURCE]/
    │   │   │   │   ├── helpcenter.component.html [ENTRY, SOURCE] (3.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── helpcenter.component.ts [ENTRY, SOURCE] (512 B, 今天, Angular 組件)
    │   │   │   ├── poi [ENTRY, SOURCE]/
    │   │   │   │   ├── edit [ENTRY, SOURCE]/
    │   │   │   │   │   ├── edit.component.html [ENTRY, SOURCE] (3.9 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── edit.component.ts [ENTRY, SOURCE] (1006 B, 今天, Angular 組件)
    │   │   │   │   ├── poi.component.html [ENTRY, SOURCE] (986 B, 今天, Angular 組件)
    │   │   │   │   ├── poi.component.ts [ENTRY, SOURCE] (1.6 KB, 今天, Angular 組件)
    │   │   │   ├── settings [ENTRY, SOURCE]/
    │   │   │   │   ├── settings.component.html [ENTRY, SOURCE] (10.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── settings.component.ts [ENTRY, SOURCE] (1.5 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (450 B, 今天, TypeScript)
    │   │   ├── organization [ENTRY, SOURCE]/
    │   │   │   ├── guards [ENTRY, SOURCE]/
    │   │   │   │   ├── organization.guard.ts [ENTRY, SOURCE] (4 KB, 今天, Angular 守衛)
    │   │   │   ├── models [ENTRY, SOURCE]/
    │   │   │   │   ├── common.model.ts [ENTRY, SOURCE] (2.7 KB, 今天, TypeScript)
    │   │   │   │   ├── department.model.ts [ENTRY, SOURCE] (1.8 KB, 今天, TypeScript)
    │   │   │   │   ├── employee.model.ts [ENTRY, SOURCE] (2.6 KB, 今天, TypeScript)
    │   │   │   │   ├── index.ts [ENTRY, SOURCE] (374 B, 今天, TypeScript)
    │   │   │   │   ├── organization.model.ts [ENTRY, SOURCE] (2 KB, 今天, TypeScript)
    │   │   │   │   ├── role.model.ts [ENTRY, SOURCE] (2.7 KB, 今天, TypeScript)
    │   │   │   ├── services [ENTRY, SOURCE]/
    │   │   │   │   ├── department.service.ts [ENTRY, SOURCE] (4.5 KB, 今天, Angular 服務)
    │   │   │   │   ├── employee.service.ts [ENTRY, SOURCE] (4.9 KB, 今天, Angular 服務)
    │   │   │   │   ├── organization.service.ts [ENTRY, SOURCE] (5.2 KB, 今天, Angular 服務)
    │   │   │   │   ├── role.service.ts [ENTRY, SOURCE] (4.5 KB, 今天, Angular 服務)
    │   │   │   ├── COMPONENTS.md [ENTRY, SOURCE] (9.8 KB, 今天, Markdown 文檔)
    │   │   │   ├── DESIGN.md [ENTRY, SOURCE] (29.5 KB, 今天, Markdown 文檔)
    │   │   │   ├── README.md [ENTRY, SOURCE] (7.5 KB, 今天, Markdown 文檔)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (3.5 KB, 今天, TypeScript)
    │   │   ├── passport [ENTRY, SOURCE]/
    │   │   │   ├── landing [ENTRY, SOURCE]/
    │   │   │   │   ├── landing.component.html [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── landing.component.less [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── landing.component.ts [ENTRY, SOURCE] (731 B, 今天, Angular 組件)
    │   │   │   ├── lock [ENTRY, SOURCE]/
    │   │   │   │   ├── lock.component.html [ENTRY, SOURCE] (856 B, 今天, Angular 組件)
    │   │   │   │   ├── lock.component.less [ENTRY, SOURCE] (185 B, 今天, Angular 組件)
    │   │   │   │   ├── lock.component.ts [ENTRY, SOURCE] (1.5 KB, 今天, Angular 組件)
    │   │   │   ├── login [ENTRY, SOURCE]/
    │   │   │   │   ├── login.component.html [ENTRY, SOURCE] (3.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── login.component.less [ENTRY, SOURCE] (981 B, 今天, Angular 組件)
    │   │   │   │   ├── login.component.ts [ENTRY, SOURCE] (6.3 KB, 今天, Angular 組件)
    │   │   │   ├── register [ENTRY, SOURCE]/
    │   │   │   │   ├── register.component.html [ENTRY, SOURCE] (4.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── register.component.less [ENTRY, SOURCE] (678 B, 今天, Angular 組件)
    │   │   │   │   ├── register.component.ts [ENTRY, SOURCE] (4.3 KB, 今天, Angular 組件)
    │   │   │   ├── register-result [ENTRY, SOURCE]/
    │   │   │   │   ├── register-result.component.html [ENTRY, SOURCE] (586 B, 今天, Angular 組件)
    │   │   │   │   ├── register-result.component.ts [ENTRY, SOURCE] (598 B, 今天, Angular 組件)
    │   │   │   ├── callback.component.ts [ENTRY, SOURCE] (828 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (1.5 KB, 今天, TypeScript)
    │   │   ├── pro [ENTRY, SOURCE]/
    │   │   │   ├── account [ENTRY, SOURCE]/
    │   │   │   │   ├── center [ENTRY, SOURCE]/
    │   │   │   │   │   ├── projects [ENTRY, SOURCE, Angular]/
    │   │   │   │   │   │   ├── projects.component.html [ENTRY, SOURCE] (1003 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── projects.component.less [ENTRY, SOURCE] (401 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── projects.component.ts [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications [ENTRY, SOURCE]/
    │   │   │   │   │   │   ├── applications.component.html [ENTRY, SOURCE] (1.7 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── applications.component.less [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── applications.component.ts [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── articles [ENTRY, SOURCE]/
    │   │   │   │   │   │   ├── articles.component.html [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── articles.component.ts [ENTRY, SOURCE] (456 B, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.html [ENTRY, SOURCE] (2.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.less [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.ts [ENTRY, SOURCE] (2.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── settings [ENTRY, SOURCE]/
    │   │   │   │   │   └── base [ENTRY, SOURCE]/
    │   │   │   │   │       ├── base.component.html [ENTRY, SOURCE] (2.7 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── base.component.less [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── base.component.ts [ENTRY, SOURCE] (2 KB, 今天, Angular 組件)
    │   │   │   │   │   └── binding [ENTRY, SOURCE]/
    │   │   │   │   │       ├── binding.component.html [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── binding.component.ts [ENTRY, SOURCE] (452 B, 今天, Angular 組件)
    │   │   │   │   │   └── notification [ENTRY, SOURCE]/
    │   │   │   │   │       ├── notification.component.html [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── notification.component.ts [ENTRY, SOURCE] (498 B, 今天, Angular 組件)
    │   │   │   │   │   └── security [ENTRY, SOURCE]/
    │   │   │   │   │       ├── security.component.html [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── security.component.ts [ENTRY, SOURCE] (455 B, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.html [ENTRY, SOURCE] (329 B, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.less [ENTRY, SOURCE] (1.5 KB, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.ts [ENTRY, SOURCE] (2.3 KB, 今天, Angular 組件)
    │   │   │   ├── form [ENTRY, SOURCE]/
    │   │   │   │   ├── advanced-form [ENTRY, SOURCE]/
    │   │   │   │   │   ├── advanced-form.component.html [ENTRY, SOURCE] (8.7 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced-form.component.ts [ENTRY, SOURCE] (4.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic-form [ENTRY, SOURCE]/
    │   │   │   │   │   ├── basic-form.component.html [ENTRY, SOURCE] (2.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-form.component.ts [ENTRY, SOURCE] (1.2 KB, 今天, Angular 組件)
    │   │   │   │   ├── step-form [ENTRY, SOURCE]/
    │   │   │   │   │   └── step-form.component.html [ENTRY, SOURCE] (515 B, 今天, Angular 組件)
    │   │   │   │   │   └── step-form.component.less [ENTRY, SOURCE] (362 B, 今天, Angular 組件)
    │   │   │   │   │   └── step-form.component.ts [ENTRY, SOURCE] (870 B, 今天, Angular 組件)
    │   │   │   │   │   └── step1.component.html [ENTRY, SOURCE] (1.9 KB, 今天, Angular 組件)
    │   │   │   │   │   └── step1.component.ts [ENTRY, SOURCE] (1.2 KB, 今天, Angular 組件)
    │   │   │   │   │   └── step2.component.html [ENTRY, SOURCE] (995 B, 今天, Angular 組件)
    │   │   │   │   │   └── step2.component.ts [ENTRY, SOURCE] (969 B, 今天, Angular 組件)
    │   │   │   │   │   └── step3.component.html [ENTRY, SOURCE] (670 B, 今天, Angular 組件)
    │   │   │   │   │   └── step3.component.ts [ENTRY, SOURCE] (549 B, 今天, Angular 組件)
    │   │   │   │   │   └── transfer.service.ts [ENTRY, SOURCE] (823 B, 今天, Angular 服務)
    │   │   │   ├── list [ENTRY, SOURCE]/
    │   │   │   │   ├── projects [ENTRY, SOURCE, Angular]/
    │   │   │   │   │   ├── projects.component.html [ENTRY, SOURCE] (2.2 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── projects.component.less [ENTRY, SOURCE] (401 B, 今天, Angular 組件)
    │   │   │   │   │   ├── projects.component.ts [ENTRY, SOURCE] (2 KB, 今天, Angular 組件)
    │   │   │   │   ├── applications [ENTRY, SOURCE]/
    │   │   │   │   │   ├── applications.component.html [ENTRY, SOURCE] (3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications.component.less [ENTRY, SOURCE] (1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications.component.ts [ENTRY, SOURCE] (2.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── articles [ENTRY, SOURCE]/
    │   │   │   │   │   ├── articles.component.html [ENTRY, SOURCE] (3.5 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── articles.component.ts [ENTRY, SOURCE] (2.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic-list [ENTRY, SOURCE]/
    │   │   │   │   │   ├── edit [ENTRY, SOURCE]/
    │   │   │   │   │   │   ├── edit.component.html [ENTRY, SOURCE] (388 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── edit.component.ts [ENTRY, SOURCE] (1.4 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.html [ENTRY, SOURCE] (3.4 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.less [ENTRY, SOURCE] (317 B, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.ts [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── card-list [ENTRY, SOURCE]/
    │   │   │   │   │   ├── card-list.component.html [ENTRY, SOURCE] (2.2 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── card-list.component.ts [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── list [ENTRY, SOURCE]/
    │   │   │   │   │   ├── list.component.html [ENTRY, SOURCE] (630 B, 今天, Angular 組件)
    │   │   │   │   │   ├── list.component.ts [ENTRY, SOURCE] (1.2 KB, 今天, Angular 組件)
    │   │   │   │   ├── table-list [ENTRY, SOURCE]/
    │   │   │   │   │   └── table-list.component.html [ENTRY, SOURCE] (4.6 KB, 今天, Angular 組件)
    │   │   │   │   │   └── table-list.component.ts [ENTRY, SOURCE] (4.4 KB, 今天, Angular 組件)
    │   │   │   ├── profile [ENTRY, SOURCE]/
    │   │   │   │   ├── advanced [ENTRY, SOURCE]/
    │   │   │   │   │   ├── advanced.component.html [ENTRY, SOURCE] (5.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced.component.less [ENTRY, SOURCE] (329 B, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced.component.ts [ENTRY, SOURCE] (1.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic [ENTRY, SOURCE]/
    │   │   │   │   │   └── basic.component.html [ENTRY, SOURCE] (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   └── basic.component.ts [ENTRY, SOURCE] (1.8 KB, 今天, Angular 組件)
    │   │   │   ├── result [ENTRY, SOURCE]/
    │   │   │   │   ├── fail [ENTRY, SOURCE]/
    │   │   │   │   │   ├── fail.component.html [ENTRY, SOURCE] (893 B, 今天, Angular 組件)
    │   │   │   │   │   ├── fail.component.ts [ENTRY, SOURCE] (314 B, 今天, Angular 組件)
    │   │   │   │   ├── success [ENTRY, SOURCE]/
    │   │   │   │   │   └── success.component.html [ENTRY, SOURCE] (2.4 KB, 今天, Angular 組件)
    │   │   │   │   │   └── success.component.ts [ENTRY, SOURCE] (501 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (4.7 KB, 今天, TypeScript)
    │   │   ├── style [ENTRY, SOURCE]/
    │   │   │   ├── colors [ENTRY, SOURCE]/
    │   │   │   │   ├── colors.component.html [ENTRY, SOURCE] (4 KB, 今天, Angular 組件)
    │   │   │   │   ├── colors.component.less [ENTRY, SOURCE] (180 B, 今天, Angular 組件)
    │   │   │   │   ├── colors.component.ts [ENTRY, SOURCE] (820 B, 今天, Angular 組件)
    │   │   │   ├── gridmasonry [ENTRY, SOURCE]/
    │   │   │   │   ├── gridmasonry.component.html [ENTRY, SOURCE] (13.9 KB, 今天, Angular 組件)
    │   │   │   │   ├── gridmasonry.component.less [ENTRY, SOURCE] (282 B, 今天, Angular 組件)
    │   │   │   │   ├── gridmasonry.component.ts [ENTRY, SOURCE] (290 B, 今天, Angular 組件)
    │   │   │   ├── typography [ENTRY, SOURCE]/
    │   │   │   │   ├── typography.component.html [ENTRY, SOURCE] (4.7 KB, 今天, Angular 組件)
    │   │   │   │   ├── typography.component.ts [ENTRY, SOURCE] (413 B, 今天, Angular 組件)
    │   │   │   ├── color.service.ts [ENTRY, SOURCE] (663 B, 今天, Angular 服務)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (591 B, 今天, TypeScript)
    │   │   ├── widgets [ENTRY, SOURCE]/
    │   │   │   ├── widgets [ENTRY, SOURCE]/
    │   │   │   │   ├── widgets.component.html [ENTRY, SOURCE] (31.9 KB, 今天, Angular 組件)
    │   │   │   │   ├── widgets.component.less [ENTRY, SOURCE] (246 B, 今天, Angular 組件)
    │   │   │   │   ├── widgets.component.ts [ENTRY, SOURCE] (2.1 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts [ENTRY, SOURCE] (183 B, 今天, TypeScript)
    │   │   ├── routes.ts [ENTRY, SOURCE] (1.7 KB, 今天, TypeScript)
    │   ├── shared [ENTRY, SOURCE]/
    │   │   ├── cell-widget [ENTRY, SOURCE]/
    │   │   │   ├── index.ts [ENTRY, SOURCE] (124 B, 今天, TypeScript)
    │   │   ├── json-schema [ENTRY, SOURCE]/
    │   │   │   ├── index.ts [ENTRY, SOURCE] (350 B, 今天, TypeScript)
    │   │   │   ├── README.md [ENTRY, SOURCE] (326 B, 今天, Markdown 文檔)
    │   │   ├── st-widget [ENTRY, SOURCE]/
    │   │   │   ├── index.ts [ENTRY, SOURCE] (116 B, 今天, TypeScript)
    │   │   │   ├── README.md [ENTRY, SOURCE] (68 B, 今天, Markdown 文檔)
    │   │   ├── utils [ENTRY, SOURCE]/
    │   │   │   ├── yuan.ts [ENTRY, SOURCE] (305 B, 今天, TypeScript)
    │   │   ├── index.ts [ENTRY, SOURCE] (208 B, 今天, TypeScript)
    │   │   ├── README.md [ENTRY, SOURCE] (734 B, 今天, Markdown 文檔)
    │   │   ├── shared-delon.module.ts [ENTRY, SOURCE] (511 B, 今天, Angular 模組)
    │   │   ├── shared-imports.ts [ENTRY, SOURCE] (602 B, 今天, TypeScript)
    │   │   ├── shared-zorro.module.ts [ENTRY, SOURCE] (2.3 KB, 今天, Angular 模組)
    │   ├── app.component.ts [ENTRY, SOURCE] (1.7 KB, 今天, Angular 組件)
    │   ├── app.config.ts [ENTRY, SOURCE] (2.8 KB, 今天, TypeScript)
    ├── assets [ENTRY, SOURCE]/
    │   ├── tmp [ENTRY, SOURCE]/
    │   │   ├── i18n [ENTRY, SOURCE]/
    │   │   │   ├── el-GR.json [ENTRY, SOURCE] (10 KB, 今天, JSON 配置)
    │   │   │   ├── en-US.json [ENTRY, SOURCE] (7 KB, 今天, JSON 配置)
    │   │   │   ├── es-ES.json [ENTRY, SOURCE] (7.6 KB, 今天, JSON 配置)
    │   │   │   ├── fr-FR.json [ENTRY, SOURCE] (7.7 KB, 今天, JSON 配置)
    │   │   │   ├── hr-HR.json [ENTRY, SOURCE] (7.1 KB, 今天, JSON 配置)
    │   │   │   ├── it-IT.json [ENTRY, SOURCE] (7.3 KB, 今天, JSON 配置)
    │   │   │   ├── ko-KR.json [ENTRY, SOURCE] (7.4 KB, 今天, JSON 配置)
    │   │   │   ├── pl-PL.json [ENTRY, SOURCE] (7.5 KB, 今天, JSON 配置)
    │   │   │   ├── sl-SI.json [ENTRY, SOURCE] (7.2 KB, 今天, JSON 配置)
    │   │   │   ├── tr-TR.json [ENTRY, SOURCE] (7.3 KB, 今天, JSON 配置)
    │   │   │   ├── zh-CN.json [ENTRY, SOURCE] (6.9 KB, 今天, JSON 配置)
    │   │   │   ├── zh-TW.json [ENTRY, SOURCE] (6.9 KB, 今天, JSON 配置)
    │   │   ├── img [ENTRY, SOURCE]/
    │   │   │   ├── 1.png [ENTRY, SOURCE] (2.8 KB, 今天, 檔案)
    │   │   │   ├── 2.png [ENTRY, SOURCE] (2.5 KB, 今天, 檔案)
    │   │   │   ├── 3.png [ENTRY, SOURCE] (3.3 KB, 今天, 檔案)
    │   │   │   ├── 4.png [ENTRY, SOURCE] (3.2 KB, 今天, 檔案)
    │   │   │   ├── 5.png [ENTRY, SOURCE] (2.5 KB, 今天, 檔案)
    │   │   │   ├── 6.png [ENTRY, SOURCE] (3.7 KB, 今天, 檔案)
    │   │   │   ├── avatar.jpg [ENTRY, SOURCE] (42.2 KB, 今天, 檔案)
    │   │   │   ├── bg1.jpg [ENTRY, SOURCE] (632.2 KB, 今天, 檔案)
    │   │   │   ├── bg10.jpg [ENTRY, SOURCE] (181.6 KB, 今天, 檔案)
    │   │   │   ├── bg2.jpg [ENTRY, SOURCE] (144.7 KB, 今天, 檔案)
    │   │   │   ├── bg3.jpg [ENTRY, SOURCE] (352.5 KB, 今天, 檔案)
    │   │   │   ├── bg4.jpg [ENTRY, SOURCE] (482.3 KB, 今天, 檔案)
    │   │   │   ├── bg5.jpg [ENTRY, SOURCE] (154.2 KB, 今天, 檔案)
    │   │   │   ├── bg6.jpg [ENTRY, SOURCE] (443.2 KB, 今天, 檔案)
    │   │   │   ├── bg7.jpg [ENTRY, SOURCE] (45 KB, 今天, 檔案)
    │   │   │   ├── bg8.jpg [ENTRY, SOURCE] (190.1 KB, 今天, 檔案)
    │   │   │   ├── bg9.jpg [ENTRY, SOURCE] (62.6 KB, 今天, 檔案)
    │   │   │   ├── half-float-bg-1.jpg [ENTRY, SOURCE] (106.1 KB, 今天, 檔案)
    │   │   ├── app-data.json [ENTRY, SOURCE] (9.1 KB, 今天, JSON 配置)
    │   │   ├── demo.docx [ENTRY, SOURCE] (11.4 KB, 今天, 檔案)
    │   │   ├── demo.pdf [ENTRY, SOURCE] (45.6 KB, 今天, 檔案)
    │   │   ├── demo.pptx [ENTRY, SOURCE] (32.8 KB, 今天, 檔案)
    │   │   ├── demo.xlsx [ENTRY, SOURCE] (8.3 KB, 今天, 檔案)
    │   │   ├── demo.zip [ENTRY, SOURCE] (84.3 KB, 今天, 檔案)
    │   │   ├── on-boarding.json [ENTRY, SOURCE] (679 B, 今天, JSON 配置)
    │   ├── .gitkeep [ENTRY, SOURCE] (0 B, 今天, 檔案)
    │   ├── color.less [ENTRY, SOURCE] (103.9 KB, 今天, Less 樣式)
    │   ├── logo-color.svg [ENTRY, SOURCE] (2 KB, 今天, 檔案)
    │   ├── logo-full.svg [ENTRY, SOURCE] (4.3 KB, 今天, 檔案)
    │   ├── logo.svg [ENTRY, SOURCE] (2 KB, 今天, 檔案)
    │   ├── style.compact.css [ENTRY, SOURCE] (761.1 KB, 今天, CSS 樣式)
    │   ├── style.dark.css [ENTRY, SOURCE] (782.4 KB, 今天, CSS 樣式)
    │   ├── zorro.svg [ENTRY, SOURCE] (2.2 KB, 今天, 檔案)
    ├── environments [ENTRY, SOURCE]/
    │   ├── environment.prod.ts [ENTRY, SOURCE] (229 B, 今天, TypeScript)
    │   ├── environment.ts [ENTRY, SOURCE] (646 B, 今天, TypeScript)
    ├── styles [ENTRY, SOURCE]/
    │   ├── index.less [ENTRY, SOURCE] (80 B, 今天, Less 樣式)
    │   ├── theme.less [ENTRY, SOURCE] (463 B, 今天, Less 樣式)
    ├── index.html [ENTRY, SOURCE] (1.9 KB, 今天, HTML 模板)
    ├── main.ts [ENTRY, SOURCE] (246 B, 今天, TypeScript)
    ├── style-icons-auto.ts [ENTRY, SOURCE] (1.9 KB, 今天, TypeScript)
    ├── style-icons.ts [ENTRY, SOURCE] (253 B, 今天, TypeScript)
    ├── styles.less [ENTRY, SOURCE] (282 B, 今天, Less 樣式)
    ├── typings.d.ts [ENTRY, SOURCE] (144 B, 今天, TypeScript)
└── _mock [MOCK, DEV, ng-alain]/
    ├── _api.ts [MOCK, DEV] (8 KB, 今天, TypeScript)
    ├── _chart.ts [MOCK, DEV] (3.4 KB, 今天, TypeScript)
    ├── _geo.ts [MOCK, DEV] (1.1 KB, 今天, TypeScript)
    ├── _pois.ts [MOCK, DEV] (1.5 KB, 今天, TypeScript)
    ├── _profile.ts [MOCK, DEV] (2.7 KB, 今天, TypeScript)
    ├── _rule.ts [MOCK, DEV] (2.4 KB, 今天, TypeScript)
    ├── _user.ts [MOCK, DEV] (3.1 KB, 今天, TypeScript)
    ├── index.ts [MOCK, DEV] (177 B, 今天, TypeScript)
    ├── README.md [MOCK, DEV] (54 B, 今天, Markdown 文檔)
└── .cursor/
    ├── rules/
    │   ├── isolation_rules/
    │   │   └── Core/
    │   │       ├── command-execution.mdc (8.8 KB, 今天, 檔案)
    │   │       ├── complexity-decision-tree.mdc (5.9 KB, 今天, 檔案)
    │   │       ├── creative-phase-enforcement.mdc (4.1 KB, 今天, 檔案)
    │   │       ├── creative-phase-metrics.mdc (5.5 KB, 今天, 檔案)
    │   │       ├── file-verification.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── hierarchical-rule-loading.mdc (8.3 KB, 今天, 檔案)
    │   │       ├── mode-transition-optimization.mdc (10.2 KB, 今天, 檔案)
    │   │       ├── optimization-integration.mdc (9.6 KB, 今天, 檔案)
    │   │       ├── platform-awareness.mdc (2 KB, 今天, 檔案)
    │   │   └── Level1/
    │   │       ├── optimized-workflow-level1.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── quick-documentation.mdc (6.4 KB, 今天, 檔案)
    │   │       ├── workflow-level1.mdc (5.3 KB, 今天, 檔案)
    │   │   └── Level2/
    │   │       ├── archive-basic.mdc (4.8 KB, 今天, 檔案)
    │   │       ├── reflection-basic.mdc (5.6 KB, 今天, 檔案)
    │   │       ├── task-tracking-basic.mdc (4.6 KB, 今天, 檔案)
    │   │       ├── workflow-level2.mdc (8.7 KB, 今天, 檔案)
    │   │   └── Level3/
    │   │       ├── planning-comprehensive.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── task-tracking-intermediate.mdc (3.9 KB, 今天, 檔案)
    │   │   └── Level4/
    │   │       ├── architectural-planning.mdc (25.2 KB, 今天, 檔案)
    │   │       ├── archive-comprehensive.mdc (21.7 KB, 今天, 檔案)
    │   │       ├── phased-implementation.mdc (20.6 KB, 今天, 檔案)
    │   │       ├── reflection-comprehensive.mdc (24.9 KB, 今天, 檔案)
    │   │       ├── task-tracking-advanced.mdc (16.3 KB, 今天, 檔案)
    │   │       ├── workflow-level4.mdc (17.5 KB, 今天, 檔案)
    │   │   └── Phases/
    │   │       ├── CreativePhase/
    │   │       │   └── creative-phase-architecture.mdc (4.8 KB, 今天, 檔案)
    │   │   └── visual-maps/
    │   │       ├── van_mode_split/
    │   │       │   ├── van-qa-checks/
    │   │       │   │   ├── build-test.mdc (3.4 KB, 今天, 檔案)
    │   │       │   │   ├── config-check.mdc (3.7 KB, 今天, 檔案)
    │   │       │   │   ├── dependency-check.mdc (4.7 KB, 今天, 檔案)
    │   │       │   │   ├── environment-check.mdc (3.5 KB, 今天, 檔案)
    │   │       │   │   ├── file-verification.mdc (1 B, 今天, 檔案)
    │   │       │   ├── van-qa-utils/
    │   │       │   │   ├── common-fixes.mdc (3.3 KB, 今天, 檔案)
    │   │       │   │   ├── mode-transitions.mdc (3.4 KB, 今天, 檔案)
    │   │       │   │   ├── reports.mdc (5.8 KB, 今天, 檔案)
    │   │       │   │   ├── rule-calling-guide.mdc (2.4 KB, 今天, 檔案)
    │   │       │   │   ├── rule-calling-help.mdc (518 B, 今天, 檔案)
    │   │       │   ├── van-complexity-determination.mdc (4.2 KB, 今天, 檔案)
    │   │       │   ├── van-file-verification.mdc (9.3 KB, 今天, 檔案)
    │   │       │   ├── van-mode-map.mdc (32.7 KB, 今天, 檔案)
    │   │       │   ├── van-platform-detection.mdc (1.6 KB, 今天, 檔案)
    │   │       │   ├── van-qa-main.mdc (5.3 KB, 今天, 檔案)
    │   │       │   ├── van-qa-validation.md.old (16.8 KB, 今天, 檔案)
    │   │       ├── archive-mode-map.mdc (7.9 KB, 今天, 檔案)
    │   │       ├── creative-mode-map.mdc (7.1 KB, 今天, 檔案)
    │   │       ├── implement-mode-map.mdc (9.7 KB, 今天, 檔案)
    │   │       ├── plan-mode-map.mdc (9.5 KB, 今天, 檔案)
    │   │       ├── qa-mode-map.mdc (22.6 KB, 今天, 檔案)
    │   │       ├── reflect-mode-map.mdc (7 KB, 今天, 檔案)
    │   │       ├── van-mode-map.mdc (32 KB, 今天, 檔案)
    │   │   └── main-optimized.mdc (8 KB, 今天, 檔案)
    │   │   └── main.mdc (5.6 KB, 今天, 檔案)
    ├── angular-cli.rules.mdc (511 B, 今天, 檔案)
    ├── context7.rules.mdc (514 B, 今天, 檔案)
    ├── everything.rules.mdc (558 B, 今天, 檔案)
    ├── fetch.rules.mdc (427 B, 今天, 檔案)
    ├── filesystem.rules.mdc (549 B, 今天, 檔案)
    ├── github.rules.mdc (431 B, 今天, 檔案)
    ├── mcp.json (2 KB, 今天, JSON 配置)
    ├── memory-config.mdc (2.4 KB, 今天, 檔案)
    ├── memory.rules.mdc (1.5 KB, 今天, 檔案)
    ├── playwright.rules.mdc (507 B, 今天, 檔案)
    ├── sequential-thinking.rules.mdc (471 B, 今天, 檔案)
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── config.yml (412 B, 今天, YAML 配置)
    ├── workflows/
    │   ├── ci.yml (5 KB, 今天, YAML 配置)
    │   ├── deploy-site.yml (1.3 KB, 今天, YAML 配置)
    ├── alain-bot.yml (1.4 KB, 今天, YAML 配置)
    ├── FUNDING.yml (143 B, 今天, YAML 配置)
    ├── ISSUE_TEMPLATE.md (383 B, 今天, Markdown 文檔)
    ├── lock.yml (568 B, 今天, YAML 配置)
    ├── no-response.yml (995 B, 今天, YAML 配置)
    ├── PULL_REQUEST_TEMPLATE.md (1.2 KB, 今天, Markdown 文檔)
    ├── semantic.yml (146 B, 今天, YAML 配置)
└── docs [DOC]/
└── memory-bank [DOC, AI]/
    ├── active-context [DOC, AI]/
    │   ├── changes [DOC, AI]/
    │   │   ├── recentChanges.md [DOC, AI] (3.2 KB, 今天, Markdown 文檔)
    │   ├── context [DOC, AI]/
    │   │   ├── currentFocus.md [DOC, AI] (567 B, 今天, Markdown 文檔)
    │   ├── status [DOC, AI]/
    │   │   └── systemStatus.md [DOC, AI] (496 B, 今天, Markdown 文檔)
    ├── archive [DOC, AI]/
    │   ├── backup [DOC, AI]/
    │   │   ├── backupStrategy.md [DOC, AI] (8.8 KB, 今天, Markdown 文檔)
    │   ├── completed-tasks [DOC, AI]/
    │   │   ├── taskArchive.md [DOC, AI] (4.4 KB, 今天, Markdown 文檔)
    │   ├── historical-data [DOC, AI]/
    │   │   └── memory_bank_upgrade_guide.md [DOC, AI] (27.9 KB, 昨天, Markdown 文檔)
    │   │   └── ng-alain-structure.md [DOC, AI] (2.1 KB, 今天, Markdown 文檔)
    │   │   └── projectHistory.md [DOC, AI] (6.5 KB, 今天, Markdown 文檔)
    ├── creative-phase [DOC, AI]/
    │   ├── alternatives [DOC, AI]/
    │   │   ├── alternativeSolutions.md [DOC, AI] (2.3 KB, 今天, Markdown 文檔)
    │   ├── design-decisions [DOC, AI]/
    │   │   ├── designDecisions.md [DOC, AI] (4 KB, 今天, Markdown 文檔)
    │   ├── exploration [DOC, AI]/
    ├── implementation [DOC, AI]/
    │   ├── code [DOC, AI]/
    │   │   ├── codeStandards.md [DOC, AI] (8.2 KB, 今天, Markdown 文檔)
    │   ├── documentation [DOC, AI]/
    │   │   └── documentationStandards.md [DOC, AI] (5 KB, 今天, Markdown 文檔)
    ├── optimization-journey [DOC, AI]/
    │   ├── 00-introduction.md [DOC, AI] (1.2 KB, 昨天, Markdown 文檔)
    │   ├── 01-efficiency-and-clarity.md [DOC, AI] (1.4 KB, 昨天, Markdown 文檔)
    │   ├── 02-system-self-assessment.md [DOC, AI] (1 KB, 昨天, Markdown 文檔)
    │   ├── 03-redundancy-elimination.md [DOC, AI] (934 B, 昨天, Markdown 文檔)
    │   ├── 04-single-source-of-truth.md [DOC, AI] (1.5 KB, 昨天, Markdown 文檔)
    │   ├── 05-adaptive-complexity-model.md [DOC, AI] (1.6 KB, 昨天, Markdown 文檔)
    │   ├── 06-self-assessment-recommendations.md [DOC, AI] (2 KB, 昨天, Markdown 文檔)
    │   ├── 07-structured-creative-thinking.md [DOC, AI] (2.7 KB, 昨天, Markdown 文檔)
    │   ├── 08-creative-phase-enforcement.md [DOC, AI] (2.6 KB, 昨天, Markdown 文檔)
    │   ├── 09-context-optimization.md [DOC, AI] (3.6 KB, 昨天, Markdown 文檔)
    │   ├── 10-current-system-state.md [DOC, AI] (6.2 KB, 昨天, Markdown 文檔)
    │   ├── 12-future-directions.md [DOC, AI] (2 KB, 昨天, Markdown 文檔)
    │   ├── 13-future-directions.md [DOC, AI] (1.8 KB, 昨天, Markdown 文檔)
    │   ├── README.md [DOC, AI] (7.8 KB, 昨天, Markdown 文檔)
    ├── system-patterns [DOC, AI]/
    │   ├── architecture [DOC, AI]/
    │   │   ├── architectureDecisions.md [DOC, AI] (2.3 KB, 今天, Markdown 文檔)
    │   │   ├── designPhilosophy.md [DOC, AI] (1.6 KB, 今天, Markdown 文檔)
    │   │   ├── projectArchitecture.md [DOC, AI] (6.6 KB, 今天, Markdown 文檔)
    │   │   ├── README.md [DOC, AI] (3.3 KB, 今天, Markdown 文檔)
    │   ├── patterns [DOC, AI]/
    │   │   ├── developmentPatterns.md [DOC, AI] (2.6 KB, 今天, Markdown 文檔)
    │   │   ├── developmentPrinciples.md [DOC, AI] (6.1 KB, 今天, Markdown 文檔)
    │   │   ├── technicalPatterns.md [DOC, AI] (4.7 KB, 今天, Markdown 文檔)
    │   ├── workflows [DOC, AI]/
    │   │   └── developmentWorkflow.md [DOC, AI] (2.8 KB, 今天, Markdown 文檔)
    ├── memory.json [DOC, AI] (12.2 KB, 今天, JSON 配置)
    ├── ng-alain-structure.md [DOC, AI] (50.4 KB, 今天, Markdown 文檔)
    ├── progress.md [DOC, AI] (2.5 KB, 今天, Markdown 文檔)
    ├── projectbrief.md [DOC, AI] (1.1 KB, 今天, Markdown 文檔)
    ├── README.md [DOC, AI] (4.8 KB, 今天, Markdown 文檔)
    ├── techContext.md [DOC, AI] (1.6 KB, 今天, Markdown 文檔)
└── public/
    ├── favicon.ico (15.3 KB, 今天, 圖示檔案)
└── scripts [BUILD, SCRIPT]/
    ├── _ci [BUILD, SCRIPT]/
    │   ├── delon.sh [BUILD, SCRIPT] (460 B, 今天, 檔案)
    │   ├── deploy-pipelines.sh [BUILD, SCRIPT] (1.3 KB, 今天, 檔案)
    │   ├── fix-day.js [BUILD, SCRIPT] (345 B, 今天, JavaScript)
    │   ├── github-comment.js [BUILD, SCRIPT] (1.4 KB, 今天, JavaScript)
    │   ├── README.md [BUILD, SCRIPT] (33 B, 今天, Markdown 文檔)
    ├── generate-tree.ts [BUILD, SCRIPT] (24.7 KB, 今天, TypeScript)
└── .cursorrules (8.9 KB, 今天, 檔案)
└── .editorconfig (274 B, 今天, 檔案)
└── .gitignore (736 B, 今天, 檔案)
└── .npmignore (31 B, 今天, 檔案)
└── .npmrc (40 B, 今天, 檔案)
└── .nvmrc (8 B, 今天, 檔案)
└── .prettierignore (198 B, 今天, 檔案)
└── .prettierrc.js (264 B, 今天, JavaScript)
└── .yarnrc.yml (98 B, 今天, YAML 配置)
└── angular.json [CONFIG, BUILD] (4.8 KB, 今天, JSON 配置)
└── CONTRIBUTING.md (8.4 KB, 今天, Markdown 文檔)
└── custom_modes (7.9 KB, 昨天, 檔案)
└── eslint.config.mjs (4.2 KB, 今天, ES 模組)
└── LICENSE (1.1 KB, 今天, 檔案)
└── ng-alain.json [CONFIG, ALAIN] (177 B, 今天, JSON 配置)
└── package.json [CONFIG, DEP] (3.9 KB, 今天, JSON 配置)
└── proxy.conf.js [CONFIG, DEV] (634 B, 今天, JavaScript)
└── README.md (4.4 KB, 今天, Markdown 文檔)
└── stylelint.config.mjs (1.7 KB, 今天, ES 模組)
└── tsconfig.app.json (424 B, 今天, JSON 配置)
└── tsconfig.json [CONFIG, TS] (1.3 KB, 今天, JSON 配置)
└── tsconfig.spec.json (434 B, 今天, JSON 配置)

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

### Git Hook 自動更新
此文件可配置在 Git pre-commit hook 中自動更新，確保專案結構文檔始終保持最新狀態。

### 腳本特色功能 (v3.0 AI 友好版)
- 🤖 **AI Agent 友好**: YAML frontmatter、結構化元數據
- 📊 **統計摘要**: 快速理解專案規模和文件分布
- 🧭 **快速導航**: 關鍵路徑快速定位
- 🏷️ **語義化標籤**: 目錄用途和功能說明
- 🔍 **完整樹狀圖**: 詳細的目錄結構展示

---

*Generated by ng-alain Structure Generator v3.0 (AI-Friendly Edition)*  
*Generated at: 2025-10-07*
