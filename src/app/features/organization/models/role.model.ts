/**
 * 組織管理模組 - 角色實體定義
 *
 * @description 定義角色與權限的資料模型
 */

/**
 * 角色實體介面
 */
export interface Role {
  /** 角色 ID */
  id: string;

  /** 角色名稱 */
  name: string;

  /** 角色編碼（用於程式判斷） */
  code: string;

  /** 權限列表 */
  permissions: string[];

  /** 角色層級 */
  level: RoleLevel;

  /** 角色描述 */
  description?: string;

  /** 角色類型 */
  type: RoleType;

  /** 是否為系統角色（不可刪除） */
  isSystem: boolean;

  /** 創建時間 */
  createdAt: Date;

  /** 更新時間 */
  updatedAt: Date;

  /** 創建者 ID */
  createdBy?: string;

  /** 最後更新者 ID */
  updatedBy?: string;
}

/**
 * 角色層級枚舉
 */
export enum RoleLevel {
  /** 擁有者 - 最高權限 */
  Owner = 1,

  /** 管理員 - 管理權限 */
  Admin = 2,

  /** 成員 - 基本權限 */
  Member = 3,

  /** 訪客 - 只讀權限 */
  Viewer = 4
}

/**
 * 角色類型枚舉
 */
export enum RoleType {
  /** 組織角色 */
  Organization = 'organization',

  /** 部門角色 */
  Department = 'department',

  /** 專案角色 */
  Project = 'project',

  /** 自訂角色 */
  Custom = 'custom'
}

/**
 * 創建角色請求
 */
export interface CreateRoleRequest {
  name: string;
  code: string;
  permissions: string[];
  level: RoleLevel;
  description?: string;
  type: RoleType;
}

/**
 * 更新角色請求
 */
export interface UpdateRoleRequest {
  name?: string;
  permissions?: string[];
  level?: RoleLevel;
  description?: string;
}

/**
 * 組織管理權限常數
 */
export const ORGANIZATION_PERMISSIONS = {
  // 組織架構
  'organization.view': '查看組織架構',
  'organization.create': '創建組織',
  'organization.edit': '編輯組織',
  'organization.delete': '刪除組織',
  'organization.move': '調整組織架構',

  // 部門管理
  'department.view': '查看部門',
  'department.create': '創建部門',
  'department.edit': '編輯部門',
  'department.delete': '刪除部門',
  'department.manage': '管理部門',

  // 員工管理
  'employee.view': '查看員工',
  'employee.create': '新增員工',
  'employee.edit': '編輯員工',
  'employee.delete': '刪除員工',
  'employee.manage': '管理員工',

  // 角色管理
  'role.view': '查看角色',
  'role.create': '創建角色',
  'role.edit': '編輯角色',
  'role.delete': '刪除角色',
  'role.assign': '分配角色',
  'role.manage': '管理角色'
} as const;

/**
 * 權限類型
 */
export type Permission = keyof typeof ORGANIZATION_PERMISSIONS;
