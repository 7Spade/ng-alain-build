# 架構文檔導航

> 📐 完整的專案架構文檔，從新手到架構師的學習路徑

## 📑 文檔清單

| 文檔 | 內容 | 適合對象 | 時長 |
|------|------|----------|------|
| [專案架構](projectArchitecture.md) | 📐 系統架構全景、資料流、狀態管理、路由 | 所有人 | 15分鐘 |
| [設計哲學](designPhilosophy.md) | 🎯 核心理念、設計原則、技術棧 | 新手、中級 | 10分鐘 |
| [架構決策記錄](architectureDecisions.md) | 📋 ADR-001 到 ADR-010、技術選型對比 | 高級、架構師 | 20分鐘 |

## 🗺️ 學習路線

### 新手路線（30分鐘）
1. [設計哲學](designPhilosophy.md) - 了解核心理念
2. [專案架構](projectArchitecture.md) - 看架構全景圖
3. [開發原則](../patterns/developmentPrinciples.md) - 快速參考

### 中級路線（45分鐘）
1. [專案架構](projectArchitecture.md) - 完整閱讀
2. [架構決策記錄](architectureDecisions.md) - 理解為什麼
3. [開發模式](../patterns/developmentPatterns.md) - 實戰模式

### 高級路線（60分鐘）
1. [架構決策記錄](architectureDecisions.md) - 深入理解 ADR
2. [技術模式](../patterns/technicalPatterns.md) - 完整技術實現
3. [測試標準](../../implementation/tests/testingStandards.md) - 測試架構

## 🎯 快速定位

### 我想了解...

- **系統整體架構** → [專案架構 - 架構全景圖](projectArchitecture.md#📐-架構全景圖)
- **資料如何流動** → [專案架構 - 資料流架構](projectArchitecture.md#資料流架構)
- **狀態如何管理** → [專案架構 - 狀態管理架構](projectArchitecture.md#🔄-狀態管理架構)
- **路由如何組織** → [專案架構 - 路由架構](projectArchitecture.md#🛣️-路由架構)
- **為什麼這樣設計** → [架構決策記錄](architectureDecisions.md)
- **設計原則是什麼** → [設計哲學](designPhilosophy.md)

## 📊 架構視圖速查

### 三層架構
- **展示層**: Angular 20 + ng-zorro-antd + ng-alain Layouts
- **應用層**: @delon/* 模組（ABC, ACL, Auth, Cache, Form, Theme）
- **基礎設施層**: Angular CLI + Yarn + ESLint + Jasmine

### 核心技術決策
- **組件**: Standalone Components + OnPush Strategy
- **狀態**: Service + RxJS + BehaviorSubject
- **路由**: Hash Routing + Lazy Loading + Functional Guards
- **樣式**: Less + 動態主題

## 🔗 相關文檔

- [開發模式](../patterns/developmentPatterns.md) - Angular 核心模式
- [技術模式](../patterns/technicalPatterns.md) - 設計模式與技術實現
- [開發原則](../patterns/developmentPrinciples.md) - 開發原則快速參考
- [編碼標準](../../implementation/code/codeStandards.md) - 詳細編碼規範
- [測試標準](../../implementation/tests/testingStandards.md) - 測試策略與標準
- [文檔標準](../../implementation/documentation/documentationStandards.md) - 文檔規範

## 💡 使用建議

1. **第一次閱讀**：按照學習路線順序閱讀
2. **日常參考**：使用"快速定位"快速找到需要的內容
3. **深入研究**：閱讀架構決策記錄了解設計背後的思考
4. **實戰應用**：結合開發模式和編碼標準進行開發

---

**提示**：所有架構文檔都包含視覺化圖表（Mermaid），建議使用支援 Mermaid 的 Markdown 編輯器閱讀。

