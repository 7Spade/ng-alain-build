# 未實施設計

> 此目錄包含完整設計但尚未實施的功能設計文檔

## 📋 設計清單

### 組織切換器（Organization Switcher）

**設計日期**: 2025-10-07  
**狀態**: 📋 設計完成，待實施  
**複雜度**: Level 3（中型功能）  
**預計時間**: 4-6 小時  
**預期提升**: 92/100 → 94/100 (+2 分)

**核心設計**:
- 個人空間/組織空間切換器（sidebar 頂部）
- OrganizationSwitcherService（Angular Signals 狀態管理）
- 動態菜單加載（不同空間不同菜單）
- **Tab 系統集成**：切換時清除所有 Tab（策略 A）
- localStorage 持久化

**設計文檔**:
1. [完整設計](./org-switcher-design.md) - 架構、Tab 集成策略、代碼模板（500+ 行）
2. [實施計劃](../../active-context/context/org-switcher-implementation-plan.md) - 詳細步驟、工時估算（350+ 行）
3. [快速指南](../../active-context/context/org-switcher-quick-guide.md) - 2 分鐘速覽（150+ 行）
4. [文件清單](../../active-context/context/org-switcher-file-checklist.md) - 10 個文件操作清單（250+ 行）

**為什麼未實施**:
- 當前專案已達 92/100 優秀水平
- Tab 系統、organization CRUD 等核心功能已完成
- 組織切換器屬於增強功能，非必需
- 可根據實際需求決定是否實施

**實施條件**:
- ✅ Tab 系統已完成（Phase 3）
- ✅ organization 模組已完成（models, services, components）
- ✅ 完整設計文檔已就緒
- ⏸️ 待產品決策：是否需要多租戶支持

**實施優勢**:
- ✅ 零破壞性（不修改現有代碼）
- ✅ 完整設計（所有技術細節已規劃）
- ✅ 預計時間短（4-6 小時）
- ✅ 評分提升明確（+2 分）

---

## 📖 使用指南

### 如何使用這些設計文檔

**場景 1: 決定實施**
1. 閱讀 [快速指南](../../active-context/context/org-switcher-quick-guide.md)（2 分鐘）
2. 查看 [文件清單](../../active-context/context/org-switcher-file-checklist.md)
3. 參考 [完整設計](./org-switcher-design.md) 開始編碼
4. 按照 [實施計劃](../../active-context/context/org-switcher-implementation-plan.md) 執行

**場景 2: 理解設計**
1. 閱讀 [完整設計](./org-switcher-design.md) 的架構部分
2. 理解 Tab 系統集成策略（為什麼要清除 Tab）
3. 查看代碼模板和技術決策

**場景 3: 評估價值**
- 查看設計文檔中的"預期效果"部分
- 評估是否符合產品需求
- 考慮實施時間（4-6 小時）vs 收益（+2 分）

---

## 🔗 相關資源

- [Tab 系統文檔](../../../src/app/core/services/tab/README.md) - 已實施
- [organization 模組文檔](../../../src/app/features/organization/README.md) - 已實施
- [Memory Bank 架構](../../system-patterns/architecture/projectArchitecture.md)

---

**維護說明**: 此目錄用於存放經過深思熟慮的設計但尚未實施的功能。設計文檔應保持完整，以便未來實施時參考。

