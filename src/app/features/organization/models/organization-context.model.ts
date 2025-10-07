/**
 * 組織上下文模型
 *
 * @description 定義當前用戶所在的組織環境狀態
 */

import type { UserOrganization, OrganizationRole } from './user-organization.model';

/**
 * 組織上下文
 *
 * @description 當前用戶所在的組織環境
 */
export interface OrganizationContext {
  /** 當前組織 ID（null = 個人空間） */
  currentOrgId: string | null;

  /** 當前組織資訊 */
  currentOrg: UserOrganization | null;

  /** 用戶在當前組織的角色 */
  currentRole: OrganizationRole;

  /** 是否為個人空間 */
  isPersonalSpace: boolean;
}

/**
 * 組織上下文變更事件
 */
export interface OrganizationContextChangeEvent {
  /** 變更前的組織 ID */
  previousOrgId: string | null;

  /** 變更後的組織 ID */
  currentOrgId: string | null;

  /** 變更時間 */
  timestamp: Date;

  /** 變更類型 */
  changeType: 'switch_to_org' | 'switch_to_personal' | 'initialize';
}
