import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, Provider, inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, zip, catchError, map, switchMap, from } from 'rxjs';

import { I18NService } from '../i18n/i18n.service';
import { ModeService, ModeType } from '../services/mode/mode.service';
import { OrganizationContextService } from '../services/organization-context/organization-context.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
export function provideStartup(): Array<Provider | EnvironmentProviders> {
  return [
    StartupService,
    provideAppInitializer(() => {
      const initializerFn = (
        (startupService: StartupService) => () =>
          startupService.load()
      )(inject(StartupService));
      return initializerFn();
    })
  ];
}

@Injectable()
export class StartupService {
  private menuService = inject(MenuService);
  private settingService = inject(SettingsService);
  private aclService = inject(ACLService);
  private titleService = inject(TitleService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private i18n = inject<I18NService>(ALAIN_I18N_TOKEN);
  private modeService = inject(ModeService);
  private orgContextService = inject(OrganizationContextService);

  private appData: NzSafeAny | null = null;

  load(): Observable<void> {
    const defaultLang = this.i18n.defaultLang;
    // If http request allows anonymous access, you need to add `ALLOW_ANONYMOUS`:
    // this.httpClient.get('/app', { context: new HttpContext().set(ALLOW_ANONYMOUS, this.tokenService.get()?.token ? false : true) })
    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('./assets/tmp/app-data.json')).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      switchMap(async ([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        // setting language data
        this.i18n.use(defaultLang, langData);

        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(appData.app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(appData.user);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 保存 appData 供後續模式切換使用
        this.appData = appData;

        // 初始化組織上下文（多組織切換功能）
        // 注意：這會覆蓋 ModeService 的菜單，所以只在有 userOrganizations 時才初始化
        if (appData.userOrganizations) {
          await this.orgContextService.initialize();
        } else {
          // 回退到原有的模式切換機制
          const initialMode: ModeType = this.modeService.getCurrentMode();
          this.applyMenuByMode(initialMode);
          // 監聽模式變更，動態切換選單
          this.modeService.mode$.subscribe(mode => this.applyMenuByMode(mode));
        }

        // 设置页面标题的后缀
        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }

  private applyMenuByMode(mode: ModeType): void {
    if (!this.appData) return;
    // 支援新舊結構：優先使用 appData.menus[mode]，否則回退 appData.menu
    const menus = this.appData.menus as NzSafeAny | undefined;
    const items = menus?.[mode] ?? this.appData.menu ?? [];
    this.menuService.clear();
    this.menuService.add(items);
  }
}
