import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
  idToken,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { Observable, from, of, BehaviorSubject, throwError } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { FirebaseTokenModel, FirebaseAuthState, FirebaseLoginMethod, FirebaseAuthEvent } from '../models/firebase-token.model';

/**
 * Firebase 認證服務
 * 整合 Firebase Authentication 與 @delon/auth
 */
@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private settings = inject(SettingsService);
  private router = inject(Router);

  // Observable: 當前使用者
  user$: Observable<User | null> = user(this.auth);

  // Observable: ID Token
  idToken$: Observable<string | null> = idToken(this.auth);

  // 認證狀態
  private authStateSubject = new BehaviorSubject<FirebaseAuthState>(FirebaseAuthState.UNAUTHENTICATED);
  authState$ = this.authStateSubject.asObservable();

  // 認證事件流
  private authEventsSubject = new BehaviorSubject<FirebaseAuthEvent | null>(null);
  authEvents$ = this.authEventsSubject.asObservable();

  constructor() {
    // 自動同步 Firebase Token 到 @delon/auth
    this.setupTokenSync();
    // 監聽認證狀態變化
    this.setupAuthStateMonitor();
    // 處理 Redirect 登入回調
    this.handleRedirectResult();
  }

  // ===== 登入方法 =====

  /**
   * Google 登入（使用 Redirect 模式，避免 Popup 被瀏覽器阻止）
   *
   * @param useRedirect - 是否使用 Redirect 模式（預設 true）
   */
  loginWithGoogle(useRedirect = true): Observable<void> {
    this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);

    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    if (useRedirect) {
      // Redirect 模式：會離開頁面，返回後在 handleRedirectResult 處理
      return from(signInWithRedirect(this.auth, provider)).pipe(
        tap(() => console.log('[Firebase Auth] 正在跳轉至 Google 登入頁...')),
        catchError(error => this.handleLoginError(error))
      );
    } else {
      // Popup 模式：適用於不會被阻止的環境（fallback）
      return from(signInWithPopup(this.auth, provider)).pipe(
        tap(credential => this.onLoginSuccess(credential.user, FirebaseLoginMethod.GOOGLE)),
        map(() => undefined),
        catchError(error => this.handleLoginError(error))
      );
    }
  }

  /**
   * GitHub 登入
   */
  loginWithGitHub(useRedirect = false): Observable<User> {
    this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);

    const provider = new GithubAuthProvider();
    provider.addScope('user:email');

    const signInMethod = useRedirect ? signInWithRedirect : signInWithPopup;

    return from(signInMethod(this.auth, provider)).pipe(
      map(credential => (credential as UserCredential).user),
      tap(user => this.onLoginSuccess(user, FirebaseLoginMethod.GITHUB)),
      catchError(error => this.handleLoginError(error))
    );
  }

  /**
   * Email/Password 登入
   */
  loginWithEmailPassword(email: string, password: string): Observable<User> {
    this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);

    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(credential => credential.user),
      tap(user => this.onLoginSuccess(user, FirebaseLoginMethod.EMAIL_PASSWORD)),
      catchError(error => this.handleLoginError(error))
    );
  }

  /**
   * Email/Password 註冊
   */
  registerWithEmailPassword(email: string, password: string, displayName?: string): Observable<User> {
    this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(credential => {
        // 如果提供了顯示名稱，更新 profile
        if (displayName && credential.user) {
          return from(updateProfile(credential.user, { displayName })).pipe(map(() => credential.user));
        }
        return of(credential.user);
      }),
      tap(user => this.onLoginSuccess(user, FirebaseLoginMethod.EMAIL_PASSWORD)),
      catchError(error => this.handleLoginError(error))
    );
  }

  /**
   * 發送密碼重設郵件
   */
  sendPasswordReset(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      tap(() => console.log('[Firebase Auth] 密碼重設郵件已發送')),
      catchError(error => {
        console.error('[Firebase Auth] 密碼重設失敗:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * 登出
   */
  logout(): Observable<void> {
    this.authStateSubject.next(FirebaseAuthState.SIGNING_OUT);

    return from(signOut(this.auth)).pipe(
      tap(() => {
        // 清除 @delon/auth Token
        this.tokenService.clear();

        // 清除使用者設定
        this.settings.setUser({});

        // 發送登出事件
        this.emitAuthEvent({
          type: 'logout',
          timestamp: Date.now()
        });

        // 更新狀態
        this.authStateSubject.next(FirebaseAuthState.UNAUTHENTICATED);

        // 導航至登入頁
        this.router.navigateByUrl('/auth/login');

        console.log('[Firebase Auth] 登出成功');
      }),
      catchError(error => {
        console.error('[Firebase Auth] 登出失敗:', error);
        this.authStateSubject.next(FirebaseAuthState.ERROR);
        return throwError(() => error);
      })
    );
  }

  /**
   * 處理 Redirect 登入回調
   * 應在應用啟動時調用（constructor 中）
   */
  private handleRedirectResult(): void {
    from(getRedirectResult(this.auth))
      .pipe(
        tap(result => {
          if (result && result.user) {
            console.log('[Firebase Auth] Redirect 登入成功:', result.user.email);
            // 判斷登入方法
            const providerId = result.providerId;
            const method = providerId?.includes('google')
              ? FirebaseLoginMethod.GOOGLE
              : providerId?.includes('github')
                ? FirebaseLoginMethod.GITHUB
                : FirebaseLoginMethod.EMAIL_PASSWORD;

            this.onLoginSuccess(result.user, method);

            // 導航至原始頁面或首頁（延遲以確保 Token 同步完成）
            const redirect = sessionStorage.getItem('firebase_redirect_url') || '/dashboard';
            sessionStorage.removeItem('firebase_redirect_url');
            setTimeout(() => {
              console.log('[Firebase Auth] 導航至:', redirect);
              this.router.navigateByUrl(redirect);
            }, 200);
          }
        }),
        catchError(error => {
          if (error && error.code) {
            console.error('[Firebase Auth] Redirect 登入失敗:', error);
            // 顯示用戶友好的錯誤訊息
            let userMessage = '登入失敗';
            switch (error.code) {
              case 'auth/popup-closed-by-user':
                userMessage = '登入視窗已關閉';
                break;
              case 'auth/popup-blocked':
                userMessage = '瀏覽器阻擋了登入視窗';
                break;
              case 'auth/network-request-failed':
                userMessage = '網路連接失敗';
                break;
              default:
                userMessage = error.message || '登入失敗';
            }
            console.error('[Firebase Auth] 錯誤訊息:', userMessage);
          }
          return of(null);
        })
      )
      .subscribe();
  }

  // ===== Token 管理 =====

  /**
   * 獲取當前 ID Token
   */
  getIdToken(forceRefresh = false): Observable<string | null> {
    if (!this.auth.currentUser) {
      return of(null);
    }
    return from(this.auth.currentUser.getIdToken(forceRefresh));
  }

  /**
   * 獲取 ID Token Result（包含 Custom Claims）
   */
  getIdTokenResult(forceRefresh = false): Observable<any> {
    if (!this.auth.currentUser) {
      return of(null);
    }
    return from(this.auth.currentUser.getIdTokenResult(forceRefresh));
  }

  /**
   * 檢查使用者是否已登入
   */
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  /**
   * 獲取當前使用者
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // ===== 私有方法 =====

  /**
   * 登入成功處理
   */
  private onLoginSuccess(user: User, method: FirebaseLoginMethod): void {
    console.log('[Firebase Auth] 登入成功:', user.email, '方法:', method);

    // 獲取 ID Token 並同步
    user.getIdTokenResult().then(result => {
      // 同步到 @delon/auth
      const tokenModel: FirebaseTokenModel = {
        token: result.token,
        expired: new Date(result.expirationTime).getTime(),
        // Firebase 基礎欄位
        uid: user.uid,
        email: user.email || undefined,
        email_verified: user.emailVerified,
        name: user.displayName || undefined,
        picture: user.photoURL || undefined,
        // Custom Claims
        role: result.claims['role'] as string,
        permissions: result.claims['permissions'] as string[],
        tenantId: result.claims['tenantId'] as string,
        tenants: result.claims['tenants'] as string[],
        departmentId: result.claims['departmentId'] as string,
        premium: result.claims['premium'] as boolean,
        // Token 元數據
        issuedAt: result.issuedAtTime,
        expirationTime: result.expirationTime,
        signInProvider: result.signInProvider || method,
        // 其他 Claims
        ...result.claims
      };

      this.tokenService.set(tokenModel);

      // 更新使用者設定
      this.settings.setUser({
        name: user.displayName || user.email,
        email: user.email,
        avatar: user.photoURL,
        uid: user.uid,
        role: result.claims['role']
      });

      // 發送登入事件
      this.emitAuthEvent({
        type: 'login',
        timestamp: Date.now(),
        uid: user.uid,
        method
      });

      // 更新狀態
      this.authStateSubject.next(FirebaseAuthState.AUTHENTICATED);
    });
  }

  /**
   * 登入錯誤處理
   */
  private handleLoginError(error: any): Observable<never> {
    console.error('[Firebase Auth] 登入失敗:', error);

    let message = '登入失敗';
    switch (error.code) {
      case 'auth/user-not-found':
        message = '使用者不存在';
        break;
      case 'auth/wrong-password':
        message = '密碼錯誤';
        break;
      case 'auth/invalid-email':
        message = 'Email 格式錯誤';
        break;
      case 'auth/user-disabled':
        message = '帳號已被停用';
        break;
      case 'auth/popup-closed-by-user':
        message = '登入視窗已關閉';
        break;
      case 'auth/popup-blocked':
        message = '瀏覽器阻擋了登入視窗';
        break;
      case 'auth/network-request-failed':
        message = '網路連接失敗';
        break;
      case 'auth/too-many-requests':
        message = '請求過於頻繁，請稍後再試';
        break;
      case 'auth/email-already-in-use':
        message = 'Email 已被使用';
        break;
      case 'auth/weak-password':
        message = '密碼強度不足（至少 6 個字元）';
        break;
    }

    // 發送錯誤事件
    this.emitAuthEvent({
      type: 'auth_error',
      timestamp: Date.now(),
      error: message
    });

    // 更新狀態
    this.authStateSubject.next(FirebaseAuthState.ERROR);

    return throwError(() => new Error(message));
  }

  /**
   * 設定 Token 自動同步
   */
  private setupTokenSync(): void {
    this.idToken$
      .pipe(
        switchMap(token => {
          if (!token) {
            return of(null);
          }
          return this.getIdTokenResult();
        })
      )
      .subscribe(result => {
        if (result) {
          const tokenModel: FirebaseTokenModel = {
            token: result.token,
            expired: new Date(result.expirationTime).getTime(),
            ...result.claims
          };
          this.tokenService.set(tokenModel);
        }
      });
  }

  /**
   * 監聽認證狀態變化
   */
  private setupAuthStateMonitor(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.authStateSubject.next(FirebaseAuthState.AUTHENTICATED);
      } else {
        this.authStateSubject.next(FirebaseAuthState.UNAUTHENTICATED);
      }
    });
  }

  /**
   * 發送認證事件
   */
  private emitAuthEvent(event: FirebaseAuthEvent): void {
    this.authEventsSubject.next(event);
    console.log('[Firebase Auth Event]', event);
  }
}
