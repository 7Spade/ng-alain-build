import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'firebase' as any // 使用 Firebase 刷新模式
  },
  // Firebase Token 配置
  token: {
    expiresIn: 60 * 60, // 1 小時
    refreshBefore: 5 * 60, // 過期前 5 分鐘刷新
    maxRetries: 3, // 最大重試次數
    retryDelay: 1000 // 重試延遲（毫秒）
  }
} as Environment;
