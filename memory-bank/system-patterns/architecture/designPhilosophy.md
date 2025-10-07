---
type: philosophy
category: design-principles
complexity: basic
target_audience: [developer, architect, designer]
reading_time: 5min
tags: [philosophy, principles, design, modern-angular, enterprise]
summary: 專案的核心設計理念和六大設計原則
related_files:
  - projectArchitecture.md
  - architectureDecisions.md
last_updated: 2025-10-07
---

# 設計哲學

## 核心原則

### 三大理念
1. **Modern Angular First**: 擁抱 Angular 20 最新特性
2. **Enterprise UI Standards**: 基於 Ant Design 規範  
3. **Developer Experience**: 優化開發體驗

## 六大設計原則

### A. 架構原則
- Standalone 組件優先
- Lazy Loading 全域應用
- Feature Module 組織
- TypeScript 路徑別名

### B. 組件原則
- OnPush 變更檢測
- 明確導入聲明
- 原生控制流 (@if, @for)
- 內聯模板 (<150 行)

### C. 數據原則
- Service-based 狀態管理
- Observable 資料流
- 完整類型安全
- URL 作為狀態源

### D. 權限原則
- 函數式守衛 (CanActivateFn)
- 角色階層 (Owner→Admin→Member→Viewer)
- Observable 權限驗證
- 優雅錯誤處理

### E. 開發體驗
- Mock-First 開發
- HMR 熱更新
- 8GB 記憶體建置
- ESLint + Stylelint + Prettier

### F. UI/UX 原則
- ng-zorro 優先
- Empty States 全域
- Loading States 完整
- 響應式設計

## 技術棧

| 層級 | 技術 | 版本 |
|------|------|------|
| 前端框架 | Angular | 20.3.0 |
| Admin 框架 | ng-alain | 20.0.2 |
| UI 組件 | ng-zorro-antd | 20.3.1 |
| 狀態管理 | RxJS | 7.8.0 |
| 樣式處理 | Less | - |
| 類型系統 | TypeScript | 5.9.2 |

## 已實現功能模組

### 核心模組
- Dashboard (analysis, monitor, workplace)
- Widgets (小工具展示)
- Style (colors, typography)

### 業務模組
- Pro (Account, Form, List, Profile, Result)
- Delon (ACL, Cache, Form, ST, Util, Xlsx)
- Passport (login, register)
- Exception (異常處理)
