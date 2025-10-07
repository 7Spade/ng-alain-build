import { ActivatedRouteSnapshot } from '@angular/router';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { silentEvent } from 'ng-zorro-antd/core/util';

/**
 * 阻止滑鼠事件傳播
 *
 * @param e 滑鼠事件
 */
export const fnStopMouseEvent = function stopMouseEvent(e: MouseEvent): void {
  silentEvent(e);
};

/**
 * 獲取深層路由復用策略的 key
 *
 * @param route 路由快照
 * @returns 復用策略 key
 */
export const getDeepReuseStrategyKeyFn = function (route: ActivatedRouteSnapshot): string {
  let temp = route;
  while (temp.firstChild) {
    temp = temp.firstChild;
  }
  return fnGetReuseStrategyKeyFn(temp);
};

/**
 * 獲取路由復用策略的 key
 *
 * @param route 路由快照
 * @returns key，格式為 configKey + JSON.stringify(params)
 */
export const fnGetReuseStrategyKeyFn = function getKey(route: ActivatedRouteSnapshot): string {
  const configKey = route.data['key'];
  if (!configKey) {
    return '';
  }

  // query 傳參且有參數
  if (Object.keys(route.queryParams).length > 0) {
    return configKey + JSON.stringify(route.queryParams);
  } else if (Object.keys(route.params).length > 0) {
    // 路徑傳參且有參數
    return configKey + JSON.stringify(route.params);
  } else {
    // 沒有路由參數
    return `${configKey}{}`;
  }
};

/**
 * 獲取不含參數的路由路徑
 *
 * @param path 完整路徑
 * @returns 不含參數的路徑
 */
export const fnGetPathWithoutParam = function getPathWithoutParam(path: string): string {
  const paramIndex = path.indexOf('?');
  if (paramIndex > -1) {
    return path.substring(0, paramIndex);
  }
  return path;
};

/**
 * 檢查表單並觸發驗證
 *
 * @param form 表單組
 * @returns 表單是否有效
 */
export const fnCheckForm = function checkForm(form: NzSafeAny): boolean {
  Object.keys(form.controls).forEach(key => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

/**
 * 獲取隨機整數
 *
 * @param m 最小值
 * @param n 最大值
 * @returns 隨機整數
 */
export const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  return Math.floor(Math.random() * (m - n) + n);
};
