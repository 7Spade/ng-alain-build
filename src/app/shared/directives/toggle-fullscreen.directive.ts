import { ChangeDetectorRef, Directive, HostListener, inject, OnInit } from '@angular/core';
import screenfull from 'screenfull';

/**
 * 全螢幕切換指令
 *
 * @description 點擊元素時切換全螢幕模式
 * @example
 * ```html
 * <button appToggleFullscreen #fullscreen="appToggleFullscreen">
 *   {{ fullscreen.isFullscreenFlag ? '退出全螢幕' : '進入全螢幕' }}
 * </button>
 * ```
 */
@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen',
  standalone: true
})
export class ToggleFullscreenDirective implements OnInit {
  /** 是否處於全螢幕狀態 */
  isFullscreenFlag = true;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    screenfull.onchange(() => {
      setTimeout(() => {
        this.isFullscreenFlag = !this.isFullscreenFlag;
        this.cdr.markForCheck();
      }, 10);
    });
  }

  @HostListener('click') onClick(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
