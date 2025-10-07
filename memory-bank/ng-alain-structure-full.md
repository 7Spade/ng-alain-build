# 📄 ng-alain 專案完整結構

> 包含完整的目錄和文件結構

**生成時間**: 2025-10-07

## 📊 統計資訊

- **目錄總數**: 350
- **文件總數**: 894

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
    ├── ng-antd-admin-ng17-mock/
    │   └── public/
    │       ├── data/
    │       │   ├── flare.json
    │       ├── imgs/
    │       │   ├── blingbling/
    │       │   │   ├── bling1.png
    │       │   │   ├── bling2.png
    │       │   ├── except/
    │       │   │   ├── net-error.svg
    │       │   │   ├── no-data.svg
    │       │   ├── login1/
    │       │   │   ├── login-box-bg.svg
    │       │   │   ├── login1-bg-dark.svg
    │       │   │   ├── login1-bg.svg
    │       │   │   ├── moon.svg
    │       │   │   ├── sun.svg
    │       │   ├── avatar2.jpg
    │       │   ├── default_face.png
    │       │   ├── login-bg.svg
    │       │   ├── logo-color.svg
    │       │   ├── logo.svg
    │       │   ├── menu-side.svg
    │       │   ├── menu-top.svg
    │       │   ├── theme-dark.svg
    │       │   ├── theme-light.svg
    │       │   ├── zorro.svg
    │       ├── favicon.ico
    │   └── src/
    │       └── app/
    │           ├── animations/
    │           │   ├── fade.animation.ts
    │           ├── config/
    │           │   ├── actionCode.ts
    │           │   ├── constant.ts
    │           ├── core/
    │           │   ├── services/
    │           │   │   ├── common/
    │           │   │   │   ├── guard/
    │           │   │   │   │   ├── judgeAuth.guard.ts
    │           │   │   │   │   ├── judgeLogin.guard.ts
    │           │   │   │   ├── custom-page-title-resolver.service.ts
    │           │   │   │   ├── driver.service.ts
    │           │   │   │   ├── init-theme.service.ts
    │           │   │   │   ├── lazy.service.ts
    │           │   │   │   ├── load-ali-icon-cdn.service.ts
    │           │   │   │   ├── login-in-out.service.ts
    │           │   │   │   ├── preloader.service.ts
    │           │   │   │   ├── reuse-strategy.ts
    │           │   │   │   ├── scroll.service.ts
    │           │   │   │   ├── selective-preloading-strategy.service.ts
    │           │   │   │   ├── sub-locked-status.service.ts
    │           │   │   │   ├── sub-window-with.service.ts
    │           │   │   │   ├── tab.service.ts
    │           │   │   │   ├── theme-skin.service.ts
    │           │   │   │   ├── water-mark.service.ts
    │           │   │   │   ├── window.service.ts
    │           │   │   ├── http/
    │           │   │   │   ├── download/
    │           │   │   │   │   ├── download.service.ts
    │           │   │   │   ├── example/
    │           │   │   │   │   ├── example.service.ts
    │           │   │   │   ├── login/
    │           │   │   │   │   ├── login.service.ts
    │           │   │   │   ├── system/
    │           │   │   │   │   ├── account.service.ts
    │           │   │   │   │   ├── dept.service.ts
    │           │   │   │   │   ├── menus.service.ts
    │           │   │   │   │   ├── role.service.ts
    │           │   │   │   ├── base-http.service.ts
    │           │   │   ├── interceptors/
    │           │   │   │   ├── http-interceptor.service.ts
    │           │   │   │   ├── index.ts
    │           │   │   │   ├── login-expired.service.ts
    │           │   │   ├── store/
    │           │   │   │   ├── biz-store-service/
    │           │   │   │   │   ├── search-list/
    │           │   │   │   │   │   └── search-list-store.service.ts
    │           │   │   │   ├── common-store/
    │           │   │   │   │   └── lock-screen-store.service.ts
    │           │   │   │   │   └── menu-store.service.ts
    │           │   │   │   │   └── modal-full-status-store.service.ts
    │           │   │   │   │   └── spin.service.ts
    │           │   │   │   │   └── split-nav-store.service.ts
    │           │   │   │   │   └── theme.service.ts
    │           │   │   │   │   └── userInfo.service.ts
    │           │   │   │   │   └── windows-width.service.ts
    │           │   │   ├── validators/
    │           │   │   │   ├── validators-rule.service.ts
    │           │   │   │   ├── validators.service.ts
    │           │   │   ├── types.ts
    │           │   ├── startup/
    │           │   │   └── startup.service.ts
    │           ├── drawer/
    │           │   ├── biz-drawer/
    │           │   │   ├── ex-drawer-drawer/
    │           │   │   │   └── ex-drawer-drawer.component.html
    │           │   │   │   └── ex-drawer-drawer.component.ts
    │           │   │   │   └── ex-drawer-drawer.service.ts
    │           │   ├── base-drawer.ts
    │           ├── layout/
    │           │   ├── blank/
    │           │   │   ├── blank-routing.ts
    │           │   │   ├── blank.component.ts
    │           │   ├── default/
    │           │   │   └── nav-bar/
    │           │   │       ├── nav-bar.component.html
    │           │   │       ├── nav-bar.component.ts
    │           │   │   └── nav-drawer/
    │           │   │       ├── nav-drawer.component.html
    │           │   │       ├── nav-drawer.component.less
    │           │   │       ├── nav-drawer.component.ts
    │           │   │   └── setting-drawer/
    │           │   │       ├── setting-drawer.component.html
    │           │   │       ├── setting-drawer.component.less
    │           │   │       ├── setting-drawer.component.ts
    │           │   │   └── side-nav/
    │           │   │       ├── side-nav.component.html
    │           │   │       ├── side-nav.component.less
    │           │   │       ├── side-nav.component.ts
    │           │   │   └── tab/
    │           │   │       ├── tab.component.html
    │           │   │       ├── tab.component.less
    │           │   │       ├── tab.component.ts
    │           │   │   └── tool-bar/
    │           │   │       ├── tool-bar.component.less
    │           │   │       ├── tool-bar.component.ts
    │           │   │   └── default-routing.ts
    │           │   │   └── default.component.html
    │           │   │   └── default.component.less
    │           │   │   └── default.component.ts
    │           ├── pages/
    │           │   ├── about/
    │           │   │   ├── about.component.html
    │           │   │   ├── about.component.ts
    │           │   ├── comp/
    │           │   │   ├── basic/
    │           │   │   │   ├── basic.component.html
    │           │   │   │   ├── basic.component.less
    │           │   │   │   ├── basic.component.ts
    │           │   │   ├── blingbling/
    │           │   │   │   ├── blingbling.component.html
    │           │   │   │   ├── blingbling.component.less
    │           │   │   │   ├── blingbling.component.ts
    │           │   │   ├── desc/
    │           │   │   │   ├── desc.component.html
    │           │   │   │   ├── desc.component.ts
    │           │   │   ├── form/
    │           │   │   │   ├── append-form/
    │           │   │   │   │   ├── append-form.component.html
    │           │   │   │   │   ├── append-form.component.less
    │           │   │   │   │   ├── append-form.component.ts
    │           │   │   │   ├── shrink-form/
    │           │   │   │   │   ├── shrink-form.component.html
    │           │   │   │   │   ├── shrink-form.component.ts
    │           │   │   │   ├── form-routing.ts
    │           │   │   ├── lazy/
    │           │   │   │   ├── lazy-basic/
    │           │   │   │   │   ├── lazy-basic.component.html
    │           │   │   │   │   ├── lazy-basic.component.less
    │           │   │   │   │   ├── lazy-basic.component.ts
    │           │   │   │   ├── lazy-scroll/
    │           │   │   │   │   ├── lazy-scroll.component.html
    │           │   │   │   │   ├── lazy-scroll.component.ts
    │           │   │   │   ├── lazy-targ-comp/
    │           │   │   │   │   ├── lazy-targ-comp.component.html
    │           │   │   │   │   ├── lazy-targ-comp.component.less
    │           │   │   │   │   ├── lazy-targ-comp.component.ts
    │           │   │   │   ├── lazy-routing.ts
    │           │   │   │   ├── lazy-service.service.ts
    │           │   │   ├── luckysheet/
    │           │   │   │   ├── luckysheet.component.html
    │           │   │   │   ├── luckysheet.component.less
    │           │   │   │   ├── luckysheet.component.ts
    │           │   │   ├── strength-meter/
    │           │   │   │   ├── strength-meter-routing.module.ts
    │           │   │   │   ├── strength-meter.component.html
    │           │   │   │   ├── strength-meter.component.ts
    │           │   │   ├── transition/
    │           │   │   │   ├── angular-img/
    │           │   │   │   │   ├── angular-img.component.html
    │           │   │   │   │   ├── angular-img.component.less
    │           │   │   │   │   ├── angular-img.component.ts
    │           │   │   │   ├── demo-dynamic-params/
    │           │   │   │   │   ├── demo-dynamic-params.component.html
    │           │   │   │   │   ├── demo-dynamic-params.component.ts
    │           │   │   │   ├── demo-main/
    │           │   │   │   │   ├── demo-main.component.html
    │           │   │   │   │   ├── demo-main.component.ts
    │           │   │   │   ├── demo-on-enter-on-leave/
    │           │   │   │   │   ├── demo-on-enter-on-leave.component.html
    │           │   │   │   │   ├── demo-on-enter-on-leave.component.ts
    │           │   │   │   ├── experiments/
    │           │   │   │   │   ├── experiments.component.html
    │           │   │   │   │   ├── experiments.component.less
    │           │   │   │   │   ├── experiments.component.ts
    │           │   │   │   ├── transition.component.html
    │           │   │   │   ├── transition.component.ts
    │           │   │   ├── comp-routing.ts
    │           │   ├── dashboard/
    │           │   │   ├── analysis/
    │           │   │   │   ├── analysis.component.html
    │           │   │   │   ├── analysis.component.less
    │           │   │   │   ├── analysis.component.ts
    │           │   │   ├── monitor/
    │           │   │   │   ├── monitor.component.html
    │           │   │   │   ├── monitor.component.less
    │           │   │   │   ├── monitor.component.ts
    │           │   │   ├── workbench/
    │           │   │   │   ├── workbench.component.html
    │           │   │   │   ├── workbench.component.less
    │           │   │   │   ├── workbench.component.ts
    │           │   │   ├── dashboard-routing.ts
    │           │   ├── empty/
    │           │   │   ├── empty.component.html
    │           │   │   ├── empty.component.ts
    │           │   ├── feat/
    │           │   │   ├── charts/
    │           │   │   │   ├── baidu-map/
    │           │   │   │   │   ├── baidu-map.component.html
    │           │   │   │   │   ├── baidu-map.component.ts
    │           │   │   │   ├── echarts/
    │           │   │   │   │   ├── advanced/
    │           │   │   │   │   │   ├── connect-charts/
    │           │   │   │   │   │   │   ├── connect-charts.component.ts
    │           │   │   │   │   │   ├── draggable-charts/
    │           │   │   │   │   │   │   ├── draggable-charts.component.ts
    │           │   │   │   │   │   ├── advanced.component.html
    │           │   │   │   │   │   ├── advanced.component.ts
    │           │   │   │   │   ├── series/
    │           │   │   │   │   │   ├── from-left-to-right/
    │           │   │   │   │   │   │   ├── from-left-to-right.component.ts
    │           │   │   │   │   │   ├── radial-tree/
    │           │   │   │   │   │   │   ├── radial-tree.component.ts
    │           │   │   │   │   │   ├── simple-graph/
    │           │   │   │   │   │   │   ├── simple-graph.component.ts
    │           │   │   │   │   │   ├── series.component.html
    │           │   │   │   │   │   ├── series.component.ts
    │           │   │   │   │   ├── started/
    │           │   │   │   │   │   ├── events-charts/
    │           │   │   │   │   │   │   ├── events-charts.component.ts
    │           │   │   │   │   │   ├── init-opts-charts/
    │           │   │   │   │   │   │   ├── init-opts-charts.component.ts
    │           │   │   │   │   │   ├── instance-opts-charts/
    │           │   │   │   │   │   │   ├── instance-opts-charts.component.ts
    │           │   │   │   │   │   ├── loading-charts/
    │           │   │   │   │   │   │   ├── loading-charts.component.ts
    │           │   │   │   │   │   ├── merge-charts/
    │           │   │   │   │   │   │   ├── merge-charts.component.ts
    │           │   │   │   │   │   ├── simple-chart/
    │           │   │   │   │   │   │   ├── simple-chart.component.ts
    │           │   │   │   │   │   ├── theme-charts/
    │           │   │   │   │   │   │   ├── data.ts
    │           │   │   │   │   │   │   ├── theme-charts.component.ts
    │           │   │   │   │   │   ├── started.component.html
    │           │   │   │   │   │   ├── started.component.ts
    │           │   │   │   │   ├── echarts.component.html
    │           │   │   │   │   ├── echarts.component.ts
    │           │   │   │   ├── gaode-map/
    │           │   │   │   │   ├── gaode-map.component.html
    │           │   │   │   │   ├── gaode-map.component.ts
    │           │   │   │   ├── charts-routing.ts
    │           │   │   ├── click-out-side/
    │           │   │   │   ├── click-out-side.component.html
    │           │   │   │   ├── click-out-side.component.less
    │           │   │   │   ├── click-out-side.component.ts
    │           │   │   ├── color-sel/
    │           │   │   │   ├── color-sel.component.html
    │           │   │   │   ├── color-sel.component.ts
    │           │   │   ├── context-menu/
    │           │   │   │   ├── context-menu.component.html
    │           │   │   │   ├── context-menu.component.ts
    │           │   │   ├── copy/
    │           │   │   │   ├── copy.component.html
    │           │   │   │   ├── copy.component.ts
    │           │   │   ├── download/
    │           │   │   │   ├── download.component.html
    │           │   │   │   ├── download.component.ts
    │           │   │   ├── ex-drawer/
    │           │   │   │   ├── ex-drawer.component.html
    │           │   │   │   ├── ex-drawer.component.ts
    │           │   │   ├── ex-modal/
    │           │   │   │   ├── ex-modal.component.html
    │           │   │   │   ├── ex-modal.component.ts
    │           │   │   ├── frame/
    │           │   │   │   ├── zorro-doc/
    │           │   │   │   │   ├── zorro-doc.component.html
    │           │   │   │   │   ├── zorro-doc.component.less
    │           │   │   │   │   ├── zorro-doc.component.ts
    │           │   │   │   ├── frame-routing.ts
    │           │   │   ├── full-screen/
    │           │   │   │   ├── full-screen.component.html
    │           │   │   │   ├── full-screen.component.ts
    │           │   │   ├── icons/
    │           │   │   │   ├── icons.component.html
    │           │   │   │   ├── icons.component.less
    │           │   │   │   ├── icons.component.ts
    │           │   │   ├── img-preview/
    │           │   │   │   ├── img-preview.component.html
    │           │   │   │   ├── img-preview.component.less
    │           │   │   │   ├── img-preview.component.ts
    │           │   │   ├── msg/
    │           │   │   │   ├── msg.component.html
    │           │   │   │   ├── msg.component.less
    │           │   │   │   ├── msg.component.ts
    │           │   │   ├── qrcode/
    │           │   │   │   ├── qrcode.component.html
    │           │   │   │   ├── qrcode.component.less
    │           │   │   │   ├── qrcode.component.ts
    │           │   │   ├── rich-text/
    │           │   │   │   ├── rich-text.component.html
    │           │   │   │   ├── rich-text.component.ts
    │           │   │   ├── ripple/
    │           │   │   │   ├── ripple.component.html
    │           │   │   │   ├── ripple.component.less
    │           │   │   │   ├── ripple.component.ts
    │           │   │   ├── scroll/
    │           │   │   │   ├── keep-scroll-page/
    │           │   │   │   │   ├── keep-scroll-page.component.html
    │           │   │   │   │   ├── keep-scroll-page.component.less
    │           │   │   │   │   ├── keep-scroll-page.component.ts
    │           │   │   │   ├── play-scroll/
    │           │   │   │   │   ├── play-scroll.component.html
    │           │   │   │   │   ├── play-scroll.component.less
    │           │   │   │   │   ├── play-scroll.component.ts
    │           │   │   │   ├── scroll-routing.module.ts
    │           │   │   ├── session-timeout/
    │           │   │   │   ├── session-timeout.component.html
    │           │   │   │   ├── session-timeout.component.ts
    │           │   │   ├── setup/
    │           │   │   │   ├── setup.component.html
    │           │   │   │   ├── setup.component.ts
    │           │   │   ├── tabs/
    │           │   │   │   ├── detail/
    │           │   │   │   │   ├── detail.component.html
    │           │   │   │   │   ├── detail.component.ts
    │           │   │   │   ├── tabs-routing.ts
    │           │   │   │   ├── tabs.component.html
    │           │   │   │   ├── tabs.component.ts
    │           │   │   ├── upload/
    │           │   │   │   ├── upload.component.html
    │           │   │   │   ├── upload.component.ts
    │           │   │   ├── water-mark/
    │           │   │   │   ├── water-mark.component.html
    │           │   │   │   ├── water-mark.component.less
    │           │   │   │   ├── water-mark.component.ts
    │           │   │   ├── websocket/
    │           │   │   │   ├── websocket.component.html
    │           │   │   │   ├── websocket.component.ts
    │           │   │   ├── feat-routing.module.ts
    │           │   ├── level/
    │           │   │   ├── menu1/
    │           │   │   │   ├── menu1-1/
    │           │   │   │   │   ├── menu1-1-1/
    │           │   │   │   │   │   ├── menu111.component.html
    │           │   │   │   │   │   ├── menu111.component.ts
    │           │   │   │   │   ├── menu1-1-2/
    │           │   │   │   │   │   ├── menu112.component.html
    │           │   │   │   │   │   ├── menu112.component.ts
    │           │   │   │   │   ├── menu1-1-routing.ts
    │           │   │   │   ├── menu1-2/
    │           │   │   │   │   ├── menu1-2.component.html
    │           │   │   │   │   ├── menu1-2.component.ts
    │           │   │   │   ├── menu1-routing.ts
    │           │   │   ├── menu2/
    │           │   │   │   ├── menu2.component.html
    │           │   │   │   ├── menu2.component.ts
    │           │   │   ├── level-routing.ts
    │           │   ├── login/
    │           │   │   ├── login-form/
    │           │   │   │   ├── login-form.component.html
    │           │   │   │   ├── login-form.component.less
    │           │   │   │   ├── login-form.component.ts
    │           │   │   ├── register-form/
    │           │   │   │   ├── register-form.component.html
    │           │   │   │   ├── register-form.component.less
    │           │   │   │   ├── register-form.component.ts
    │           │   │   ├── login-routing.ts
    │           │   │   ├── login.component.html
    │           │   │   ├── login.component.less
    │           │   │   ├── login.component.ts
    │           │   ├── no-content/
    │           │   │   ├── no-content.component.ts
    │           │   ├── page-demo/
    │           │   │   ├── detail/
    │           │   │   │   ├── adv-detail/
    │           │   │   │   │   ├── adv-detail.component.html
    │           │   │   │   │   ├── adv-detail.component.ts
    │           │   │   │   ├── base-detail/
    │           │   │   │   │   ├── base-detail.component.html
    │           │   │   │   │   ├── base-detail.component.ts
    │           │   │   │   ├── detail-routing.ts
    │           │   │   ├── except/
    │           │   │   │   ├── except403/
    │           │   │   │   │   ├── except403.component.ts
    │           │   │   │   ├── except404/
    │           │   │   │   │   ├── except404.component.ts
    │           │   │   │   ├── except500/
    │           │   │   │   │   ├── except500.component.ts
    │           │   │   │   ├── network-error/
    │           │   │   │   │   ├── network-error.component.html
    │           │   │   │   │   ├── network-error.component.ts
    │           │   │   │   ├── no-data/
    │           │   │   │   │   ├── no-data.component.html
    │           │   │   │   │   ├── no-data.component.ts
    │           │   │   │   ├── except-routing.ts
    │           │   │   ├── flow/
    │           │   │   │   ├── flow-chat/
    │           │   │   │   │   ├── flow-chat.component.html
    │           │   │   │   │   ├── flow-chat.component.less
    │           │   │   │   │   ├── flow-chat.component.ts
    │           │   │   │   ├── flow-routing.ts
    │           │   │   ├── form/
    │           │   │   │   ├── advanced/
    │           │   │   │   │   ├── task-manage-form/
    │           │   │   │   │   │   ├── task-manage-form.component.html
    │           │   │   │   │   │   ├── task-manage-form.component.less
    │           │   │   │   │   │   ├── task-manage-form.component.ts
    │           │   │   │   │   ├── user-member-manage/
    │           │   │   │   │   │   ├── user-member-manage.component.html
    │           │   │   │   │   │   ├── user-member-manage.component.ts
    │           │   │   │   │   ├── warehouse-manage-form/
    │           │   │   │   │   │   ├── warehouse-manage-form.component.html
    │           │   │   │   │   │   ├── warehouse-manage-form.component.less
    │           │   │   │   │   │   ├── warehouse-manage-form.component.ts
    │           │   │   │   │   ├── advanced.component.html
    │           │   │   │   │   ├── advanced.component.less
    │           │   │   │   │   ├── advanced.component.ts
    │           │   │   │   ├── base/
    │           │   │   │   │   ├── base.component.html
    │           │   │   │   │   ├── base.component.less
    │           │   │   │   │   ├── base.component.ts
    │           │   │   │   ├── step/
    │           │   │   │   │   ├── step-one/
    │           │   │   │   │   │   ├── step-one.component.html
    │           │   │   │   │   │   ├── step-one.component.less
    │           │   │   │   │   │   ├── step-one.component.ts
    │           │   │   │   │   ├── step-three/
    │           │   │   │   │   │   ├── step-three.component.html
    │           │   │   │   │   │   ├── step-three.component.less
    │           │   │   │   │   │   ├── step-three.component.ts
    │           │   │   │   │   ├── step-two/
    │           │   │   │   │   │   ├── step-two.component.html
    │           │   │   │   │   │   ├── step-two.component.less
    │           │   │   │   │   │   ├── step-two.component.ts
    │           │   │   │   │   ├── step.component.html
    │           │   │   │   │   ├── step.component.less
    │           │   │   │   │   ├── step.component.ts
    │           │   │   │   ├── form-routing.ts
    │           │   │   ├── list/
    │           │   │   │   ├── card-table/
    │           │   │   │   │   ├── card-table.component.html
    │           │   │   │   │   ├── card-table.component.less
    │           │   │   │   │   ├── card-table.component.ts
    │           │   │   │   ├── search-list/
    │           │   │   │   │   ├── application/
    │           │   │   │   │   │   ├── application.component.html
    │           │   │   │   │   │   ├── application.component.less
    │           │   │   │   │   │   ├── application.component.ts
    │           │   │   │   │   ├── article/
    │           │   │   │   │   │   ├── article.component.html
    │           │   │   │   │   │   ├── article.component.less
    │           │   │   │   │   │   ├── article.component.ts
    │           │   │   │   │   ├── project/
    │           │   │   │   │   │   ├── project.component.html
    │           │   │   │   │   │   ├── project.component.less
    │           │   │   │   │   │   ├── project.component.ts
    │           │   │   │   │   ├── search-list-routing.ts
    │           │   │   │   │   ├── search-list.component.html
    │           │   │   │   │   ├── search-list.component.ts
    │           │   │   │   ├── search-table/
    │           │   │   │   │   ├── search-table-detail/
    │           │   │   │   │   │   ├── search-table-detail.component.html
    │           │   │   │   │   │   ├── search-table-detail.component.ts
    │           │   │   │   │   ├── search-table-routing.ts
    │           │   │   │   │   ├── search-table.component.html
    │           │   │   │   │   ├── search-table.component.ts
    │           │   │   │   ├── standard-table/
    │           │   │   │   │   ├── standard-table.component.html
    │           │   │   │   │   ├── standard-table.component.less
    │           │   │   │   │   ├── standard-table.component.ts
    │           │   │   │   ├── tree-list/
    │           │   │   │   │   ├── tree-list.component.html
    │           │   │   │   │   ├── tree-list.component.ts
    │           │   │   │   ├── list-routing.module.ts
    │           │   │   ├── new-page-layout/
    │           │   │   │   ├── new-page-layout.component.html
    │           │   │   │   ├── new-page-layout.component.ts
    │           │   │   ├── personal/
    │           │   │   │   ├── personal-center/
    │           │   │   │   │   ├── application/
    │           │   │   │   │   │   ├── application.component.html
    │           │   │   │   │   │   ├── application.component.less
    │           │   │   │   │   │   ├── application.component.ts
    │           │   │   │   │   ├── article/
    │           │   │   │   │   │   ├── article.component.html
    │           │   │   │   │   │   ├── article.component.less
    │           │   │   │   │   │   ├── article.component.ts
    │           │   │   │   │   ├── projects/
    │           │   │   │   │   │   ├── projects.component.html
    │           │   │   │   │   │   ├── projects.component.less
    │           │   │   │   │   │   ├── projects.component.ts
    │           │   │   │   │   ├── personal-center.component.html
    │           │   │   │   │   ├── personal-center.component.less
    │           │   │   │   │   ├── personal-center.component.ts
    │           │   │   │   ├── personal-setting/
    │           │   │   │   │   ├── base/
    │           │   │   │   │   │   ├── base.component.html
    │           │   │   │   │   │   ├── base.component.less
    │           │   │   │   │   │   ├── base.component.ts
    │           │   │   │   │   ├── bind/
    │           │   │   │   │   │   ├── bind.component.html
    │           │   │   │   │   │   ├── bind.component.less
    │           │   │   │   │   │   ├── bind.component.ts
    │           │   │   │   │   ├── notice/
    │           │   │   │   │   │   ├── notice.component.html
    │           │   │   │   │   │   ├── notice.component.ts
    │           │   │   │   │   ├── safe/
    │           │   │   │   │   │   ├── safe.component.html
    │           │   │   │   │   │   ├── safe.component.ts
    │           │   │   │   │   ├── personal-setting.component.html
    │           │   │   │   │   ├── personal-setting.component.less
    │           │   │   │   │   ├── personal-setting.component.ts
    │           │   │   │   ├── personal-routing.ts
    │           │   │   ├── result/
    │           │   │   │   ├── fail/
    │           │   │   │   │   ├── fail.component.html
    │           │   │   │   │   ├── fail.component.ts
    │           │   │   │   ├── success/
    │           │   │   │   │   ├── success.component.html
    │           │   │   │   │   ├── success.component.ts
    │           │   │   │   ├── result-routing.ts
    │           │   │   ├── task/
    │           │   │   │   ├── task-list-panel/
    │           │   │   │   │   ├── task-list-panel.component.html
    │           │   │   │   │   ├── task-list-panel.component.less
    │           │   │   │   │   ├── task-list-panel.component.ts
    │           │   │   │   ├── task-search-info/
    │           │   │   │   │   ├── task-search-filters/
    │           │   │   │   │   │   ├── task-search-filters.component.html
    │           │   │   │   │   │   ├── task-search-filters.component.less
    │           │   │   │   │   │   ├── task-search-filters.component.ts
    │           │   │   │   │   ├── user-info/
    │           │   │   │   │   │   ├── user-info.component.html
    │           │   │   │   │   │   ├── user-info.component.less
    │           │   │   │   │   │   ├── user-info.component.ts
    │           │   │   │   │   ├── task-search-info.component.html
    │           │   │   │   │   ├── task-search-info.component.less
    │           │   │   │   │   ├── task-search-info.component.ts
    │           │   │   │   ├── task.component.html
    │           │   │   │   ├── task.component.less
    │           │   │   │   ├── task.component.ts
    │           │   │   ├── page-demo-routing.ts
    │           │   ├── system/
    │           │   │   └── account/
    │           │   │       ├── dept-tree/
    │           │   │       │   ├── dept-tree-search.service.ts
    │           │   │       │   ├── dept-tree.component.html
    │           │   │       │   ├── dept-tree.component.less
    │           │   │       │   ├── dept-tree.component.ts
    │           │   │       │   ├── dept-tree.service.ts
    │           │   │       │   ├── filtered-tree-result.ts
    │           │   │       ├── account.component.html
    │           │   │       ├── account.component.ts
    │           │   │   └── dept/
    │           │   │       ├── dept.component.html
    │           │   │       ├── dept.component.ts
    │           │   │   └── menu/
    │           │   │       ├── menu.component.html
    │           │   │       ├── menu.component.ts
    │           │   │   └── role-manager/
    │           │   │       ├── set-role/
    │           │   │       │   ├── set-role.component.html
    │           │   │       │   ├── set-role.component.less
    │           │   │       │   ├── set-role.component.ts
    │           │   │       ├── role-manage-routing.ts
    │           │   │       ├── role-manage.component.html
    │           │   │       ├── role-manage.component.ts
    │           │   │   └── system-routing.ts
    │           ├── shared/
    │           │   ├── biz-components/
    │           │   │   ├── icon-sel/
    │           │   │   │   ├── icon-sel.component.html
    │           │   │   │   ├── icon-sel.component.ts
    │           │   │   │   ├── zorro-icons.ts
    │           │   │   ├── layout-components/
    │           │   │   │   ├── home-notice/
    │           │   │   │   │   ├── home-notice.component.html
    │           │   │   │   │   ├── home-notice.component.less
    │           │   │   │   │   ├── home-notice.component.ts
    │           │   │   │   ├── layout-head-right-menu/
    │           │   │   │   │   └── layout-head-right-menu.component.html
    │           │   │   │   │   └── layout-head-right-menu.component.less
    │           │   │   │   │   └── layout-head-right-menu.component.ts
    │           │   │   ├── password-strength-meter/
    │           │   │   │   └── password-strength-meter.component.html
    │           │   │   │   └── password-strength-meter.component.less
    │           │   │   │   └── password-strength-meter.component.ts
    │           │   │   │   └── password-strength-meter.service.ts
    │           │   │   │   └── password-strength-meter.types.ts
    │           │   │   │   └── psm-progress-bar.directive.ts
    │           │   ├── components/
    │           │   │   ├── ant-table/
    │           │   │   │   ├── ant-table.component.html
    │           │   │   │   ├── ant-table.component.less
    │           │   │   │   ├── ant-table.component.ts
    │           │   │   │   ├── context-pipe.pipe.ts
    │           │   │   ├── card-table-wrap/
    │           │   │   │   ├── card-table-wrap.component.html
    │           │   │   │   ├── card-table-wrap.component.ts
    │           │   │   ├── chat/
    │           │   │   │   ├── chat.component.html
    │           │   │   │   ├── chat.component.less
    │           │   │   │   ├── chat.component.ts
    │           │   │   ├── empty-for-lock/
    │           │   │   │   ├── empty-for-lock.component.ts
    │           │   │   ├── footer-submit/
    │           │   │   │   ├── footer-submit.component.html
    │           │   │   │   ├── footer-submit.component.less
    │           │   │   │   ├── footer-submit.component.ts
    │           │   │   ├── global-loading/
    │           │   │   │   ├── global-loading.component.ts
    │           │   │   ├── lock-screen/
    │           │   │   │   ├── lock-screen.component.html
    │           │   │   │   ├── lock-screen.component.less
    │           │   │   │   ├── lock-screen.component.ts
    │           │   │   ├── page-header/
    │           │   │   │   ├── page-header.component.html
    │           │   │   │   ├── page-header.component.less
    │           │   │   │   ├── page-header.component.ts
    │           │   │   ├── top-progress-bar/
    │           │   │   │   ├── top-progress-bar.component.html
    │           │   │   │   ├── top-progress-bar.component.less
    │           │   │   │   ├── top-progress-bar.component.ts
    │           │   │   ├── tree-table/
    │           │   │   │   ├── tree-table.component.html
    │           │   │   │   ├── tree-table.component.less
    │           │   │   │   ├── tree-table.component.ts
    │           │   │   ├── water-mark/
    │           │   │   │   └── water-mark.component.html
    │           │   │   │   └── water-mark.component.less
    │           │   │   │   └── water-mark.component.ts
    │           │   ├── directives/
    │           │   │   ├── ad.directive.ts
    │           │   │   ├── auth.directive.ts
    │           │   │   ├── debounceClick.directive.ts
    │           │   │   ├── disabled.directive.ts
    │           │   │   ├── mouse-hover-show.directive.ts
    │           │   │   ├── named-template.ts
    │           │   │   ├── screen-less-hidden.directive.ts
    │           │   │   ├── toggle-fullscreen.directive.ts
    │           │   │   ├── view-outlet.directive.ts
    │           │   ├── pipes/
    │           │   │   └── chang-number-to-chinese.pipe.ts
    │           │   │   └── html.pipe.ts
    │           │   │   └── map.pipe.ts
    │           │   │   └── number-loop.pipe.ts
    │           │   │   └── table-filed.pipe.ts
    │           ├── tpl/
    │           │   ├── global-drawer-foot-tpl/
    │           │   │   ├── global-drawer-foot-tpl-token.ts
    │           │   │   ├── global-drawer-foot-tpl.component.html
    │           │   │   ├── global-drawer-foot-tpl.component.ts
    │           │   ├── global-modal-btn-tpl/
    │           │   │   └── global-modal-btn-tpl-token.ts
    │           │   │   └── global-modal-btn-tpl.component.html
    │           │   │   └── global-modal-btn-tpl.component.ts
    │           ├── utils/
    │           │   ├── validate/
    │           │   │   ├── validate.ts
    │           │   │   ├── validators.ts
    │           │   ├── camelFn.ts
    │           │   ├── errors.ts
    │           │   ├── tools.ts
    │           │   ├── treeTableTools.ts
    │           ├── widget/
    │           │   ├── biz-widget/
    │           │   │   ├── change-password/
    │           │   │   │   ├── change-password.component.html
    │           │   │   │   ├── change-password.component.ts
    │           │   │   │   ├── change-password.service.ts
    │           │   │   ├── drag/
    │           │   │   │   ├── drag.component.html
    │           │   │   │   ├── drag.component.ts
    │           │   │   │   ├── drag.service.ts
    │           │   │   ├── form/
    │           │   │   │   ├── append-form-modal/
    │           │   │   │   │   └── append-form-modal.component.html
    │           │   │   │   │   └── append-form-modal.component.ts
    │           │   │   │   │   └── append-form-modal.service.ts
    │           │   │   ├── login/
    │           │   │   │   ├── login-modal.component.html
    │           │   │   │   ├── login-modal.component.ts
    │           │   │   │   ├── login-modal.service.ts
    │           │   │   ├── system/
    │           │   │   │   └── account-modal/
    │           │   │   │       ├── account-modal.component.html
    │           │   │   │       ├── account-modal.component.ts
    │           │   │   │       ├── account-modal.service.ts
    │           │   │   │   └── dept-manage-modal/
    │           │   │   │       ├── dept-manage-modal.component.html
    │           │   │   │       ├── dept-manage-modal.component.ts
    │           │   │   │       ├── dept-manage-modal.service.ts
    │           │   │   │   └── menu-modal/
    │           │   │   │       ├── menu-modal.component.html
    │           │   │   │       ├── menu-modal.component.ts
    │           │   │   │       ├── menu-modal.service.ts
    │           │   │   │   └── role-manage-modal/
    │           │   │   │       └── role-manage-modal.component.html
    │           │   │   │       └── role-manage-modal.component.ts
    │           │   │   │       └── role-manage-modal.service.ts
    │           │   ├── common-widget/
    │           │   │   ├── lock-widget/
    │           │   │   │   ├── lock-widget.component.html
    │           │   │   │   ├── lock-widget.component.less
    │           │   │   │   ├── lock-widget.component.ts
    │           │   │   │   ├── lock-widget.service.ts
    │           │   │   ├── search-route/
    │           │   │   │   └── search-route.component.html
    │           │   │   │   └── search-route.component.less
    │           │   │   │   └── search-route.component.ts
    │           │   │   │   └── search-route.service.ts
    │           │   ├── modal/
    │           │   │   ├── modal-drag.directive.ts
    │           │   │   ├── modal-drag.service.ts
    │           │   │   ├── nz-modal-wrap.service.ts
    │           │   ├── base-modal.ts
    │           ├── app-routing.ts
    │           ├── app.component.ts
    │           ├── app.config.ts
    │       └── environments/
    │           ├── environment.prod.ts
    │           ├── environment.ts
    │       └── mocks/
    │           ├── business/
    │           │   ├── department.ts
    │           │   ├── login.ts
    │           │   ├── menu.ts
    │           │   ├── other.ts
    │           │   ├── role.ts
    │           │   ├── user.ts
    │           ├── browser.ts
    │           ├── handlers.ts
    │           ├── node.ts
    │       └── styles/
    │           ├── themes/
    │           │   ├── admin-variable.less
    │           │   ├── aliyun.less
    │           │   ├── base.less
    │           │   ├── compact.less
    │           │   ├── dark.less
    │           │   ├── default.less
    │           │   ├── minireset.less
    │           │   ├── mixin.less
    │           ├── aliyun.less
    │           ├── compact.less
    │           ├── dark.less
    │           ├── default.less
    │       └── favicon.ico
    │       └── index.html
    │       └── main.ts
    │       └── mockServiceWorker.js
└── memory-bank/
    ├── active-context/
    │   ├── changes/
    │   │   ├── cursor-rules-optimization-2025-10-07.md
    │   │   ├── folder-structure-refactoring-2025-10-07.md
    │   │   ├── recentChanges.md
    │   ├── context/
    │   │   ├── currentFocus.md
    │   │   ├── enhancement-opportunities.md
    │   │   ├── implementation-plan.md
    │   │   ├── ng-antd-admin-analysis-summary.md
    │   │   ├── refactoring-summary.md
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
    │   │   ├── index.ts
    │   │   ├── README.md
    │   ├── routes/
    │   │   ├── routes.ts
    │   ├── shared/
    │   │   ├── components/
    │   │   │   ├── cell-widget/
    │   │   │   │   ├── index.ts
    │   │   │   ├── st-widget/
    │   │   │   │   └── index.ts
    │   │   │   │   └── README.md
    │   │   ├── json-schema/
    │   │   │   ├── test/
    │   │   │   │   ├── test.widget.ts
    │   │   │   ├── index.ts
    │   │   │   ├── README.md
    │   │   ├── utils/
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
    │   │   │   ├── avatar.jpg
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
