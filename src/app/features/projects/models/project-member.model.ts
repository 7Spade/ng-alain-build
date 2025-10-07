/**
 * 專案成員模型
 *
 * @description 專案成員和權限管理
 */

/**
 * 專案成員角色
 */
export type ProjectMemberRole = 'owner' | 'admin' | 'member' | 'viewer';

/**
 * 專案成員實體
 */
export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  userName?: string; // 成員名稱
  userAvatar?: string; // 成員頭像
  userEmail?: string; // 成員郵箱
  role: ProjectMemberRole;
  joinedAt: Date;
  invitedBy?: string;
  invitedByName?: string;
}

/**
 * 邀請成員請求
 */
export interface InviteMemberRequest {
  userId: string;
  role: ProjectMemberRole;
}

/**
 * 更新成員角色請求
 */
export interface UpdateMemberRoleRequest {
  role: ProjectMemberRole;
}

/**
 * 成員查詢參數
 */
export interface MemberQueryParams {
  projectId: string;
  role?: ProjectMemberRole;
  search?: string;
}

/**
 * 成員列表響應
 */
export interface MemberListResponse {
  members: ProjectMember[];
  total: number;
}

/**
 * 專案角色權限映射
 */
export const PROJECT_ROLE_PERMISSIONS: Record<ProjectMemberRole, string[]> = {
  owner: ['project.delete', 'project.settings', 'project.members', 'project.upload', 'project.download', 'project.view'],
  admin: ['project.settings', 'project.members', 'project.upload', 'project.download', 'project.view'],
  member: ['project.upload', 'project.download', 'project.view'],
  viewer: ['project.view']
};

/**
 * 專案角色標籤
 */
export const PROJECT_ROLE_LABELS: Record<ProjectMemberRole, string> = {
  owner: '擁有者',
  admin: '管理員',
  member: '成員',
  viewer: '訪客'
};

/**
 * 專案角色顏色
 */
export const PROJECT_ROLE_COLORS: Record<ProjectMemberRole, string> = {
  owner: 'purple',
  admin: 'blue',
  member: 'green',
  viewer: 'default'
};
