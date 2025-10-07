# 📁 ng-alain 專案結構分析報告

> 此文件由 ng-alain 專用腳本自動生成，請勿手動編輯  
> 生成日期: 2025-10-07  
> 專案版本: ng-alain 20.0.2 + Angular 20

## 📋 專案概覽

- **專案名稱**: ng-alain
- **專案版本**: 20.0.2
- **專案描述**: ng-zorro-antd admin panel front-end framework
- **Angular 版本**: Angular 20+
- **Framework**: ng-alain + ng-zorro-antd + @delon/*

## 🏗️ Angular + ng-alain 架構說明

### 核心目錄結構
- **src/app/routes/**: ng-alain 路由模組，包含業務頁面
- **src/app/layout/**: ng-alain 布局組件 (basic, blank, passport)
- **src/app/core/**: Angular 核心服務和模組
- **src/app/shared/**: Angular 共用組件和服務
- **src/assets/**: Angular 靜態資源目錄
- **_mock/**: ng-alain Mock 數據服務

### ng-alain 特色功能
- **@delon/abc**: Admin Business Component (ST, SE 等)
- **@delon/acl**: Access Control List 權限控制
- **@delon/auth**: Authentication 身份驗證
- **@delon/cache**: Cache 快取服務
- **@delon/form**: Dynamic Form 動態表單
- **@delon/theme**: Theme 主題系統

## 📊 詳細目錄結構

```
└── src [Angular]/
    ├── app/
    │   ├── core/
    │   │   ├── i18n/
    │   │   │   ├── i18n.service.ts (3.1 KB, 今天, Angular 服務)
    │   │   ├── net/
    │   │   │   ├── default.interceptor.ts (3.6 KB, 今天, TypeScript)
    │   │   │   ├── helper.ts (2.2 KB, 今天, TypeScript)
    │   │   │   ├── index.ts (97 B, 今天, TypeScript)
    │   │   │   ├── refresh-token.ts (3.3 KB, 今天, TypeScript)
    │   │   ├── startup/
    │   │   │   ├── startup.service.ts (2.6 KB, 今天, Angular 服務)
    │   │   ├── index.ts (145 B, 今天, TypeScript)
    │   │   ├── README.md (137 B, 今天, Markdown 文檔)
    │   │   ├── start-page.guard.ts (620 B, 今天, Angular 守衛)
    │   ├── layout/
    │   │   ├── basic/
    │   │   │   ├── widgets/
    │   │   │   │   ├── clear-storage.component.ts (982 B, 今天, Angular 組件)
    │   │   │   │   ├── fullscreen.component.ts (831 B, 今天, Angular 組件)
    │   │   │   │   ├── i18n.component.ts (2.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── icon.component.ts (2.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── notify.component.ts (6.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── rtl.component.ts (705 B, 今天, Angular 組件)
    │   │   │   │   ├── search.component.ts (3.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── task.component.ts (4.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── user.component.ts (2.1 KB, 今天, Angular 組件)
    │   │   │   ├── basic.component.ts (5.2 KB, 今天, Angular 組件)
    │   │   │   ├── README.md (54 B, 今天, Markdown 文檔)
    │   │   ├── blank/
    │   │   │   ├── blank.component.ts (281 B, 今天, Angular 組件)
    │   │   │   ├── README.md (45 B, 今天, Markdown 文檔)
    │   │   ├── passport/
    │   │   │   ├── passport.component.less (1.8 KB, 今天, Angular 組件)
    │   │   │   ├── passport.component.ts (1.6 KB, 今天, Angular 組件)
    │   │   ├── index.ts (129 B, 今天, TypeScript)
    │   ├── routes/
    │   │   ├── dashboard/
    │   │   │   ├── analysis/
    │   │   │   │   ├── analysis.component.html (9.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── analysis.component.less (3.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── analysis.component.ts (4.1 KB, 今天, Angular 組件)
    │   │   │   ├── monitor/
    │   │   │   │   ├── monitor.component.html (4 KB, 今天, Angular 組件)
    │   │   │   │   ├── monitor.component.less (1.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── monitor.component.ts (3 KB, 今天, Angular 組件)
    │   │   │   ├── v1/
    │   │   │   │   ├── v1.component.html (7 KB, 今天, Angular 組件)
    │   │   │   │   ├── v1.component.ts (3 KB, 今天, Angular 組件)
    │   │   │   ├── workplace/
    │   │   │   │   ├── workplace.component.html (4.7 KB, 今天, Angular 組件)
    │   │   │   │   ├── workplace.component.less (4.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── workplace.component.ts (2.7 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts (657 B, 今天, TypeScript)
    │   │   ├── data-v/
    │   │   │   ├── relation/
    │   │   │   │   ├── relation.component.html (33 B, 今天, Angular 組件)
    │   │   │   │   ├── relation.component.ts (241 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts (195 B, 今天, TypeScript)
    │   │   ├── delon/
    │   │   │   ├── acl/
    │   │   │   │   ├── acl.component.html (1.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── acl.component.ts (1.1 KB, 今天, Angular 組件)
    │   │   │   ├── cache/
    │   │   │   │   ├── cache.component.html (321 B, 今天, Angular 組件)
    │   │   │   │   ├── cache.component.ts (591 B, 今天, Angular 組件)
    │   │   │   ├── downfile/
    │   │   │   │   ├── downfile.component.html (308 B, 今天, Angular 組件)
    │   │   │   │   ├── downfile.component.ts (425 B, 今天, Angular 組件)
    │   │   │   ├── form/
    │   │   │   │   ├── form.component.html (262 B, 今天, Angular 組件)
    │   │   │   │   ├── form.component.ts (740 B, 今天, Angular 組件)
    │   │   │   ├── guard/
    │   │   │   │   ├── admin.component.ts (174 B, 今天, Angular 組件)
    │   │   │   │   ├── auth.component.ts (172 B, 今天, Angular 組件)
    │   │   │   │   ├── can-leave.ts (799 B, 今天, TypeScript)
    │   │   │   │   ├── guard.component.html (874 B, 今天, Angular 組件)
    │   │   │   │   ├── guard.component.ts (851 B, 今天, Angular 組件)
    │   │   │   │   ├── leave.component.ts (369 B, 今天, Angular 組件)
    │   │   │   ├── print/
    │   │   │   │   ├── print.component.html (2.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── print.component.ts (2.4 KB, 今天, Angular 組件)
    │   │   │   ├── qr/
    │   │   │   │   ├── qr.component.html (2.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── qr.component.ts (477 B, 今天, Angular 組件)
    │   │   │   ├── st/
    │   │   │   │   ├── st.component.html (2 KB, 今天, Angular 組件)
    │   │   │   │   ├── st.component.ts (2.2 KB, 今天, Angular 組件)
    │   │   │   ├── util/
    │   │   │   │   ├── util.component.html (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── util.component.ts (1 KB, 今天, Angular 組件)
    │   │   │   ├── xlsx/
    │   │   │   │   ├── xlsx.component.html (554 B, 今天, Angular 組件)
    │   │   │   │   ├── xlsx.component.ts (1.4 KB, 今天, Angular 組件)
    │   │   │   ├── zip/
    │   │   │   │   ├── zip.component.html (1.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── zip.component.ts (2 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts (1.9 KB, 今天, TypeScript)
    │   │   ├── exception/
    │   │   │   ├── exception.component.ts (573 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts (477 B, 今天, TypeScript)
    │   │   │   ├── trigger.component.ts (1.2 KB, 今天, Angular 組件)
    │   │   ├── extras/
    │   │   │   ├── helpcenter/
    │   │   │   │   ├── helpcenter.component.html (3.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── helpcenter.component.ts (512 B, 今天, Angular 組件)
    │   │   │   ├── poi/
    │   │   │   │   ├── edit/
    │   │   │   │   │   ├── edit.component.html (3.9 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── edit.component.ts (1006 B, 今天, Angular 組件)
    │   │   │   │   ├── poi.component.html (986 B, 今天, Angular 組件)
    │   │   │   │   ├── poi.component.ts (1.6 KB, 今天, Angular 組件)
    │   │   │   ├── settings/
    │   │   │   │   ├── settings.component.html (10.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── settings.component.ts (1.5 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts (450 B, 今天, TypeScript)
    │   │   ├── organization/
    │   │   │   ├── guards/
    │   │   │   │   ├── organization.guard.ts (4 KB, 今天, Angular 守衛)
    │   │   │   ├── models/
    │   │   │   │   ├── common.model.ts (2.7 KB, 今天, TypeScript)
    │   │   │   │   ├── department.model.ts (1.8 KB, 今天, TypeScript)
    │   │   │   │   ├── employee.model.ts (2.6 KB, 今天, TypeScript)
    │   │   │   │   ├── index.ts (374 B, 今天, TypeScript)
    │   │   │   │   ├── organization.model.ts (2 KB, 今天, TypeScript)
    │   │   │   │   ├── role.model.ts (2.7 KB, 今天, TypeScript)
    │   │   │   ├── services/
    │   │   │   │   ├── department.service.ts (4.5 KB, 今天, Angular 服務)
    │   │   │   │   ├── employee.service.ts (4.9 KB, 今天, Angular 服務)
    │   │   │   │   ├── organization.service.ts (5.2 KB, 今天, Angular 服務)
    │   │   │   │   ├── role.service.ts (4.5 KB, 今天, Angular 服務)
    │   │   │   ├── COMPONENTS.md (9.8 KB, 今天, Markdown 文檔)
    │   │   │   ├── DESIGN.md (29.5 KB, 今天, Markdown 文檔)
    │   │   │   ├── README.md (7.5 KB, 今天, Markdown 文檔)
    │   │   │   ├── routes.ts (3.5 KB, 今天, TypeScript)
    │   │   ├── passport/
    │   │   │   ├── landing/
    │   │   │   │   ├── landing.component.html (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── landing.component.less (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── landing.component.ts (731 B, 今天, Angular 組件)
    │   │   │   ├── lock/
    │   │   │   │   ├── lock.component.html (856 B, 今天, Angular 組件)
    │   │   │   │   ├── lock.component.less (185 B, 今天, Angular 組件)
    │   │   │   │   ├── lock.component.ts (1.5 KB, 今天, Angular 組件)
    │   │   │   ├── login/
    │   │   │   │   ├── login.component.html (3.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── login.component.less (981 B, 今天, Angular 組件)
    │   │   │   │   ├── login.component.ts (6.3 KB, 今天, Angular 組件)
    │   │   │   ├── register/
    │   │   │   │   ├── register.component.html (4.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── register.component.less (678 B, 今天, Angular 組件)
    │   │   │   │   ├── register.component.ts (4.3 KB, 今天, Angular 組件)
    │   │   │   ├── register-result/
    │   │   │   │   ├── register-result.component.html (586 B, 今天, Angular 組件)
    │   │   │   │   ├── register-result.component.ts (598 B, 今天, Angular 組件)
    │   │   │   ├── callback.component.ts (828 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts (1.5 KB, 今天, TypeScript)
    │   │   ├── pro/
    │   │   │   ├── account/
    │   │   │   │   ├── center/
    │   │   │   │   │   ├── projects [Angular]/
    │   │   │   │   │   │   ├── projects.component.html (1003 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── projects.component.less (401 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── projects.component.ts (1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications/
    │   │   │   │   │   │   ├── applications.component.html (1.7 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── applications.component.less (1 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── applications.component.ts (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── articles/
    │   │   │   │   │   │   ├── articles.component.html (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   │   ├── articles.component.ts (456 B, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.html (2.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.less (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── center.component.ts (2.4 KB, 今天, Angular 組件)
    │   │   │   │   ├── settings/
    │   │   │   │   │   └── base/
    │   │   │   │   │       ├── base.component.html (2.7 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── base.component.less (1 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── base.component.ts (2 KB, 今天, Angular 組件)
    │   │   │   │   │   └── binding/
    │   │   │   │   │       ├── binding.component.html (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── binding.component.ts (452 B, 今天, Angular 組件)
    │   │   │   │   │   └── notification/
    │   │   │   │   │       ├── notification.component.html (1 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── notification.component.ts (498 B, 今天, Angular 組件)
    │   │   │   │   │   └── security/
    │   │   │   │   │       ├── security.component.html (1.8 KB, 今天, Angular 組件)
    │   │   │   │   │       ├── security.component.ts (455 B, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.html (329 B, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.less (1.5 KB, 今天, Angular 組件)
    │   │   │   │   │   └── settings.component.ts (2.3 KB, 今天, Angular 組件)
    │   │   │   ├── form/
    │   │   │   │   ├── advanced-form/
    │   │   │   │   │   ├── advanced-form.component.html (8.7 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced-form.component.ts (4.1 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic-form/
    │   │   │   │   │   ├── basic-form.component.html (2.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-form.component.ts (1.2 KB, 今天, Angular 組件)
    │   │   │   │   ├── step-form/
    │   │   │   │   │   └── step-form.component.html (515 B, 今天, Angular 組件)
    │   │   │   │   │   └── step-form.component.less (362 B, 今天, Angular 組件)
    │   │   │   │   │   └── step-form.component.ts (870 B, 今天, Angular 組件)
    │   │   │   │   │   └── step1.component.html (1.9 KB, 今天, Angular 組件)
    │   │   │   │   │   └── step1.component.ts (1.2 KB, 今天, Angular 組件)
    │   │   │   │   │   └── step2.component.html (995 B, 今天, Angular 組件)
    │   │   │   │   │   └── step2.component.ts (969 B, 今天, Angular 組件)
    │   │   │   │   │   └── step3.component.html (670 B, 今天, Angular 組件)
    │   │   │   │   │   └── step3.component.ts (549 B, 今天, Angular 組件)
    │   │   │   │   │   └── transfer.service.ts (823 B, 今天, Angular 服務)
    │   │   │   ├── list/
    │   │   │   │   ├── projects [Angular]/
    │   │   │   │   │   ├── projects.component.html (2.2 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── projects.component.less (401 B, 今天, Angular 組件)
    │   │   │   │   │   ├── projects.component.ts (2 KB, 今天, Angular 組件)
    │   │   │   │   ├── applications/
    │   │   │   │   │   ├── applications.component.html (3 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications.component.less (1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── applications.component.ts (2.5 KB, 今天, Angular 組件)
    │   │   │   │   ├── articles/
    │   │   │   │   │   ├── articles.component.html (3.5 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── articles.component.ts (2.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic-list/
    │   │   │   │   │   ├── edit/
    │   │   │   │   │   │   ├── edit.component.html (388 B, 今天, Angular 組件)
    │   │   │   │   │   │   ├── edit.component.ts (1.4 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.html (3.4 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.less (317 B, 今天, Angular 組件)
    │   │   │   │   │   ├── basic-list.component.ts (1.8 KB, 今天, Angular 組件)
    │   │   │   │   ├── card-list/
    │   │   │   │   │   ├── card-list.component.html (2.2 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── card-list.component.ts (1.3 KB, 今天, Angular 組件)
    │   │   │   │   ├── list/
    │   │   │   │   │   ├── list.component.html (630 B, 今天, Angular 組件)
    │   │   │   │   │   ├── list.component.ts (1.2 KB, 今天, Angular 組件)
    │   │   │   │   ├── table-list/
    │   │   │   │   │   └── table-list.component.html (4.6 KB, 今天, Angular 組件)
    │   │   │   │   │   └── table-list.component.ts (4.4 KB, 今天, Angular 組件)
    │   │   │   ├── profile/
    │   │   │   │   ├── advanced/
    │   │   │   │   │   ├── advanced.component.html (5.1 KB, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced.component.less (329 B, 今天, Angular 組件)
    │   │   │   │   │   ├── advanced.component.ts (1.6 KB, 今天, Angular 組件)
    │   │   │   │   ├── basic/
    │   │   │   │   │   └── basic.component.html (1.3 KB, 今天, Angular 組件)
    │   │   │   │   │   └── basic.component.ts (1.8 KB, 今天, Angular 組件)
    │   │   │   ├── result/
    │   │   │   │   ├── fail/
    │   │   │   │   │   ├── fail.component.html (893 B, 今天, Angular 組件)
    │   │   │   │   │   ├── fail.component.ts (314 B, 今天, Angular 組件)
    │   │   │   │   ├── success/
    │   │   │   │   │   └── success.component.html (2.4 KB, 今天, Angular 組件)
    │   │   │   │   │   └── success.component.ts (501 B, 今天, Angular 組件)
    │   │   │   ├── routes.ts (4.7 KB, 今天, TypeScript)
    │   │   ├── style/
    │   │   │   ├── colors/
    │   │   │   │   ├── colors.component.html (4 KB, 今天, Angular 組件)
    │   │   │   │   ├── colors.component.less (180 B, 今天, Angular 組件)
    │   │   │   │   ├── colors.component.ts (820 B, 今天, Angular 組件)
    │   │   │   ├── gridmasonry/
    │   │   │   │   ├── gridmasonry.component.html (13.9 KB, 今天, Angular 組件)
    │   │   │   │   ├── gridmasonry.component.less (282 B, 今天, Angular 組件)
    │   │   │   │   ├── gridmasonry.component.ts (290 B, 今天, Angular 組件)
    │   │   │   ├── typography/
    │   │   │   │   ├── typography.component.html (4.7 KB, 今天, Angular 組件)
    │   │   │   │   ├── typography.component.ts (413 B, 今天, Angular 組件)
    │   │   │   ├── color.service.ts (663 B, 今天, Angular 服務)
    │   │   │   ├── routes.ts (591 B, 今天, TypeScript)
    │   │   ├── widgets/
    │   │   │   ├── widgets/
    │   │   │   │   ├── widgets.component.html (31.9 KB, 今天, Angular 組件)
    │   │   │   │   ├── widgets.component.less (246 B, 今天, Angular 組件)
    │   │   │   │   ├── widgets.component.ts (2.1 KB, 今天, Angular 組件)
    │   │   │   ├── routes.ts (183 B, 今天, TypeScript)
    │   │   ├── routes.ts (1.7 KB, 今天, TypeScript)
    │   ├── shared/
    │   │   ├── cell-widget/
    │   │   │   ├── index.ts (124 B, 今天, TypeScript)
    │   │   ├── json-schema/
    │   │   │   ├── index.ts (350 B, 今天, TypeScript)
    │   │   │   ├── README.md (326 B, 今天, Markdown 文檔)
    │   │   ├── st-widget/
    │   │   │   ├── index.ts (116 B, 今天, TypeScript)
    │   │   │   ├── README.md (68 B, 今天, Markdown 文檔)
    │   │   ├── utils/
    │   │   │   ├── yuan.ts (305 B, 今天, TypeScript)
    │   │   ├── index.ts (208 B, 今天, TypeScript)
    │   │   ├── README.md (734 B, 今天, Markdown 文檔)
    │   │   ├── shared-delon.module.ts (511 B, 今天, Angular 模組)
    │   │   ├── shared-imports.ts (602 B, 今天, TypeScript)
    │   │   ├── shared-zorro.module.ts (2.3 KB, 今天, Angular 模組)
    │   ├── app.component.ts (1.7 KB, 今天, Angular 組件)
    │   ├── app.config.ts (2.8 KB, 今天, TypeScript)
    ├── assets/
    │   ├── tmp/
    │   │   ├── i18n/
    │   │   │   ├── el-GR.json (10 KB, 今天, JSON 配置)
    │   │   │   ├── en-US.json (7 KB, 今天, JSON 配置)
    │   │   │   ├── es-ES.json (7.6 KB, 今天, JSON 配置)
    │   │   │   ├── fr-FR.json (7.7 KB, 今天, JSON 配置)
    │   │   │   ├── hr-HR.json (7.1 KB, 今天, JSON 配置)
    │   │   │   ├── it-IT.json (7.3 KB, 今天, JSON 配置)
    │   │   │   ├── ko-KR.json (7.4 KB, 今天, JSON 配置)
    │   │   │   ├── pl-PL.json (7.5 KB, 今天, JSON 配置)
    │   │   │   ├── sl-SI.json (7.2 KB, 今天, JSON 配置)
    │   │   │   ├── tr-TR.json (7.3 KB, 今天, JSON 配置)
    │   │   │   ├── zh-CN.json (6.9 KB, 今天, JSON 配置)
    │   │   │   ├── zh-TW.json (6.9 KB, 今天, JSON 配置)
    │   │   ├── img/
    │   │   │   ├── 1.png (2.8 KB, 今天, 檔案)
    │   │   │   ├── 2.png (2.5 KB, 今天, 檔案)
    │   │   │   ├── 3.png (3.3 KB, 今天, 檔案)
    │   │   │   ├── 4.png (3.2 KB, 今天, 檔案)
    │   │   │   ├── 5.png (2.5 KB, 今天, 檔案)
    │   │   │   ├── 6.png (3.7 KB, 今天, 檔案)
    │   │   │   ├── avatar.jpg (42.2 KB, 今天, 檔案)
    │   │   │   ├── bg1.jpg (632.2 KB, 今天, 檔案)
    │   │   │   ├── bg10.jpg (181.6 KB, 今天, 檔案)
    │   │   │   ├── bg2.jpg (144.7 KB, 今天, 檔案)
    │   │   │   ├── bg3.jpg (352.5 KB, 今天, 檔案)
    │   │   │   ├── bg4.jpg (482.3 KB, 今天, 檔案)
    │   │   │   ├── bg5.jpg (154.2 KB, 今天, 檔案)
    │   │   │   ├── bg6.jpg (443.2 KB, 今天, 檔案)
    │   │   │   ├── bg7.jpg (45 KB, 今天, 檔案)
    │   │   │   ├── bg8.jpg (190.1 KB, 今天, 檔案)
    │   │   │   ├── bg9.jpg (62.6 KB, 今天, 檔案)
    │   │   │   ├── half-float-bg-1.jpg (106.1 KB, 今天, 檔案)
    │   │   ├── app-data.json (9.1 KB, 今天, JSON 配置)
    │   │   ├── demo.docx (11.4 KB, 今天, 檔案)
    │   │   ├── demo.pdf (45.6 KB, 今天, 檔案)
    │   │   ├── demo.pptx (32.8 KB, 今天, 檔案)
    │   │   ├── demo.xlsx (8.3 KB, 今天, 檔案)
    │   │   ├── demo.zip (84.3 KB, 今天, 檔案)
    │   │   ├── on-boarding.json (679 B, 今天, JSON 配置)
    │   ├── .gitkeep (0 B, 今天, 檔案)
    │   ├── color.less (103.9 KB, 今天, Less 樣式)
    │   ├── logo-color.svg (2 KB, 今天, 檔案)
    │   ├── logo-full.svg (4.3 KB, 今天, 檔案)
    │   ├── logo.svg (2 KB, 今天, 檔案)
    │   ├── style.compact.css (761.1 KB, 今天, CSS 樣式)
    │   ├── style.dark.css (782.4 KB, 今天, CSS 樣式)
    │   ├── zorro.svg (2.2 KB, 今天, 檔案)
    ├── environments/
    │   ├── environment.prod.ts (229 B, 今天, TypeScript)
    │   ├── environment.ts (646 B, 今天, TypeScript)
    ├── styles/
    │   ├── index.less (80 B, 今天, Less 樣式)
    │   ├── theme.less (463 B, 今天, Less 樣式)
    ├── index.html (1.9 KB, 今天, HTML 模板)
    ├── main.ts (246 B, 今天, TypeScript)
    ├── style-icons-auto.ts (1.9 KB, 今天, TypeScript)
    ├── style-icons.ts (253 B, 今天, TypeScript)
    ├── styles.less (282 B, 今天, Less 樣式)
    ├── typings.d.ts (144 B, 今天, TypeScript)
└── _mock [ng-alain]/
    ├── _api.ts (8 KB, 今天, TypeScript)
    ├── _chart.ts (3.4 KB, 今天, TypeScript)
    ├── _geo.ts (1.1 KB, 今天, TypeScript)
    ├── _pois.ts (1.5 KB, 今天, TypeScript)
    ├── _profile.ts (2.7 KB, 今天, TypeScript)
    ├── _rule.ts (2.4 KB, 今天, TypeScript)
    ├── _user.ts (3.1 KB, 今天, TypeScript)
    ├── index.ts (177 B, 今天, TypeScript)
    ├── README.md (54 B, 今天, Markdown 文檔)
└── .cursor/
    ├── rules/
    │   ├── isolation_rules/
    │   │   └── Core/
    │   │       ├── command-execution.mdc (8.8 KB, 今天, 檔案)
    │   │       ├── complexity-decision-tree.mdc (5.9 KB, 今天, 檔案)
    │   │       ├── creative-phase-enforcement.mdc (4.1 KB, 今天, 檔案)
    │   │       ├── creative-phase-metrics.mdc (5.5 KB, 今天, 檔案)
    │   │       ├── file-verification.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── hierarchical-rule-loading.mdc (8.3 KB, 今天, 檔案)
    │   │       ├── mode-transition-optimization.mdc (10.2 KB, 今天, 檔案)
    │   │       ├── optimization-integration.mdc (9.6 KB, 今天, 檔案)
    │   │       ├── platform-awareness.mdc (2 KB, 今天, 檔案)
    │   │   └── Level1/
    │   │       ├── optimized-workflow-level1.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── quick-documentation.mdc (6.4 KB, 今天, 檔案)
    │   │       ├── workflow-level1.mdc (5.3 KB, 今天, 檔案)
    │   │   └── Level2/
    │   │       ├── archive-basic.mdc (4.8 KB, 今天, 檔案)
    │   │       ├── reflection-basic.mdc (5.6 KB, 今天, 檔案)
    │   │       ├── task-tracking-basic.mdc (4.6 KB, 今天, 檔案)
    │   │       ├── workflow-level2.mdc (8.7 KB, 今天, 檔案)
    │   │   └── Level3/
    │   │       ├── planning-comprehensive.mdc (5.4 KB, 今天, 檔案)
    │   │       ├── task-tracking-intermediate.mdc (3.9 KB, 今天, 檔案)
    │   │   └── Level4/
    │   │       ├── architectural-planning.mdc (25.2 KB, 今天, 檔案)
    │   │       ├── archive-comprehensive.mdc (21.7 KB, 今天, 檔案)
    │   │       ├── phased-implementation.mdc (20.6 KB, 今天, 檔案)
    │   │       ├── reflection-comprehensive.mdc (24.9 KB, 今天, 檔案)
    │   │       ├── task-tracking-advanced.mdc (16.3 KB, 今天, 檔案)
    │   │       ├── workflow-level4.mdc (17.5 KB, 今天, 檔案)
    │   │   └── Phases/
    │   │       ├── CreativePhase/
    │   │       │   └── creative-phase-architecture.mdc (4.8 KB, 今天, 檔案)
    │   │   └── visual-maps/
    │   │       ├── van_mode_split/
    │   │       │   ├── van-qa-checks/
    │   │       │   │   ├── build-test.mdc (3.4 KB, 今天, 檔案)
    │   │       │   │   ├── config-check.mdc (3.7 KB, 今天, 檔案)
    │   │       │   │   ├── dependency-check.mdc (4.7 KB, 今天, 檔案)
    │   │       │   │   ├── environment-check.mdc (3.5 KB, 今天, 檔案)
    │   │       │   │   ├── file-verification.mdc (1 B, 今天, 檔案)
    │   │       │   ├── van-qa-utils/
    │   │       │   │   ├── common-fixes.mdc (3.3 KB, 今天, 檔案)
    │   │       │   │   ├── mode-transitions.mdc (3.4 KB, 今天, 檔案)
    │   │       │   │   ├── reports.mdc (5.8 KB, 今天, 檔案)
    │   │       │   │   ├── rule-calling-guide.mdc (2.4 KB, 今天, 檔案)
    │   │       │   │   ├── rule-calling-help.mdc (518 B, 今天, 檔案)
    │   │       │   ├── van-complexity-determination.mdc (4.2 KB, 今天, 檔案)
    │   │       │   ├── van-file-verification.mdc (9.3 KB, 今天, 檔案)
    │   │       │   ├── van-mode-map.mdc (32.7 KB, 今天, 檔案)
    │   │       │   ├── van-platform-detection.mdc (1.6 KB, 今天, 檔案)
    │   │       │   ├── van-qa-main.mdc (5.3 KB, 今天, 檔案)
    │   │       │   ├── van-qa-validation.md.old (16.8 KB, 今天, 檔案)
    │   │       ├── archive-mode-map.mdc (7.9 KB, 今天, 檔案)
    │   │       ├── creative-mode-map.mdc (7.1 KB, 今天, 檔案)
    │   │       ├── implement-mode-map.mdc (9.7 KB, 今天, 檔案)
    │   │       ├── plan-mode-map.mdc (9.5 KB, 今天, 檔案)
    │   │       ├── qa-mode-map.mdc (22.6 KB, 今天, 檔案)
    │   │       ├── reflect-mode-map.mdc (7 KB, 今天, 檔案)
    │   │       ├── van-mode-map.mdc (32 KB, 今天, 檔案)
    │   │   └── main-optimized.mdc (8 KB, 今天, 檔案)
    │   │   └── main.mdc (5.6 KB, 今天, 檔案)
    ├── angular-cli.rules.mdc (511 B, 今天, 檔案)
    ├── context7.rules.mdc (514 B, 今天, 檔案)
    ├── everything.rules.mdc (558 B, 今天, 檔案)
    ├── fetch.rules.mdc (427 B, 今天, 檔案)
    ├── filesystem.rules.mdc (549 B, 今天, 檔案)
    ├── github.rules.mdc (431 B, 今天, 檔案)
    ├── mcp.json (2 KB, 今天, JSON 配置)
    ├── memory-config.mdc (2.4 KB, 今天, 檔案)
    ├── memory.rules.mdc (1.5 KB, 今天, 檔案)
    ├── playwright.rules.mdc (507 B, 今天, 檔案)
    ├── sequential-thinking.rules.mdc (471 B, 今天, 檔案)
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── config.yml (412 B, 今天, YAML 配置)
    ├── workflows/
    │   ├── ci.yml (5 KB, 今天, YAML 配置)
    │   ├── deploy-site.yml (1.3 KB, 今天, YAML 配置)
    ├── alain-bot.yml (1.4 KB, 今天, YAML 配置)
    ├── FUNDING.yml (143 B, 今天, YAML 配置)
    ├── ISSUE_TEMPLATE.md (383 B, 今天, Markdown 文檔)
    ├── lock.yml (568 B, 今天, YAML 配置)
    ├── no-response.yml (995 B, 今天, YAML 配置)
    ├── PULL_REQUEST_TEMPLATE.md (1.2 KB, 今天, Markdown 文檔)
    ├── semantic.yml (146 B, 今天, YAML 配置)
└── docs/
└── memory-bank/
    ├── active-context/
    │   ├── changes/
    │   │   ├── recentChanges.md (3.2 KB, 今天, Markdown 文檔)
    │   ├── context/
    │   │   ├── currentFocus.md (567 B, 今天, Markdown 文檔)
    │   ├── status/
    │   │   └── systemStatus.md (496 B, 今天, Markdown 文檔)
    ├── archive/
    │   ├── backup/
    │   │   ├── backupStrategy.md (8.8 KB, 今天, Markdown 文檔)
    │   ├── completed-tasks/
    │   │   ├── taskArchive.md (4.4 KB, 今天, Markdown 文檔)
    │   ├── historical-data/
    │   │   └── memory_bank_upgrade_guide.md (27.9 KB, 昨天, Markdown 文檔)
    │   │   └── ng-alain-structure.md (2.1 KB, 今天, Markdown 文檔)
    │   │   └── projectHistory.md (6.5 KB, 今天, Markdown 文檔)
    ├── creative-phase/
    │   ├── alternatives/
    │   │   ├── alternativeSolutions.md (2.3 KB, 今天, Markdown 文檔)
    │   ├── design-decisions/
    │   │   ├── designDecisions.md (4 KB, 今天, Markdown 文檔)
    │   ├── exploration/
    ├── implementation/
    │   ├── code/
    │   │   ├── codeStandards.md (8.2 KB, 今天, Markdown 文檔)
    │   ├── documentation/
    │   │   └── documentationStandards.md (5 KB, 今天, Markdown 文檔)
    ├── optimization-journey/
    │   ├── 00-introduction.md (1.2 KB, 昨天, Markdown 文檔)
    │   ├── 01-efficiency-and-clarity.md (1.4 KB, 昨天, Markdown 文檔)
    │   ├── 02-system-self-assessment.md (1 KB, 昨天, Markdown 文檔)
    │   ├── 03-redundancy-elimination.md (934 B, 昨天, Markdown 文檔)
    │   ├── 04-single-source-of-truth.md (1.5 KB, 昨天, Markdown 文檔)
    │   ├── 05-adaptive-complexity-model.md (1.6 KB, 昨天, Markdown 文檔)
    │   ├── 06-self-assessment-recommendations.md (2 KB, 昨天, Markdown 文檔)
    │   ├── 07-structured-creative-thinking.md (2.7 KB, 昨天, Markdown 文檔)
    │   ├── 08-creative-phase-enforcement.md (2.6 KB, 昨天, Markdown 文檔)
    │   ├── 09-context-optimization.md (3.6 KB, 昨天, Markdown 文檔)
    │   ├── 10-current-system-state.md (6.2 KB, 昨天, Markdown 文檔)
    │   ├── 12-future-directions.md (2 KB, 昨天, Markdown 文檔)
    │   ├── 13-future-directions.md (1.8 KB, 昨天, Markdown 文檔)
    │   ├── README.md (7.8 KB, 昨天, Markdown 文檔)
    ├── system-patterns/
    │   ├── architecture/
    │   │   ├── architectureDecisions.md (2.3 KB, 今天, Markdown 文檔)
    │   │   ├── designPhilosophy.md (1.6 KB, 今天, Markdown 文檔)
    │   │   ├── projectArchitecture.md (6.6 KB, 今天, Markdown 文檔)
    │   │   ├── README.md (3.3 KB, 今天, Markdown 文檔)
    │   ├── patterns/
    │   │   ├── developmentPatterns.md (2.6 KB, 今天, Markdown 文檔)
    │   │   ├── developmentPrinciples.md (6.1 KB, 今天, Markdown 文檔)
    │   │   ├── technicalPatterns.md (4.7 KB, 今天, Markdown 文檔)
    │   ├── workflows/
    │   │   └── developmentWorkflow.md (2.8 KB, 今天, Markdown 文檔)
    ├── memory.json (12.2 KB, 今天, JSON 配置)
    ├── ng-alain-structure.md (38.7 KB, 今天, Markdown 文檔)
    ├── progress.md (2.5 KB, 今天, Markdown 文檔)
    ├── projectbrief.md (1.1 KB, 今天, Markdown 文檔)
    ├── README.md (4.8 KB, 今天, Markdown 文檔)
    ├── techContext.md (1.6 KB, 今天, Markdown 文檔)
└── public/
    ├── favicon.ico (15.3 KB, 今天, 圖示檔案)
└── scripts/
    ├── _ci/
    │   ├── delon.sh (460 B, 今天, 檔案)
    │   ├── deploy-pipelines.sh (1.3 KB, 今天, 檔案)
    │   ├── fix-day.js (345 B, 今天, JavaScript)
    │   ├── github-comment.js (1.4 KB, 今天, JavaScript)
    │   ├── README.md (33 B, 今天, Markdown 文檔)
    ├── generate-tree.ts (14.4 KB, 今天, TypeScript)
└── .cursorrules (8.9 KB, 今天, 檔案)
└── .editorconfig (274 B, 今天, 檔案)
└── .gitignore (736 B, 今天, 檔案)
└── .npmignore (31 B, 今天, 檔案)
└── .npmrc (40 B, 今天, 檔案)
└── .nvmrc (8 B, 今天, 檔案)
└── .prettierignore (198 B, 今天, 檔案)
└── .prettierrc.js (264 B, 今天, JavaScript)
└── .yarnrc.yml (98 B, 今天, YAML 配置)
└── angular.json (4.8 KB, 今天, JSON 配置)
└── CONTRIBUTING.md (8.4 KB, 今天, Markdown 文檔)
└── custom_modes (7.9 KB, 昨天, 檔案)
└── eslint.config.mjs (4.2 KB, 今天, ES 模組)
└── LICENSE (1.1 KB, 今天, 檔案)
└── ng-alain.json (177 B, 今天, JSON 配置)
└── package.json (3.9 KB, 今天, JSON 配置)
└── proxy.conf.js (634 B, 今天, JavaScript)
└── README.md (4.4 KB, 今天, Markdown 文檔)
└── stylelint.config.mjs (1.7 KB, 今天, ES 模組)
└── tsconfig.app.json (424 B, 今天, JSON 配置)
└── tsconfig.json (1.3 KB, 今天, JSON 配置)
└── tsconfig.spec.json (434 B, 今天, JSON 配置)

```

## 🎯 Angular 20 + ng-alain 最佳實踐

### 1. 專案結構規範
- ✅ 遵循 ng-alain 目錄命名規範
- ✅ 使用 @delon/* 模組進行功能開發
- ✅ 合理組織 routes 模組化結構

### 2. 代碼組織原則
- ✅ 單一職責原則 (SRP)
- ✅ 依賴注入 (DI) 合理使用
- ✅ 組件重用與模組化設計

### 3. ng-alain 開發規範
- ✅ 使用 ng-zorro-antd 組件庫
- ✅ 遵循 Ant Design 設計規範
- ✅ 充分利用 @delon/* 生態

## 🔄 自動化腳本使用

### 手動生成結構報告
```bash
npm run structure:generate
```

### Git Hook 自動更新
此文件可配置在 Git pre-commit hook 中自動更新，確保專案結構文檔始終保持最新狀態。

### 腳本特色功能
- 🔍 Angular 與 ng-alain 目錄自動識別
- 📋 檔案類型自動分類
- 📊 詳細的檔案大小與修改時間
- 🎯 ng-alain 專案結構最佳實踐說明

---

*Generated by ng-alain Structure Generator v2.0*
