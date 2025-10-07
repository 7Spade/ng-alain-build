import { Injectable, inject, OnDestroy } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { interval, Subscription, switchMap, filter, catchError, EMPTY } from 'rxjs';
import { environment } from '@env/environment';
import { FirebaseTokenModel } from '../models/firebase-token.model';
import { DelonFirebaseTokenService } from './delon-firebase-token.service';

/**
 * 自動 Token 刷新服務
 * 實作雙策略刷新：
 * 1. 監聽 Firebase idToken 變化（主動）
 * 2. 定期檢查 Token 狀態（預防）
 */
@Injectable({ providedIn: 'root' })
export class AutoRefreshService implements OnDestroy {
  private auth = inject(Auth);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private delonTokenService = inject(DelonFirebaseTokenService);

  private idTokenSubscription?: Subscription;
  private periodicCheckSubscription?: Subscription;
  private isRunning = false;

  /**
   * 啟動自動刷新
   */
  start(): void {
    if (this.isRunning) {
      console.log('[Auto Refresh] 自動刷新已在運行中');
      return;
    }

    console.log('[Auto Refresh] 啟動自動 Token 刷新');
    this.isRunning = true;

    // 策略 1：監聽 Firebase idToken 變化
    this.startIdTokenMonitor();

    // 策略 2：定期檢查 Token 狀態
    this.startPeriodicCheck();
  }

  /**
   * 停止自動刷新
   */
  stop(): void {
    if (!this.isRunning) {
      console.log('[Auto Refresh] 自動刷新未運行');
      return;
    }

    console.log('[Auto Refresh] 停止自動 Token 刷新');
    this.isRunning = false;

    this.idTokenSubscription?.unsubscribe();
    this.periodicCheckSubscription?.unsubscribe();
  }

  /**
   * 重啟自動刷新
   */
  restart(): void {
    this.stop();
    this.start();
  }

  /**
   * 檢查是否正在運行
   */
  isActive(): boolean {
    return this.isRunning;
  }

  // ===== 私有方法 =====

  /**
   * 監聽 Firebase idToken 變化
   */
  private startIdTokenMonitor(): void {
    this.idTokenSubscription = idToken(this.auth).pipe(
      filter(token => !!token),
      catchError(err => {
        console.error('[Auto Refresh] idToken 監聽錯誤:', err);
        return EMPTY;
      })
    ).subscribe(async (token) => {
      console.log('[Auto Refresh] Firebase Token 已更新');

      try {
        // 同步到 @delon/auth
        await this.syncToken();
      } catch (error) {
        console.error('[Auto Refresh] Token 同步失敗:', error);
      }
    });
  }

  /**
   * 定期檢查 Token 狀態
   */
  private startPeriodicCheck(): void {
    // 每分鐘檢查一次
    const checkInterval = 60 * 1000;

    this.periodicCheckSubscription = interval(checkInterval).pipe(
      switchMap(() => this.checkAndRefresh()),
      catchError(err => {
        console.error('[Auto Refresh] 定期檢查錯誤:', err);
        return EMPTY;
      })
    ).subscribe();
  }

  /**
   * 檢查並刷新 Token
   */
  private async checkAndRefresh(): Promise<void> {
    const token = this.tokenService.get() as FirebaseTokenModel;
    
    if (!token || !token.expired) {
      return;
    }

    const expiresIn = token.expired - Date.now();
    const threshold = (environment.token?.refreshBefore || 5 * 60) * 1000;

    // 如果即將過期，刷新
    if (expiresIn <= threshold && expiresIn > 0) {
      const remainingSeconds = Math.floor(expiresIn / 1000);
      console.log(`[Auto Refresh] Token 即將過期，剩餘 ${remainingSeconds} 秒，開始刷新...`);
      
      await this.forceRefresh();
    } else if (expiresIn <= 0) {
      console.warn('[Auto Refresh] Token 已過期，需要重新登入');
    }
  }

  /**
   * 強制刷新 Token
   */
  private async forceRefresh(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      console.warn('[Auto Refresh] 無使用者，跳過刷新');
      return;
    }

    try {
      const newToken = await user.getIdToken(true);
      await this.syncToken();
      console.log('[Auto Refresh] Token 刷新成功');
    } catch (error) {
      console.error('[Auto Refresh] Token 刷新失敗:', error);
    }
  }

  /**
   * 同步 Token 到 @delon/auth
   */
  private async syncToken(): Promise<void> {
    try {
      await this.delonTokenService.syncFromFirebase();
    } catch (error) {
      console.error('[Auto Refresh] Token 同步失敗:', error);
      throw error;
    }
  }

  /**
   * 組件銷毀時清理
   */
  ngOnDestroy(): void {
    this.stop();
  }
}

