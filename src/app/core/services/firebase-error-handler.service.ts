import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';

/**
 * Firebase 錯誤資訊介面
 */
export interface FirebaseErrorInfo {
  /** 錯誤代碼 */
  code: string;

  /** 原始錯誤訊息 */
  message: string;

  /** 使用者友好的錯誤訊息 */
  userMessage: string;

  /** 嚴重程度 */
  severity: 'info' | 'warning' | 'error';

  /** 建議的操作 */
  suggestedAction?: string;
}

/**
 * Firebase 錯誤處理服務
 * 提供統一的 Firebase 錯誤處理和友好的錯誤訊息
 */
@Injectable({ providedIn: 'root' })
export class FirebaseErrorHandler {
  /**
   * 處理 Firebase 錯誤
   */
  handle(error: any): FirebaseErrorInfo {
    if (error instanceof FirebaseError) {
      return this.handleFirebaseError(error);
    }

    // 一般錯誤
    return {
      code: 'unknown',
      message: error.message || '未知錯誤',
      userMessage: '發生錯誤，請稍後再試',
      severity: 'error'
    };
  }

  /**
   * 處理 Firebase 特定錯誤
   */
  private handleFirebaseError(error: FirebaseError): FirebaseErrorInfo {
    const errorMap: Record<string, Omit<FirebaseErrorInfo, 'code' | 'message'>> = {
      // ===== 認證錯誤 =====
      'auth/user-not-found': {
        userMessage: '使用者不存在',
        severity: 'error',
        suggestedAction: '請檢查 Email 是否正確'
      },
      'auth/wrong-password': {
        userMessage: '密碼錯誤',
        severity: 'error',
        suggestedAction: '請重新輸入密碼或使用忘記密碼功能'
      },
      'auth/invalid-email': {
        userMessage: 'Email 格式錯誤',
        severity: 'error',
        suggestedAction: '請輸入有效的 Email 地址'
      },
      'auth/user-disabled': {
        userMessage: '帳號已被停用',
        severity: 'error',
        suggestedAction: '請聯繫管理員'
      },
      'auth/email-already-in-use': {
        userMessage: 'Email 已被使用',
        severity: 'error',
        suggestedAction: '請使用其他 Email 或嘗試登入'
      },
      'auth/weak-password': {
        userMessage: '密碼強度不足',
        severity: 'warning',
        suggestedAction: '密碼至少需要 6 個字元'
      },
      'auth/invalid-password': {
        userMessage: '密碼無效',
        severity: 'error',
        suggestedAction: '密碼至少需要 6 個字元'
      },

      // ===== 登入方式錯誤 =====
      'auth/operation-not-allowed': {
        userMessage: '此登入方式未啟用',
        severity: 'error',
        suggestedAction: '請聯繫管理員啟用此登入方式'
      },
      'auth/popup-closed-by-user': {
        userMessage: '登入視窗已關閉',
        severity: 'warning',
        suggestedAction: '請重新嘗試登入'
      },
      'auth/popup-blocked': {
        userMessage: '瀏覽器阻擋了登入視窗',
        severity: 'warning',
        suggestedAction: '請允許瀏覽器彈出視窗'
      },
      'auth/cancelled-popup-request': {
        userMessage: '登入請求已取消',
        severity: 'info',
        suggestedAction: '請重新嘗試登入'
      },

      // ===== 網路錯誤 =====
      'auth/network-request-failed': {
        userMessage: '網路連接失敗',
        severity: 'error',
        suggestedAction: '請檢查您的網路連接'
      },
      'auth/timeout': {
        userMessage: '請求逾時',
        severity: 'warning',
        suggestedAction: '請稍後再試'
      },

      // ===== 請求限制 =====
      'auth/too-many-requests': {
        userMessage: '請求過於頻繁',
        severity: 'warning',
        suggestedAction: '請稍後再試或使用其他登入方式'
      },

      // ===== Token 錯誤 =====
      'auth/id-token-expired': {
        userMessage: '登入已過期',
        severity: 'warning',
        suggestedAction: '請重新登入'
      },
      'auth/id-token-revoked': {
        userMessage: '登入憑證已失效',
        severity: 'error',
        suggestedAction: '請重新登入'
      },
      'auth/invalid-id-token': {
        userMessage: '無效的登入憑證',
        severity: 'error',
        suggestedAction: '請重新登入'
      },
      'auth/session-cookie-expired': {
        userMessage: '會話已過期',
        severity: 'warning',
        suggestedAction: '請重新登入'
      },
      'auth/session-cookie-revoked': {
        userMessage: '會話已失效',
        severity: 'error',
        suggestedAction: '請重新登入'
      },

      // ===== 使用者操作錯誤 =====
      'auth/invalid-credential': {
        userMessage: '無效的登入憑證',
        severity: 'error',
        suggestedAction: '請檢查您的登入資訊'
      },
      'auth/account-exists-with-different-credential': {
        userMessage: '此 Email 已使用其他方式註冊',
        severity: 'warning',
        suggestedAction: '請使用原本的登入方式'
      },
      'auth/credential-already-in-use': {
        userMessage: '此憑證已被其他帳號使用',
        severity: 'error',
        suggestedAction: '請使用其他帳號'
      },

      // ===== 權限錯誤 =====
      'auth/unauthorized-domain': {
        userMessage: '未授權的網域',
        severity: 'error',
        suggestedAction: '請從授權的網域訪問'
      },
      'auth/invalid-api-key': {
        userMessage: 'API Key 無效',
        severity: 'error',
        suggestedAction: '請聯繫管理員'
      },
      'auth/app-deleted': {
        userMessage: 'Firebase 應用已刪除',
        severity: 'error',
        suggestedAction: '請聯繫管理員'
      },

      // ===== 其他錯誤 =====
      'auth/missing-email': {
        userMessage: '缺少 Email',
        severity: 'error',
        suggestedAction: '請提供 Email 地址'
      },
      'auth/missing-password': {
        userMessage: '缺少密碼',
        severity: 'error',
        suggestedAction: '請提供密碼'
      },
      'auth/internal-error': {
        userMessage: '系統內部錯誤',
        severity: 'error',
        suggestedAction: '請稍後再試或聯繫技術支援'
      }
    };

    const errorInfo = errorMap[error.code];

    if (errorInfo) {
      return {
        code: error.code,
        message: error.message,
        ...errorInfo
      };
    }

    // 未知的 Firebase 錯誤
    return {
      code: error.code,
      message: error.message,
      userMessage: `認證錯誤: ${error.code}`,
      severity: 'error',
      suggestedAction: '請稍後再試'
    };
  }

  /**
   * 取得簡短的錯誤訊息
   */
  getShortMessage(error: any): string {
    const info = this.handle(error);
    return info.userMessage;
  }

  /**
   * 取得完整的錯誤訊息（包含建議操作）
   */
  getFullMessage(error: any): string {
    const info = this.handle(error);
    return info.suggestedAction ? `${info.userMessage}\n${info.suggestedAction}` : info.userMessage;
  }

  /**
   * 記錄錯誤到控制台
   */
  logError(error: any): void {
    const info = this.handle(error);

    const logMethod = info.severity === 'error' ? console.error : info.severity === 'warning' ? console.warn : console.info;

    logMethod('[Firebase Error]', {
      code: info.code,
      message: info.message,
      userMessage: info.userMessage,
      severity: info.severity,
      suggestedAction: info.suggestedAction
    });
  }
}
