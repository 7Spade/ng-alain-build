import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

/**
 * 權限守衛工廠函數
 * 創建基於 Custom Claims 的權限守衛
 * 
 * @param requiredPermissions 所需權限列表
 * @param requireAll 是否需要所有權限（true）或任一權限（false）
 * 
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [createPermissionGuard(['admin:all'])]
 *   },
 *   {
 *     path: 'users',
 *     component: UsersComponent,
 *     canActivate: [createPermissionGuard(['users:read', 'users:write'], false)]
 *   }
 * ];
 * ```
 */
export function createPermissionGuard(
  requiredPermissions: string[],
  requireAll: boolean = false
): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const auth = inject(Auth);
    const router = inject(Router);
    const message = inject(NzMessageService);

    // 檢查使用者是否登入
    if (!auth.currentUser) {
      console.warn('[Permission Guard] 未登入，重定向至登入頁');
      router.navigate(['/auth/login'], {
        queryParams: { redirect: state.url }
      });
      return of(false);
    }

    // 檢查權限
    return from(auth.currentUser.getIdTokenResult()).pipe(
      map(result => {
        const userPermissions = (result.claims['permissions'] as string[]) || [];
        
        // 檢查是否有所需權限
        const hasPermission = requireAll
          ? requiredPermissions.every(p => userPermissions.includes(p))
          : requiredPermissions.some(p => userPermissions.includes(p));
        
        return hasPermission;
      }),
      tap(hasPermission => {
        if (!hasPermission) {
          console.warn('[Permission Guard] 權限不足:', requiredPermissions);
          message.error('您沒有權限訪問此頁面');
          router.navigate(['/']);
        }
      })
    );
  };
}

/**
 * 角色守衛工廠函數
 * 創建基於角色的路由守衛
 * 
 * @param requiredRoles 所需角色列表
 * @param requireAll 是否需要所有角色（true）或任一角色（false）
 * 
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [createRoleGuard(['admin'])]
 *   },
 *   {
 *     path: 'staff',
 *     component: StaffComponent,
 *     canActivate: [createRoleGuard(['manager', 'supervisor'], false)]
 *   }
 * ];
 * ```
 */
export function createRoleGuard(
  requiredRoles: string[],
  requireAll: boolean = false
): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const auth = inject(Auth);
    const router = inject(Router);
    const message = inject(NzMessageService);

    // 檢查使用者是否登入
    if (!auth.currentUser) {
      console.warn('[Role Guard] 未登入，重定向至登入頁');
      router.navigate(['/auth/login'], {
        queryParams: { redirect: state.url }
      });
      return of(false);
    }

    // 檢查角色
    return from(auth.currentUser.getIdTokenResult()).pipe(
      map(result => {
        const userRole = result.claims['role'] as string;
        const userRoles = result.claims['roles'] as string[];  // 支援多角色
        
        // 整合單一角色和多角色
        const allRoles = [
          ...(userRole ? [userRole] : []),
          ...(userRoles || [])
        ];
        
        // 檢查是否有所需角色
        const hasRole = requireAll
          ? requiredRoles.every(r => allRoles.includes(r))
          : requiredRoles.some(r => allRoles.includes(r));
        
        return hasRole;
      }),
      tap(hasRole => {
        if (!hasRole) {
          console.warn('[Role Guard] 角色不符:', requiredRoles);
          message.error('您的角色無法訪問此頁面');
          router.navigate(['/']);
        }
      })
    );
  };
}

/**
 * 租戶守衛工廠函數
 * 確保使用者屬於特定租戶
 * 
 * @param tenantId 租戶 ID（可從路由參數獲取）
 * 
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'org/:tenantId/dashboard',
 *     component: OrgDashboardComponent,
 *     canActivate: [createTenantGuard()]
 *   }
 * ];
 * ```
 */
export function createTenantGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const auth = inject(Auth);
    const router = inject(Router);
    const message = inject(NzMessageService);

    // 從路由參數獲取租戶 ID
    const routeTenantId = route.paramMap.get('tenantId');
    
    if (!routeTenantId) {
      console.error('[Tenant Guard] 路由未包含 tenantId 參數');
      return of(false);
    }

    // 檢查使用者是否登入
    if (!auth.currentUser) {
      router.navigate(['/auth/login'], {
        queryParams: { redirect: state.url }
      });
      return of(false);
    }

    // 檢查租戶權限
    return from(auth.currentUser.getIdTokenResult()).pipe(
      map(result => {
        const userTenantId = result.claims['tenantId'] as string;
        const userTenants = (result.claims['tenants'] as string[]) || [];
        
        // 檢查使用者是否屬於該租戶
        const belongsToTenant = 
          userTenantId === routeTenantId ||
          userTenants.includes(routeTenantId);
        
        return belongsToTenant;
      }),
      tap(belongsToTenant => {
        if (!belongsToTenant) {
          console.warn('[Tenant Guard] 使用者不屬於租戶:', routeTenantId);
          message.error('您沒有權限訪問此組織');
          router.navigate(['/']);
        }
      })
    );
  };
}

