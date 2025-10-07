import { Routes } from '@angular/router';

import { DashboardAnalysisComponent } from './dashboard-analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard-monitor/monitor.component';
import { DashboardV1Component } from './dashboard-v1/v1.component';
import { DashboardWorkplaceComponent } from './dashboard-workplace/workplace.component';

export const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  { path: 'v1', component: DashboardV1Component },
  { path: 'analysis', component: DashboardAnalysisComponent },
  { path: 'monitor', component: DashboardMonitorComponent },
  { path: 'workplace', component: DashboardWorkplaceComponent }
];
