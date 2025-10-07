/**
 * 專案檔案模型
 *
 * @description 專案檔案管理相關資料結構
 */

/**
 * 專案檔案實體
 */
export interface ProjectFile {
  // 基本資訊
  id: string; // 檔案 ID
  projectId: string; // 所屬專案 ID
  name: string; // 檔案名稱
  path: string; // 檔案路徑（支援資料夾）
  size: number; // 檔案大小（bytes）
  mimeType: string; // MIME 類型

  // 上傳資訊
  uploadedBy: string; // 上傳者 ID
  uploadedByName?: string; // 上傳者名稱
  uploadedAt: Date;

  // 下載資訊
  downloadUrl?: string; // 下載 URL
  downloadCount: number; // 下載次數

  // 檔案狀態
  status: ProjectFileStatus;
  progress?: number; // 上傳進度（0-100）

  // 預覽
  thumbnailUrl?: string; // 縮圖 URL
  isImage: boolean; // 是否為圖片

  // 資料夾
  isFolder: boolean; // 是否為資料夾
  children?: ProjectFile[]; // 子檔案（如果是資料夾）
}

/**
 * 檔案狀態
 */
export type ProjectFileStatus = 'uploading' | 'done' | 'error' | 'processing';

/**
 * 檔案上傳請求
 */
export interface UploadFileRequest {
  file: File;
  path?: string; // 上傳到的路徑
  projectId: string;
}

/**
 * 檔案查詢參數
 */
export interface FileQueryParams {
  projectId: string;
  path?: string; // 資料夾路徑
  search?: string; // 搜尋檔案名
  sortBy?: 'name' | 'size' | 'uploadedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 檔案列表響應
 */
export interface FileListResponse {
  files: ProjectFile[];
  total: number;
  currentPath: string;
}

/**
 * 創建資料夾請求
 */
export interface CreateFolderRequest {
  projectId: string;
  path: string; // 父路徑
  folderName: string;
}

/**
 * 檔案操作類型
 */
export type FileOperation = 'upload' | 'download' | 'delete' | 'rename' | 'move';
