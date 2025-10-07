/**
 * 組織上下文 HTTP 攔截器
 *
 * @description 自動為 HTTP 請求添加當前組織 ID
 * @usage 確保後端能識別請求來自哪個組織
 */

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { OrganizationContextService } from '../services/organization-context/organization-context.service';

/**
 * 組織上下文攔截器
 *
 * @description 為組織請求自動添加 X-Organization-Id 頭
 */
export const organizationInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // 獲取組織上下文服務
  const contextService = inject(OrganizationContextService);
  const currentOrgId = contextService.currentOrgId();

  // 排除不需要組織 ID 的請求
  const excludedUrls = [
    '/auth/',
    '/passport/',
    '/assets/',
    'app-data.json',
    '/user/organizations' // 獲取組織列表本身不需要組織 ID
  ];

  const shouldExclude = excludedUrls.some(url => req.url.includes(url));

  // 如果是個人空間或排除的 URL，不添加組織 ID
  if (!currentOrgId || shouldExclude) {
    return next(req);
  }

  // 為組織請求添加組織 ID 頭
  const clonedReq = req.clone({
    setHeaders: {
      'X-Organization-Id': currentOrgId
    }
  });

  return next(clonedReq);
};
