/**
 * 組織管理模組路由配置
 * @description 定義組織管理相關的所有路由
 */

import type { Routes } from '@angular/router';
import { authSimpleCanActivate } from '@delon/auth';
import { organizationGuard } from './guards/organization.guard';

/**
 * 組織管理模組路由
 */
export const routes: Routes = [
  {
    path: '',
    canActivate: [authSimpleCanActivate],
    children: [
      // TODO: 組織管理組件尚未實現，暫時註釋所有路由
      // 待組件開發完成後再啟用以下路由配置
      
      /*
      // 重定向到組織架構頁面
      {
        path: '',
        redirectTo: 'structure',
        pathMatch: 'full'
      },
      
      // 組織架構樹
      {
        path: 'structure',
        loadComponent: () => 
          import('./components/organization-tree/organization-tree.component')
            .then(m => m.OrganizationTreeComponent),
        data: {
          title: '組織架構',
          titleI18n: 'organization.structure',
          permissions: ['organization.view']
        },
        canActivate: [organizationGuard]
      },
      
      // 部門管理
      {
        path: 'departments',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/department-list/department-list.component')
                .then(m => m.DepartmentListComponent),
            data: {
              title: '部門列表',
              titleI18n: 'organization.departments',
              permissions: ['department.view']
            },
            canActivate: [organizationGuard]
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/department-detail/department-detail.component')
                .then(m => m.DepartmentDetailComponent),
            data: {
              title: '部門詳情',
              titleI18n: 'organization.department-detail',
              permissions: ['department.view']
            },
            canActivate: [organizationGuard]
          }
        ]
      },
      
      // 員工管理
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/employee-list/employee-list.component')
                .then(m => m.EmployeeListComponent),
            data: {
              title: '員工列表',
              titleI18n: 'organization.employees',
              permissions: ['employee.view']
            },
            canActivate: [organizationGuard]
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/employee-detail/employee-detail.component')
                .then(m => m.EmployeeDetailComponent),
            data: {
              title: '員工詳情',
              titleI18n: 'organization.employee-detail',
              permissions: ['employee.view']
            },
            canActivate: [organizationGuard]
          }
        ]
      },
      
      // 角色管理
      {
        path: 'roles',
        loadComponent: () =>
          import('./components/role-management/role-management.component')
            .then(m => m.RoleManagementComponent),
        data: {
          title: '角色管理',
          titleI18n: 'organization.roles',
          permissions: ['role.manage']
        },
        canActivate: [organizationGuard]
      },
      */
    ]
  }
];

