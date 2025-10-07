import { Directive, HostBinding, Input } from '@angular/core';

/**
 * 啟用/禁用狀態指令
 * @description 根據條件添加啟用或禁用的樣式類
 * @example
 * ```html
 * <button [appEnable]="isEnabled">操作按鈕</button>
 * ```
 */
@Directive({
  selector: '[appEnable]',
  standalone: true
})
export class DisabledDirective {
  /**
   * 是否啟用
   */
  @Input('appEnable')
  set appDisabled(value: boolean) {
    this.enable = value;
    this.disabledStyle = !value;
  }

  @HostBinding('class.operate-text') enable = false;
  @HostBinding('class.operate-text-disabled') disabledStyle = false;
}

