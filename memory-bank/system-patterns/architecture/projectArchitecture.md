# 專案架構

## 系統概述
ng-alain 是基於 Angular 20、ng-zorro-antd 的企業級後台管理框架。

## 架構分層

### 1. 展示層 (Presentation)
- **框架**: Angular 20.3.0 Standalone Components
- **UI 組件**: ng-zorro-antd 20.3.1
- **Admin 框架**: ng-alain 20.0.2
- **樣式**: Less + 動態主題

### 2. 應用層 (Application)
- **@delon/abc**: Admin 組件 (ST, SE)
- **@delon/acl**: 權限控制
- **@delon/auth**: 身份驗證
- **@delon/cache**: 緩存系統
- **@delon/form**: 表單處理
- **@delon/theme**: 主題系統

### 3. 基礎設施層 (Infrastructure)
- **建置**: Angular CLI + 8GB 記憶體
- **套件**: Yarn 4.9.2
- **品質**: ESLint + Stylelint + Prettier
- **測試**: Jasmine + Karma + Protractor

## 目錄結構
```
src/app/
├── core/           # 核心服務、守衛、攔截器
├── layout/         # 佈局組件 (basic, blank, passport)
├── routes/         # 功能模組與路由
│   ├── dashboard/  # 儀表板
│   ├── delon/      # ng-alain 示範
│   ├── pro/        # Pro 組件
│   └── ...
└── shared/         # 共享模組與工具
```

## 關鍵架構模式

### 現代 Angular 模式
- **Standalone Components**: 100% 採用
- **Functional Guards**: CanActivateFn
- **inject() DI**: 函數式依賴注入
- **Native Control Flow**: @if, @for, @switch
- **OnPush Strategy**: 變更檢測優化

### 路由模式  
- **Lazy Loading**: 路由級代碼分割
- **Hash Routing**: 簡化部署
- **URL as State**: 路由狀態管理
- **Path Alias**: TypeScript 路徑映射

### 性能模式
- **Tree Shaking**: 自動移除未使用代碼
- **Bundle Optimization**: 源碼映射分析
- **Memory Management**: 8GB 建置配置
- **OnPush + trackBy**: 渲染優化

## 設計決策摘要

| 決策 | 選擇 | 原因 |
|------|------|------|
| 組件架構 | Standalone | 簡化結構，更好 tree-shaking |
| 狀態管理 | Service + RxJS | Angular 內建，簡單易維護 |
| 路由策略 | Hash + Lazy | 簡化部署，優化載入 |
| 變更檢測 | OnPush | 40-60% 性能提升 |
| 樣式處理 | Less | ng-zorro 無縫集成 |
| 類型安全 | Strict Mode | 最大類型安全 |
