import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// TODO: [OPTIMIZATION] Critical - Missing OnDestroy - 此指令缺少 ngOnDestroy，會造成嚴重記憶體洩漏
// 建議：implements OnDestroy, 使用 Subscription 儲存訂閱，在 ngOnDestroy 中 unsubscribe
// 或使用 DestroyRef + takeUntilDestroyed (Angular 16+)
// 影響：此指令可能在多處使用，記憶體洩漏會累積

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
    
    // TODO: [OPTIMIZATION] Memory Leak Risk - breakpointObserver 訂閱未取消訂閱
    // 建議：儲存 subscription 並在 ngOnDestroy 中取消訂閱
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

