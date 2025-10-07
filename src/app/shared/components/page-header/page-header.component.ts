import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

/**
 * 頁面標題配置介面
 */
export interface PageHeaderType {
  /** 頁面標題 */
  title: string;
  /** 描述內容（支持字串或模板） */
  desc: string | TemplateRef<NzSafeAny>;
  /** 額外內容（支持字串或模板） */
  extra: string | TemplateRef<NzSafeAny>;
  /** 麵包屑路徑陣列 */
  breadcrumb: string[];
  /** 底部內容（支持字串或模板） */
  footer: string | TemplateRef<NzSafeAny>;
}

/**
 * 頁面標題組件
 * @description 統一的頁面標題和麵包屑組件
 * @example
 * ```html
 * <app-page-header [pageHeaderInfo]="pageHeaderInfo"></app-page-header>
 * ```
 * ```typescript
 * pageHeaderInfo = {
 *   title: '部門管理',
 *   breadcrumb: ['首頁', '系統管理', '部門管理']
 * };
 * ```
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzPageHeaderModule, NzBreadCrumbModule, NzOutletModule]
})
export class PageHeaderComponent {
  private router = inject(Router);

  /** 返回按鈕模板 */
  @Input() backTpl: TemplateRef<NzSafeAny> | undefined;
  
  /** 頁面標題資訊 */
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  
  /** 返回 URL */
  @Input() backUrl = '';

  /**
   * 返回上一頁
   */
  back(): void {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    } else {
      // 如果沒有指定返回 URL，則使用瀏覽器返回
      window.history.back();
    }
  }
}

