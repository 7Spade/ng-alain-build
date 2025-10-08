# 📄 ng-alain 專案完整結構

> 包含完整的目錄和文件結構

**生成時間**: 2025-10-08

## 📊 統計資訊

- **目錄總數**: 249
- **文件總數**: 796

## 📂 目錄結構

```
└── _mock/
    ├── _api.ts
    ├── _chart.ts
    ├── _geo.ts
    ├── _pois.ts
    ├── _profile.ts
    ├── _project.ts
    ├── _rule.ts
    ├── _user.ts
    ├── index.ts
    ├── README.md
└── .playwright-mcp/
└── docs/
    ├── ng-alain-master/
    │   ├── _mock/
    │   │   ├── _api.ts
    │   │   ├── _chart.ts
    │   │   ├── _geo.ts
    │   │   ├── _pois.ts
    │   │   ├── _profile.ts
    │   │   ├── _rule.ts
    │   │   ├── _user.ts
    │   │   ├── index.ts
    │   │   ├── README.md
    │   ├── public/
    │   │   ├── favicon.ico
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── core/
    │   │   │   │   ├── i18n/
    │   │   │   │   │   ├── i18n.service.spec.ts
    │   │   │   │   │   ├── i18n.service.ts
    │   │   │   │   ├── net/
    │   │   │   │   │   ├── default.interceptor.ts
    │   │   │   │   │   ├── helper.ts
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── refresh-token.ts
    │   │   │   │   ├── startup/
    │   │   │   │   │   ├── startup.service.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── README.md
    │   │   │   │   ├── start-page.guard.ts
    │   │   │   ├── layout/
    │   │   │   │   ├── basic/
    │   │   │   │   │   ├── widgets/
    │   │   │   │   │   │   ├── clear-storage.component.ts
    │   │   │   │   │   │   ├── fullscreen.component.ts
    │   │   │   │   │   │   ├── i18n.component.ts
    │   │   │   │   │   │   ├── icon.component.ts
    │   │   │   │   │   │   ├── notify.component.ts
    │   │   │   │   │   │   ├── rtl.component.ts
    │   │   │   │   │   │   ├── search.component.ts
    │   │   │   │   │   │   ├── task.component.ts
    │   │   │   │   │   │   ├── user.component.ts
    │   │   │   │   │   ├── basic.component.ts
    │   │   │   │   │   ├── README.md
    │   │   │   │   ├── blank/
    │   │   │   │   │   ├── blank.component.ts
    │   │   │   │   │   ├── README.md
    │   │   │   │   ├── passport/
    │   │   │   │   │   ├── passport.component.less
    │   │   │   │   │   ├── passport.component.ts
    │   │   │   │   ├── index.ts
    │   │   │   ├── routes/
    │   │   │   │   ├── dashboard/
    │   │   │   │   │   ├── analysis/
    │   │   │   │   │   │   ├── analysis.component.html
    │   │   │   │   │   │   ├── analysis.component.less
    │   │   │   │   │   │   ├── analysis.component.ts
    │   │   │   │   │   ├── monitor/
    │   │   │   │   │   │   ├── monitor.component.html
    │   │   │   │   │   │   ├── monitor.component.less
    │   │   │   │   │   │   ├── monitor.component.ts
    │   │   │   │   │   ├── v1/
    │   │   │   │   │   │   ├── v1.component.html
    │   │   │   │   │   │   ├── v1.component.ts
    │   │   │   │   │   ├── workplace/
    │   │   │   │   │   │   ├── workplace.component.html
    │   │   │   │   │   │   ├── workplace.component.less
    │   │   │   │   │   │   ├── workplace.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── data-v/
    │   │   │   │   │   ├── relation/
    │   │   │   │   │   │   ├── relation.component.html
    │   │   │   │   │   │   ├── relation.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── delon/
    │   │   │   │   │   ├── acl/
    │   │   │   │   │   │   ├── acl.component.html
    │   │   │   │   │   │   ├── acl.component.ts
    │   │   │   │   │   ├── cache/
    │   │   │   │   │   │   ├── cache.component.html
    │   │   │   │   │   │   ├── cache.component.ts
    │   │   │   │   │   ├── downfile/
    │   │   │   │   │   │   ├── downfile.component.html
    │   │   │   │   │   │   ├── downfile.component.ts
    │   │   │   │   │   ├── form/
    │   │   │   │   │   │   ├── form.component.html
    │   │   │   │   │   │   ├── form.component.ts
    │   │   │   │   │   ├── guard/
    │   │   │   │   │   │   ├── admin.component.ts
    │   │   │   │   │   │   ├── auth.component.ts
    │   │   │   │   │   │   ├── can-leave.ts
    │   │   │   │   │   │   ├── guard.component.html
    │   │   │   │   │   │   ├── guard.component.ts
    │   │   │   │   │   │   ├── leave.component.ts
    │   │   │   │   │   ├── print/
    │   │   │   │   │   │   ├── print.component.html
    │   │   │   │   │   │   ├── print.component.ts
    │   │   │   │   │   ├── qr/
    │   │   │   │   │   │   ├── qr.component.html
    │   │   │   │   │   │   ├── qr.component.ts
    │   │   │   │   │   ├── st/
    │   │   │   │   │   │   ├── st.component.html
    │   │   │   │   │   │   ├── st.component.ts
    │   │   │   │   │   ├── util/
    │   │   │   │   │   │   ├── util.component.html
    │   │   │   │   │   │   ├── util.component.ts
    │   │   │   │   │   ├── xlsx/
    │   │   │   │   │   │   ├── xlsx.component.html
    │   │   │   │   │   │   ├── xlsx.component.ts
    │   │   │   │   │   ├── zip/
    │   │   │   │   │   │   ├── zip.component.html
    │   │   │   │   │   │   ├── zip.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── exception/
    │   │   │   │   │   ├── exception.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   │   ├── trigger.component.ts
    │   │   │   │   ├── extras/
    │   │   │   │   │   ├── helpcenter/
    │   │   │   │   │   │   ├── helpcenter.component.html
    │   │   │   │   │   │   ├── helpcenter.component.ts
    │   │   │   │   │   ├── poi/
    │   │   │   │   │   │   ├── edit/
    │   │   │   │   │   │   │   ├── edit.component.html
    │   │   │   │   │   │   │   ├── edit.component.ts
    │   │   │   │   │   │   ├── poi.component.html
    │   │   │   │   │   │   ├── poi.component.ts
    │   │   │   │   │   ├── settings/
    │   │   │   │   │   │   ├── settings.component.html
    │   │   │   │   │   │   ├── settings.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── passport/
    │   │   │   │   │   ├── lock/
    │   │   │   │   │   │   ├── lock.component.html
    │   │   │   │   │   │   ├── lock.component.less
    │   │   │   │   │   │   ├── lock.component.ts
    │   │   │   │   │   ├── login/
    │   │   │   │   │   │   ├── login.component.html
    │   │   │   │   │   │   ├── login.component.less
    │   │   │   │   │   │   ├── login.component.ts
    │   │   │   │   │   ├── register/
    │   │   │   │   │   │   ├── register.component.html
    │   │   │   │   │   │   ├── register.component.less
    │   │   │   │   │   │   ├── register.component.ts
    │   │   │   │   │   ├── register-result/
    │   │   │   │   │   │   ├── register-result.component.html
    │   │   │   │   │   │   ├── register-result.component.ts
    │   │   │   │   │   ├── callback.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── pro/
    │   │   │   │   │   ├── account/
    │   │   │   │   │   │   ├── center/
    │   │   │   │   │   │   │   ├── applications/
    │   │   │   │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   │   │   │   ├── articles/
    │   │   │   │   │   │   │   │   ├── articles.component.html
    │   │   │   │   │   │   │   │   ├── articles.component.ts
    │   │   │   │   │   │   │   ├── projects/
    │   │   │   │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   │   │   │   ├── center.component.html
    │   │   │   │   │   │   │   ├── center.component.less
    │   │   │   │   │   │   │   ├── center.component.ts
    │   │   │   │   │   │   ├── settings/
    │   │   │   │   │   │   │   └── base/
    │   │   │   │   │   │   │       ├── base.component.html
    │   │   │   │   │   │   │       ├── base.component.less
    │   │   │   │   │   │   │       ├── base.component.ts
    │   │   │   │   │   │   │   └── binding/
    │   │   │   │   │   │   │       ├── binding.component.html
    │   │   │   │   │   │   │       ├── binding.component.ts
    │   │   │   │   │   │   │   └── notification/
    │   │   │   │   │   │   │       ├── notification.component.html
    │   │   │   │   │   │   │       ├── notification.component.ts
    │   │   │   │   │   │   │   └── security/
    │   │   │   │   │   │   │       ├── security.component.html
    │   │   │   │   │   │   │       ├── security.component.ts
    │   │   │   │   │   │   │   └── settings.component.html
    │   │   │   │   │   │   │   └── settings.component.less
    │   │   │   │   │   │   │   └── settings.component.ts
    │   │   │   │   │   ├── form/
    │   │   │   │   │   │   ├── advanced-form/
    │   │   │   │   │   │   │   ├── advanced-form.component.html
    │   │   │   │   │   │   │   ├── advanced-form.component.ts
    │   │   │   │   │   │   ├── basic-form/
    │   │   │   │   │   │   │   ├── basic-form.component.html
    │   │   │   │   │   │   │   ├── basic-form.component.ts
    │   │   │   │   │   │   ├── step-form/
    │   │   │   │   │   │   │   └── step-form.component.html
    │   │   │   │   │   │   │   └── step-form.component.less
    │   │   │   │   │   │   │   └── step-form.component.ts
    │   │   │   │   │   │   │   └── step1.component.html
    │   │   │   │   │   │   │   └── step1.component.ts
    │   │   │   │   │   │   │   └── step2.component.html
    │   │   │   │   │   │   │   └── step2.component.ts
    │   │   │   │   │   │   │   └── step3.component.html
    │   │   │   │   │   │   │   └── step3.component.ts
    │   │   │   │   │   │   │   └── transfer.service.ts
    │   │   │   │   │   ├── list/
    │   │   │   │   │   │   ├── applications/
    │   │   │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   │   │   ├── articles/
    │   │   │   │   │   │   │   ├── articles.component.html
    │   │   │   │   │   │   │   ├── articles.component.ts
    │   │   │   │   │   │   ├── basic-list/
    │   │   │   │   │   │   │   ├── edit/
    │   │   │   │   │   │   │   │   ├── edit.component.html
    │   │   │   │   │   │   │   │   ├── edit.component.ts
    │   │   │   │   │   │   │   ├── basic-list.component.html
    │   │   │   │   │   │   │   ├── basic-list.component.less
    │   │   │   │   │   │   │   ├── basic-list.component.ts
    │   │   │   │   │   │   ├── card-list/
    │   │   │   │   │   │   │   ├── card-list.component.html
    │   │   │   │   │   │   │   ├── card-list.component.ts
    │   │   │   │   │   │   ├── list/
    │   │   │   │   │   │   │   ├── list.component.html
    │   │   │   │   │   │   │   ├── list.component.ts
    │   │   │   │   │   │   ├── projects/
    │   │   │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   │   │   ├── table-list/
    │   │   │   │   │   │   │   └── table-list.component.html
    │   │   │   │   │   │   │   └── table-list.component.ts
    │   │   │   │   │   ├── profile/
    │   │   │   │   │   │   ├── advanced/
    │   │   │   │   │   │   │   ├── advanced.component.html
    │   │   │   │   │   │   │   ├── advanced.component.less
    │   │   │   │   │   │   │   ├── advanced.component.ts
    │   │   │   │   │   │   ├── basic/
    │   │   │   │   │   │   │   └── basic.component.html
    │   │   │   │   │   │   │   └── basic.component.ts
    │   │   │   │   │   ├── result/
    │   │   │   │   │   │   ├── fail/
    │   │   │   │   │   │   │   ├── fail.component.html
    │   │   │   │   │   │   │   ├── fail.component.ts
    │   │   │   │   │   │   ├── success/
    │   │   │   │   │   │   │   └── success.component.html
    │   │   │   │   │   │   │   └── success.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── style/
    │   │   │   │   │   ├── colors/
    │   │   │   │   │   │   ├── colors.component.html
    │   │   │   │   │   │   ├── colors.component.less
    │   │   │   │   │   │   ├── colors.component.ts
    │   │   │   │   │   ├── gridmasonry/
    │   │   │   │   │   │   ├── gridmasonry.component.html
    │   │   │   │   │   │   ├── gridmasonry.component.less
    │   │   │   │   │   │   ├── gridmasonry.component.ts
    │   │   │   │   │   ├── typography/
    │   │   │   │   │   │   ├── typography.component.html
    │   │   │   │   │   │   ├── typography.component.ts
    │   │   │   │   │   ├── color.service.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── widgets/
    │   │   │   │   │   ├── widgets/
    │   │   │   │   │   │   ├── widgets.component.html
    │   │   │   │   │   │   ├── widgets.component.less
    │   │   │   │   │   │   ├── widgets.component.ts
    │   │   │   │   │   ├── routes.ts
    │   │   │   │   ├── routes.ts
    │   │   │   ├── shared/
    │   │   │   │   ├── cell-widget/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   ├── json-schema/
    │   │   │   │   │   ├── test/
    │   │   │   │   │   │   ├── test.widget.ts
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── README.md
    │   │   │   │   ├── st-widget/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── README.md
    │   │   │   │   ├── utils/
    │   │   │   │   │   ├── yuan.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── README.md
    │   │   │   │   ├── shared-delon.module.ts
    │   │   │   │   ├── shared-imports.ts
    │   │   │   │   ├── shared-zorro.module.ts
    │   │   │   ├── app.component.ts
    │   │   │   ├── app.config.ts
    │   │   ├── assets/
    │   │   │   ├── tmp/
    │   │   │   │   ├── i18n/
    │   │   │   │   │   ├── el-GR.json
    │   │   │   │   │   ├── en-US.json
    │   │   │   │   │   ├── es-ES.json
    │   │   │   │   │   ├── fr-FR.json
    │   │   │   │   │   ├── hr-HR.json
    │   │   │   │   │   ├── it-IT.json
    │   │   │   │   │   ├── ko-KR.json
    │   │   │   │   │   ├── pl-PL.json
    │   │   │   │   │   ├── sl-SI.json
    │   │   │   │   │   ├── tr-TR.json
    │   │   │   │   │   ├── zh-CN.json
    │   │   │   │   │   ├── zh-TW.json
    │   │   │   │   ├── img/
    │   │   │   │   │   ├── 1.png
    │   │   │   │   │   ├── 2.png
    │   │   │   │   │   ├── 3.png
    │   │   │   │   │   ├── 4.png
    │   │   │   │   │   ├── 5.png
    │   │   │   │   │   ├── 6.png
    │   │   │   │   │   ├── avatar.jpg
    │   │   │   │   │   ├── bg1.jpg
    │   │   │   │   │   ├── bg10.jpg
    │   │   │   │   │   ├── bg2.jpg
    │   │   │   │   │   ├── bg3.jpg
    │   │   │   │   │   ├── bg4.jpg
    │   │   │   │   │   ├── bg5.jpg
    │   │   │   │   │   ├── bg6.jpg
    │   │   │   │   │   ├── bg7.jpg
    │   │   │   │   │   ├── bg8.jpg
    │   │   │   │   │   ├── bg9.jpg
    │   │   │   │   │   ├── half-float-bg-1.jpg
    │   │   │   │   ├── app-data.json
    │   │   │   │   ├── demo.docx
    │   │   │   │   ├── demo.pdf
    │   │   │   │   ├── demo.pptx
    │   │   │   │   ├── demo.xlsx
    │   │   │   │   ├── demo.zip
    │   │   │   │   ├── on-boarding.json
    │   │   │   ├── .gitkeep
    │   │   │   ├── color.less
    │   │   │   ├── logo-color.svg
    │   │   │   ├── logo-full.svg
    │   │   │   ├── logo.svg
    │   │   │   ├── style.compact.css
    │   │   │   ├── style.dark.css
    │   │   │   ├── zorro.svg
    │   │   ├── environments/
    │   │   │   ├── environment.prod.ts
    │   │   │   ├── environment.ts
    │   │   ├── styles/
    │   │   │   ├── index.less
    │   │   │   ├── theme.less
    │   │   ├── index.html
    │   │   ├── main.ts
    │   │   ├── style-icons-auto.ts
    │   │   ├── style-icons.ts
    │   │   ├── styles.less
    │   │   ├── typings.d.ts
    │   ├── .editorconfig
    │   ├── .gitignore
    │   ├── .npmignore
    │   ├── .npmrc
    │   ├── .nvmrc
    │   ├── .prettierignore
    │   ├── .prettierrc.js
    │   ├── .yarnrc.yml
    │   ├── angular.json
    │   ├── CONTRIBUTING.md
    │   ├── eslint.config.mjs
    │   ├── LICENSE
    │   ├── ng-alain.json
    │   ├── package.json
    │   ├── proxy.conf.js
    │   ├── README-zh_CN.md
    │   ├── README.md
    │   ├── stylelint.config.mjs
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.spec.json
    ├── FIREBASE_AUTHENTICATION_DESIGN_PART2.md
    ├── FIREBASE_AUTHENTICATION_DESIGN.md
    ├── FIREBASE_BUG_FIXES_2025-10-07.md
    ├── FIREBASE_CONSOLE_SETUP.md
    ├── FIREBASE_FILES_INDEX.md
    ├── FIREBASE_IMPLEMENTATION_COMPLETE.md
    ├── FIREBASE_IMPLEMENTATION_SUMMARY.md
    ├── FIREBASE_INTEGRATION_ANALYSIS_2025-10-08.md
    ├── FIREBASE_INTEGRATION_GUIDE.md
    ├── FIREBASE_QUICK_START.md
    ├── FIREBASE_VAN_COMPLETE_REPORT_2025-10-07.md
    ├── README_FIREBASE_DESIGN.md
└── memory-bank/
    ├── active-context/
    │   ├── changes/
    │   │   ├── eslint-error-summary.md
    │   │   ├── memory-bank-refinement-round5-2025-10-07.md
    │   │   ├── org-switcher-implementation-complete-2025-10-07.md
    │   │   ├── organization-module-enhancement-2025-10-07.md
    │   │   ├── project-feature-code-optimization-2025-10-07.md
    │   │   ├── project-feature-phase1-complete-2025-10-07.md
    │   │   ├── project-feature-phase2-complete-2025-10-07.md
    │   │   ├── README.md
    │   │   ├── recentChanges.md
    │   ├── context/
    │   │   ├── currentFocus.md
    │   │   ├── enhancement-opportunities.md
    │   │   ├── README.md
    │   │   ├── tab-system-guide.md
    │   ├── status/
    │   │   └── systemStatus.md
    ├── archive/
    │   ├── backup/
    │   │   ├── backupStrategy.md
    │   ├── completed-tasks/
    │   │   ├── 2025-10-07/
    │   │   │   ├── complete-route-configuration-fix-2025-10-07.md
    │   │   │   ├── component-migration-2025-10-07.md
    │   │   │   ├── eslint-error-analysis-2025-10-07.md
    │   │   │   ├── extraction-final-summary.md
    │   │   │   ├── folder-structure-refactoring-2025-10-07.md
    │   │   │   ├── implementation-plan.md
    │   │   │   ├── migration-summary.md
    │   │   │   ├── ng-antd-admin-analysis-summary.md
    │   │   │   ├── refactoring-summary.md
    │   │   │   ├── route-reuse-strategy-fix-2025-10-07.md
    │   │   ├── taskArchive.md
    │   ├── historical-data/
    │   │   └── optimization-journey/
    │   │       ├── 00-introduction.md
    │   │       ├── 01-efficiency-and-clarity.md
    │   │       ├── 02-system-self-assessment.md
    │   │       ├── 03-redundancy-elimination.md
    │   │       ├── 04-single-source-of-truth.md
    │   │       ├── 05-adaptive-complexity-model.md
    │   │       ├── 06-self-assessment-recommendations.md
    │   │       ├── 07-structured-creative-thinking.md
    │   │       ├── 08-creative-phase-enforcement.md
    │   │       ├── 09-context-optimization.md
    │   │       ├── 10-current-system-state.md
    │   │       ├── 12-key-lessons.md
    │   │       ├── 13-future-directions.md
    │   │       ├── README.md
    │   │   └── cursor-rules-optimization-2025-10-07.md
    │   │   └── memory_bank_upgrade_guide.md
    │   │   └── memory-bank-deep-refinement-round2-2025-10-07.md
    │   │   └── memory-bank-excellence-round3-2025-10-07.md
    │   │   └── memory-bank-final-refinement-2025-10-07.md
    │   │   └── memory-bank-refinement-round4-2025-10-07.md
    │   │   └── memory-bank-refinement-round4-complete.md
    │   │   └── memory-bank-refinement-summary.md
    │   │   └── ng-alain-structure-blueprint.md
    │   │   └── ng-alain-structure-final.md
    │   │   └── ng-alain-structure-full.md
    │   │   └── projectHistory.md
    ├── creative-phase/
    │   ├── alternatives/
    │   │   ├── alternativeSolutions.md
    │   │   ├── README.md
    │   ├── design-decisions/
    │   │   ├── designDecisions.md
    │   │   ├── firebase-delon-integration.md
    │   │   ├── multi-org-implementation-guide.md
    │   │   ├── multi-organization-system-design.md
    │   │   ├── org-switcher-design.md
    │   │   ├── organization-form-modal-decision.md
    │   │   ├── project-feature-system-design.md
    │   │   ├── README.md
    │   ├── exploration/
    │   │   ├── feature-comparison-table.md
    │   │   ├── ng-antd-admin-analysis.md
    │   │   ├── README.md
    │   ├── README.md
    ├── implementation/
    │   ├── code/
    │   │   ├── codeStandards.md
    │   ├── documentation/
    │   │   ├── documentationStandards.md
    │   ├── tests/
    │   │   ├── testingStandards.md
    │   ├── README.md
    ├── system-patterns/
    │   ├── architecture/
    │   │   ├── architectureDecisions.md
    │   │   ├── designPhilosophy.md
    │   │   ├── projectArchitecture.md
    │   │   ├── README.md
    │   ├── patterns/
    │   │   ├── developmentPatterns.md
    │   │   ├── developmentPrinciples.md
    │   │   ├── README.md
    │   │   ├── technicalPatterns.md
    │   ├── workflows/
    │   │   └── developmentWorkflow.md
    ├── memory.json
    ├── ng-alain-lint-error-style.md
    ├── ng-alain-lint-error.md
    ├── ng-alain-structure-folders.md
    ├── ng-alain-structure-full.md
    ├── ng-alain-structure.md
    ├── progress.md
    ├── projectbrief.md
    ├── QUICK_REFERENCE.md
    ├── README.md
    ├── techContext.md
    ├── VAN_REFINEMENT_COMPLETE_2025-10-07.md
└── public/
    ├── favicon.ico
└── src/
    ├── app/
    │   ├── auth/
    │   │   ├── callback/
    │   │   │   ├── callback.component.ts
    │   │   ├── landing/
    │   │   │   ├── landing.component.html
    │   │   │   ├── landing.component.less
    │   │   │   ├── landing.component.ts
    │   │   ├── lock/
    │   │   │   ├── lock.component.html
    │   │   │   ├── lock.component.less
    │   │   │   ├── lock.component.ts
    │   │   ├── login/
    │   │   │   ├── login.component.html
    │   │   │   ├── login.component.less
    │   │   │   ├── login.component.ts
    │   │   ├── register/
    │   │   │   ├── register.component.html
    │   │   │   ├── register.component.less
    │   │   │   ├── register.component.ts
    │   │   ├── register-result/
    │   │   │   ├── register-result.component.html
    │   │   │   ├── register-result.component.ts
    │   │   ├── README.md
    │   │   ├── routes.ts
    │   ├── core/
    │   │   ├── firebase/
    │   │   ├── guards/
    │   │   │   ├── firebase-auth.guard.ts
    │   │   │   ├── permission.guard.ts
    │   │   ├── i18n/
    │   │   │   ├── i18n.service.spec.ts
    │   │   │   ├── i18n.service.ts
    │   │   ├── models/
    │   │   │   ├── firebase-token.model.ts
    │   │   ├── net/
    │   │   │   ├── default.interceptor.ts
    │   │   │   ├── firebase-auth.interceptor.ts
    │   │   │   ├── firebase-refresh-token.ts
    │   │   │   ├── helper.ts
    │   │   │   ├── index.ts
    │   │   │   ├── organization.interceptor.ts
    │   │   │   ├── refresh-token.ts
    │   │   ├── services/
    │   │   │   ├── mode/
    │   │   │   │   ├── mode.service.ts
    │   │   │   ├── organization-context/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── organization-context.service.ts
    │   │   │   ├── tab/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── README.md
    │   │   │   │   ├── simple-reuse-strategy.ts
    │   │   │   │   ├── tab.service.ts
    │   │   │   ├── auto-refresh.service.ts
    │   │   │   ├── delon-firebase-token.service.ts
    │   │   │   ├── firebase-auth.service.ts
    │   │   │   ├── firebase-error-handler.service.ts
    │   │   │   ├── multi-tenant-auth.service.ts
    │   │   │   ├── rbac.service.ts
    │   │   │   ├── scroll.service.ts
    │   │   │   ├── token-refresh.service.ts
    │   │   ├── startup/
    │   │   │   ├── startup.service.ts
    │   │   ├── index.ts
    │   │   ├── README.md
    │   │   ├── start-page.guard.ts
    │   ├── examples/
    │   │   ├── delon-features/
    │   │   │   ├── acl-demo/
    │   │   │   │   ├── acl.component.html
    │   │   │   │   ├── acl.component.ts
    │   │   │   ├── cache-demo/
    │   │   │   │   ├── cache.component.html
    │   │   │   │   ├── cache.component.ts
    │   │   │   ├── downfile-demo/
    │   │   │   │   ├── downfile.component.html
    │   │   │   │   ├── downfile.component.ts
    │   │   │   ├── form-demo/
    │   │   │   │   ├── form.component.html
    │   │   │   │   ├── form.component.ts
    │   │   │   ├── guard-demo/
    │   │   │   │   ├── admin.component.ts
    │   │   │   │   ├── auth.component.ts
    │   │   │   │   ├── can-leave.ts
    │   │   │   │   ├── guard.component.html
    │   │   │   │   ├── guard.component.ts
    │   │   │   │   ├── leave.component.ts
    │   │   │   ├── print-demo/
    │   │   │   │   ├── print.component.html
    │   │   │   │   ├── print.component.ts
    │   │   │   ├── qr-demo/
    │   │   │   │   ├── qr.component.html
    │   │   │   │   ├── qr.component.ts
    │   │   │   ├── st-demo/
    │   │   │   │   ├── st.component.html
    │   │   │   │   ├── st.component.ts
    │   │   │   ├── util-demo/
    │   │   │   │   ├── util.component.html
    │   │   │   │   ├── util.component.ts
    │   │   │   ├── xlsx-demo/
    │   │   │   │   ├── xlsx.component.html
    │   │   │   │   ├── xlsx.component.ts
    │   │   │   ├── zip-demo/
    │   │   │   │   ├── zip.component.html
    │   │   │   │   ├── zip.component.ts
    │   │   │   ├── routes.ts
    │   │   ├── pro-templates/
    │   │   │   ├── account/
    │   │   │   │   ├── account-center/
    │   │   │   │   │   ├── my-applications-tab/
    │   │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   │   ├── my-articles-tab/
    │   │   │   │   │   │   ├── articles.component.html
    │   │   │   │   │   │   ├── articles.component.ts
    │   │   │   │   │   ├── my-projects-tab/
    │   │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   │   ├── center.component.html
    │   │   │   │   │   ├── center.component.less
    │   │   │   │   │   ├── center.component.ts
    │   │   │   │   ├── account-settings/
    │   │   │   │   │   └── base-settings/
    │   │   │   │   │       ├── base.component.html
    │   │   │   │   │       ├── base.component.less
    │   │   │   │   │       ├── base.component.ts
    │   │   │   │   │   └── binding-settings/
    │   │   │   │   │       ├── binding.component.html
    │   │   │   │   │       ├── binding.component.ts
    │   │   │   │   │   └── notification-settings/
    │   │   │   │   │       ├── notification.component.html
    │   │   │   │   │       ├── notification.component.ts
    │   │   │   │   │   └── security-settings/
    │   │   │   │   │       ├── security.component.html
    │   │   │   │   │       ├── security.component.ts
    │   │   │   │   │   └── settings.component.html
    │   │   │   │   │   └── settings.component.less
    │   │   │   │   │   └── settings.component.ts
    │   │   │   ├── form-templates/
    │   │   │   │   ├── advanced-form/
    │   │   │   │   │   ├── advanced-form.component.html
    │   │   │   │   │   ├── advanced-form.component.ts
    │   │   │   │   ├── basic-form/
    │   │   │   │   │   ├── basic-form.component.html
    │   │   │   │   │   ├── basic-form.component.ts
    │   │   │   │   ├── step-form/
    │   │   │   │   │   └── step-form.component.html
    │   │   │   │   │   └── step-form.component.less
    │   │   │   │   │   └── step-form.component.ts
    │   │   │   │   │   └── step1.component.html
    │   │   │   │   │   └── step1.component.ts
    │   │   │   │   │   └── step2.component.html
    │   │   │   │   │   └── step2.component.ts
    │   │   │   │   │   └── step3.component.html
    │   │   │   │   │   └── step3.component.ts
    │   │   │   │   │   └── transfer.service.ts
    │   │   │   ├── list-templates/
    │   │   │   │   ├── application-list/
    │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   ├── article-list/
    │   │   │   │   │   ├── articles.component.html
    │   │   │   │   │   ├── articles.component.ts
    │   │   │   │   ├── basic-list/
    │   │   │   │   │   ├── edit/
    │   │   │   │   │   │   ├── edit.component.html
    │   │   │   │   │   │   ├── edit.component.ts
    │   │   │   │   │   ├── basic-list.component.html
    │   │   │   │   │   ├── basic-list.component.less
    │   │   │   │   │   ├── basic-list.component.ts
    │   │   │   │   ├── card-list/
    │   │   │   │   │   ├── card-list.component.html
    │   │   │   │   │   ├── card-list.component.ts
    │   │   │   │   ├── list/
    │   │   │   │   │   ├── list.component.html
    │   │   │   │   │   ├── list.component.ts
    │   │   │   │   ├── project-list/
    │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   ├── table-list/
    │   │   │   │   │   └── table-list.component.html
    │   │   │   │   │   └── table-list.component.ts
    │   │   │   ├── profile-pages/
    │   │   │   │   ├── advanced-profile/
    │   │   │   │   │   ├── advanced.component.html
    │   │   │   │   │   ├── advanced.component.less
    │   │   │   │   │   ├── advanced.component.ts
    │   │   │   │   ├── basic-profile/
    │   │   │   │   │   └── basic.component.html
    │   │   │   │   │   └── basic.component.ts
    │   │   │   ├── result-pages/
    │   │   │   │   ├── fail-result/
    │   │   │   │   │   ├── fail.component.html
    │   │   │   │   │   ├── fail.component.ts
    │   │   │   │   ├── success-result/
    │   │   │   │   │   └── success.component.html
    │   │   │   │   │   └── success.component.ts
    │   │   │   ├── routes.ts
    │   │   ├── style-guide/
    │   │   │   ├── colors-demo/
    │   │   │   │   ├── colors.component.html
    │   │   │   │   ├── colors.component.less
    │   │   │   │   ├── colors.component.ts
    │   │   │   ├── grid-demo/
    │   │   │   │   ├── gridmasonry.component.html
    │   │   │   │   ├── gridmasonry.component.less
    │   │   │   │   ├── gridmasonry.component.ts
    │   │   │   ├── typography-demo/
    │   │   │   │   ├── typography.component.html
    │   │   │   │   ├── typography.component.ts
    │   │   │   ├── color.service.ts
    │   │   │   ├── routes.ts
    │   │   ├── widgets-showcase/
    │   │   │   ├── routes.ts
    │   │   │   ├── widgets.component.html
    │   │   │   ├── widgets.component.less
    │   │   │   ├── widgets.component.ts
    │   │   ├── README.md
    │   ├── features/
    │   │   ├── dashboard/
    │   │   │   ├── dashboard-analysis/
    │   │   │   │   ├── analysis.component.html
    │   │   │   │   ├── analysis.component.less
    │   │   │   │   ├── analysis.component.ts
    │   │   │   ├── dashboard-monitor/
    │   │   │   │   ├── monitor.component.html
    │   │   │   │   ├── monitor.component.less
    │   │   │   │   ├── monitor.component.ts
    │   │   │   ├── dashboard-v1/
    │   │   │   │   ├── v1.component.html
    │   │   │   │   ├── v1.component.ts
    │   │   │   ├── dashboard-workplace/
    │   │   │   │   ├── workplace.component.html
    │   │   │   │   ├── workplace.component.less
    │   │   │   │   ├── workplace.component.ts
    │   │   │   ├── README.md
    │   │   │   ├── routes.ts
    │   │   ├── organization/
    │   │   │   ├── components/
    │   │   │   │   ├── department-list/
    │   │   │   │   │   ├── department-list.component.html
    │   │   │   │   │   ├── department-list.component.less
    │   │   │   │   │   ├── department-list.component.ts
    │   │   │   │   │   ├── index.ts
    │   │   │   │   ├── employee-list/
    │   │   │   │   │   ├── employee-list.component.html
    │   │   │   │   │   ├── employee-list.component.less
    │   │   │   │   │   ├── employee-list.component.ts
    │   │   │   │   │   ├── index.ts
    │   │   │   │   ├── organization-form/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── organization-form.component.html
    │   │   │   │   │   ├── organization-form.component.less
    │   │   │   │   │   ├── organization-form.component.ts
    │   │   │   │   │   ├── USAGE.md
    │   │   │   │   ├── organization-settings/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── organization-settings.component.html
    │   │   │   │   │   ├── organization-settings.component.less
    │   │   │   │   │   ├── organization-settings.component.ts
    │   │   │   │   ├── role-management/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── role-management.component.html
    │   │   │   │   │   ├── role-management.component.less
    │   │   │   │   │   ├── role-management.component.ts
    │   │   │   │   ├── index.ts
    │   │   │   ├── guards/
    │   │   │   │   ├── organization.guard.ts
    │   │   │   ├── models/
    │   │   │   │   ├── common.model.ts
    │   │   │   │   ├── department.model.ts
    │   │   │   │   ├── employee.model.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── organization-context.model.ts
    │   │   │   │   ├── organization-membership.model.ts
    │   │   │   │   ├── organization.model.ts
    │   │   │   │   ├── role.model.ts
    │   │   │   │   ├── user-organization.model.ts
    │   │   │   ├── services/
    │   │   │   │   ├── department.service.ts
    │   │   │   │   ├── employee.service.ts
    │   │   │   │   ├── organization.service.ts
    │   │   │   │   ├── role.service.ts
    │   │   │   │   ├── user-organization.service.ts
    │   │   │   ├── COMPONENTS.md
    │   │   │   ├── DESIGN.md
    │   │   │   ├── README.md
    │   │   │   ├── routes.ts
    │   │   ├── projects/
    │   │   │   ├── components/
    │   │   │   │   ├── member-list/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── member-list.component.html
    │   │   │   │   │   ├── member-list.component.less
    │   │   │   │   │   ├── member-list.component.ts
    │   │   │   │   ├── project-dashboard/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── project-dashboard.component.html
    │   │   │   │   │   ├── project-dashboard.component.less
    │   │   │   │   │   ├── project-dashboard.component.ts
    │   │   │   │   ├── project-files/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── project-files.component.html
    │   │   │   │   │   ├── project-files.component.less
    │   │   │   │   │   ├── project-files.component.ts
    │   │   │   │   ├── project-form/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── project-form.component.html
    │   │   │   │   │   ├── project-form.component.less
    │   │   │   │   │   ├── project-form.component.ts
    │   │   │   │   ├── project-list/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── project-list.component.html
    │   │   │   │   │   ├── project-list.component.less
    │   │   │   │   │   ├── project-list.component.ts
    │   │   │   │   ├── project-overview/
    │   │   │   │   │   ├── index.ts
    │   │   │   │   │   ├── project-overview.component.html
    │   │   │   │   │   ├── project-overview.component.less
    │   │   │   │   │   ├── project-overview.component.ts
    │   │   │   │   ├── project-settings/
    │   │   │   │   │   └── index.ts
    │   │   │   │   │   └── project-settings.component.html
    │   │   │   │   │   └── project-settings.component.less
    │   │   │   │   │   └── project-settings.component.ts
    │   │   │   ├── guards/
    │   │   │   │   ├── project-access.guard.ts
    │   │   │   ├── models/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── project-activity.model.ts
    │   │   │   │   ├── project-file.model.ts
    │   │   │   │   ├── project-member.model.ts
    │   │   │   │   ├── project.constants.ts
    │   │   │   │   ├── project.model.ts
    │   │   │   ├── services/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── project-file.service.ts
    │   │   │   │   ├── project-member.service.ts
    │   │   │   │   ├── project.service.ts
    │   │   │   ├── README.md
    │   │   │   ├── routes.ts
    │   │   ├── README.md
    │   ├── layout/
    │   │   ├── basic-layout/
    │   │   │   ├── widgets/
    │   │   │   │   ├── clear-storage.component.ts
    │   │   │   │   ├── fullscreen.component.ts
    │   │   │   │   ├── i18n.component.ts
    │   │   │   │   ├── icon.component.ts
    │   │   │   │   ├── notify.component.ts
    │   │   │   │   ├── org-switcher.component.ts
    │   │   │   │   ├── rtl.component.ts
    │   │   │   │   ├── search.component.ts
    │   │   │   │   ├── task.component.ts
    │   │   │   │   ├── user.component.ts
    │   │   │   ├── basic.component.ts
    │   │   │   ├── README.md
    │   │   ├── blank-layout/
    │   │   │   ├── blank.component.ts
    │   │   │   ├── README.md
    │   │   ├── passport-layout/
    │   │   │   ├── passport.component.less
    │   │   │   ├── passport.component.ts
    │   │   ├── widgets/
    │   │   │   ├── tab/
    │   │   │   │   └── index.ts
    │   │   │   │   └── tab.component.html
    │   │   │   │   └── tab.component.less
    │   │   │   │   └── tab.component.ts
    │   │   ├── index.ts
    │   │   ├── README.md
    │   ├── shared/
    │   │   ├── components/
    │   │   │   ├── cell-widget/
    │   │   │   │   ├── index.ts
    │   │   │   ├── page-header/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── page-header.component.html
    │   │   │   │   ├── page-header.component.less
    │   │   │   │   ├── page-header.component.ts
    │   │   │   ├── st-widget/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── README.md
    │   │   │   ├── tree-table/
    │   │   │   │   └── index.ts
    │   │   │   │   └── README.md
    │   │   │   │   └── tree-table.component.html
    │   │   │   │   └── tree-table.component.less
    │   │   │   │   └── tree-table.component.ts
    │   │   ├── directives/
    │   │   │   ├── auth.directive.ts
    │   │   │   ├── debounce-click.directive.ts
    │   │   │   ├── disabled.directive.ts
    │   │   │   ├── has-permission.directive.ts
    │   │   │   ├── mouse-hover-show.directive.ts
    │   │   │   ├── screen-less-hidden.directive.ts
    │   │   │   ├── toggle-fullscreen.directive.ts
    │   │   ├── json-schema/
    │   │   │   ├── test/
    │   │   │   │   ├── test.widget.ts
    │   │   │   ├── index.ts
    │   │   │   ├── README.md
    │   │   ├── pipes/
    │   │   │   ├── html.pipe.ts
    │   │   │   ├── map.pipe.ts
    │   │   │   ├── table-filed.pipe.ts
    │   │   ├── utils/
    │   │   │   ├── file-size.util.ts
    │   │   │   ├── tools.ts
    │   │   │   ├── tree-table-tools.ts
    │   │   │   ├── yuan.ts
    │   │   ├── index.ts
    │   │   ├── README.md
    │   │   ├── shared-delon.module.ts
    │   │   ├── shared-imports.ts
    │   │   ├── shared-zorro.module.ts
    │   ├── system/
    │   │   ├── data-visualization/
    │   │   │   ├── relation-chart/
    │   │   │   │   ├── relation.component.html
    │   │   │   │   ├── relation.component.ts
    │   │   │   ├── routes.ts
    │   │   ├── exception/
    │   │   │   ├── exception.component.ts
    │   │   │   ├── routes.ts
    │   │   │   ├── trigger.component.ts
    │   │   ├── extras/
    │   │   │   └── helpcenter/
    │   │   │       ├── helpcenter.component.html
    │   │   │       ├── helpcenter.component.ts
    │   │   │   └── poi/
    │   │   │       ├── edit/
    │   │   │       │   ├── edit.component.html
    │   │   │       │   ├── edit.component.ts
    │   │   │       ├── poi.component.html
    │   │   │       ├── poi.component.ts
    │   │   │   └── settings/
    │   │   │       ├── settings.component.html
    │   │   │       ├── settings.component.ts
    │   │   │   └── routes.ts
    │   ├── app.component.ts
    │   ├── app.config.ts
    │   ├── app.routes.ts
    │   ├── README.md
    ├── assets/
    │   ├── tmp/
    │   │   ├── i18n/
    │   │   │   ├── el-GR.json
    │   │   │   ├── en-US.json
    │   │   │   ├── es-ES.json
    │   │   │   ├── fr-FR.json
    │   │   │   ├── hr-HR.json
    │   │   │   ├── it-IT.json
    │   │   │   ├── ko-KR.json
    │   │   │   ├── pl-PL.json
    │   │   │   ├── sl-SI.json
    │   │   │   ├── tr-TR.json
    │   │   │   ├── zh-CN.json
    │   │   │   ├── zh-TW.json
    │   │   ├── img/
    │   │   │   ├── 1.png
    │   │   │   ├── 2.png
    │   │   │   ├── 3.png
    │   │   │   ├── 4.png
    │   │   │   ├── 5.png
    │   │   │   ├── 6.png
    │   │   │   ├── avatar.svg
    │   │   │   ├── bg1.jpg
    │   │   │   ├── bg10.jpg
    │   │   │   ├── bg2.jpg
    │   │   │   ├── bg3.jpg
    │   │   │   ├── bg4.jpg
    │   │   │   ├── bg5.jpg
    │   │   │   ├── bg6.jpg
    │   │   │   ├── bg7.jpg
    │   │   │   ├── bg8.jpg
    │   │   │   ├── bg9.jpg
    │   │   │   ├── half-float-bg-1.jpg
    │   │   ├── app-data.json
    │   │   ├── demo.docx
    │   │   ├── demo.pdf
    │   │   ├── demo.pptx
    │   │   ├── demo.xlsx
    │   │   ├── demo.zip
    │   │   ├── on-boarding.json
    │   ├── .gitkeep
    │   ├── color.less
    │   ├── logo-color.svg
    │   ├── logo-full.svg
    │   ├── logo.svg
    │   ├── style.compact.css
    │   ├── style.dark.css
    │   ├── zorro.svg
    ├── environments/
    │   ├── environment.prod.ts
    │   ├── environment.ts
    │   ├── firebase.config.ts
    ├── styles/
    │   ├── index.less
    │   ├── theme.less
    ├── index.html
    ├── main.ts
    ├── style-icons-auto.ts
    ├── style-icons.ts
    ├── styles.less
    ├── typings.d.ts
└── .cursorrules
└── .editorconfig
└── .gitignore
└── .npmignore
└── .npmrc
└── .nvmrc
└── .prettierignore
└── .prettierrc.js
└── .yarnrc.yml
└── angular.json
└── CONTRIBUTING.md
└── custom_modes
└── eslint.config.mjs
└── firebase.json
└── LICENSE
└── ng-alain.json
└── package.json
└── proxy.conf.js
└── README.md
└── stylelint.config.mjs
└── TESTING-MULTI-ORG.md
└── tsconfig.app.json
└── tsconfig.json
└── tsconfig.spec.json
└── yarn.lock
```

---

*Generated by ng-alain Structure Generator (Optimized)*
