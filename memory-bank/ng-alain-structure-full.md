# 📄 ng-alain 專案完整結構

> 包含完整的目錄和文件結構

**生成時間**: 2025-10-07

## 📊 統計資訊

- **目錄總數**: 135
- **文件總數**: 405

## 📂 目錄結構

```
└── _mock/
    ├── _api.ts
    ├── _chart.ts
    ├── _geo.ts
    ├── _pois.ts
    ├── _profile.ts
    ├── _rule.ts
    ├── _user.ts
    ├── index.ts
    ├── README.md
└── docs/
└── memory-bank/
    ├── active-context/
    │   ├── changes/
    │   │   ├── component-migration-2025-10-07.md
    │   │   ├── cursor-rules-optimization-2025-10-07.md
    │   │   ├── folder-structure-refactoring-2025-10-07.md
    │   │   ├── recentChanges.md
    │   ├── context/
    │   │   ├── currentFocus.md
    │   │   ├── enhancement-opportunities.md
    │   │   ├── extraction-final-summary.md
    │   │   ├── implementation-plan.md
    │   │   ├── migration-summary.md
    │   │   ├── ng-antd-admin-analysis-summary.md
    │   │   ├── refactoring-summary.md
    │   │   ├── tab-system-guide.md
    │   ├── status/
    │   │   └── systemStatus.md
    ├── archive/
    │   ├── backup/
    │   │   ├── backupStrategy.md
    │   ├── completed-tasks/
    │   │   ├── taskArchive.md
    │   ├── historical-data/
    │   │   └── memory_bank_upgrade_guide.md
    │   │   └── ng-alain-structure-full.md
    │   │   └── ng-alain-structure.md
    │   │   └── projectHistory.md
    ├── creative-phase/
    │   ├── alternatives/
    │   │   ├── alternativeSolutions.md
    │   ├── design-decisions/
    │   │   ├── designDecisions.md
    │   ├── exploration/
    │   │   ├── feature-comparison-table.md
    │   │   ├── ng-antd-admin-analysis.md
    │   ├── README.md
    ├── implementation/
    │   ├── code/
    │   │   ├── codeStandards.md
    │   ├── documentation/
    │   │   ├── documentationStandards.md
    │   ├── tests/
    │   │   ├── testingStandards.md
    │   ├── README.md
    ├── optimization-journey/
    │   ├── 00-introduction.md
    │   ├── 01-efficiency-and-clarity.md
    │   ├── 02-system-self-assessment.md
    │   ├── 03-redundancy-elimination.md
    │   ├── 04-single-source-of-truth.md
    │   ├── 05-adaptive-complexity-model.md
    │   ├── 06-self-assessment-recommendations.md
    │   ├── 07-structured-creative-thinking.md
    │   ├── 08-creative-phase-enforcement.md
    │   ├── 09-context-optimization.md
    │   ├── 10-current-system-state.md
    │   ├── 11-key-lessons.md
    │   ├── 12-future-directions.md
    │   ├── 12-key-lessons.md
    │   ├── 13-future-directions.md
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
    ├── ng-alain-structure-blueprint.md
    ├── ng-alain-structure-final.md
    ├── ng-alain-structure-folders.md
    ├── ng-alain-structure-full.md
    ├── ng-alain-structure.md
    ├── progress.md
    ├── projectbrief.md
    ├── README.md
    ├── techContext.md
└── public/
    ├── favicon.ico
└── src/
    ├── app/
    │   ├── auth/
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
    │   │   ├── i18n/
    │   │   │   ├── i18n.service.spec.ts
    │   │   │   ├── i18n.service.ts
    │   │   ├── net/
    │   │   │   ├── default.interceptor.ts
    │   │   │   ├── helper.ts
    │   │   │   ├── index.ts
    │   │   │   ├── refresh-token.ts
    │   │   ├── services/
    │   │   │   ├── tab/
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── README.md
    │   │   │   │   ├── simple-reuse-strategy.ts
    │   │   │   │   ├── tab.service.ts
    │   │   │   ├── scroll.service.ts
    │   │   ├── startup/
    │   │   │   ├── startup.service.ts
    │   │   ├── index.ts
    │   │   ├── README.md
    │   │   ├── start-page.guard.ts
    │   ├── examples/
    │   │   ├── delon-features/
    │   │   │   ├── acl/
    │   │   │   │   ├── acl.component.html
    │   │   │   │   ├── acl.component.ts
    │   │   │   ├── cache/
    │   │   │   │   ├── cache.component.html
    │   │   │   │   ├── cache.component.ts
    │   │   │   ├── downfile/
    │   │   │   │   ├── downfile.component.html
    │   │   │   │   ├── downfile.component.ts
    │   │   │   ├── form/
    │   │   │   │   ├── form.component.html
    │   │   │   │   ├── form.component.ts
    │   │   │   ├── guard/
    │   │   │   │   ├── admin.component.ts
    │   │   │   │   ├── auth.component.ts
    │   │   │   │   ├── can-leave.ts
    │   │   │   │   ├── guard.component.html
    │   │   │   │   ├── guard.component.ts
    │   │   │   │   ├── leave.component.ts
    │   │   │   ├── print/
    │   │   │   │   ├── print.component.html
    │   │   │   │   ├── print.component.ts
    │   │   │   ├── qr/
    │   │   │   │   ├── qr.component.html
    │   │   │   │   ├── qr.component.ts
    │   │   │   ├── st/
    │   │   │   │   ├── st.component.html
    │   │   │   │   ├── st.component.ts
    │   │   │   ├── util/
    │   │   │   │   ├── util.component.html
    │   │   │   │   ├── util.component.ts
    │   │   │   ├── xlsx/
    │   │   │   │   ├── xlsx.component.html
    │   │   │   │   ├── xlsx.component.ts
    │   │   │   ├── zip/
    │   │   │   │   ├── zip.component.html
    │   │   │   │   ├── zip.component.ts
    │   │   │   ├── routes.ts
    │   │   ├── pro-templates/
    │   │   │   ├── account/
    │   │   │   │   ├── center/
    │   │   │   │   │   ├── applications/
    │   │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   │   ├── articles/
    │   │   │   │   │   │   ├── articles.component.html
    │   │   │   │   │   │   ├── articles.component.ts
    │   │   │   │   │   ├── projects/
    │   │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   │   ├── center.component.html
    │   │   │   │   │   ├── center.component.less
    │   │   │   │   │   ├── center.component.ts
    │   │   │   │   ├── settings/
    │   │   │   │   │   └── base/
    │   │   │   │   │       ├── base.component.html
    │   │   │   │   │       ├── base.component.less
    │   │   │   │   │       ├── base.component.ts
    │   │   │   │   │   └── binding/
    │   │   │   │   │       ├── binding.component.html
    │   │   │   │   │       ├── binding.component.ts
    │   │   │   │   │   └── notification/
    │   │   │   │   │       ├── notification.component.html
    │   │   │   │   │       ├── notification.component.ts
    │   │   │   │   │   └── security/
    │   │   │   │   │       ├── security.component.html
    │   │   │   │   │       ├── security.component.ts
    │   │   │   │   │   └── settings.component.html
    │   │   │   │   │   └── settings.component.less
    │   │   │   │   │   └── settings.component.ts
    │   │   │   ├── form/
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
    │   │   │   ├── list/
    │   │   │   │   ├── applications/
    │   │   │   │   │   ├── applications.component.html
    │   │   │   │   │   ├── applications.component.less
    │   │   │   │   │   ├── applications.component.ts
    │   │   │   │   ├── articles/
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
    │   │   │   │   ├── projects/
    │   │   │   │   │   ├── projects.component.html
    │   │   │   │   │   ├── projects.component.less
    │   │   │   │   │   ├── projects.component.ts
    │   │   │   │   ├── table-list/
    │   │   │   │   │   └── table-list.component.html
    │   │   │   │   │   └── table-list.component.ts
    │   │   │   ├── profile/
    │   │   │   │   ├── advanced/
    │   │   │   │   │   ├── advanced.component.html
    │   │   │   │   │   ├── advanced.component.less
    │   │   │   │   │   ├── advanced.component.ts
    │   │   │   │   ├── basic/
    │   │   │   │   │   └── basic.component.html
    │   │   │   │   │   └── basic.component.ts
    │   │   │   ├── result/
    │   │   │   │   ├── fail/
    │   │   │   │   │   ├── fail.component.html
    │   │   │   │   │   ├── fail.component.ts
    │   │   │   │   ├── success/
    │   │   │   │   │   └── success.component.html
    │   │   │   │   │   └── success.component.ts
    │   │   │   ├── routes.ts
    │   │   ├── style-guide/
    │   │   │   ├── colors/
    │   │   │   │   ├── colors.component.html
    │   │   │   │   ├── colors.component.less
    │   │   │   │   ├── colors.component.ts
    │   │   │   ├── gridmasonry/
    │   │   │   │   ├── gridmasonry.component.html
    │   │   │   │   ├── gridmasonry.component.less
    │   │   │   │   ├── gridmasonry.component.ts
    │   │   │   ├── typography/
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
    │   │   │   ├── analysis/
    │   │   │   │   ├── analysis.component.html
    │   │   │   │   ├── analysis.component.less
    │   │   │   │   ├── analysis.component.ts
    │   │   │   ├── monitor/
    │   │   │   │   ├── monitor.component.html
    │   │   │   │   ├── monitor.component.less
    │   │   │   │   ├── monitor.component.ts
    │   │   │   ├── v1/
    │   │   │   │   ├── v1.component.html
    │   │   │   │   ├── v1.component.ts
    │   │   │   ├── workplace/
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
    │   │   │   │   ├── organization.model.ts
    │   │   │   │   ├── role.model.ts
    │   │   │   ├── services/
    │   │   │   │   ├── department.service.ts
    │   │   │   │   ├── employee.service.ts
    │   │   │   │   ├── organization.service.ts
    │   │   │   │   ├── role.service.ts
    │   │   │   ├── COMPONENTS.md
    │   │   │   ├── DESIGN.md
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
    │   ├── routes/
    │   │   ├── routes.ts
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
    │   │   │   ├── relation/
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
└── LICENSE
└── ng-alain.json
└── package.json
└── proxy.conf.js
└── README.md
└── stylelint.config.mjs
└── tsconfig.app.json
└── tsconfig.json
└── tsconfig.spec.json
└── yarn.lock
```

---

*Generated by ng-alain Structure Generator (Simplified)*
