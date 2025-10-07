/**
 * 專案相關常數定義
 * 
 * 集中管理專案屬性的標籤、顏色、映射等常數
 * 避免在多個組件中重複定義
 */

/**
 * 專案狀態
 */
export type ProjectStatus = 'active' | 'archived' | 'deleted';

/**
 * 專案可見性
 */
export type ProjectVisibility = 'public' | 'private' | 'internal';

/**
 * 專案擁有者類型
 */
export type ProjectOwnerType = 'personal' | 'organization';

/**
 * 專案狀態標籤
 */
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: '活躍',
  archived: '已歸檔',
  deleted: '已刪除'
};

/**
 * 專案狀態顏色
 */
export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  active: 'success',
  archived: 'default',
  deleted: 'error'
};

/**
 * 專案可見性標籤
 */
export const PROJECT_VISIBILITY_LABELS: Record<ProjectVisibility, string> = {
  public: '公開',
  private: '私有',
  internal: '內部'
};

/**
 * 專案可見性描述
 */
export const PROJECT_VISIBILITY_DESCRIPTIONS: Record<ProjectVisibility, string> = {
  public: '任何人都可以查看',
  private: '僅成員可以查看',
  internal: '組織內部可見'
};

/**
 * 專案擁有者類型標籤
 */
export const PROJECT_OWNER_TYPE_LABELS: Record<ProjectOwnerType, string> = {
  personal: '個人',
  organization: '組織'
};

/**
 * 專案預設顏色
 */
export const PROJECT_DEFAULT_COLOR = '#1890ff';

/**
 * 專案預設頭像
 */
export const PROJECT_DEFAULT_AVATAR = 'folder';

