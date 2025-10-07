/**
 * 專案模型
 * @description 專案基本資訊和狀態管理
 */

/**
 * 專案實體
 */
export interface Project {
  // 基本資訊
  id: string;                    // 專案 ID
  name: string;                  // 專案名稱
  description?: string;          // 專案描述
  ownerId: string;               // 擁有者 ID
  ownerType: 'personal' | 'organization'; // 擁有者類型
  organizationId?: string | null; // 組織 ID（如果是組織專案）
  
  // 統計資訊
  fileCount: number;             // 檔案數量
  storageUsed: number;           // 使用儲存空間（bytes）
  memberCount: number;           // 成員數量
  
  // 狀態
  status: ProjectStatus;
  visibility: ProjectVisibility;
  
  // 時間戳
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  
  // 標籤與分類
  tags?: string[];
  category?: string;
  
  // 圖標與顏色
  avatar?: string;
  color?: string;
}

/**
 * 專案狀態
 */
export type ProjectStatus = 'active' | 'archived' | 'deleted';

/**
 * 專案可見性
 */
export type ProjectVisibility = 'public' | 'private' | 'internal';

/**
 * 創建專案請求
 */
export interface CreateProjectRequest {
  name: string;
  description?: string;
  visibility?: ProjectVisibility;
  tags?: string[];
  category?: string;
  avatar?: string;
  color?: string;
}

/**
 * 更新專案請求
 */
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  visibility?: ProjectVisibility;
  tags?: string[];
  category?: string;
  avatar?: string;
  color?: string;
}

/**
 * 專案查詢參數
 */
export interface ProjectQueryParams {
  search?: string;
  tags?: string[];
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'lastActivityAt';
  sortOrder?: 'asc' | 'desc';
  pageIndex?: number;
  pageSize?: number;
}

/**
 * 專案列表響應
 */
export interface ProjectListResponse {
  list: Project[];
  total: number;
}

