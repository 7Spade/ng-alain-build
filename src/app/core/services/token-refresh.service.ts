import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { switchMap, catchError, filter, take, retry } from 'rxjs/operators';

import { FirebaseTokenModel, TokenRefreshOptions } from '../models/firebase-token.model';

// 全域刷新狀態（防止重複刷新）
let refreshToking = false;
let refreshToken$ = new BehaviorSubject<string | null>(null);

/**
 * Token 刷新服務
 * 處理被動刷新（401 錯誤觸發）和手動刷新
 */
@Injectable({ providedIn: 'root' })
export class TokenRefreshService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);

  /**
   * 刷新 Firebase Token
   *
   * @param options 刷新選項
   */
  refresh(options?: TokenRefreshOptions): Observable<string> {
    const opts: TokenRefreshOptions = {
      forceRefresh: true,
      maxRetries: 3,
      retryDelay: 1000,
      silent: false,
      ...options
    };

    // 防止重複刷新
    if (refreshToking) {
      console.log('[Token Refresh] 等待進行中的刷新...');
      return refreshToken$.pipe(
        filter(v => !!v),
        take(1)
      ) as Observable<string>;
    }

    const user = this.auth.currentUser;
    if (!user) {
      const error = new Error('未登入');
      if (!opts.silent) {
        console.error('[Token Refresh] 刷新失敗:', error.message);
      }
      return throwError(() => error);
    }

    console.log('[Token Refresh] 開始刷新 Token...');
    refreshToking = true;
    refreshToken$.next(null);

    return from(user.getIdToken(opts.forceRefresh)).pipe(
      retry({ count: opts.maxRetries!, delay: opts.retryDelay }),
      switchMap(async newToken => {
        // 獲取完整的 Token Result（包含 Claims）
        const result = await user.getIdTokenResult();

        // 構建 Token 模型
        const tokenModel: FirebaseTokenModel = {
          token: newToken,
          expired: new Date(result.expirationTime).getTime(),
          uid: user.uid,
          email: user.email || undefined,
          email_verified: user.emailVerified,
          name: user.displayName || undefined,
          picture: user.photoURL || undefined,
          issuedAt: result.issuedAtTime,
          expirationTime: result.expirationTime,
          signInProvider: result.signInProvider || undefined,
          ...result.claims
        };

        // 更新 @delon/auth
        this.tokenService.set(tokenModel);

        // 通知等待中的請求
        refreshToking = false;
        refreshToken$.next(newToken);

        console.log('[Token Refresh] Token 刷新成功');
        return newToken;
      }),
      catchError(error => {
        refreshToking = false;
        refreshToken$.next(null);

        if (!opts.silent) {
          console.error('[Token Refresh] Token 刷新失敗:', error);
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * 檢查是否需要刷新
   */
  shouldRefresh(): boolean {
    const token = this.tokenService.get() as FirebaseTokenModel;

    if (!token || !token.expired) {
      return true;
    }

    // 過期前 5 分鐘刷新
    const expiresIn = token.expired - Date.now();
    const threshold = 5 * 60 * 1000; // 5 分鐘

    return expiresIn <= threshold;
  }

  /**
   * 檢查是否正在刷新中
   */
  isRefreshing(): boolean {
    return refreshToking;
  }

  /**
   * 等待刷新完成
   */
  waitForRefresh(): Observable<string> {
    return refreshToken$.pipe(
      filter(v => !!v),
      take(1)
    ) as Observable<string>;
  }

  /**
   * 重置刷新狀態（僅供測試使用）
   */
  resetRefreshState(): void {
    refreshToking = false;
    refreshToken$.next(null);
    console.log('[Token Refresh] 刷新狀態已重置');
  }
}
