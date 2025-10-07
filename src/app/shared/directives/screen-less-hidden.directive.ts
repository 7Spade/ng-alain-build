import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * 響應式隱藏指令
 * @description 當螢幕寬度小於指定值時隱藏元素
 * @example
 * ```html
 * <!-- 螢幕寬度小於 768px 時隱藏 -->
 * <div *appScreenLessHidden="'768'">
 *   桌面版內容
 * </div>
 * 
 * <!-- 螢幕寬度小於 576px 時隱藏 -->
 * <button *appScreenLessHidden="'576'">桌面操作</button>
 * ```
 */
@Directive({
  selector: '[appScreenLessHidden]',
  standalone: true
})
export class ScreenLessHiddenDirective {
  private breakpointObserver = inject(BreakpointObserver);
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);

  /**
   * 設置隱藏的螢幕寬度閾值（px）
   * @param lessScreen 螢幕寬度閾值，如 '768', '576' 等
   */
  @Input()
  set appScreenLessHidden(lessScreen: string | undefined) {
    if (!lessScreen) {
      this.show(true);
      return;
    }
    
    // 監聽螢幕寬度變化
    this.breakpointObserver.observe([`(max-width: ${lessScreen}px)`]).subscribe(result => {
      // 當螢幕寬度小於閾值時隱藏
      if (result.matches) {
        this.show(false);
      } else {
        this.show(true);
      }
    });
  }

  private show(matched: boolean): void {
    if (matched) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

