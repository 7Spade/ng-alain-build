/**
 * 組織管理模組 - 組織實體定義
 *
 * @description 定義組織結構的資料模型
 */

/**
 * 組織實體介面
 */
export interface Organization {
  /** 組織唯一識別碼 */
  id: string;

  /** 組織名稱 */
  name: string;

  /** 父組織 ID（根組織為 null） */
  parentId: string | null;

  /** 組織類型 */
  type: OrganizationType;

  /** 組織層級（從 1 開始） */
  level: number;

  /** 子組織列表 */
  children?: Organization[];

  /** 組織編碼（用於排序和編號） */
  code?: string;

  /** 組織描述 */
  description?: string;

  /** 組織狀態 */
  status: OrganizationStatus;

  /** 排序順序 */
  order: number;

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
 * 組織類型枚舉
 */
export enum OrganizationType {
  /** 公司 */
  Company = 'company',

  /** 事業部 */
  Division = 'division',

  /** 部門 */
  Department = 'department',

  /** 團隊 */
  Team = 'team',

  /** 小組 */
  Group = 'group'
}

/**
 * 組織狀態枚舉
 */
export enum OrganizationStatus {
  /** 啟用 */
  Active = 'active',

  /** 停用 */
  Inactive = 'inactive',

  /** 已歸檔 */
  Archived = 'archived'
}

/**
 * 創建組織請求
 */
export interface CreateOrganizationRequest {
  name: string;
  parentId?: string | null;
  type: OrganizationType;
  code?: string;
  description?: string;
  order?: number;
}

/**
 * 更新組織請求
 */
export interface UpdateOrganizationRequest {
  name?: string;
  type?: OrganizationType;
  code?: string;
  description?: string;
  status?: OrganizationStatus;
  order?: number;
}

/**
 * 移動組織請求
 */
export interface MoveOrganizationRequest {
  organizationId: string;
  newParentId: string;
}
