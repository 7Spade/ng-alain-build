import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * 日期格式枚舉
 */
export const enum DateFormat {
  Date = 'yyyy-MM-dd',
  DateHour = 'yyyy-MM-dd HH',
  DateTime = 'yyyy-MM-dd HH:mm'
}

/**
 * Map 鍵類型
 */
export const enum MapKeyType {
  String,
  Number,
  Boolean
}

/**
 * 預定義的映射集合
 */
export const MapSet = {
  sex: {
    0: '女',
    1: '男'
  },
  available: {
    true: '可用',
    false: '禁用'
  },
  isOrNot: {
    true: '是',
    false: '否'
  },
  visible: {
    true: '展示',
    false: '隱藏'
  }
};

/**
 * Map 項目介面
 */
export interface MapItem {
  label: string;
  value: NzSafeAny;
}

/**
 * Map 映射管道
 *
 * @description 用於將值轉換為對應的標籤文字，支持日期格式化
 * @example
 * ```html
 * <!-- 性別映射 -->
 * <span>{{ user.sex | map: 'sex' }}</span>
 *
 * <!-- 日期格式化 -->
 * <span>{{ user.createTime | map: 'date:yyyy-MM-dd HH:mm' }}</span>
 *
 * <!-- 可用狀態 -->
 * <span>{{ user.available | map: 'available' }}</span>
 * ```
 */
@Pipe({
  name: 'map',
  standalone: true
})
export class MapPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('zh-TW');
  private mapObj = MapSet;

  /**
   * 將 Map 轉換為數組
   *
   * @param data Map 數據
   * @param mapKeyType 鍵類型
   * @returns MapItem 數組
   */
  static transformMapToArray(data: NzSafeAny, mapKeyType: MapKeyType = MapKeyType.Number): MapItem[] {
    return Object.keys(data || {}).map(key => {
      let value: NzSafeAny;
      switch (mapKeyType) {
        case MapKeyType.Number:
          value = Number(key);
          break;
        case MapKeyType.Boolean:
          value = key === 'true';
          break;
        case MapKeyType.String:
        default:
          value = key;
          break;
      }
      return { value, label: data[key] };
    });
  }

  transform(value: NzSafeAny, arg?: NzSafeAny): NzSafeAny {
    if (arg === undefined) {
      return value;
    }

    let type: string = arg;
    let param = '';

    // 解析參數（如 'date:yyyy-MM-dd'）
    if (arg.indexOf(':') !== -1) {
      type = arg.substring(0, arg.indexOf(':'));
      param = arg.substring(arg.indexOf(':') + 1, arg.length);
    }

    switch (type) {
      case 'date':
        return this.datePipe.transform(value, param);
      default:
        // @ts-expect-error - Legacy code, mapObj type is dynamic
        return this.mapObj[type] ? this.mapObj[type][value] : '';
    }
  }
}
