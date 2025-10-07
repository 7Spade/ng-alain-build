import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { LayoutBasicComponent, LayoutBlankComponent } from './layout';

export const routes: Routes = [
  // Landing page (public access)
  {
    path: '',
    redirectTo: '/auth/landing',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      // Features - 業務功能模組
      { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/routes').then(m => m.routes),
        data: { title: '儀表板' }
      },
      {
        path: 'organization',
        loadChildren: () => import('./features/organization/routes').then(m => m.routes),
        data: { title: '組織管理' }
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/routes').then(m => m.routes),
        data: { title: '專案' }
      },
      // Examples - 示範代碼
      {
        path: 'examples/widgets',
        loadChildren: () => import('./examples/widgets-showcase/routes').then(m => m.routes),
        data: { title: '小工具展示' }
      },
      { 
        path: 'examples/style', 
        loadChildren: () => import('./examples/style-guide/routes').then(m => m.routes),
        data: { title: '樣式指南' }
      },
      { 
        path: 'examples/delon', 
        loadChildren: () => import('./examples/delon-features/routes').then(m => m.routes),
        data: { title: 'Delon 功能示範' }
      },
      { 
        path: 'examples/pro', 
        loadChildren: () => import('./examples/pro-templates/routes').then(m => m.routes),
        data: { title: 'Pro 模板' }
      },
      // System - 系統頁面
      { 
        path: 'system/extras', 
        loadChildren: () => import('./system/extras/routes').then(m => m.routes),
        data: { title: '其他功能' }
      },
      // Settings - 設定頁面
      {
        path: 'settings/organizations',
        loadComponent: () => import('./features/organization/components/organization-settings').then(m => m.OrganizationSettingsComponent),
        data: { title: '組織管理' }
      }
    ]
  },
  // Blank Layout 空白布局
  {
    path: 'data-v',
    component: LayoutBlankComponent,
    children: [{ 
      path: '', 
      loadChildren: () => import('./system/data-visualization/routes').then(m => m.routes),
      data: { title: '數據可視化' }
    }]
  },
  // Auth - 認證頁面
  { path: '', loadChildren: () => import('./auth/routes').then(m => m.routes) },
  // Exception - 異常頁面
  { path: 'exception', loadChildren: () => import('./system/exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];

