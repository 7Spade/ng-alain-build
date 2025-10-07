import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@angular/fire/auth';
import { StartupService, FirebaseAuthService } from '@core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { take } from 'rxjs/operators';

/**
 * Firebase 認證回調組件
 * 處理 Firebase Redirect 登入後的回調
 */
@Component({
  selector: 'app-callback',
  template: `
    <div class="callback-container">
      @if (loading) {
        <nz-spin nzSize="large" nzTip="正在處理登入，請稍候...">
          <div class="spin-content"></div>
        </nz-spin>
      }

      @if (error) {
        <nz-result nzStatus="error" nzTitle="登入失敗" [nzSubTitle]="error">
          <div nz-result-extra>
            <button nz-button nzType="primary" (click)="goToLogin()"> 返回登入頁 </button>
          </div>
        </nz-result>
      }
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f0f2f5;
      }

      .spin-content {
        min-height: 200px;
        min-width: 200px;
      }

      :host ::ng-deep .ant-result {
        padding: 48px 32px;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, NzSpinModule, NzAlertModule, NzResultModule, NzButtonModule]
})
export class CallbackComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebaseAuth = inject(FirebaseAuthService);
  private startupSrv = inject(StartupService);

  loading = true;
  error = '';

  ngOnInit(): void {
    this.handleCallback();
  }

  /**
   * 處理 Firebase 認證回調
   */
  private handleCallback(): void {
    console.log('[Callback] 開始處理 Firebase 認證回調...');

    // Firebase 使用 Redirect 方式時，會自動處理回調
    // 我們只需要檢查認證狀態
    this.firebaseAuth.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          console.log('[Callback] 認證成功:', user.email);
          this.onCallbackSuccess();
        } else {
          console.error('[Callback] 認證失敗：無使用者');
          this.error = '認證失敗，請重新登入';
          this.loading = false;

          // 2 秒後自動跳轉回登入頁
          setTimeout(() => this.goToLogin(), 2000);
        }
      },
      error: (err: Error) => {
        console.error('[Callback] 認證過程發生錯誤:', err);
        this.error = err.message || '認證過程發生錯誤';
        this.loading = false;

        // 2 秒後自動跳轉回登入頁
        setTimeout(() => this.goToLogin(), 2000);
      }
    });
  }

  /**
   * 回調成功處理
   */
  private onCallbackSuccess(): void {
    // 從 URL 獲取 redirect 參數（登入前的頁面）
    const redirect = this.route.snapshot.queryParams['redirect'] || '/dashboard';

    // 重新載入應用資料
    this.startupSrv.load().subscribe({
      next: () => {
        console.log('[Callback] 應用資料載入完成，導航至:', redirect);
        this.router.navigateByUrl(redirect);
      },
      error: err => {
        console.error('[Callback] 應用資料載入失敗:', err);
        // 即使載入失敗也導航至首頁
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  /**
   * 返回登入頁
   */
  goToLogin(): void {
    this.router.navigateByUrl('/auth/login');
  }
}
