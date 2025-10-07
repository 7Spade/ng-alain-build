# Memory Bank 使用指南

## 🎯 快速開始

### 1. 讀取專案狀態
```bash
# 第一步：總是先讀取 memory.json 了解專案狀態
cat memory-bank/memory.json
```

### 2. 查看當前焦點
```bash
# 第二步：查看當前工作焦點
cat memory-bank/active-context/context/currentFocus.md
```

### 3. 檢查系統狀態
```bash
# 第三步：檢查系統健康狀態
cat memory-bank/active-context/status/systemStatus.md
```

---

## 📁 Memory Bank 目錄結構

```
memory-bank/
├── memory.json                    # 🧠 專案知識圖譜 (實體與關係)
├── active-context/                # 📍 當前專案狀態
│   ├── context/currentFocus.md    # 🎯 當前工作焦點
│   ├── status/systemStatus.md     # 💚 系統健康狀態
│   └── changes/recentChanges.md   # 📝 最近變更記錄
├── system-patterns/               # 🏗️ 架構與模式
│   ├── architecture/              # 🏛️ 系統設計文件
│   ├── patterns/                  # 🔄 開發模式
│   └── workflows/                 # ⚡ 流程工作
├── creative-phase/                # 🎨 設計決策與探索
│   ├── design-decisions/          # 🎯 UI/UX 和技術決策
│   ├── exploration/               # 🔍 技術研究
│   └── alternatives/              # 🔄 替代方案
├── implementation/                # 💻 開發標準
│   ├── code/                      # 📝 編碼標準
│   ├── documentation/             # 📚 文檔指南
│   └── tests/                     # 🧪 測試標準
└── archive/                       # 📦 歷史資料
    ├── completed-tasks/           # ✅ 已完成工作記錄
    ├── historical-data/           # 📈 專案演進
    └── backup/                    # 💾 備份策略
```

---

## 🔄 使用工作流程

### 標準工作流程
1. **📖 讀取狀態** → `memory.json` 了解專案狀態
2. **📍 更新上下文** → 修改 `active-context/` 文件
3. **🏗️ 參考模式** → 使用 `system-patterns/` 架構指導
4. **🎨 記錄決策** → 在 `creative-phase/` 記錄設計決策
5. **💻 遵循標準** → 應用 `implementation/` 標準
6. **📦 歸檔工作** → 將完成的項目移到 `archive/`
7. **🧠 更新知識** → 修改 `memory.json` 添加新實體/關係

### 開發任務流程
```
開始任務 → 讀取 memory.json → 檢查當前焦點 → 參考編碼標準 → 開發 → 記錄決策 → 歸檔完成
```

---

## 📋 memory.json 格式說明

### 實體格式
```json
{
  "type": "entity",
  "name": "實體名稱",
  "entityType": "實體類型",
  "observations": ["觀察1", "觀察2", "觀察3"]
}
```

### 關係格式
```json
{
  "type": "relation",
  "from": "來源實體",
  "to": "目標實體",
  "relationType": "關係類型"
}
```

### 常見關係類型
- `INCLUDES` - 包含關係
- `USES` - 使用關係
- `MANAGES` - 管理關係
- `DEPENDS_ON` - 依賴關係
- `IMPLEMENTS` - 實現關係

---

## 🎯 各目錄使用說明

### 📍 active-context/ - 當前狀態
- **currentFocus.md**: 記錄當前工作焦點和目標
- **systemStatus.md**: 追蹤系統健康狀態和進度
- **recentChanges.md**: 記錄最近的變更和影響

### 🏗️ system-patterns/ - 架構模式
- **architecture/**: 系統設計和架構文件
- **patterns/**: 開發模式和最佳實踐
- **workflows/**: 開發流程和工作流程

### 🎨 creative-phase/ - 設計決策
- **design-decisions/**: UI/UX 和技術決策記錄
- **exploration/**: 技術研究和探索
- **alternatives/**: 考慮過的替代方案

### 💻 implementation/ - 開發標準
- **code/**: 編碼標準和規範
- **documentation/**: 文檔編寫指南
- **tests/**: 測試標準和策略

### 📦 archive/ - 歷史資料
- **completed-tasks/**: 已完成任務的記錄
- **historical-data/**: 專案演進歷史
- **backup/**: 備份策略和程序

---

## ⚡ 快速操作命令

### 讀取操作
```bash
# 讀取專案狀態
cat memory-bank/memory.json

# 查看當前焦點
cat memory-bank/active-context/context/currentFocus.md

# 檢查系統狀態
cat memory-bank/active-context/status/systemStatus.md

# 查看最近變更
cat memory-bank/active-context/changes/recentChanges.md
```

### 更新操作
```bash
# 更新當前焦點
echo "新的工作焦點" > memory-bank/active-context/context/currentFocus.md

# 更新系統狀態
echo "系統狀態更新" > memory-bank/active-context/status/systemStatus.md

# 記錄變更
echo "變更記錄" >> memory-bank/active-context/changes/recentChanges.md
```

### 歸檔操作
```bash
# 歸檔完成的任務
cp task-file.md memory-bank/archive/completed-tasks/

# 更新專案歷史
echo "歷史記錄" >> memory-bank/archive/historical-data/projectHistory.md
```

---

## 🔧 維護指南

### 定期維護
- **每日**: 更新 `active-context/` 狀態
- **每週**: 歸檔完成的工作到 `archive/`
- **每月**: 更新 `memory.json` 實體關係
- **每季**: 審查和優化 Memory Bank 結構

### 品質檢查
- ✅ 確保 `memory.json` 格式正確
- ✅ 保持 `active-context/` 文件最新
- ✅ 定期歸檔到 `archive/`
- ✅ 遵循 `implementation/` 標準

### 故障排除
- **格式錯誤**: 檢查 JSON 語法
- **文件缺失**: 參考目錄結構重建
- **狀態過時**: 更新 `active-context/` 文件
- **關係混亂**: 重新整理 `memory.json`

---

## 📚 相關資源

- **.cursorrules**: 包含 Memory Bank 使用規範
- **system-patterns/**: 詳細的架構和模式文檔
- **implementation/**: 編碼和測試標準
- **archive/**: 歷史資料和備份策略

---

## 🆘 需要幫助？

1. **檢查 .cursorrules**: 查看 Memory Bank 配置
2. **讀取 memory.json**: 了解當前專案狀態
3. **查看 active-context/**: 確認當前工作焦點
4. **參考 implementation/**: 遵循開發標準
5. **歸檔到 archive/**: 保存完成的工作
