import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { ScrollService } from '../scroll.service';
import { fnGetReuseStrategyKeyFn, getDeepReuseStrategyKeyFn } from '@shared';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * 復用鉤子類型
 */
export type ReuseHookTypes = '_onReuseInit' | '_onReuseDestroy';

/**
 * 復用組件實例介面
 */
export interface ReuseComponentInstance {
  /** Tab 激活時調用 */
  _onReuseInit?: () => void;
  /** Tab 緩存時調用 */
  _onReuseDestroy?: () => void;
}

/**
 * 復用組件引用介面
 */
export interface ReuseComponentRef {
  instance: ReuseComponentInstance;
}

/**
 * 簡單路由復用策略
 * @description 實現路由復用，支持組件緩存和滾動位置保存
 * 
 * @example
 * ```typescript
 * // 在 app.config.ts 中配置
 * {
 *   provide: RouteReuseStrategy,
 *   useClass: SimpleReuseStrategy
 * }
 * 
 * // 在組件中使用生命週期鉤子
 * export class MyComponent {
 *   _onReuseInit() {
 *     // Tab 激活時執行
 *     console.log('Tab activated');
 *   }
 *   
 *   _onReuseDestroy() {
 *     // Tab 緩存時執行
 *     console.log('Tab cached');
 *   }
 * }
 * ```
 */
export class SimpleReuseStrategy implements RouteReuseStrategy {
  destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);
  private readonly scrollService = inject(ScrollService);

  /** 緩存每個 component 的 map */
  static handlers: Record<string, NzSafeAny> = {};
  
  /** 緩存每個頁面的 scroll 位置 */
  static scrollHandlers: Record<string, NzSafeAny> = {};

  /** 
   * 待刪除的路由 key
   * @description 在當前頁簽中點擊刪除按鈕時，記錄是否需要緩存當前路由
   */
  public static waitDelete: string | null = null;

  /**
   * 刪除路由快照
   * @param key 路由 key
   */
  public static deleteRouteSnapshot(key: string): void {
    if (SimpleReuseStrategy.handlers[key]) {
      if (SimpleReuseStrategy.handlers[key].componentRef) {
        SimpleReuseStrategy.handlers[key].componentRef.destroy();
      }
      delete SimpleReuseStrategy.handlers[key];
      delete SimpleReuseStrategy.scrollHandlers[key];
    }
  }

  /**
   * 刪除全部的緩存
   * @description 在退出登錄等操作中需要用到
   */
  public static deleteAllRouteSnapshot(route: ActivatedRouteSnapshot): Promise<void> {
    return new Promise(resolve => {
      Object.keys(SimpleReuseStrategy.handlers).forEach(key => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
      });
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(route);
      resolve();
    });
  }

  /**
   * 是否允許復用路由
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 如果路由配置 shouldDetach: 'no'，則不復用
    return route.data['shouldDetach'] !== 'no';
  }

  /**
   * 當路由離開時觸發，存儲路由
   */
  store(route: ActivatedRouteSnapshot, handle: NzSafeAny): void {
    if (route.data['shouldDetach'] === 'no') {
      return;
    }
    
    const key = fnGetReuseStrategyKeyFn(route);
    
    // 如果待刪除的是當前路由則不存儲快照
    if (SimpleReuseStrategy.waitDelete === key) {
      this.runHook('_onReuseDestroy', handle.componentRef);
      handle.componentRef.destroy();
      SimpleReuseStrategy.waitDelete = null;
      delete SimpleReuseStrategy.scrollHandlers[key];
      return;
    }

    // 離開路由的時候緩存當前頁面的 scroll 位置
    const innerScrollContainer: Array<Record<string, [number, number]>> = [];
    
    if (route.data['needKeepScroll'] !== 'no') {
      const scrollContain: string[] = route.data['scrollContain'] ?? [];
      scrollContain.forEach((item: string) => {
        const el = this.doc.querySelector(item);
        if (el) {
          const position = this.scrollService.getScrollPosition(el);
          innerScrollContainer.push({ [item]: position });
        }
      });
      innerScrollContainer.push({ window: this.scrollService.getScrollPosition() });
    }

    SimpleReuseStrategy.scrollHandlers[key] = { scroll: innerScrollContainer };
    SimpleReuseStrategy.handlers[key] = handle;

    if (handle && handle.componentRef) {
      this.runHook('_onReuseDestroy', handle.componentRef);
    }
  }

  /**
   * 是否允許還原路由
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = fnGetReuseStrategyKeyFn(route);
    return !!key && !!SimpleReuseStrategy.handlers[key];
  }

  /**
   * 獲取存儲路由
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = fnGetReuseStrategyKeyFn(route);
    return !key ? null : SimpleReuseStrategy.handlers[key];
  }

  /**
   * 進入路由觸發，是同一路由時復用路由
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 如果路由配置了 shouldDetach: 'no'，則強制不復用（透過比較路由配置）
    if (future.data['shouldDetach'] === 'no' || curr.data['shouldDetach'] === 'no') {
      // 不同的路由配置應該重新渲染
      return future.routeConfig === curr.routeConfig;
    }

    const futureKey = fnGetReuseStrategyKeyFn(future);
    const currKey = fnGetReuseStrategyKeyFn(curr);
    
    if (!!futureKey && SimpleReuseStrategy.handlers[futureKey]) {
      this.runHook('_onReuseInit', SimpleReuseStrategy.handlers[futureKey].componentRef);
    }

    const result = futureKey === currKey;
    
    // 懶加載讀取不到 data，通過此方法下鑽到最下一級路由
    while (future.firstChild) {
      future = future.firstChild;
    }
    
    // 重新獲取是因為 future 在上面 while 循環中已經變了
    const scrollFutureKey = fnGetReuseStrategyKeyFn(future);
    if (!!scrollFutureKey && SimpleReuseStrategy.scrollHandlers[scrollFutureKey]) {
      SimpleReuseStrategy.scrollHandlers[scrollFutureKey].scroll.forEach((elOptionItem: Record<string, [number, number]>) => {
        Object.keys(elOptionItem).forEach(element => {
          setTimeout(() => {
            this.scrollService.scrollToPosition(this.doc.querySelector(element), elOptionItem[element]);
          }, 1);
        });
      });
    }
    
    return result;
  }

  /**
   * 執行鉤子函數
   */
  private runHook(method: ReuseHookTypes, comp: ReuseComponentRef): void {
    if (comp == null || !comp.instance) {
      return;
    }
    const compThis = comp.instance;
    const fn = compThis[method];
    if (typeof fn !== 'function') {
      return;
    }
    (fn as () => void).call(compThis);
  }
}

