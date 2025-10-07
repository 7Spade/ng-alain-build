import { Directive, EventEmitter, HostListener, Input, OnInit, OnDestroy, Output, numberAttribute } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 防抖點擊指令
 *
 * @description 防止用戶快速重複點擊，避免重複提交表單或觸發多次 API 請求
 * @example
 * ```html
 * <button appDebounceClick
 *         [debounceTime]="500"
 *         (debounceClick)="handleSubmit()">
 *   提交表單
 * </button>
 * ```
 */
@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  /** 防抖時間（毫秒），預設 500ms */
  @Input({ transform: numberAttribute }) debounceTime = 500;

  /** 防抖後的點擊事件 */
  @Output() readonly debounceClick = new EventEmitter();

  private clicks = new Subject<NzSafeAny>();
  private subscription!: Subscription;

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(debounceTime(this.debounceTime)).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
