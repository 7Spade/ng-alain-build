/**
 * 組織管理模組 - 部門實體定義
 *
 * @description 定義部門的資料模型
 */

import type { Employee } from './employee.model';

/**
 * 部門實體介面
 */
export interface Department {
  /** 部門 ID */
  id: string;

  /** 部門名稱 */
  name: string;

  /** 所屬組織 ID */
  organizationId: string;

  /** 組織名稱（關聯資料） */
  organizationName?: string;

  /** 父部門 ID（用於樹狀結構） */
  parentId?: string | null;

  /** 部門負責人 ID */
  managerId: string;

  /** 部門負責人資訊 */
  manager?: Employee;

  /** 部門成員數量 */
  memberCount: number;

  /** 部門層級 */
  level?: number;

  /** 部門描述 */
  description?: string;

  /** 部門狀態 */
  status: DepartmentStatus;

  /** 部門類型 */
  type?: string;

  /** 電子郵件 */
  email?: string;

  /** 辦公地點 */
  location?: string;

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
 * 部門狀態枚舉
 */
export enum DepartmentStatus {
  /** 正常運作 */
  Active = 'active',

  /** 暫時停用 */
  Inactive = 'inactive',

  /** 重組中 */
  Restructuring = 'restructuring',

  /** 已解散 */
  Dissolved = 'dissolved'
}

/**
 * 創建部門請求
 */
export interface CreateDepartmentRequest {
  name: string;
  organizationId: string;
  managerId: string;
  description?: string;
  type?: string;
  email?: string;
  location?: string;
}

/**
 * 更新部門請求
 */
export interface UpdateDepartmentRequest {
  name?: string;
  managerId?: string;
  description?: string;
  status?: DepartmentStatus;
  type?: string;
  email?: string;
  location?: string;
}
