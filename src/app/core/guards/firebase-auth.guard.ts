import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

/**
 * Firebase 認證守衛
 * 保護路由，確保只有已登入使用者才能訪問
 *
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     canActivate: [firebaseAuthGuard]
 *   }
 * ];
 * ```
 */
export const firebaseAuthGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map(user => !!user),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        console.warn('[Firebase Auth Guard] 未登入，重定向至登入頁');

        // 儲存原始 URL，登入後返回
        router.navigate(['/auth/login'], {
          queryParams: { redirect: state.url }
        });
      }
    })
  );
};

/**
 * Firebase 匿名守衛
 * 確保只有未登入使用者才能訪問（如登入頁、註冊頁）
 *
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'login',
 *     component: LoginComponent,
 *     canActivate: [firebaseGuestGuard]
 *   }
 * ];
 * ```
 */
export const firebaseGuestGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map(user => !user),
    tap(isGuest => {
      if (!isGuest) {
        console.warn('[Firebase Guest Guard] 已登入，重定向至首頁');
        router.navigate(['/']);
      }
    })
  );
};
