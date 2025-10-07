/**
 * 專案訪問守衛
 * @description 檢查用戶是否有權限訪問專案
 */

import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { ACLService } from '@delon/acl';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService } from '../services';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * 專案訪問守衛
 * @description 檢查用戶是否有權限訪問專案
 */
export const projectAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const message = inject(NzMessageService);
  const projectService = inject(ProjectService);
  const projectId = route.params['id'];
  
  if (!projectId) {
    message.error('專案 ID 不存在');
    router.navigate(['/projects']);
    return false;
  }
  
  // 檢查專案是否存在及用戶是否有訪問權限
  return projectService.getProject(projectId).pipe(
    map(project => {
      if (!project) {
        message.error('專案不存在');
        router.navigate(['/projects']);
        return false;
      }
      return true;
    }),
    catchError(error => {
      console.error('專案訪問檢查失敗', error);
      if (error.status === 403) {
        message.error('您沒有權限訪問此專案');
        router.navigate(['/exception/403']);
      } else if (error.status === 404) {
        message.error('專案不存在');
        router.navigate(['/exception/404']);
      } else {
        message.error('載入專案失敗');
        router.navigate(['/projects']);
      }
      return of(false);
    })
  );
};

/**
 * 專案管理員權限守衛
 * @description 檢查用戶是否為專案管理員（owner 或 admin）
 */
export const projectAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const aclService = inject(ACLService);
  const router = inject(Router);
  const message = inject(NzMessageService);
  
  // 檢查 ACL 權限
  const hasPermission = aclService.can('project.settings');
  
  if (!hasPermission) {
    message.warning('您沒有權限訪問專案設定');
    const projectId = route.params['id'];
    if (projectId) {
      router.navigate([`/projects/${projectId}/overview`]);
    } else {
      router.navigate(['/projects']);
    }
    return false;
  }
  
  return true;
};

/**
 * 專案擁有者權限守衛
 * @description 檢查用戶是否為專案擁有者
 */
export const projectOwnerGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const aclService = inject(ACLService);
  const router = inject(Router);
  const message = inject(NzMessageService);
  
  // 檢查 ACL 權限
  const hasPermission = aclService.can('project.delete');
  
  if (!hasPermission) {
    message.warning('只有專案擁有者可以執行此操作');
    const projectId = route.params['id'];
    if (projectId) {
      router.navigate([`/projects/${projectId}/overview`]);
    } else {
      router.navigate(['/projects']);
    }
    return false;
  }
  
  return true;
};

