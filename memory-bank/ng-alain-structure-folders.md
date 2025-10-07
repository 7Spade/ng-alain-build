# 📁 ng-alain 專案資料夾結構

> 僅包含目錄結構，不包含文件

**生成時間**: 2025-10-07

## 📊 統計資訊

- **目錄總數**: 248


## 📂 目錄結構

```
└── _mock/
└── .playwright-mcp/
└── docs/
    ├── ng-alain-master/
    │   └── _mock/
    │   └── public/
    │   └── src/
    │       └── app/
    │           ├── core/
    │           │   ├── i18n/
    │           │   ├── net/
    │           │   ├── startup/
    │           ├── layout/
    │           │   ├── basic/
    │           │   │   ├── widgets/
    │           │   ├── blank/
    │           │   ├── passport/
    │           ├── routes/
    │           │   ├── dashboard/
    │           │   │   ├── analysis/
    │           │   │   ├── monitor/
    │           │   │   ├── v1/
    │           │   │   ├── workplace/
    │           │   ├── data-v/
    │           │   │   ├── relation/
    │           │   ├── delon/
    │           │   │   ├── acl/
    │           │   │   ├── cache/
    │           │   │   ├── downfile/
    │           │   │   ├── form/
    │           │   │   ├── guard/
    │           │   │   ├── print/
    │           │   │   ├── qr/
    │           │   │   ├── st/
    │           │   │   ├── util/
    │           │   │   ├── xlsx/
    │           │   │   ├── zip/
    │           │   ├── exception/
    │           │   ├── extras/
    │           │   │   ├── helpcenter/
    │           │   │   ├── poi/
    │           │   │   │   ├── edit/
    │           │   │   ├── settings/
    │           │   ├── passport/
    │           │   │   ├── lock/
    │           │   │   ├── login/
    │           │   │   ├── register/
    │           │   │   ├── register-result/
    │           │   ├── pro/
    │           │   │   ├── account/
    │           │   │   │   ├── center/
    │           │   │   │   │   ├── applications/
    │           │   │   │   │   ├── articles/
    │           │   │   │   │   ├── projects/
    │           │   │   │   ├── settings/
    │           │   │   │   │   └── base/
    │           │   │   │   │   └── binding/
    │           │   │   │   │   └── notification/
    │           │   │   │   │   └── security/
    │           │   │   ├── form/
    │           │   │   │   ├── advanced-form/
    │           │   │   │   ├── basic-form/
    │           │   │   │   ├── step-form/
    │           │   │   ├── list/
    │           │   │   │   ├── applications/
    │           │   │   │   ├── articles/
    │           │   │   │   ├── basic-list/
    │           │   │   │   │   ├── edit/
    │           │   │   │   ├── card-list/
    │           │   │   │   ├── list/
    │           │   │   │   ├── projects/
    │           │   │   │   ├── table-list/
    │           │   │   ├── profile/
    │           │   │   │   ├── advanced/
    │           │   │   │   ├── basic/
    │           │   │   ├── result/
    │           │   │   │   └── fail/
    │           │   │   │   └── success/
    │           │   ├── style/
    │           │   │   ├── colors/
    │           │   │   ├── gridmasonry/
    │           │   │   ├── typography/
    │           │   ├── widgets/
    │           │   │   └── widgets/
    │           ├── shared/
    │           │   └── cell-widget/
    │           │   └── json-schema/
    │           │       ├── test/
    │           │   └── st-widget/
    │           │   └── utils/
    │       └── assets/
    │           ├── tmp/
    │           │   └── i18n/
    │           │   └── img/
    │       └── environments/
    │       └── styles/
└── memory-bank/
    ├── active-context/
    │   ├── changes/
    │   ├── context/
    │   ├── status/
    ├── archive/
    │   ├── backup/
    │   ├── completed-tasks/
    │   │   ├── 2025-10-07/
    │   ├── historical-data/
    │   │   └── optimization-journey/
    ├── creative-phase/
    │   ├── alternatives/
    │   ├── design-decisions/
    │   ├── exploration/
    ├── implementation/
    │   ├── code/
    │   ├── documentation/
    │   ├── tests/
    ├── system-patterns/
    │   └── architecture/
    │   └── patterns/
    │   └── workflows/
└── public/
└── src/
    └── app/
        ├── auth/
        │   ├── callback/
        │   ├── landing/
        │   ├── lock/
        │   ├── login/
        │   ├── register/
        │   ├── register-result/
        ├── core/
        │   ├── guards/
        │   ├── i18n/
        │   ├── models/
        │   ├── net/
        │   ├── services/
        │   │   ├── mode/
        │   │   ├── organization-context/
        │   │   ├── tab/
        │   ├── startup/
        ├── examples/
        │   ├── delon-features/
        │   │   ├── acl-demo/
        │   │   ├── cache-demo/
        │   │   ├── downfile-demo/
        │   │   ├── form-demo/
        │   │   ├── guard-demo/
        │   │   ├── print-demo/
        │   │   ├── qr-demo/
        │   │   ├── st-demo/
        │   │   ├── util-demo/
        │   │   ├── xlsx-demo/
        │   │   ├── zip-demo/
        │   ├── pro-templates/
        │   │   ├── account/
        │   │   │   ├── account-center/
        │   │   │   │   ├── my-applications-tab/
        │   │   │   │   ├── my-articles-tab/
        │   │   │   │   ├── my-projects-tab/
        │   │   │   ├── account-settings/
        │   │   │   │   └── base-settings/
        │   │   │   │   └── binding-settings/
        │   │   │   │   └── notification-settings/
        │   │   │   │   └── security-settings/
        │   │   ├── form-templates/
        │   │   │   ├── advanced-form/
        │   │   │   ├── basic-form/
        │   │   │   ├── step-form/
        │   │   ├── list-templates/
        │   │   │   ├── application-list/
        │   │   │   ├── article-list/
        │   │   │   ├── basic-list/
        │   │   │   │   ├── edit/
        │   │   │   ├── card-list/
        │   │   │   ├── list/
        │   │   │   ├── project-list/
        │   │   │   ├── table-list/
        │   │   ├── profile-pages/
        │   │   │   ├── advanced-profile/
        │   │   │   ├── basic-profile/
        │   │   ├── result-pages/
        │   │   │   └── fail-result/
        │   │   │   └── success-result/
        │   ├── style-guide/
        │   │   ├── colors-demo/
        │   │   ├── grid-demo/
        │   │   ├── typography-demo/
        │   ├── widgets-showcase/
        ├── features/
        │   ├── dashboard/
        │   │   ├── dashboard-analysis/
        │   │   ├── dashboard-monitor/
        │   │   ├── dashboard-v1/
        │   │   ├── dashboard-workplace/
        │   ├── organization/
        │   │   ├── components/
        │   │   │   ├── department-list/
        │   │   │   ├── employee-list/
        │   │   │   ├── organization-form/
        │   │   │   ├── organization-settings/
        │   │   │   ├── role-management/
        │   │   ├── guards/
        │   │   ├── models/
        │   │   ├── services/
        │   ├── projects/
        │   │   └── components/
        │   │       ├── member-list/
        │   │       ├── project-dashboard/
        │   │       ├── project-files/
        │   │       ├── project-form/
        │   │       ├── project-list/
        │   │       ├── project-overview/
        │   │       ├── project-settings/
        │   │   └── guards/
        │   │   └── models/
        │   │   └── services/
        ├── layout/
        │   ├── basic-layout/
        │   │   ├── widgets/
        │   ├── blank-layout/
        │   ├── passport-layout/
        │   ├── widgets/
        │   │   └── tab/
        ├── shared/
        │   ├── components/
        │   │   ├── cell-widget/
        │   │   ├── page-header/
        │   │   ├── st-widget/
        │   │   ├── tree-table/
        │   ├── directives/
        │   ├── json-schema/
        │   │   ├── test/
        │   ├── pipes/
        │   ├── utils/
        ├── system/
        │   └── data-visualization/
        │       ├── relation-chart/
        │   └── exception/
        │   └── extras/
        │       └── helpcenter/
        │       └── poi/
        │           ├── edit/
        │       └── settings/
    └── assets/
        ├── tmp/
        │   └── i18n/
        │   └── img/
    └── environments/
    └── styles/
```

---

*Generated by ng-alain Structure Generator (Optimized)*
