---
type: navigation
category: constitution-core
complexity: basic
target_audience: [all]
reading_time: 2min
tags: [implementation, standards, navigation, guide]
summary: Implementation 開發標準目錄導航
last_updated: 2025-10-07
---

# Implementation - 開發標準

> 💻 完整的開發標準與最佳實踐（憲法核心）

## 📑 文檔清單

| 文檔 | 內容 | 適合對象 | 時長 |
|------|------|----------|------|
| [編碼標準](code/codeStandards.md) | TypeScript + Angular + ng-alain 編碼規範與模板 | 所有人 | 20分鐘 |
| [測試標準](tests/testingStandards.md) | 測試金字塔、覆蓋率要求與測試模板 | 中高級 | 20分鐘 |
| [文檔標準](documentation/documentationStandards.md) | JSDoc、README、Git 提交規範 | 所有人 | 15分鐘 |

## 🎯 快速定位

| 我想了解... | 查看文檔 |
|-------------|----------|
| **如何寫組件** | [編碼標準 - 組件標準](code/codeStandards.md#組件標準) |
| **如何寫服務** | [編碼標準 - 服務標準](code/codeStandards.md#服務標準) |
| **如何寫守衛** | [編碼標準 - 守衛標準](code/codeStandards.md#守衛標準) |
| **如何寫測試** | [測試標準 - 單元測試](tests/testingStandards.md#單元測試標準) |
| **如何寫文檔** | [文檔標準 - JSDoc](documentation/documentationStandards.md#jsdoc-標準) |
| **Git 提交規範** | [編碼標準 - Git Workflow](code/codeStandards.md#git-workflow-標準) |

## 📊 標準概覽

### 編碼標準核心
- ✅ Standalone Components + OnPush Strategy
- ✅ inject() 函數式依賴注入
- ✅ Native Control Flow (@if, @for, @switch)
- ✅ TypeScript Strict Mode
- ✅ RESTful API 設計

### 測試標準核心
- ✅ 測試金字塔（70% Unit, 20% Integration, 10% E2E）
- ✅ 覆蓋率要求（Services 80%, Components 60%, Guards 100%）
- ✅ AAA 模式（Arrange, Act, Assert）

### 文檔標準核心
- ✅ JSDoc 完整 API 文檔
- ✅ README 模板規範
- ✅ Angular 提交規範

## 🔗 相關文檔

- [開發原則](../system-patterns/patterns/developmentPrinciples.md) - 快速參考
- [技術模式](../system-patterns/patterns/technicalPatterns.md) - 設計模式
- [專案架構](../system-patterns/architecture/projectArchitecture.md) - 系統架構

