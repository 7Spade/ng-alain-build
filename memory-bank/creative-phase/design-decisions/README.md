# Design Decisions - 設計決策

> 記錄重要的技術和架構設計決策

## 📋 決策文檔

### 核心決策
- **[designDecisions.md](designDecisions.md)** - 專案整體設計決策 ⭐
  - 技術棧選擇（Angular 20, ng-alain, ng-zorro）
  - 狀態管理（Service + RxJS）
  - 路由策略（Hash + Lazy Loading）
  - 權限系統（ACL）

### 功能設計
- **[org-switcher-design.md](org-switcher-design.md)** - 組織切換器設計
  - 個人/組織空間切換
  - Tab 系統集成
  - Signals 狀態管理
  - 零破壞性設計

## 🎯 設計決策模板

新增設計決策時，請包含：

### 1. 問題陳述
- 需要解決什麼問題？
- 為什麼需要這個決策？

### 2. 可選方案
- 方案 A：...
- 方案 B：...
- 方案 C：...

### 3. 決策
- **選擇**：方案 X
- **理由**：...
- **權衡**：...

### 4. 影響
- 正面影響：...
- 負面影響：...
- 風險：...

### 5. 實施
- 實施計劃
- 驗證標準

## 📊 決策類型

| 類型 | 文檔 | 狀態 |
|------|------|------|
| 架構決策 | designDecisions.md | ✅ 完成 |
| 功能設計 | org-switcher-design.md | ✅ 完成 |

## 🔗 相關文檔

- [替代方案](../alternatives/alternativeSolutions.md) - 未選擇的方案記錄
- [技術探索](../exploration/technologyExploration.md) - 技術評估與研究

---

**決策總數**: 2  
**最後更新**: 2025-10-07

