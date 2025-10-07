import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges, inject, TemplateRef } from '@angular/core';

import { fnGetFlattenTreeDataByMap, fnTreeDataToMap, TreeNodeInterface } from '../../utils/tree-table-tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzResizeEvent, NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableQueryParams, NzTableSize, NzTableModule } from 'ng-zorro-antd/table';

import { MapPipe } from '../../pipes/map.pipe';
import { TableFiledPipe } from '../../pipes/table-filed.pipe';

/**
 * 表格列配置
 */
export interface TableHeader {
  title: string;
  field?: string;
  pipe?: string;
  showSort?: boolean;
  sortDir?: undefined | 'asc' | 'desc';
  width?: number;
  tdTemplate?: TemplateRef<NzSafeAny>;
  fixed?: boolean;
  fixedDir?: 'left' | 'right';
  notNeedEllipsis?: boolean;
  show?: boolean;
  tdClassList?: string[];
  thClassList?: string[];
}

/**
 * 表格配置介面
 */
export interface AntTableConfig {
  headers: TableHeader[];
  total: number;
  showCheckbox?: boolean;
  loading: boolean;
  pageSize: number;
  pageIndex: number;
  needNoScroll?: boolean;
}

/**
 * 排序文件介面
 */
export interface SortFile {
  fileName: string;
  sortDir: undefined | 'desc' | 'asc';
}

export abstract class AntTreeTableComponentToken {
  tableSize!: NzTableSize;
  tableConfig!: AntTableConfig;

  abstract tableChangeDectction(): void;
}

/**
 * 樹狀表格組件
 * @description 支持樹狀數據展開/收合、拖動列寬、排序、分頁的表格組件
 * @example
 * ```html
 * <app-tree-table
 *   [tableData]="dataList"
 *   [tableConfig]="tableConfig"
 *   [cashArray]="checkedArray"
 *   (changePageNum)="onPageChange($event)"
 *   (changePageSize)="onPageSizeChange($event)"
 *   (sortFn)="onSort($event)"
 *   (selectedChange)="onSelectedChange($event)">
 * </app-tree-table>
 * ```
 */
@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less'],
  providers: [{ provide: AntTreeTableComponentToken, useExisting: TreeTableComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzTableModule, NzResizableModule, NgClass, NgTemplateOutlet, MapPipe, TableFiledPipe]
})
export class TreeTableComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

  _dataList!: TreeNodeInterface[];
  allChecked = false;
  indeterminate = false;
  
  /** 從業務組件傳入的已選中數據數組 */
  @Input() cashArray: NzSafeAny[] = [];
  checkedCashArrayFromComment: NzSafeAny[] = [];
  
  /** 排序事件 */
  @Output() readonly sortFn: EventEmitter<SortFile> = new EventEmitter<SortFile>();
  
  /** 頁碼變更事件 */
  @Output() readonly changePageNum = new EventEmitter<NzTableQueryParams>();
  
  /** 每頁數量變更事件 */
  @Output() readonly changePageSize = new EventEmitter<number>();
  
  /** Map 格式的展開數據 */
  mapOfExpandedData: Record<string, TreeNodeInterface[]> = {};
  
  /** 表格配置 */
  @Input({ required: true }) tableConfig!: AntTableConfig;
  
  /** 選中項變更事件 */
  @Output() readonly selectedChange: EventEmitter<NzSafeAny[]> = new EventEmitter<NzSafeAny[]>();
  
  /** 緩存已展開節點的 ID */
  cashExpandIdArray: Array<number | string> = [];

  @Input()
  set tableData(value: TreeNodeInterface[]) {
    this._dataList = value;
    // 將樹狀數據轉換為 Map 格式
    this.mapOfExpandedData = fnTreeDataToMap(this._dataList);
    
    const beFilterId: Array<string | number> = [];
    Object.values(this.mapOfExpandedData).forEach(menuArray => {
      menuArray.forEach(menuItem => {
        // 恢復之前展開的節點
        if (this.cashExpandIdArray.includes(menuItem.id)) {
          menuItem.expand = true;
          // 緩存子節點 ID，稍後刪除以避免重複
          if (menuItem.children && menuItem.children.length > 0) {
            menuItem.children.forEach(item => {
              beFilterId.push(item.id);
            });
          }
        }
      });
    });
    
    // 刪除子節點的重複數據
    beFilterId.forEach(item => {
      delete this.mapOfExpandedData[item];
    });
  }

  get tableData(): NzSafeAny[] {
    return this._dataList;
  }

  _tableSize: NzTableSize = 'default';
  set tableSize(value: NzTableSize) {
    this._tableSize = value;
    this.tableChangeDectction();
  }

  get tableSize(): NzTableSize {
    return this._tableSize;
  }

  /**
   * 觸發變更檢測
   */
  tableChangeDectction(): void {
    this._dataList = [...this._dataList];
    this.cdr.markForCheck();
  }

  /**
   * 表頭拖動調整寬度
   */
  onResize(nzResizeEvent: NzResizeEvent, col: string): void {
    this.tableConfig.headers = this.tableConfig.headers.map((e: TableHeader) =>
      e.title === col
        ? {
            ...e,
            width: +`${nzResizeEvent.width}`
          }
        : e
    ) as TableHeader[];
  }

  /**
   * 點擊排序
   */
  changeSort(tableHeader: TableHeader): void {
    this.tableConfig.headers.forEach(item => {
      if (item.field !== tableHeader.field) {
        item.sortDir = undefined;
      }
    });
    const sortDicArray: [undefined, 'asc', 'desc'] = [undefined, 'asc', 'desc'];
    const index = sortDicArray.findIndex(item => item === tableHeader.sortDir);
    tableHeader.sortDir = index === sortDicArray.length - 1 ? sortDicArray[0] : sortDicArray[index + 1];
    this.sortFn.emit({ fileName: tableHeader.field!, sortDir: tableHeader.sortDir });
  }

  /**
   * 分頁頁碼改變
   */
  onQueryParamsChange(tableQueryParams: NzTableQueryParams): void {
    this.changePageNum.emit(tableQueryParams);
  }

  /**
   * 修改每頁數量
   */
  onPageSizeChange($event: NzSafeAny): void {
    this.changePageSize.emit($event);
  }

  /**
   * 更新展開節點緩存
   */
  changecashExpandIdArray(id: number | string, expand: boolean): void {
    const index = this.cashExpandIdArray.indexOf(id);
    if (expand) {
      if (index === -1) {
        this.cashExpandIdArray.push(id);
      }
    } else {
      if (index !== -1) {
        this.cashExpandIdArray.splice(index, 1);
      }
    }
  }

  /**
   * 展開/收合節點
   */
  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    this.changecashExpandIdArray(data.id, $event);
    if (!$event) {
      if (data.children) {
        data.children.forEach((d: TreeNodeInterface) => {
          const target = array.find((a: TreeNodeInterface) => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  /**
   * 設置選中狀態並處理緩存
   */
  setIsCheckFn(dataItem: NzSafeAny, isChecked: boolean): void {
    dataItem['_checked'] = isChecked;
    const index = this.checkedCashArrayFromComment.findIndex(cashItem => cashItem.id === dataItem.id);
    if (isChecked) {
      if (index === -1) {
        this.checkedCashArrayFromComment.push(dataItem);
      }
    } else {
      if (index !== -1) {
        this.checkedCashArrayFromComment.splice(index, 1);
      }
    }
  }

  /**
   * 全選/取消全選
   */
  onAllChecked(isChecked: boolean): void {
    fnGetFlattenTreeDataByMap(this.mapOfExpandedData).forEach((row: TreeNodeInterface) => {
      this.setIsCheckFn(row, isChecked);
    });
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  /**
   * 單選行
   */
  public checkRowSingle(isChecked: boolean, selectIndex: number, row: TreeNodeInterface): void {
    this.setIsCheckFn(row, isChecked);
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  /**
   * 刷新複選框狀態
   */
  refreshStatus(): void {
    const dataTempArray: TreeNodeInterface[] = fnGetFlattenTreeDataByMap(this.mapOfExpandedData);

    const allChecked =
      dataTempArray.length > 0 &&
      dataTempArray.every((item: TreeNodeInterface) => {
        return item['_checked'] === true;
      });
    const allUnChecked = dataTempArray.length > 0 && dataTempArray.every((item: TreeNodeInterface) => item['_checked'] !== true);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cashArray'] && !changes['cashArray'].firstChange) {
      this.checkedCashArrayFromComment = [...changes['cashArray'].currentValue];
      fnGetFlattenTreeDataByMap(this.mapOfExpandedData).forEach((row: TreeNodeInterface) => {
        const index = this.checkedCashArrayFromComment.findIndex((item: NzSafeAny) => item.id === row.id);
        this.setIsCheckFn(row, index !== -1);
      });
      this.refreshStatus();
    }
  }
}

