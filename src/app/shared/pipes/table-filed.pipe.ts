import { Pipe, PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * 表格字段提取管道
 *
 * @description 用於從嵌套對象中安全提取字段值（使用點號路徑）
 * @example
 * ```html
 * <!-- 提取嵌套字段 -->
 * <td>{{ row | tableFiledPipe: 'user.name' }}</td>
 * <td>{{ row | tableFiledPipe: 'department.manager.email' }}</td>
 * ```
 */
@Pipe({
  name: 'tableFiledPipe',
  standalone: true
})
export class TableFiledPipe implements PipeTransform {
  /**
   * 從對象中提取字段值
   *
   * @param value 源對象
   * @param args 字段路徑（支持點號分隔，如 'user.name'）
   * @returns 字段值，不存在則返回空字串
   */
  transform(value: NzSafeAny, args?: string): NzSafeAny {
    if (!args) {
      return value;
    }

    // 使用點號分隔路徑來安全訪問嵌套屬性
    return this.getNestedValue(value, args) ?? '';
  }

  /**
   * 安全訪問嵌套屬性
   *
   * @param obj 源對象
   * @param path 路徑字串（如 'user.name'）
   */
  private getNestedValue(obj: NzSafeAny, path: string): NzSafeAny {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
      if (result === null || result === undefined) {
        return undefined;
      }
      result = result[key];
    }

    return result;
  }
}
