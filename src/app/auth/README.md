# Auth - 認證功能模組

> 🔐 用戶認證與授權

## 📄 頁面列表

| 頁面 | 路由 | 組件目錄 | 說明 |
|------|------|----------|------|
| 落地頁 | `/auth/landing` | `landing/` | 產品介紹與引導 |
| 登入頁 | `/auth/login` | `login/` | 用戶登入（帳密） |
| 註冊頁 | `/auth/register` | `register/` | 用戶註冊 |
| 註冊結果 | `/auth/register-result` | `register-result/` | 註冊成功提示 |
| 鎖屏頁 | `/auth/lock` | `lock/` | 螢幕鎖定 |

## 🔧 認證方式

- ✅ **帳號密碼登入** - 主要認證方式
- ❌ 社交登入 - 已移除（Auth0, GitHub, Weibo）
- ❌ 手機號碼登入 - 已移除

## 🛡️ 安全特性

- 🔒 Token 管理（@delon/auth）
- 🔄 Token 自動刷新
- 🚪 登入守衛（authSimpleCanActivate）
- ⏱️ Session 過期處理

## 📁 目錄結構

```
auth/
├── README.md              # 本文件
├── routes.ts              # 路由配置
├── landing/               # 落地頁
├── login/                 # 登入頁
├── register/              # 註冊頁
├── register-result/       # 註冊結果
└── lock/                  # 鎖屏頁
```

## 🔗 相關服務

- **TokenService**: `@delon/auth` - Token 管理
- **StartupService**: `@core/startup` - 應用啟動
- **ReuseTabService**: `@delon/abc/reuse-tab` - 頁籤複用

---

**導航**: [首頁](../../README.md) > Auth

