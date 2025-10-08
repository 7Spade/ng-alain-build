import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { default as ngLang } from '@angular/common/locales/zh';
import { ApplicationConfig, EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getAuth, provideAuth as provideFirebaseAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withHashLocation,
  RouterFeatures,
  withViewTransitions,
  RouteReuseStrategy
} from '@angular/router';
import { I18NService, defaultInterceptor, provideBindAuthRefresh, provideStartup } from '@core';
import { provideCellWidgets } from '@delon/abc/cell';
import { provideSTWidgets } from '@delon/abc/st';
import { provideAuth } from '@delon/auth';
import { provideSFConfig } from '@delon/form';
import { AlainProvideLang, provideAlain, zh_CN as delonLang } from '@delon/theme';
import { AlainConfig } from '@delon/util/config';
import { environment } from '@env/environment';
import { firebaseConfig, recaptchaEnterpriseSiteKey } from '@env/firebase.config';
import { CELL_WIDGETS, SF_WIDGETS, ST_WIDGETS } from '@shared';
import { zhCN as dateLang } from 'date-fns/locale';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN as zorroLang } from 'ng-zorro-antd/i18n';

import { ICONS } from '../style-icons';
import { ICONS_AUTO } from '../style-icons-auto';
import { routes } from './app.routes';
import { firebaseAuthInterceptor } from './core/net/firebase-auth.interceptor';
import { organizationInterceptor } from './core/net/organization.interceptor';
import { AutoRefreshService } from './core/services/auto-refresh.service';
import { SimpleReuseStrategy } from './core/services/tab/simple-reuse-strategy';

const defaultLang: AlainProvideLang = {
  abbr: 'zh-CN',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang
};

const alainConfig: AlainConfig = {
  st: { modal: { size: 'lg' } },
  pageHeader: { homeI18n: 'home' },
  lodop: {
    license: `A59B099A586B3851E0F0D7FDBF37B603`,
    licenseA: `C94CEE276DB2187AE6B65D56B3FC2848`
  },
  auth: { login_url: '/auth/login' }
};

const ngZorroConfig: NzConfig = {};

const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withViewTransitions(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
];
if (environment.useHash) routerFeatures.push(withHashLocation());

const providers: Array<Provider | EnvironmentProviders> = [
  // HTTP & Interceptors
  // TODO(FIREBASE_REFACTOR_P0): 恢復 ng-alain 原始攔截器架構
  // - 移除 firebaseAuthInterceptor (自製攔截器違反架構原則)
  // - 移除 organizationInterceptor (應整合到 defaultInterceptor)
  // - 恢復 authSimpleInterceptor (@delon/auth 核心攔截器)
  // - 只保留: authSimpleInterceptor + defaultInterceptor
  // 參考: FIREBASE_REFACTOR_PLAN.md 階段 1
  provideHttpClient(
    withInterceptors([
      ...(environment.interceptorFns ?? []),
      // 注意：使用 Firebase 認證時，移除 authSimpleInterceptor 避免衝突
      // authSimpleInterceptor 會檢查 @delon token，但 Firebase token 同步有延遲
      firebaseAuthInterceptor, // Firebase Token 附加（會自動同步到 @delon）
      organizationInterceptor,
      defaultInterceptor
    ])
  ),
  provideAnimations(),
  provideRouter(routes, ...routerFeatures),
  // 路由復用策略（支持多頁簽）
  { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },

  // ng-alain & ng-zorro
  provideAlain({ config: alainConfig, defaultLang, i18nClass: I18NService, icons: [...ICONS_AUTO, ...ICONS] }),
  provideNzConfig(ngZorroConfig),

  // @delon/auth (認證系統)
  provideAuth(),
  // TODO(FIREBASE_REFACTOR_P0): 配置 FirebaseTokenAdapter
  // - 創建 src/app/core/adapters/firebase-token.adapter.ts
  // - 實作 ITokenService 介面
  // - 使用 { provide: DA_SERVICE_TOKEN, useClass: FirebaseTokenAdapter }
  // 參考: FIREBASE_REFACTOR_PLAN.md 階段 1 (Line 185-300)

  // Firebase 整合
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirebaseAuth(() => getAuth()),
  provideAnalytics(() => getAnalytics()),
  ScreenTrackingService,
  UserTrackingService,
  provideAppCheck(() => {
    // TODO: 從 https://console.cloud.google.com/security/recaptcha?project=elite-chiller-455712-c4 獲取 reCAPTCHA Enterprise site key
    const provider = new ReCaptchaEnterpriseProvider(recaptchaEnterpriseSiteKey);
    return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
  }),
  provideFirestore(() => getFirestore()),
  provideMessaging(() => getMessaging()),
  providePerformance(() => getPerformance()),
  provideStorage(() => getStorage()),
  provideRemoteConfig(() => getRemoteConfig()),
  // TODO: Migrate to new Firebase AI SDK when @angular/fire supports it
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  provideVertexAI(() => getVertexAI()),

  // @delon Widgets & Forms
  provideCellWidgets(...CELL_WIDGETS),
  provideSTWidgets(...ST_WIDGETS),
  provideSFConfig({ widgets: SF_WIDGETS }),

  // Startup Service
  provideStartup(),

  // TODO(FIREBASE_REFACTOR_P0): 移除 AutoRefreshService 初始化
  // Firebase SDK 自動管理 Token 刷新，無需手動實作
  // 此服務將在階段 5 刪除
  // 參考: FIREBASE_REFACTOR_PLAN.md 階段 5 (Line 657-712)
  // Firebase Auto Refresh Service (初始化)
  provideAppInitializer(() => {
    const autoRefresh = inject(AutoRefreshService);
    // 啟動自動 Token 刷新
    autoRefresh.start();
    console.log('[App Init] Firebase Auto Refresh 已啟動');
  }),

  // Environment Providers
  ...(environment.providers || [])
];

// If you use `@delon/auth` to refresh the token, additional registration `provideBindAuthRefresh` is required
if (environment.api?.refreshTokenEnabled && environment.api.refreshTokenType === 'auth-refresh') {
  providers.push(provideBindAuthRefresh());
}

export const appConfig: ApplicationConfig = {
  providers: providers
};
