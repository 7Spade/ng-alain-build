import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';

import { FirebaseTokenModel } from '../models/firebase-token.model';

/**
 * @delon/auth 與 Firebase Token 同步服務
 * 負責將 Firebase ID Token 同步到 @delon/auth Token 管理系統
 */
@Injectable({ providedIn: 'root' })
export class DelonFirebaseTokenService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);

  /**
   * 從 Firebase 同步 Token 到 @delon/auth
   */
  async syncFromFirebase(): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      console.log('[Delon Token] 無使用者，清除 Token');
      this.tokenService.clear();
      return;
    }

    try {
      const result = await user.getIdTokenResult();

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
        claimsUpdatedAt: result.claims['claimsUpdatedAt'] as number,
        // Token 元數據
        issuedAt: result.issuedAtTime,
        expirationTime: result.expirationTime,
        signInProvider: result.signInProvider || undefined,
        // 其他所有 Claims
        ...result.claims
      };

      this.tokenService.set(tokenModel);
      console.log('[Delon Token] Token 同步成功');
    } catch (error) {
      console.error('[Delon Token] Token 同步失敗:', error);
      throw error;
    }
  }

  /**
   * 獲取當前 Token 模型
   */
  getToken(): FirebaseTokenModel | null {
    return this.tokenService.get() as FirebaseTokenModel;
  }

  /**
   * 檢查 Token 是否存在
   */
  hasToken(): boolean {
    const token = this.getToken();
    return !!token && !!token.token;
  }

  /**
   * 檢查 Token 是否已過期
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token || !token.expired) {
      return true;
    }
    return Date.now() >= token.expired;
  }

  /**
   * 檢查 Token 是否即將過期
   *
   * @param minutesBefore 過期前幾分鐘視為即將過期
   */
  isTokenExpiringSoon(minutesBefore = 5): boolean {
    const token = this.getToken();
    if (!token || !token.expired) {
      return true;
    }

    const expiresIn = token.expired - Date.now();
    const threshold = minutesBefore * 60 * 1000;

    return expiresIn <= threshold;
  }

  /**
   * 獲取 Token 剩餘有效時間（秒）
   */
  getTokenRemainingTime(): number {
    const token = this.getToken();
    if (!token || !token.expired) {
      return 0;
    }

    const remaining = token.expired - Date.now();
    return Math.max(0, Math.floor(remaining / 1000));
  }

  /**
   * 強制刷新 Token
   */
  async forceRefresh(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('未登入');
    }

    console.log('[Delon Token] 開始強制刷新 Token...');

    try {
      // 強制從 Firebase 獲取新 Token
      const newToken = await user.getIdToken(true);

      // 同步到 @delon/auth
      await this.syncFromFirebase();

      console.log('[Delon Token] Token 強制刷新成功');
    } catch (error) {
      console.error('[Delon Token] Token 強制刷新失敗:', error);
      throw error;
    }
  }

  /**
   * 清除 Token
   */
  clearToken(): void {
    this.tokenService.clear();
    console.log('[Delon Token] Token 已清除');
  }

  /**
   * 檢查使用者是否有特定角色
   */
  hasRole(role: string): boolean {
    const token = this.getToken();
    return token?.role === role;
  }

  /**
   * 檢查使用者是否有任一角色
   */
  hasAnyRole(roles: string[]): boolean {
    const token = this.getToken();
    return roles.some(role => token?.role === role);
  }

  /**
   * 檢查使用者是否有特定權限
   */
  hasPermission(permission: string): boolean {
    const token = this.getToken();
    return token?.permissions?.includes(permission) || false;
  }

  /**
   * 檢查使用者是否有任一權限
   */
  hasAnyPermission(permissions: string[]): boolean {
    const token = this.getToken();
    return permissions.some(permission => token?.permissions?.includes(permission));
  }

  /**
   * 檢查使用者是否有所有權限
   */
  hasAllPermissions(permissions: string[]): boolean {
    const token = this.getToken();
    return permissions.every(permission => token?.permissions?.includes(permission));
  }

  /**
   * 獲取使用者租戶 ID
   */
  getTenantId(): string | undefined {
    const token = this.getToken();
    return token?.tenantId;
  }

  /**
   * 檢查使用者是否屬於特定租戶
   */
  belongsToTenant(tenantId: string): boolean {
    const token = this.getToken();
    return token?.tenantId === tenantId || token?.tenants?.includes(tenantId) || false;
  }
}
