# 📄 ng-alain 專案完整結構

> 包含完整的目錄和文件結構

**生成時間**: 2025-10-08

## 📊 統計資訊

- **目錄總數**: 134
- **文件總數**: 420

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
    │   │   ├── adapters/
    │   │   │   ├── firebase-token.adapter.ts
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
    │   │   ├── models/
    │   │   │   ├── types/
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
