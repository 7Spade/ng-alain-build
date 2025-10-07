---
type: guide
category: constitution-index
complexity: basic
target_audience: [beginner, intermediate, advanced, architect]
reading_time: 10min
tags: [memory-bank, guide, quick-start, navigation, constitution]
summary: Memory Bank主入口文檔，提供快速開始指南和完整導航
related_files:
  - QUICK_REFERENCE.md
  - memory.json
  - projectbrief.md
  - techContext.md
  - progress.md
last_updated: 2025-10-07
---

# Memory Bank - 專案知識憲法

> ng-alain 專案的結構化知識管理系統

## 🚀 快速導航

- **[📖 QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - 快速參考索引，按需求/類別/標籤查找所有文檔 ⭐⭐
- **[📊 systemStatus.md](active-context/status/systemStatus.md)** - 系統當前健康狀態
- **[🎯 currentFocus.md](active-context/context/currentFocus.md)** - 當前工作焦點

## 🎯 快速開始

```bash
# 1️⃣ 讀取專案狀態
cat memory.json

# 2️⃣ 查看當前焦點
cat active-context/context/currentFocus.md

# 3️⃣ 查看架構設計
cat system-patterns/architecture/README.md
```

## 📁 目錄結構

```
memory-bank/
├── 📄 memory.json              # 專案知識圖譜
├── 📄 projectbrief.md          # 專案概覽
├── 📄 techContext.md           # 技術環境
├── 📄 progress.md              # 專案進度
│
├── 📍 active-context/          # 當前狀態
│   ├── context/                # 工作焦點
│   ├── status/                 # 系統狀態
│   └── changes/                # 最近變更
│
├── 🏗️ system-patterns/         # 架構與模式（憲法核心）
│   ├── architecture/           # 系統設計 + 5 個 Mermaid 圖表
│   ├── patterns/               # 開發模式
│   └── workflows/              # 工作流程
│
├── 🎨 creative-phase/          # 設計決策（憲法核心）
│   ├── design-decisions/       # 技術決策
│   ├── exploration/            # 技術研究
│   └── alternatives/           # 替代方案
│
├── 💻 implementation/          # 開發標準（憲法核心）
│   ├── code/                   # 編碼標準
│   ├── documentation/          # 文檔指南
│   └── tests/                  # 測試標準
│
└── 📦 archive/                 # 歷史資料
    ├── completed-tasks/        # 已完成任務（2025-10-07/）
    ├── historical-data/        # 專案演進（含 optimization-journey/）
    └── backup/                 # 備份策略
```

## 🔄 標準工作流程

| 步驟 | 操作 | 文件 |
|------|------|------|
| 1️⃣ | 讀取專案狀態 | `memory.json` |
| 2️⃣ | 檢查當前焦點 | `active-context/context/` |
| 3️⃣ | 參考編碼標準 | `implementation/code/` |
| 4️⃣ | 遵循開發模式 | `system-patterns/` |
| 5️⃣ | 記錄設計決策 | `creative-phase/` |
| 6️⃣ | 更新系統狀態 | `active-context/status/` |
| 7️⃣ | 歸檔完成工作 | `archive/` |

## 📋 memory.json 格式

### 實體格式
```json
{
  "type": "entity",
  "name": "實體名稱",
  "entityType": "類型",
  "observations": ["觀察1", "觀察2"]
}
```

### 關係格式
```json
{
  "type": "relation",
  "from": "來源實體",
  "to": "目標實體",
  "relationType": "USES | IMPLEMENTS | MANAGES | GUIDES"
}
```

## 📚 核心文檔快速導航

### 開發標準（憲法核心）
- [編碼標準](implementation/code/codeStandards.md) - TypeScript + Angular + ng-alain 規範
- [測試標準](implementation/tests/testingStandards.md) - 測試策略與覆蓋率
- [文檔標準](implementation/documentation/documentationStandards.md) - JSDoc + README 規範

### 架構與模式
- [專案架構](system-patterns/architecture/README.md) - 架構文檔導航 ⭐
- [專案架構全景](system-patterns/architecture/projectArchitecture.md) - 含 5 個視覺化圖表
- [設計哲學](system-patterns/architecture/designPhilosophy.md) - 核心設計理念
- [架構決策記錄](system-patterns/architecture/architectureDecisions.md) - 完整 ADR
- [開發模式](system-patterns/patterns/developmentPatterns.md) - Angular 核心模式
- [技術模式](system-patterns/patterns/technicalPatterns.md) - 設計模式與實踐

### 設計決策
- [設計決策](creative-phase/design-decisions/designDecisions.md) - UI/UX + 技術決策
- [技術探索](creative-phase/exploration/technologyExploration.md) - 技術評估
- [替代方案](creative-phase/alternatives/alternativeSolutions.md) - 方案對比

### 專案資訊
- [專案概覽](projectbrief.md) - 基本資訊與技術堆疊
- [技術環境](techContext.md) - 開發環境與建置配置
- [專案進度](progress.md) - 當前進度與統計

## 💡 最佳實踐

1. ✅ **開始任務前** → 讀取 `memory.json` 了解專案全貌
2. ✅ **開發過程中** → 參考 `implementation/` 標準確保品質
3. ✅ **完成任務後** → 更新 `active-context/` 保持同步
4. ✅ **重要決策時** → 記錄到 `creative-phase/` 保留思考
5. ✅ **任務完成後** → 歸檔到 `archive/` 保存歷史

## 🔗 延伸資源

- [Memory Bank 系統優化歷程](optimization-journey/README.md) - 系統演化過程
- [專案根目錄 custom_modes/](../custom_modes/) - Cursor IDE 自訂模式配置

---

**專案**: ng-alain 20.0.2 + Angular 20.3.0 + ng-zorro-antd 20.3.1  
**環境**: Windows PowerShell + Node 22.18.0 + Yarn 4.9.2

