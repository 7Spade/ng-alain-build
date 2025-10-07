/**
 * 組織管理權限守衛
 * @description 檢查用戶是否有訪問組織管理功能的權限
 */

import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * 組織管理權限守衛
 * @description 檢查用戶是否有訪問組織管理功能的權限
 */
export const organizationGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  // 從路由資料中獲取所需權限
  const requiredPermissions = route.data?.['permissions'] as string[];
  
  // 如果沒有指定權限要求，則允許訪問
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  
  // 檢查權限
  return aclService.canAbility(requiredPermissions).pipe(
    map(hasPermission => {
      if (!hasPermission) {
        notification.error(
          '權限不足',
          '您沒有訪問此頁面的權限，請聯繫管理員'
        );
        router.navigate(['/403']);
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('權限驗證失敗', err);
      notification.error('錯誤', '權限驗證失敗，請稍後再試');
      router.navigate(['/error']);
      return of(false);
    })
  );
};

/**
 * 組織編輯權限守衛
 * @description 檢查用戶是否有編輯組織的權限
 */
export const organizationEditGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const notification = inject(NzNotificationService);
  
  return aclService.can('organization.edit').pipe(
    map(canEdit => {
      if (!canEdit) {
        notification.warning('權限不足', '您沒有編輯組織的權限');
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('權限驗證失敗', err);
      return of(false);
    })
  );
};

/**
 * 部門管理權限守衛
 * @description 檢查用戶是否有管理部門的權限
 */
export const departmentManageGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const notification = inject(NzNotificationService);
  
  return aclService.can('department.manage').pipe(
    map(canManage => {
      if (!canManage) {
        notification.warning('權限不足', '您沒有管理部門的權限');
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('權限驗證失敗', err);
      return of(false);
    })
  );
};

/**
 * 員工管理權限守衛
 * @description 檢查用戶是否有管理員工的權限
 */
export const employeeManageGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const notification = inject(NzNotificationService);
  
  return aclService.can('employee.manage').pipe(
    map(canManage => {
      if (!canManage) {
        notification.warning('權限不足', '您沒有管理員工的權限');
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('權限驗證失敗', err);
      return of(false);
    })
  );
};

/**
 * 角色管理權限守衛
 * @description 檢查用戶是否有管理角色的權限
 */
export const roleManageGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ACLService);
  const notification = inject(NzNotificationService);
  
  return aclService.can('role.manage').pipe(
    map(canManage => {
      if (!canManage) {
        notification.warning('權限不足', '您沒有管理角色的權限');
        return false;
      }
      return true;
    }),
    catchError(err => {
      console.error('權限驗證失敗', err);
      return of(false);
    })
  );
};

