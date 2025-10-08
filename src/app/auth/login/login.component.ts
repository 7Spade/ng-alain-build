import { HttpContext } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StartupService, FirebaseAuthService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN } from '@delon/auth';
import { I18nPipe, _HttpClient } from '@delon/theme';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    I18nPipe,
    NzCheckboxModule,
    NzAlertModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule
  ]
})
export class UserLoginComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly startupSrv = inject(StartupService);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly message = inject(NzMessageService);

  form = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required]], // Firebase: 移除 Mock 驗證模式
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true]
  });
  error = '';
  loading = false;

  // Firebase 登入模式
  useFirebase = true; // 設為 true 使用 Firebase，false 使用傳統 Mock API

  submit(): void {
    if (this.useFirebase) {
      this.loginWithFirebase();
    } else {
      this.loginWithMockAPI();
    }
  }

  /**
   * Firebase Email/Password 登入
   */
  loginWithFirebase(): void {
    if (!this.useFirebase) {
      this.message.warning('Firebase 登入未啟用');
      return;
    }

    // Firebase: 直接使用輸入的 email（不再添加 @example.com）
    const email = this.form.value.userName || '';
    const password = this.form.value.password || '';

    // 驗證 email 格式
    if (!email.includes('@')) {
      this.message.error('請輸入有效的 Email 地址');
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.firebaseAuth.loginWithEmailPassword(email, password).subscribe({
      next: () => {
        this.message.success('登入成功');
        this.loading = false;
        this.cdr.detectChanges();

        this.reuseTabService?.clear();

        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/dashboard';
          if (url.includes('/passport') || url.includes('/auth')) {
            url = '/dashboard';
          }
          this.router.navigateByUrl(url);
        });
      },
      error: (err: Error) => {
        this.error = err.message || '登入失敗';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Google 登入（使用 Redirect 模式）
   */
  loginWithGoogle(): void {
    if (!this.useFirebase) {
      this.message.warning('Firebase 登入未啟用');
      return;
    }

    // 儲存當前 URL，登入後返回
    const currentUrl = this.tokenService.referrer?.url || '/dashboard';
    sessionStorage.setItem('firebase_redirect_url', currentUrl);

    this.loading = true;
    this.cdr.detectChanges();

    // signInWithRedirect 會離開頁面，返回後在 FirebaseAuthService.handleRedirectResult 處理
    this.firebaseAuth.loginWithGoogle().subscribe({
      next: () => {
        // Redirect 模式下不會執行到這裡（已離開頁面）
      },
      error: (err: Error) => {
        this.message.error(err.message || 'Google 登入失敗');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * GitHub 登入
   */
  loginWithGitHub(): void {
    if (!this.useFirebase) {
      this.message.warning('Firebase 登入未啟用');
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.firebaseAuth.loginWithGitHub().subscribe({
      next: () => {
        this.message.success('GitHub 登入成功');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: Error) => {
        this.message.error(err.message || 'GitHub 登入失敗');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * 傳統 Mock API 登入
   */
  private loginWithMockAPI(): void {
    this.error = '';
    const { userName, password } = this.form.controls;
    userName.markAsDirty();
    userName.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    if (userName.invalid || password.invalid) {
      return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此加上 `ALLOW_ANONYMOUS` 表示不触发用户 Token 校验
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post(
        '/login/account',
        {
          userName: this.form.value.userName,
          password: this.form.value.password
        },
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          this.cdr.detectChanges();
          return;
        }
        // 清空路由複用與頁籤，避免殘留舊狀態
        this.reuseTabService?.clear();
        // 设置用户Token信息
        // TODO: Mock expired value
        res.user.expired = +new Date() + 1000 * 60 * 5;
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        // TODO: [OPTIMIZATION] Memory Leak Risk - 嵌套訂閱未正確管理
        // 建議：使用 switchMap 操作符避免嵌套訂閱，或確保在組件銷毀時取消訂閱
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/dashboard';
          if (url.includes('/passport') || url.includes('/auth')) {
            url = '/dashboard';
          }
          this.router.navigateByUrl(url);
        });
      });
  }

  ngOnDestroy(): void {
    // 組件銷毀時的清理工作
  }
}
