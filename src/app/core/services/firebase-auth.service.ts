import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { Router } from '@angular/router';
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
  }

  // ===== 登入方法 =====

  /**
   * Google 登入（彈窗方式）
   */
  loginWithGoogle(useRedirect = false): Observable<User> {
    this.authStateSubject.next(FirebaseAuthState.AUTHENTICATING);
    
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const signInMethod = useRedirect ? signInWithRedirect : signInWithPopup;

    return from(signInMethod(this.auth, provider)).pipe(
      map(credential => (credential as UserCredential).user),
      tap(user => this.onLoginSuccess(user, FirebaseLoginMethod.GOOGLE)),
      catchError(error => this.handleLoginError(error))
    );
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
          return from(updateProfile(credential.user, { displayName })).pipe(
            map(() => credential.user)
          );
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
    this.idToken$.pipe(
      switchMap(token => {
        if (!token) {
          return of(null);
        }
        return this.getIdTokenResult();
      })
    ).subscribe(result => {
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

