/**
 * 組織管理權限守衛
 *
 * @description 檢查用戶是否有訪問組織管理功能的權限
 */

import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { NzNotificationService } from 'ng-zorro-antd/notification';

/**
 * 組織管理權限守衛
 *
 * @description 檢查用戶是否有訪問組織管理功能的權限
 */
export const organizationGuard: CanActivateFn = (route, state) => {
  // 暫時允許所有訪問，等待實際權限配置
  // TODO: 配置 ACL 權限後啟用
  return true;

  /*
  const aclService = inject(ACLService);
  const router = inject(Router);
  const notification = inject(NzNotificationService);
  
  // 檢查權限
  const hasPermission = aclService.can('organization.view');
  
  if (!hasPermission) {
    notification.error(
      '權限不足',
      '您沒有訪問此頁面的權限，請聯繫管理員'
    );
    router.navigate(['/exception/403']);
    return false;
  }
  
  return true;
  */
};

/**
 * 組織編輯權限守衛
 *
 * @description 檢查用戶是否有編輯組織的權限
 */
export const organizationEditGuard: CanActivateFn = (route, state) => {
  // 暫時允許所有訪問
  // TODO: 配置 ACL 權限後啟用
  return true;
};

/**
 * 部門管理權限守衛
 *
 * @description 檢查用戶是否有管理部門的權限
 */
export const departmentManageGuard: CanActivateFn = (route, state) => {
  // 暫時允許所有訪問
  // TODO: 配置 ACL 權限後啟用
  return true;
};

/**
 * 員工管理權限守衛
 *
 * @description 檢查用戶是否有管理員工的權限
 */
export const employeeManageGuard: CanActivateFn = (route, state) => {
  // 暫時允許所有訪問
  // TODO: 配置 ACL 權限後啟用
  return true;
};

/**
 * 角色管理權限守衛
 *
 * @description 檢查用戶是否有管理角色的權限
 */
export const roleManageGuard: CanActivateFn = (route, state) => {
  // 暫時允許所有訪問
  // TODO: 配置 ACL 權限後啟用
  return true;
};
