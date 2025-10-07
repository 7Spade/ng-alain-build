/**
 * 組織管理模組 - 員工實體定義
 *
 * @description 定義員工的資料模型
 */

import type { Department } from './department.model';
import type { Role } from './role.model';

/**
 * 員工實體介面
 */
export interface Employee {
  /** 員工 ID */
  id: string;

  /** 員工姓名 */
  name: string;

  /** 電子郵件 */
  email: string;

  /** 所屬部門 ID */
  departmentId: string;

  /** 部門資訊 */
  department?: Department;

  /** 角色 ID 列表 */
  roleIds: string[];

  /** 角色列表 */
  roles?: Role[];

  /** 職位 */
  position: string;

  /** 員工編號 */
  employeeNumber?: string;

  /** 員工狀態 */
  status: EmployeeStatus;

  /** 頭像 URL */
  avatar?: string;

  /** 入職日期 */
  joinDate: Date;

  /** 離職日期 */
  leaveDate?: Date;

  /** 直屬主管 ID */
  supervisorId?: string;

  /** 直屬主管資訊 */
  supervisor?: Employee;

  /** 工作地點 */
  workLocation?: string;

  /** 緊急聯絡人 */
  emergencyContact?: EmergencyContact;

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
 * 員工狀態枚舉
 */
export enum EmployeeStatus {
  /** 在職 */
  Active = 'active',

  /** 離職 */
  Inactive = 'inactive',

  /** 休假中 */
  OnLeave = 'on_leave',

  /** 試用期 */
  Probation = 'probation',

  /** 停職 */
  Suspended = 'suspended'
}

/**
 * 緊急聯絡人介面
 */
export interface EmergencyContact {
  /** 聯絡人姓名 */
  name: string;

  /** 與員工關係 */
  relationship: string;
}

/**
 * 創建員工請求
 */
export interface CreateEmployeeRequest {
  name: string;
  email: string;
  departmentId: string;
  roleIds: string[];
  position: string;
  employeeNumber?: string;
  joinDate: Date;
  supervisorId?: string;
  workLocation?: string;
  emergencyContact?: EmergencyContact;
}

/**
 * 更新員工請求
 */
export interface UpdateEmployeeRequest {
  name?: string;
  email?: string;
  departmentId?: string;
  roleIds?: string[];
  position?: string;
  status?: EmployeeStatus;
  supervisorId?: string;
  workLocation?: string;
  emergencyContact?: EmergencyContact;
}
