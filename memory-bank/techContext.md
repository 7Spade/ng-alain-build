---
type: reference
category: project-info
complexity: basic
target_audience: [beginner, intermediate]
reading_time: 5min
tags: [environment, build, tools, development, scripts]
summary: 開發環境配置、建置配置與開發工具
related_files:
  - projectbrief.md
  - implementation/code/codeStandards.md
last_updated: 2025-10-07
---

# 技術環境

## 開發環境
- **作業系統**: Windows 10 (10.0.26100)
- **Shell**: PowerShell
- **套件管理**: Yarn 4.9.2
- **Node.js**: 22.18.0 (建議)

## 建置配置
- **Angular CLI**: 20.3.1
- **TypeScript**: 5.9.2
- **建置記憶體**: 8GB (--max_old_space_size=8000)
- **Source Maps**: 開發與分析啟用
- **Bundle 分析**: source-map-explorer

## 開發腳本
```json
{
  "start": "ng s -o",
  "hmr": "ng s -o --hmr",
  "build": "npm run ng-high-memory build",
  "analyze": "npm run ng-high-memory build -- --source-map",
  "lint": "npm run lint:ts && npm run lint:style",
  "test": "ng test --watch",
  "e2e": "ng e2e"
}
```

## 代碼品質工具
- **ESLint**: TypeScript 與 Angular 規則
- **Stylelint**: Less 檔案 linting
- **Prettier**: 代碼格式化
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting

## 主題系統
- **主題引擎**: ng-alain-plugin-theme
- **顏色生成**: `npm run color-less`
- **主題 CSS**: `npm run theme`
- **圖標生成**: `npm run icon`

## 測試框架
- **單元測試**: Jasmine + Karma
- **E2E 測試**: Protractor
- **覆蓋率**: 代碼覆蓋率報告
- **Mock 資料**: @delon/mock 整合

## 性能優化
- **Lazy Loading**: Angular Router 懶載入
- **Tree Shaking**: 自動未使用代碼消除
- **Bundle 分析**: 優化用 source map explorer
- **記憶體管理**: 大型建置 8GB 配置

## 開發流程
1. **開發**: ng serve + HMR 支援
2. **測試**: watch 模式持續測試
3. **Linting**: Pre-commit 與手動 linting
4. **建置**: 8GB 記憶體建置流程
5. **分析**: Bundle 大小分析與優化
