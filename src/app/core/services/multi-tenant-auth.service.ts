import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';

import { OrganizationContextService } from './organization-context/organization-context.service';
import { FirebaseTokenModel } from '../models/firebase-token.model';

/**
 * 多租戶認證服務
 * 整合 Firebase Authentication 與組織上下文管理
 */
@Injectable({ providedIn: 'root' })
export class MultiTenantAuthService {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private orgContext = inject(OrganizationContextService);

  /**
   * 登入並設定租戶上下文
   *
   * @param email 使用者 Email
   * @param password 密碼
   */
  async loginWithTenant(email: string, password: string): Promise<void> {
    console.log('[Multi-Tenant Auth] 開始登入...');

    // 1. Firebase 登入
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = credential.user;

    // 2. 獲取 Token Result（包含租戶資訊）
    const result = await user.getIdTokenResult();

    // 3. 提取租戶 ID
    const tenantId = result.claims['tenantId'] as string;
    const tenants = result.claims['tenants'] as string[];

    if (!tenantId && (!tenants || tenants.length === 0)) {
      throw new Error('使用者未關聯任何租戶');
    }

    // 4. 設定租戶上下文（使用第一個租戶）
    const primaryTenantId = tenantId || tenants[0];
    await this.orgContext.switchToOrganization(primaryTenantId, false);

    // 5. 同步到 @delon/auth
    const tokenModel: FirebaseTokenModel = {
      token: result.token,
      expired: new Date(result.expirationTime).getTime(),
      uid: user.uid,
      email: user.email || undefined,
      name: user.displayName || undefined,
      tenantId: primaryTenantId,
      tenants: tenants || [primaryTenantId],
      role: result.claims['role'] as string,
      permissions: result.claims['permissions'] as string[],
      ...result.claims
    };

    this.tokenService.set(tokenModel);

    console.log(`[Multi-Tenant Auth] 已登入租戶: ${primaryTenantId}`);
  }

  /**
   * 切換租戶
   *
   * @param tenantId 目標租戶 ID
   */
  async switchTenant(tenantId: string): Promise<void> {
    console.log(`[Multi-Tenant Auth] 切換至租戶: ${tenantId}`);

    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('未登入');
    }

    // 1. 驗證使用者是否有權訪問該租戶
    const result = await user.getIdTokenResult();
    const allowedTenants = (result.claims['tenants'] as string[]) || [];
    const currentTenantId = result.claims['tenantId'] as string;

    // 允許的租戶包含當前租戶和所有可訪問的租戶
    const allAllowedTenants = currentTenantId ? [currentTenantId, ...allowedTenants] : allowedTenants;

    if (!allAllowedTenants.includes(tenantId)) {
      throw new Error(`您沒有權限訪問租戶: ${tenantId}`);
    }

    // 2. 更新組織上下文
    await this.orgContext.switchToOrganization(tenantId, false);

    // 3. 強制刷新 Token（後端 Custom Claims 會根據新租戶重新生成）
    const newToken = await user.getIdToken(true);
    const newResult = await user.getIdTokenResult();

    // 4. 更新 Token
    const tokenModel: FirebaseTokenModel = {
      token: newToken,
      expired: new Date(newResult.expirationTime).getTime(),
      uid: user.uid,
      email: user.email || undefined,
      name: user.displayName || undefined,
      tenantId,
      tenants: newResult.claims['tenants'] as string[],
      role: newResult.claims['role'] as string,
      permissions: newResult.claims['permissions'] as string[],
      ...newResult.claims
    };

    this.tokenService.set(tokenModel);

    console.log(`[Multi-Tenant Auth] 已切換至租戶: ${tenantId}`);
  }

  /**
   * 獲取當前租戶 ID
   */
  getCurrentTenantId(): string | undefined {
    const token = this.tokenService.get() as FirebaseTokenModel;
    return token?.tenantId;
  }

  /**
   * 獲取所有可訪問的租戶
   */
  getAllowedTenants(): string[] {
    const token = this.tokenService.get() as FirebaseTokenModel;
    const currentTenantId = token?.tenantId;
    const tenants = token?.tenants || [];

    // 合併當前租戶和可訪問租戶，去重
    const allTenants = currentTenantId ? Array.from(new Set([currentTenantId, ...tenants])) : tenants;

    return allTenants;
  }

  /**
   * 檢查是否可訪問特定租戶
   */
  canAccessTenant(tenantId: string): boolean {
    return this.getAllowedTenants().includes(tenantId);
  }
}
