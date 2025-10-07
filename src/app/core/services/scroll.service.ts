import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

/**
 * 滾動服務
 * @description 管理頁面和元素的滾動位置
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly _doc = inject(DOCUMENT);
  private readonly platform = inject(Platform);

  private _getDoc(): Document {
    return this._doc || document;
  }

  private _getWin(): Window {
    const doc = this._getDoc();
    return doc.defaultView || window;
  }

  /**
   * 獲取滾動條位置
   * @param element 指定元素，預設為 window
   * @returns [scrollLeft, scrollTop]
   */
  getScrollPosition(element?: Element | Window): [number, number] {
    if (!this.platform.isBrowser) {
      return [0, 0];
    }

    const win = this._getWin();
    if (element && element !== win) {
      return [(element as Element).scrollLeft, (element as Element).scrollTop];
    } else {
      return [win.pageXOffset, win.pageYOffset];
    }
  }

  /**
   * 設置滾動條位置
   * @param element 指定元素
   * @param position [scrollLeft, scrollTop]
   */
  scrollToPosition(element: Element | Window | null | undefined, position: [number, number]): void {
    if (!this.platform.isBrowser) {
      return;
    }
    (element || this._getWin()).scrollTo(position[0], position[1]);
  }

  /**
   * 滾動至指定元素
   * @param element 指定元素，預設為 document.body
   * @param topOffset 偏移值，預設為 0
   */
  scrollToElement(element?: Element | null, topOffset = 0): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (!element) {
      element = this._getDoc().body;
    }

    element.scrollIntoView();

    const win = this._getWin();
    if (win && win.scrollBy) {
      win.scrollBy(0, element!.getBoundingClientRect().top - topOffset);

      if (win.pageYOffset < 20) {
        win.scrollBy(0, -win.pageYOffset);
      }
    }
  }

  /**
   * 滾動至頂部
   * @param topOffset 偏移值，預設為 0
   */
  scrollToTop(topOffset = 0): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.scrollToElement(this._getDoc().body, topOffset);
  }
}

