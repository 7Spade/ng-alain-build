import { Routes } from '@angular/router';

import { DashboardAnalysisComponent } from './dashboard-analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard-monitor/monitor.component';
import { DashboardV1Component } from './dashboard-v1/v1.component';
import { DashboardWorkplaceComponent } from './dashboard-workplace/workplace.component';

export const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  {
    path: 'v1',
    component: DashboardV1Component,
    data: {
      title: '儀表板 V1',
      titleI18n: 'dashboard.v1',
      key: 'dashboard-v1'
    }
  },
  {
    path: 'analysis',
    component: DashboardAnalysisComponent,
    data: {
      title: '分析頁',
      titleI18n: 'dashboard.analysis',
      key: 'dashboard-analysis'
    }
  },
  {
    path: 'monitor',
    component: DashboardMonitorComponent,
    data: {
      title: '監控頁',
      titleI18n: 'dashboard.monitor',
      key: 'dashboard-monitor'
    }
  },
  {
    path: 'workplace',
    component: DashboardWorkplaceComponent,
    data: {
      title: '工作台',
      titleI18n: 'dashboard.workplace',
      key: 'dashboard-workplace'
    }
  }
];
