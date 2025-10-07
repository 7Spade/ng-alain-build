/**
 * 專案活動模型
 * @description 專案活動記錄和時間線
 */

/**
 * 活動類型
 */
export type ActivityAction = 'create' | 'update' | 'delete' | 'upload' | 'download' | 'invite' | 'remove';

/**
 * 活動目標類型
 */
export type ActivityTargetType = 'project' | 'file' | 'member' | 'settings';

/**
 * 專案活動實體
 */
export interface ProjectActivity {
  id: string;
  projectId: string;
  userId: string;
  userName?: string;             // 操作者名稱
  userAvatar?: string;           // 操作者頭像
  action: ActivityAction;
  targetType: ActivityTargetType;
  targetId: string;
  targetName?: string;           // 目標名稱
  description: string;
  metadata?: Record<string, any>; // 額外元數據
  createdAt: Date;
}

/**
 * 活動查詢參數
 */
export interface ActivityQueryParams {
  projectId: string;
  action?: ActivityAction;
  targetType?: ActivityTargetType;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  pageIndex?: number;
  pageSize?: number;
}

/**
 * 活動列表響應
 */
export interface ActivityListResponse {
  activities: ProjectActivity[];
  total: number;
}

/**
 * 活動圖標映射
 */
export const ACTIVITY_ICONS: Record<ActivityAction, string> = {
  create: 'plus-circle',
  update: 'edit',
  delete: 'delete',
  upload: 'cloud-upload',
  download: 'cloud-download',
  invite: 'user-add',
  remove: 'user-delete'
};

/**
 * 活動顏色映射
 */
export const ACTIVITY_COLORS: Record<ActivityAction, string> = {
  create: 'green',
  update: 'blue',
  delete: 'red',
  upload: 'cyan',
  download: 'purple',
  invite: 'orange',
  remove: 'volcano'
};

