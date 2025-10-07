# Layout - 佈局組件模組

> 🎨 頁面佈局框架與通用 UI 組件

## 📐 佈局類型

| 佈局 | 路徑 | 說明 | 使用場景 |
|------|------|------|----------|
| **Basic Layout** | `basic/` | 標準後台佈局 | 登入後的主要頁面 |
| **Blank Layout** | `blank/` | 空白佈局 | 全螢幕頁面、打印頁 |
| **Passport Layout** | `passport/` | 認證頁佈局 | 登入、註冊等頁面 |

## 🧩 Basic Layout 組件

位於 `basic/widgets/` 目錄：

| 組件 | 功能 |
|------|------|
| `clear-storage.widget.ts` | 清除本地存儲 |
| `fullscreen.widget.ts` | 全屏切換 |
| `i18n.widget.ts` | 語言切換 |
| `icon.widget.ts` | 圖標主題 |
| `notify.widget.ts` | 通知中心 |
| `rtl.widget.ts` | RTL 方向切換 |
| `search.widget.ts` | 搜索框 |
| `task.widget.ts` | 任務中心 |
| `user.widget.ts` | 用戶下拉菜單 |

## 📁 目錄結構

```
layout/
├── README.md              # 本文件
├── index.ts               # 統一匯出
├── basic/                 # 標準佈局
│   ├── basic.component.ts
│   └── widgets/           # 頭部小工具
├── blank/                 # 空白佈局
│   └── blank.component.ts
└── passport/              # 認證佈局
    ├── passport.component.ts
    └── passport.component.less
```

## 🎨 佈局特性

- 📱 **響應式設計** - 支持桌面、平板、手機
- 🎭 **主題切換** - 支持多種配色方案
- 🌐 **國際化** - 多語言支持
- 🔄 **路由複用** - 標籤頁功能

## 🔗 相關模組

- **@delon/theme** - 主題服務
- **@delon/abc/reuse-tab** - 頁籤複用
- **ng-zorro-antd/layout** - 佈局組件

---

**導航**: [首頁](../../README.md) > Layout

