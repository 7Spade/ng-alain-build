/**
 * Firebase Token 適配器（修正版）
 * 
 * **VAN 分析發現**: 原重構計劃的 get() 設計錯誤（返回 Observable 違反 ITokenService 介面）
 * **修正日期**: 2025-10-08
 * **參考**: memory-bank/active-context/context/FIREBASE_ARCHITECTURE_VAN_ANALYSIS_2025-10-08.md
 * 
 * **設計目的**:
 * - 將 Firebase Authentication 適配為 @delon/auth ITokenService
 * - 讓 @delon/auth 的 authSimpleInterceptor 能夠使用 Firebase Token
 * - Firebase SDK 自動管理 Token 刷新，無需手動實作
 * 
 * **使用方式**:
 * 在 app.config.ts 中配置:
 * ```typescript
 * import { DA_SERVICE_TOKEN } from '@delon/auth';
 * import { FirebaseTokenAdapter } from '@core/adapters/firebase-token.adapter';
 * 
 * providers: [
 *   { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter }
 * ]
 * ```
 * 
 * **此適配器取代的服務** (總計 ~920 行):
 * - delon-firebase-token.service.ts (209行) - Token 同步
 * - auto-refresh.service.ts (182行) - 自動刷新
 * - token-refresh.service.ts (145行) - 手動刷新
 * - firebase-error-handler.service.ts - 錯誤處理
 * - rbac.service.ts (239行) - 權限管理（使用 @delon/acl 替代）
 */

import { Injectable, inject, OnDestroy } from '@angular/core';
import { Auth, idToken, user } from '@angular/fire/auth';
import { ITokenModel, ITokenService } from '@delon/auth';
import { AlainAuthConfig } from '@delon/util/config';
import { Observable, BehaviorSubject, from, of, Subscription } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

/**
 * Firebase Token 適配器
 * 
 * **核心設計**:
 * 1. 內部維護 Token 快取（同步讀寫）
 * 2. 訂閱 Firebase idToken 自動更新快取
 * 3. get() 同步返回快取（符合 ITokenService 介面）
 * 4. change() 返回 Token 變更流（符合 ITokenService 介面）
 * 5. refresh 返回 Token 刷新流（符合 ITokenService 介面）
 */
@Injectable({ providedIn: 'root' })
export class FirebaseTokenAdapter implements ITokenService, OnDestroy {
  private auth = inject(Auth);
  
  // ✅ 內部快取（同步讀寫）
  private tokenCache: ITokenModel | null = null;
  
  // ✅ Token 變更流
  private change$ = new BehaviorSubject<ITokenModel | null>(null);
  
  // ✅ Token 刷新流
  private refresh$ = new BehaviorSubject<ITokenModel | null>(null);
  
  // 訂閱管理
  private tokenSyncSubscription?: Subscription;

  constructor() {
    // ✅ 啟動 Token 自動同步機制
    this.setupTokenSync();
  }

  /**
   * 設置 Token 同步機制
   * Firebase idToken 變化時自動更新快取並發射 change$ 事件
   * 
   * **工作原理**:
   * 1. 訂閱 Firebase idToken Observable
   * 2. Token 變化時獲取完整的 Token Result（含 Custom Claims）
   * 3. 更新內部快取（tokenCache）
   * 4. 發射 change$ 事件（通知 @delon/auth）
   * 5. 發射 refresh$ 事件（定時刷新監聽）
   */
  private setupTokenSync(): void {
    this.tokenSyncSubscription = idToken(this.auth).pipe(
      switchMap(token => {
        if (!token || !this.auth.currentUser) {
          // 未登入或無 Token
          return of(null);
        }
        
        // 獲取完整的 Token Result（包含 Custom Claims）
        return from(this.auth.currentUser.getIdTokenResult()).pipe(
          map(result => ({
            // Token 基本資訊
            token: result.token,
            expired: new Date(result.expirationTime).getTime(),
            
            // Firebase 使用者資訊
            uid: this.auth.currentUser!.uid,
            email: this.auth.currentUser!.email || undefined,
            email_verified: this.auth.currentUser!.emailVerified,
            name: this.auth.currentUser!.displayName || undefined,
            picture: this.auth.currentUser!.photoURL || undefined,
            
            // Custom Claims（角色、權限、租戶等）
            role: result.claims['role'] as string | undefined,
            permissions: result.claims['permissions'] as string[] | undefined,
            tenantId: result.claims['tenantId'] as string | undefined,
            tenants: result.claims['tenants'] as string[] | undefined,
            
            // Token 元數據
            issuedAt: result.issuedAtTime,
            expirationTime: result.expirationTime,
            signInProvider: result.signInProvider || undefined,
            
            // 其他所有 Custom Claims
            ...result.claims
          } as ITokenModel))
        );
      })
    ).subscribe(tokenModel => {
      // ✅ 更新快取（同步可用）
      this.tokenCache = tokenModel;
      
      // ✅ 發射 change$ 事件
      this.change$.next(tokenModel);
      
      // ✅ 發射 refresh$ 事件
      if (tokenModel) {
        this.refresh$.next(tokenModel);
      }
      
      console.log('[FirebaseTokenAdapter] Token 已更新:', tokenModel ? '已登入' : '已登出');
    });
  }

  /**
   * ✅ 獲取 Token（同步方法，符合 ITokenService 介面）
   * 
   * **重要**: 此方法是同步的，返回當前快取的 Token
   * authSimpleInterceptor 期望同步讀取 Token
   * 
   * @returns 當前快取的 Token 或 null
   */
  get(): ITokenModel | null;
  get<T extends ITokenModel>(): T | null;
  get<T extends ITokenModel>(): T | null {
    return this.tokenCache as T | null;
  }

  /**
   * ✅ 設定 Token（空實作，Firebase SDK 自動管理）
   * 
   * **說明**: 
   * - Firebase SDK 自動管理 Token，無需手動設置
   * - 實際 Token 更新通過 setupTokenSync() 自動進行
   * - 此方法僅用於 @delon/auth 介面相容
   * 
   * @param _data Token 數據（不使用）
   * @returns true（表示成功）
   */
  set(_data: ITokenModel | null): boolean {
    // Firebase SDK 自動管理 Token
    // setupTokenSync() 會監聽 idToken 變化並自動更新快取
    return true;
  }

  /**
   * ✅ 清除 Token（空實作，由 FirebaseAuthService.logout() 處理）
   * 
   * **說明**:
   * - Firebase 登出由 FirebaseAuthService.logout() 處理
   * - 調用 Firebase signOut() 會自動清除 Auth State
   * - setupTokenSync() 會監聽到變化並自動清空快取
   * - 此方法僅用於 @delon/auth 介面相容
   */
  clear(options?: { onlyToken: boolean }): void {
    // Firebase 登出由 FirebaseAuthService 處理
    // signOut() 會觸發 idToken 變化為 null
    // setupTokenSync() 會自動清空 tokenCache
  }

  /**
   * ✅ Token 變更流（符合 ITokenService 介面）
   * 
   * **說明**:
   * - 返回 Token 變更的 Observable
   * - 當 Firebase Token 刷新時會自動發射新值
   * - 組件可以訂閱此 Observable 監聽 Token 變化
   * 
   * @returns Token 變更的 Observable
   */
  change(): Observable<ITokenModel | null> {
    return this.change$.asObservable();
  }

  /**
   * ✅ Token 刷新流（符合 ITokenService 介面）
   * 
   * **說明**:
   * - 返回 Token 刷新的 Observable
   * - Firebase SDK 自動刷新 Token（過期前）
   * - idToken Observable 會自動發射新 Token
   * - 過濾掉 null 值（只發射有效 Token）
   * 
   * @returns Token 刷新的 Observable（不包含 null）
   */
  get refresh(): Observable<ITokenModel> {
    return this.refresh$.asObservable().pipe(
      filter((token): token is ITokenModel => token !== null)
    );
  }

  /**
   * ✅ 登入 URL（符合 ITokenService 介面）
   */
  get login_url(): string | undefined {
    return '/auth/login';
  }

  /**
   * ✅ 來源頁面（符合 ITokenService 介面）
   */
  get referrer(): { url?: string | null } {
    // TODO: 可選實作，從 Router 獲取來源 URL
    return {};
  }

  /**
   * ✅ 配置選項（符合 ITokenService 介面）
   */
  get options(): AlainAuthConfig {
    // TODO: 可選實作，返回認證配置
    return {} as AlainAuthConfig;
  }

  /**
   * 清理訂閱
   */
  ngOnDestroy(): void {
    this.tokenSyncSubscription?.unsubscribe();
  }
}

// ✅ 實作完成檢查清單
// [x] 引入 ITokenModel 和 ITokenService 介面
// [x] get() 改為同步方法（返回 tokenCache）
// [x] 添加 setupTokenSync() 內部訂閱機制
// [x] 實作 set() 方法（空實作）
// [x] 實作 clear() 方法（空實作）
// [x] 實作 change() 方法（返回 Observable）
// [x] 實作 refresh 屬性（返回 Observable）
// [x] 實作 login_url, referrer, options 屬性
// [ ] 在 app.config.ts 中配置適配器
// [ ] 測試 Token 自動同步功能
// [ ] 測試 authSimpleInterceptor 是否正常工作

