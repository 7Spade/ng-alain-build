// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as MOCKDATA from '@_mock';
import { mockInterceptor, provideMockConfig } from '@delon/mock';
import { Environment } from '@delon/theme';

export const environment = {
  production: false,
  useHash: true,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'firebase' as any // 'firebase' | 're-request' | 'auth-refresh'
  },
  // Firebase Token 配置
  token: {
    expiresIn: 60 * 60, // 1 小時
    refreshBefore: 5 * 60, // 過期前 5 分鐘刷新
    maxRetries: 3, // 最大重試次數
    retryDelay: 1000 // 重試延遲（毫秒）
  },
  providers: [provideMockConfig({ data: MOCKDATA })],
  interceptorFns: [mockInterceptor]
} as Environment;
