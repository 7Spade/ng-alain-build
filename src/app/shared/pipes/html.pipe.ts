import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * HTML 安全渲染管道
 *
 * @description 將字串標記為安全的 HTML，允許在模板中渲染 HTML 標籤
 * @example
 * ```html
 * <!-- 渲染 HTML 內容 -->
 * <div [innerHTML]="htmlContent | htmlPipe"></div>
 *
 * <!-- 渲染富文本編輯器內容 -->
 * <div [innerHTML]="article.content | htmlPipe"></div>
 * ```
 */
@Pipe({
  name: 'htmlPipe',
  standalone: true
})
export class HtmlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  transform(value: NzSafeAny): SafeHtml {
    if (!value) {
      return '';
    }
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
