# Memory Bank 使用指南

> 快速參考：專案知識管理系統

## 🎯 三步驟快速開始

```bash
# 1️⃣ 讀取專案狀態
cat memory-bank/memory.json

# 2️⃣ 查看當前焦點
cat memory-bank/active-context/context/currentFocus.md

# 3️⃣ 檢查系統狀態
cat memory-bank/active-context/status/systemStatus.md
```

## 📁 目錄結構

```
memory-bank/
├── memory.json                 # 🧠 專案知識圖譜
├── active-context/             # 📍 當前狀態
│   ├── context/                # 工作焦點
│   ├── status/                 # 系統狀態
│   └── changes/                # 最近變更
├── system-patterns/            # 🏗️ 架構與模式
│   ├── architecture/           # 系統設計
│   ├── patterns/               # 開發模式
│   └── workflows/              # 工作流程
├── creative-phase/             # 🎨 設計決策
│   ├── design-decisions/       # 技術決策
│   ├── exploration/            # 技術研究
│   └── alternatives/           # 替代方案
├── implementation/             # 💻 開發標準
│   ├── code/                   # 編碼標準
│   ├── documentation/          # 文檔指南
│   └── tests/                  # 測試標準
└── archive/                    # 📦 歷史資料
    ├── completed-tasks/        # 已完成任務
    ├── historical-data/        # 專案演進
    └── backup/                 # 備份策略
```

## 🔄 標準工作流程

| 步驟 | 操作 | 文件 |
|------|------|------|
| 1️⃣ 開始任務 | 讀取專案狀態 | `memory.json` |
| 2️⃣ 了解上下文 | 檢查當前焦點 | `active-context/context/` |
| 3️⃣ 參考標準 | 查看編碼標準 | `implementation/code/` |
| 4️⃣ 開發功能 | 遵循模式 | `system-patterns/` |
| 5️⃣ 記錄決策 | 更新決策文件 | `creative-phase/design-decisions/` |
| 6️⃣ 更新狀態 | 修改系統狀態 | `active-context/status/` |
| 7️⃣ 歸檔工作 | 移至歷史 | `archive/completed-tasks/` |

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
  "relationType": "關係類型"
}
```

### 常見關係類型
- `INCLUDES` - 包含
- `USES` - 使用
- `MANAGES` - 管理
- `DEPENDS_ON` - 依賴
- `IMPLEMENTS` - 實現

## 📍 目錄用途

### active-context/ - 當前狀態
| 文件 | 用途 |
|------|------|
| currentFocus.md | 當前工作焦點 |
| systemStatus.md | 系統健康狀態 |
| recentChanges.md | 最近變更記錄 |

### system-patterns/ - 架構模式
| 目錄 | 用途 |
|------|------|
| architecture/ | 系統設計文件 |
| patterns/ | 開發模式 |
| workflows/ | 工作流程 |

### creative-phase/ - 設計決策
| 目錄 | 用途 |
|------|------|
| design-decisions/ | 技術決策記錄 |
| exploration/ | 技術研究 |
| alternatives/ | 替代方案 |

### implementation/ - 開發標準
| 目錄 | 用途 |
|------|------|
| code/ | 編碼標準 |
| documentation/ | 文檔指南 |
| tests/ | 測試標準 |

## ⚡ 快速命令

### 讀取操作
```bash
# 專案狀態
cat memory-bank/memory.json

# 當前焦點
cat memory-bank/active-context/context/currentFocus.md

# 系統狀態
cat memory-bank/active-context/status/systemStatus.md

# 編碼標準
cat memory-bank/implementation/code/codeStandards.md
```

### 更新操作
```bash
# 更新焦點
echo "新焦點" > memory-bank/active-context/context/currentFocus.md

# 更新狀態
echo "新狀態" > memory-bank/active-context/status/systemStatus.md

# 記錄變更
echo "變更" >> memory-bank/active-context/changes/recentChanges.md
```

### 歸檔操作
```bash
# 歸檔任務
cp task.md memory-bank/archive/completed-tasks/

# 更新歷史
echo "記錄" >> memory-bank/archive/historical-data/projectHistory.md
```

## 🔧 維護計劃

| 頻率 | 操作 | 目標 |
|------|------|------|
| 每日 | 更新 active-context/ | 保持狀態最新 |
| 每週 | 歸檔完成工作 | 整理 archive/ |
| 每月 | 更新 memory.json | 維護知識圖譜 |
| 每季 | 審查結構 | 優化組織 |

## ✅ 品質檢查清單

- [ ] memory.json 格式正確
- [ ] active-context/ 保持最新
- [ ] 定期歸檔到 archive/
- [ ] 遵循 implementation/ 標準
- [ ] 記錄設計決策
- [ ] 更新系統狀態

## 🆘 故障排除

| 問題 | 解決方案 |
|------|----------|
| 格式錯誤 | 檢查 JSON 語法 |
| 文件缺失 | 參考目錄結構重建 |
| 狀態過時 | 更新 active-context/ |
| 關係混亂 | 重新整理 memory.json |

## 📚 核心文件快速參考

| 文件 | 用途 | 位置 |
|------|------|------|
| 知識圖譜 | 專案實體關係 | memory.json |
| 當前焦點 | 工作目標 | active-context/context/ |
| 系統狀態 | 健康狀態 | active-context/status/ |
| 編碼標準 | 代碼規範 | implementation/code/ |
| 測試標準 | 測試規範 | implementation/tests/ |
| 設計決策 | 技術決策 | creative-phase/design-decisions/ |
| 架構文件 | 系統設計 | system-patterns/architecture/ |

## 💡 使用技巧

1. **始終先讀 memory.json** - 了解專案全貌
2. **保持 active-context/ 最新** - 確保狀態同步
3. **參考 implementation/** - 遵循開發標準
4. **記錄 creative-phase/** - 保留設計決策
5. **定期歸檔 archive/** - 保存歷史記錄
6. **更新知識圖譜** - 維護 memory.json

## 🎯 最佳實踐

- ✅ 開始任務前讀取 memory.json
- ✅ 開發時參考 implementation/ 標準
- ✅ 完成後更新 active-context/
- ✅ 記錄決策到 creative-phase/
- ✅ 歸檔完成任務到 archive/
- ✅ 定期維護知識圖譜