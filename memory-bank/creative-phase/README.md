---
type: navigation
category: constitution-core
complexity: intermediate
target_audience: [intermediate, advanced, architect]
reading_time: 2min
tags: [design-decisions, creative, navigation, guide]
summary: Creative Phase 設計決策目錄導航
last_updated: 2025-10-07
---

# Creative Phase - 設計決策

> 🎨 設計決策、技術探索與替代方案（憲法核心）

## 📑 文檔清單

| 文檔 | 內容 | 適合對象 | 時長 |
|------|------|----------|------|
| [設計決策](design-decisions/designDecisions.md) | UI/UX、技術、架構、性能決策記錄 | 所有人 | 10分鐘 |
| [技術探索](exploration/technologyExploration.md) | 框架評估、替代技術堆疊、性能探索 | 中高級 | 10分鐘 |
| [替代方案](alternatives/alternativeSolutions.md) | 框架、架構、狀態管理、測試的替代方案 | 架構師 | 8分鐘 |

## 🎯 快速定位

| 我想了解... | 查看文檔 |
|-------------|----------|
| **為什麼選擇 Angular** | [替代方案 - 框架](alternatives/alternativeSolutions.md#框架替代方案) |
| **為什麼用 Service State** | [替代方案 - 狀態管理](alternatives/alternativeSolutions.md#狀態管理替代方案) |
| **UI/UX 決策** | [設計決策 - UI/UX](design-decisions/designDecisions.md#uiux-決策) |
| **性能優化決策** | [設計決策 - 性能](design-decisions/designDecisions.md#性能決策) |
| **技術堆疊評估** | [技術探索](exploration/technologyExploration.md) |

## 📊 決策概覽

### 核心決策
- **框架**: Angular 20 + ng-alain + ng-zorro-antd
- **狀態**: Service + RxJS（不使用 NgRx）
- **路由**: Hash Routing + Lazy Loading
- **樣式**: Less + 動態主題

### 性能基準
- Initial Bundle: 1.8 MB
- Time to Interactive: 1.2s
- OnPush 提升: 40-60%
- Lazy Loading 縮減: 57%

## 🔗 相關文檔

- [專案架構](../system-patterns/architecture/projectArchitecture.md) - 架構全景
- [架構決策記錄](../system-patterns/architecture/architectureDecisions.md) - ADR
- [設計哲學](../system-patterns/architecture/designPhilosophy.md) - 核心理念

