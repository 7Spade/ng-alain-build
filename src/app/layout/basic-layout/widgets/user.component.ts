import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { I18nPipe, User } from '@delon/theme';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabService } from '@core';
import { ModeService, ModeType } from '@core';
import { SimpleReuseStrategy } from '@core';
import { OrganizationFormComponent } from '../../../features/organization/components/organization-form';
import { OrganizationService } from '../../../features/organization/services/organization.service';
import { CreateOrganizationRequest } from '../../../features/organization/models';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar [nzSrc]="avatarSrc" nzSize="small" class="mr-sm" />
      {{ user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="switchMode('user')">
          <i nz-icon nzType="user-switch" class="mr-sm"></i>
          {{ 'menu.switcher.user' | i18n }}
        </div>
        <div nz-menu-item (click)="switchMode('org')">
          <i nz-icon nzType="team" class="mr-sm"></i>
          {{ 'menu.switcher.org' | i18n }}
        </div>
        <div nz-menu-item (click)="switchMode('demo')">
          <i nz-icon nzType="appstore" class="mr-sm"></i>
          {{ 'menu.switcher.demo' | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item routerLink="/organization">
          <i nz-icon nzType="team" class="mr-sm"></i>
          {{ 'menu.account.organization' | i18n }}
        </div>
        <div nz-menu-item (click)="createOrganization()">
          <i nz-icon nzType="plus-circle" class="mr-sm"></i>
          {{ 'menu.account.organization-new' | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item routerLink="/exception/trigger">
          <i nz-icon nzType="close-circle" class="mr-sm"></i>
          {{ 'menu.account.trigger' | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzDropDownModule, NzMenuModule, NzIconModule, I18nPipe, NzAvatarModule]
})
export class HeaderUserComponent implements OnInit {
  @Input() user!: User;
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly tabService = inject(TabService);
  private readonly modeService = inject(ModeService);
  private readonly cdr = inject(ChangeDetectorRef);

  private currentMode: ModeType = this.modeService.getCurrentMode();

  get avatarSrc(): string {
    switch (this.currentMode) {
      case 'org':
        return './assets/tmp/img/2.png';
      case 'demo':
        return './assets/tmp/img/3.png';
      default:
        return this.user?.avatar ?? './assets/tmp/img/avatar.svg';
    }
  }

  ngOnInit(): void {
    this.modeService.mode$.subscribe(mode => {
      this.currentMode = mode;
      this.cdr.markForCheck();
    });
  }
  private readonly modalSrv = inject(NzModalService);
  private readonly orgService = inject(OrganizationService);
  private readonly message = inject(NzMessageService);

  logout(): void {
    // 清空自訂路由復用與頁籤，避免回到舊狀態
    SimpleReuseStrategy.deleteAllRouteSnapshot(this.activatedRoute.snapshot).then(() => {
      this.tabService.clearTabs();
      this.tokenService.clear();
      this.router.navigateByUrl(this.tokenService.login_url!);
    });
  }

  switchMode(mode: ModeType): void {
    this.modeService.setMode(mode);
  }

  /**
   * 創建新組織（使用 Modal 彈窗）
   * @description 符合設計決策：使用 Modal 而非路由跳轉
   */
  createOrganization(): void {
    const modal = this.modalSrv.create({
      nzTitle: '新增組織',
      nzContent: OrganizationFormComponent,
      nzWidth: window.innerWidth < 768 ? '90%' : 600,  // 響應式寬度
      nzMaskClosable: false,  // 防止誤觸關閉
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        },
        {
          label: '確定',
          type: 'primary',
          autoLoading: true,  // 自動處理 loading 狀態
          onClick: (componentInstance: OrganizationFormComponent | undefined) => {
            // 調用組件的 submit 方法
            if (!componentInstance) {
              return Promise.reject(new Error('組件實例不存在'));
            }
            return componentInstance.submit().then((formValue: CreateOrganizationRequest) => {
              // 提交到後端
              return this.orgService.createOrganization(formValue).toPromise().then(() => {
                this.message.success('組織創建成功');
                modal.destroy();
                // 可選：重新加載組織列表或切換到新組織
              });
            }).catch((error: Error) => {
              // 驗證失敗時不關閉 Modal
              console.error('表單驗證失敗', error);
              // 組件已自動標記錯誤欄位，無需額外處理
            });
          }
        }
      ]
    });
  }
}
