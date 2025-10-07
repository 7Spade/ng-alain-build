/**
 * 組織管理模組路由配置
 *
 * @description 定義組織管理相關的所有路由
 */

import type { Routes } from '@angular/router';
import { authSimpleCanActivate } from '@delon/auth';

import { organizationGuard, departmentManageGuard, employeeManageGuard, roleManageGuard } from './guards/organization.guard';

/**
 * 組織管理模組路由
 */
export const routes: Routes = [
  {
    path: '',
    canActivate: [authSimpleCanActivate],
    children: [
      // 重定向到部門管理
      {
        path: '',
        redirectTo: 'departments',
        pathMatch: 'full'
      },

      // ✅ 部門管理（已實現）
      {
        path: 'departments',
        loadComponent: () => import('./components/department-list/department-list.component').then(m => m.DepartmentListComponent),
        data: {
          title: '部門管理',
          titleI18n: 'organization.departments',
          key: 'department-list'
        },
        canActivate: [departmentManageGuard]
      },

      // ✅ 員工管理（已實現）
      {
        path: 'employees',
        loadComponent: () => import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
        data: {
          title: '員工管理',
          titleI18n: 'organization.employees',
          key: 'employee-list'
        },
        canActivate: [employeeManageGuard]
      },

      // ✅ 角色管理（已實現）
      {
        path: 'roles',
        loadComponent: () => import('./components/role-management/role-management.component').then(m => m.RoleManagementComponent),
        data: {
          title: '角色管理',
          titleI18n: 'organization.roles',
          key: 'role-management'
        },
        canActivate: [roleManageGuard]
      }

      // TODO: 以下組件待實現
      /*
      // 組織架構樹
      {
        path: 'tree',
        loadComponent: () => 
          import('./components/organization-tree/organization-tree.component')
            .then(m => m.OrganizationTreeComponent),
        data: {
          title: '組織架構',
          titleI18n: 'organization.tree',
          key: 'organization-tree'
        },
        canActivate: [organizationGuard]
      },
      
      // 部門詳情
      {
        path: 'departments/:id',
        loadComponent: () =>
          import('./components/department-detail/department-detail.component')
            .then(m => m.DepartmentDetailComponent),
        data: {
          title: '部門詳情',
          titleI18n: 'organization.department-detail',
          key: 'department-detail'
        },
        canActivate: [departmentManageGuard]
      },
      
      // 員工詳情
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./components/employee-detail/employee-detail.component')
            .then(m => m.EmployeeDetailComponent),
        data: {
          title: '員工詳情',
          titleI18n: 'organization.employee-detail',
          key: 'employee-detail'
        },
        canActivate: [employeeManageGuard]
      }
      */
    ]
  }
];
