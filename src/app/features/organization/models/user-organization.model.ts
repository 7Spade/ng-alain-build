/**
 * 用戶所屬組織模型
 * @description 定義用戶可以切換的頂層組織數據
 * @usage 用於組織切換器，區別於內部組織結構（部門/團隊）
 */

/**
 * 用戶所屬組織
 * @description 用於組織切換器的頂層組織數據
 */
export interface UserOrganization {
  /** 組織 ID（null 表示個人空間） */
  id: string | null;
  
  /** 組織名稱 */
  name: string;
  
  /** 組織類型 */
  type: 'personal' | 'organization';
  
  /** 組織 Logo URL */
  logo?: string;
  
  /** 用戶在此組織的角色 */
  role: 'owner' | 'admin' | 'member' | 'viewer';
  
  /** 加入時間 */
  joinedAt: Date | string;
  
  /** 組織描述 */
  description?: string;
  
  /** 組織設定 */
  settings?: {
    /** 是否允許成員邀請 */
    allowMemberInvite?: boolean;
    
    /** 是否公開組織 */
    isPublic?: boolean;
  };
}

/**
 * 組織角色類型
 */
export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

/**
 * 組織角色權限映射
 */
export const ORGANIZATION_ROLE_PERMISSIONS: Record<OrganizationRole, string[]> = {
  owner: ['admin', 'user', 'manage_members', 'manage_settings', 'delete_organization'],
  admin: ['admin', 'user', 'manage_members'],
  member: ['user'],
  viewer: ['viewer']
};

/**
 * 組織角色標籤
 */
export const ORGANIZATION_ROLE_LABELS: Record<OrganizationRole, string> = {
  owner: '擁有者',
  admin: '管理員',
  member: '成員',
  viewer: '訪客'
};

/**
 * 組織角色顏色
 */
export const ORGANIZATION_ROLE_COLORS: Record<OrganizationRole, string> = {
  owner: 'purple',
  admin: 'blue',
  member: 'green',
  viewer: 'default'
};

