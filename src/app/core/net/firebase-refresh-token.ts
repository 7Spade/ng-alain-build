import { HttpRequest, HttpHandlerFn, HttpResponseBase, HttpEvent } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { filter, switchMap, take, catchError } from 'rxjs/operators';

import { toLogin } from './helper';

// 全域刷新狀態
let refreshToking = false;
let refreshToken$ = new BehaviorSubject<string | null>(null);

/**
 * Firebase Token 刷新請求
 */
function refreshFirebaseToken(injector: Injector): Observable<string> {
  const auth = injector.get(Auth);

  if (!auth.currentUser) {
    return throwError(() => new Error('未登入'));
  }

  // 強制刷新 Firebase Token
  return from(auth.currentUser.getIdToken(true));
}

/**
 * 嘗試刷新 Firebase Token（401 錯誤觸發）
 *
 * @param injector Angular Injector
 * @param ev HTTP 回應
 * @param req 原始請求
 * @param next 下一個處理器
 */
export function tryRefreshFirebaseToken(
  injector: Injector,
  ev: HttpResponseBase,
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const auth = injector.get(Auth);
  const tokenService = injector.get(DA_SERVICE_TOKEN);

  // 1. 檢查是否有使用者登入
  if (!auth.currentUser) {
    console.warn('[Firebase Refresh] 未登入，跳轉至登入頁');
    toLogin(injector);
    return throwError(() => ev);
  }

  // 2. 如果已經在刷新中，加入等待佇列
  if (refreshToking) {
    console.log('[Firebase Refresh] 等待進行中的刷新...');

    return refreshToken$.pipe(
      filter(v => !!v),
      take(1),
      switchMap(token => {
        // 重新附加新 Token 並重試請求
        const clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(clonedReq);
      })
    );
  }

  // 3. 開始刷新流程
  console.log('[Firebase Refresh] 開始刷新 Token...');
  refreshToking = true;
  refreshToken$.next(null);

  return refreshFirebaseToken(injector).pipe(
    switchMap(async newToken => {
      // 獲取完整的 Token Result（包含 Claims）
      const result = await auth.currentUser!.getIdTokenResult();

      // 更新 @delon/auth Token
      tokenService.set({
        token: newToken,
        expired: new Date(result.expirationTime).getTime(),
        ...result.claims
      });

      // 通知等待中的請求
      refreshToking = false;
      refreshToken$.next(newToken);

      console.log('[Firebase Refresh] Token 刷新成功');

      // 重新發起原始請求
      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${newToken}` }
      });

      return next(clonedReq);
    }),
    switchMap(obs => obs),
    catchError(error => {
      // 刷新失敗
      refreshToking = false;
      refreshToken$.next(null);

      console.error('[Firebase Refresh] Token 刷新失敗:', error);
      toLogin(injector);

      return throwError(() => error);
    })
  );
}

/**
 * 重置刷新狀態（僅供測試使用）
 */
export function resetFirebaseRefreshState(): void {
  refreshToking = false;
  refreshToken$.next(null);
  console.log('[Firebase Refresh] 刷新狀態已重置');
}
