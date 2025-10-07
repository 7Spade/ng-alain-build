// # 3rd Party Library
// If the library doesn't have typings available at `@types/`,
// you can still use it by manually adding typings for it

// Extend @delon/theme Environment type to support Firebase
declare module '@delon/theme' {
  interface Environment {
    api?: {
      baseUrl?: string;
      refreshTokenEnabled?: boolean;
      refreshTokenType?: 're-request' | 'auth-refresh' | 'firebase';
      [key: string]: any;
    };
    token?: {
      expiresIn?: number;
      refreshBefore?: number;
      maxRetries?: number;
      retryDelay?: number;
    };
    [key: string]: any;
  }
}
