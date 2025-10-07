/**
 * 組織管理模組 - 通用資料模型
 *
 * @description 定義通用的資料結構和工具類型
 */

/**
 * 查詢參數介面
 */
export interface QueryParams {
  /** 頁碼（從 1 開始） */
  page?: number;

  /** 每頁數量 */
  pageSize?: number;

  /** 搜尋關鍵字 */
  search?: string;

  /** 排序欄位 */
  sortBy?: string;

  /** 排序方向 */
  sortOrder?: 'asc' | 'desc';

  /** 過濾條件 */
  filters?: Record<string, any>;
}

/**
 * 分頁結果介面
 */
export interface PagedResult<T> {
  /** 資料列表 */
  data: T[];

  /** 總數量 */
  total: number;

  /** 當前頁碼 */
  page: number;

  /** 每頁數量 */
  pageSize: number;

  /** 總頁數 */
  totalPages: number;

  /** 是否有下一頁 */
  hasNext: boolean;

  /** 是否有上一頁 */
  hasPrev: boolean;
}

/**
 * API 響應介面
 */
export interface ApiResponse<T> {
  /** 狀態碼 */
  code: number;

  /** 訊息 */
  message: string;

  /** 資料 */
  data: T;

  /** 時間戳 */
  timestamp: number;
}

/**
 * 批次操作請求
 */
export interface BatchOperationRequest {
  /** ID 列表 */
  ids: string[];

  /** 操作類型 */
  operation: 'delete' | 'activate' | 'deactivate' | 'archive';
}

/**
 * 批次操作結果
 */
export interface BatchOperationResult {
  /** 成功數量 */
  successCount: number;

  /** 失敗數量 */
  failureCount: number;

  /** 失敗項目詳情 */
  failures?: Array<{
    id: string;
    error: string;
  }>;
}

/**
 * 樹節點選項（用於 nz-tree）
 */
export interface TreeNodeOption {
  /** 節點標題 */
  title: string;

  /** 節點鍵值 */
  key: string;

  /** 是否展開 */
  expanded?: boolean;

  /** 是否為葉子節點 */
  isLeaf?: boolean;

  /** 子節點 */
  children?: TreeNodeOption[];

  /** 原始資料 */
  origin?: any;

  /** 是否禁用 */
  disabled?: boolean;

  /** 圖標 */
  icon?: string;
}

/**
 * 排序選項
 */
export interface SortOption {
  /** 排序欄位 */
  field: string;

  /** 排序方向 */
  direction: 'asc' | 'desc';
}

/**
 * 過濾選項
 */
export interface FilterOption {
  /** 過濾欄位 */
  field: string;

  /** 過濾操作符 */
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between';

  /** 過濾值 */
  value: any;
}

/**
 * 匯出選項
 */
export interface ExportOptions {
  /** 匯出格式 */
  format: 'xlsx' | 'csv' | 'pdf';

  /** 匯出欄位 */
  fields?: string[];

  /** 檔案名稱 */
  filename?: string;

  /** 查詢參數 */
  params?: QueryParams;
}
