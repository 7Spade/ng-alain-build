/**
 * 組織成員關係模型
 *
 * @description 定義用戶與組織的關聯關係
 */

import type { OrganizationRole } from './user-organization.model';

/**
 * 組織成員關係
 *
 * @description 用戶與組織的關聯關係
 */
export interface OrganizationMembership {
  /** 成員關係 ID */
  id: string;

  /** 用戶 ID */
  userId: string;

  /** 組織 ID */
  organizationId: string;

  /** 用戶在組織中的角色 */
  role: OrganizationRole;

  /** 加入時間 */
  joinedAt: Date | string;

  /** 邀請者 ID */
  invitedBy?: string;

  /** 成員狀態 */
  status: MembershipStatus;

  /** 最後活躍時間 */
  lastActiveAt?: Date | string;
}

/**
 * 成員狀態枚舉
 */
export enum MembershipStatus {
  /** 啟用 */
  Active = 'active',

  /** 待接受邀請 */
  Pending = 'pending',

  /** 已停用 */
  Inactive = 'inactive',

  /** 已離開 */
  Left = 'left'
}

/**
 * 邀請成員請求
 */
export interface InviteMemberRequest {
  /** 組織 ID */
  organizationId: string;

  /** 受邀用戶郵箱 */
  email: string;

  /** 分配角色 */
  role: OrganizationRole;

  /** 邀請訊息 */
  message?: string;
}

/**
 * 更新成員角色請求
 */
export interface UpdateMemberRoleRequest {
  /** 成員關係 ID */
  membershipId: string;

  /** 新角色 */
  newRole: OrganizationRole;
}

/**
 * 移除成員請求
 */
export interface RemoveMemberRequest {
  /** 成員關係 ID */
  membershipId: string;

  /** 移除原因 */
  reason?: string;
}
