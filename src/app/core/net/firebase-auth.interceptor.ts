import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN } from '@delon/auth';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

/**
 * Firebase 認證攔截器
 * 自動附加 Firebase ID Token 到 HTTP 請求
 */
export function firebaseAuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const injector = inject(Injector);
  const auth = injector.get(Auth);
  const tokenService = injector.get(DA_SERVICE_TOKEN);
  const router = injector.get(Router);

  // 1. 檢查是否需要認證
  if (req.context.get(ALLOW_ANONYMOUS)) {
    return next(req);
  }

  // 2. 檢查是否為外部 API（不需要 Firebase Token）
  if (isExternalApi(req.url)) {
    return next(req);
  }

  // 3. 獲取 Firebase ID Token
  const currentUser = auth.currentUser;

  if (!currentUser) {
    // 未登入，跳轉至登入頁
    console.warn('[Firebase Interceptor] 未登入，跳轉至登入頁');
    router.navigateByUrl('/auth/login');
    return throwError(() => new Error('未登入'));
  }

  // 4. 從 Firebase 獲取最新的 ID Token
  return from(currentUser.getIdToken()).pipe(
    switchMap(idToken => {
      if (!idToken) {
        console.error('[Firebase Interceptor] 無法獲取 ID Token');
        router.navigateByUrl('/auth/login');
        return throwError(() => new Error('無法獲取認證 Token'));
      }

      // 5. 附加 Token 到請求 Header
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
          // 可選：附加 Firebase App Check Token
          'X-Firebase-AppCheck': auth.app.options.appId || ''
        }
      });

      // 6. 同步 Token 到 @delon/auth（用於路由守衛等）
      tokenService.set({
        token: idToken,
        expired: Date.now() + 60 * 60 * 1000 // Firebase Token 預設 1 小時
      });

      return next(clonedReq);
    }),
    catchError(err => {
      console.error('[Firebase Interceptor] 錯誤:', err);
      return throwError(() => err);
    })
  );
}

/**
 * 判斷是否為外部 API
 * 外部 API 不需要附加 Firebase Token
 */
function isExternalApi(url: string): boolean {
  const externalApiPatterns = [
    /^https?:\/\//i, // 完整 URL（http:// 或 https://）
    /^\/\//i // 協議相對 URL（//example.com）
  ];

  return externalApiPatterns.some(pattern => pattern.test(url));
}
