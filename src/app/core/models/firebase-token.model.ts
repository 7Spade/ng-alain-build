import { ITokenModel } from '@delon/auth';

/**
 * Firebase Token 模型
 * 整合 Firebase ID Token 與 @delon/auth Token 管理
 */
export interface FirebaseTokenModel extends ITokenModel {
  /** Firebase ID Token（JWT） */
  token: string;

  /** Token 過期時間（毫秒時間戳） */
  expired: number;

  // ===== Firebase 基礎欄位 =====
  /** Firebase 使用者 UID */
  uid?: string;

  /** 使用者 Email */
  email?: string;

  /** Email 是否已驗證 */
  email_verified?: boolean;

  /** 使用者顯示名稱 */
  name?: string;

  /** 使用者頭像 URL */
  picture?: string;

  // ===== Custom Claims（自訂欄位） =====
  /** 使用者角色（admin, user, viewer 等） */
  role?: string;

  /** 使用者權限列表 */
  permissions?: string[];

  /** 租戶/組織 ID（多租戶場景） */
  tenantId?: string;

  /** 允許訪問的租戶列表（多租戶場景） */
  tenants?: string[];

  /** 部門 ID */
  departmentId?: string;

  /** 是否為高級帳戶 */
  premium?: boolean;

  /** Custom Claims 最後更新時間 */
  claimsUpdatedAt?: number;

  // ===== Token 元數據 =====
  /** Token 簽發時間 */
  issuedAt?: string;

  /** Token 過期時間（ISO 字串） */
  expirationTime?: string;

  /** 認證提供者（google.com, password, etc.） */
  signInProvider?: string;

  /** 第二次登入提供者（用於連結帳戶） */
  signInSecondProvider?: string;

  // 允許其他自訂欄位
  [key: string]: any;
}

/**
 * Firebase 認證狀態
 */
export enum FirebaseAuthState {
  /** 未登入 */
  UNAUTHENTICATED = 'unauthenticated',

  /** 已登入 */
  AUTHENTICATED = 'authenticated',

  /** 登入中 */
  AUTHENTICATING = 'authenticating',

  /** Token 刷新中 */
  REFRESHING = 'refreshing',

  /** 登出中 */
  SIGNING_OUT = 'signing_out',

  /** 錯誤狀態 */
  ERROR = 'error'
}

/**
 * Firebase 登入方法
 */
export enum FirebaseLoginMethod {
  /** Email/Password */
  EMAIL_PASSWORD = 'password',

  /** Google */
  GOOGLE = 'google.com',

  /** Facebook */
  FACEBOOK = 'facebook.com',

  /** Microsoft */
  MICROSOFT = 'microsoft.com',

  /** Apple */
  APPLE = 'apple.com',

  /** 手機號碼 */
  PHONE = 'phone',

  /** 匿名 */
  ANONYMOUS = 'anonymous',

  /** 自訂 Token */
  CUSTOM_TOKEN = 'custom_token'
}

/**
 * Token 刷新選項
 */
export interface TokenRefreshOptions {
  /** 是否強制刷新 */
  forceRefresh?: boolean;

  /** 刷新失敗時的重試次數 */
  maxRetries?: number;

  /** 重試延遲（毫秒） */
  retryDelay?: number;

  /** 是否靜默刷新（不顯示錯誤訊息） */
  silent?: boolean;
}

/**
 * Firebase 認證事件
 */
export interface FirebaseAuthEvent {
  /** 事件類型 */
  type: 'login' | 'logout' | 'token_refresh' | 'token_expired' | 'auth_error';

  /** 事件時間戳 */
  timestamp: number;

  /** 使用者 UID（如有） */
  uid?: string;

  /** 登入方法（如有） */
  method?: FirebaseLoginMethod;

  /** 錯誤訊息（如有） */
  error?: string;

  /** 額外資料 */
  data?: any;
}
