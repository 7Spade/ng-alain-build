import { Component, inject, OnInit, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { ThemeBtnComponent } from '@delon/theme/theme-btn';
import { environment } from '@env/environment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { HeaderClearStorageComponent } from './widgets/clear-storage.component';
import { HeaderFullScreenComponent } from './widgets/fullscreen.component';
import { HeaderI18nComponent } from './widgets/i18n.component';
import { HeaderIconComponent } from './widgets/icon.component';
import { HeaderNotifyComponent } from './widgets/notify.component';
import { HeaderRTLComponent } from './widgets/rtl.component';
import { HeaderSearchComponent } from './widgets/search.component';
import { HeaderTaskComponent } from './widgets/task.component';
import { HeaderUserComponent } from './widgets/user.component';
import { OrgSwitcherComponent } from './widgets/org-switcher.component';
import { TabComponent } from '../widgets/tab/tab.component';
import { TabService } from '@core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModeService, ModeType } from '@core';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl" [customError]="null">
      <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//github.com/ng-alain/ng-alain" target="_blank">
          <i nz-icon nzType="github"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="left" hidden="mobile">
        <a layout-default-header-item-trigger routerLink="/auth/lock">
          <i nz-icon nzType="lock"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="left" hidden="pc">
        <div layout-default-header-item-trigger (click)="searchToggleStatus = !searchToggleStatus">
          <i nz-icon nzType="search"></i>
        </div>
      </layout-default-header-item>
      <layout-default-header-item direction="middle">
        <header-search class="alain-default__search" [(toggleChange)]="searchToggleStatus" />
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <header-notify />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <header-task />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <header-icon />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <div layout-default-header-item-trigger nz-dropdown [nzDropdownMenu]="settingsMenu" nzTrigger="click" nzPlacement="bottomRight">
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div nz-menu-item>
              <header-rtl />
            </div>
            <div nz-menu-item>
              <header-fullscreen />
            </div>
            <div nz-menu-item>
              <header-clear-storage />
            </div>
            <div nz-menu-item>
              <header-i18n />
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <header-user [user]="user" />
      </layout-default-header-item>
      <ng-template #asideUserTpl>
        <!-- 組織切換器 -->
        <org-switcher />
      </ng-template>
      <ng-template #contentTpl>
        <app-tab />
        <router-outlet />
      </ng-template>
    </layout-default>
    @if (showSettingDrawer) {
      <setting-drawer />
    }
    <theme-btn />
  `,
  imports: [
    RouterOutlet,
    RouterLink,
    LayoutDefaultModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    SettingDrawerModule,
    ThemeBtnComponent,
    HeaderSearchComponent,
    HeaderNotifyComponent,
    HeaderTaskComponent,
    HeaderIconComponent,
    HeaderRTLComponent,
    HeaderI18nComponent,
    HeaderClearStorageComponent,
    HeaderFullScreenComponent,
    HeaderUserComponent,
    OrgSwitcherComponent,
    TabComponent
  ]
})
export class LayoutBasicComponent implements OnInit {
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tabService = inject(TabService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modeService = inject(ModeService);
  private readonly cdr = inject(ChangeDetectorRef);
  
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  private currentMode: ModeType = this.modeService.getCurrentMode();
  
  get user(): User {
    return this.settings.user;
  }

  switchMode(mode: ModeType): void {
    this.modeService.setMode(mode);
  }

  ngOnInit(): void {
    // 監聽路由導航，自動添加 Tab
    this.router.events
      .pipe(
        filter((event: NzSafeAny) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.addTabFromRoute();
      });

    // 初始路由添加 Tab
    setTimeout(() => {
      this.addTabFromRoute();
    });

    this.modeService.mode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(mode => {
      this.currentMode = mode;
      this.cdr.markForCheck();
    });
  }

  /**
   * 從當前路由添加 Tab
   */
  private addTabFromRoute(): void {
    let snapshot = this.activatedRoute.snapshot;
    
    // 下鑽到最深層路由
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }

    // 獲取路由標題
    const title = snapshot.data['title'] || snapshot.data['titleI18n'] || '未命名';
    
    // 如果沒有配置 key，則不添加 Tab
    if (!snapshot.data['key']) {
      return;
    }

    // 收集路由快照
    const snapshotArray: ActivatedRouteSnapshot[] = [];
    let temp: ActivatedRouteSnapshot | null = snapshot;
    while (temp) {
      snapshotArray.push(temp);
      temp = temp.parent;
    }

    // 添加 Tab
    this.tabService.addTab({
      title,
      path: this.router.url,
      snapshotArray: snapshotArray.reverse()
    });

    // 更新當前 Tab 索引
    this.tabService.findIndex(this.router.url);
  }
}
