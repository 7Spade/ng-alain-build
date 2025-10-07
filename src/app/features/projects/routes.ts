/**
 * 專案功能模組路由
 *
 * @description 專案列表、專案詳情（總覽、檔案、成員、設定）
 */

import { Routes } from '@angular/router';

import { projectAccessGuard, projectAdminGuard } from './guards/project-access.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      // 專案列表（個人/組織通用）
      {
        path: '',
        loadComponent: () => import('./components/project-list').then(m => m.ProjectListComponent),
        data: {
          title: '我的專案',
          titleI18n: 'project.list',
          key: 'project-list'
        }
      },

      // 新建專案（暫時重定向到列表，稍後實現 Modal）
      {
        path: 'new',
        redirectTo: '',
        pathMatch: 'full'
      },

      // 專案詳情（Tab 系統）
      {
        path: ':id',
        loadComponent: () => import('./components/project-overview').then(m => m.ProjectOverviewComponent),
        canActivate: [projectAccessGuard],
        data: {
          title: '專案總覽',
          titleI18n: 'project.overview',
          key: 'project-detail'
        },
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            loadComponent: () => import('./components/project-dashboard').then(m => m.ProjectDashboardComponent),
            data: {
              title: '總覽',
              titleI18n: 'project.dashboard'
            }
          },
          {
            path: 'files',
            loadComponent: () => import('./components/project-files').then(m => m.ProjectFilesComponent),
            data: {
              title: '檔案空間',
              titleI18n: 'project.files'
            }
          },
          {
            path: 'files/:path',
            loadComponent: () => import('./components/project-files').then(m => m.ProjectFilesComponent),
            data: {
              title: '檔案空間',
              titleI18n: 'project.files'
            }
          },
          {
            path: 'members',
            loadComponent: () => import('./components/member-list').then(m => m.MemberListComponent),
            data: {
              title: '成員',
              titleI18n: 'project.members'
            }
          },
          {
            path: 'settings',
            loadComponent: () => import('./components/project-settings').then(m => m.ProjectSettingsComponent),
            canActivate: [projectAdminGuard],
            data: {
              title: '設定',
              titleI18n: 'project.settings'
            }
          }
        ]
      }
    ]
  }
];
