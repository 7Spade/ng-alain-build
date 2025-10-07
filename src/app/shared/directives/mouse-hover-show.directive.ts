import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

/**
 * 滑鼠懸停顯示指令
 *
 * @description 當滑鼠懸停時顯示最後一個子元素，離開時隱藏
 * @example
 * ```html
 * <div appMouseHoverShow>
 *   <span>主要內容</span>
 *   <button>操作按鈕（懸停顯示）</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[appMouseHoverShow]',
  standalone: true
})
export class MouseHoverShowDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mouseover')
  onMouseenter(): void {
    this.mouse('inline');
  }

  @HostListener('mouseout')
  onMouseLeave(): void {
    this.mouse('none');
  }

  private mouse(dis: string): void {
    if (this.el.nativeElement.lastChild) {
      this.renderer.setStyle(this.el.nativeElement.lastChild, 'display', dis);
    }
  }
}
