import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { 
  AntTableConfig,
  PageHeaderComponent,
  PageHeaderType,
  TreeTableComponent,
  TreeNodeInterface,
  MapPipe,
  MapSet,
  MapKeyType
} from '@shared';
import { AuthDirective } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface SearchParam {
  name: string;
  email: string;
  departmentId: string;
  status: string;
}

/**
 * 員工列表組件
 * @description 員工管理頁面，含搜索、CRUD 操作
 */
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    TreeTableComponent,
    AuthDirective,
    NzTagModule
  ]
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<NzSafeAny>;
  
  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '員工管理',
    breadcrumb: ['首頁', '組織管理', '員工列表']
  };
  
  dataList: Employee[] = [];
  checkedArray: Employee[] = [];
  statusOptions: Array<{ label: string; value: string }> = [];
  destroyRef = inject(DestroyRef);

  private employeeService = inject(EmployeeService);
  private modalSrv = inject(NzModalService);
  private cdr = inject(ChangeDetectorRef);
  private message = inject(NzMessageService);

  selectedChecked(e: Employee[]): void {
    this.checkedArray = [...e];
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableLoading(true);
    
    const params = {
      page: e?.pageIndex || this.tableConfig.pageIndex,
      pageSize: this.tableConfig.pageSize,
      ...this.searchParam
    };

    this.employeeService
      .getEmployees(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.dataList = response.data;
        this.tableConfig.total = response.total;
        this.tableConfig.pageIndex = response.page;
        this.tableLoading(false);
      });
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  add(): void {
    this.message.info('新增員工功能待實現（需要 Modal 組件）');
    // TODO: 實施新增員工 Modal
  }

  reloadTable(): void {
    this.message.info('重新整理成功');
    this.getDataList();
  }

  edit(id: string): void {
    this.message.info('編輯員工功能待實現（需要 Modal 組件）');
    // TODO: 實施編輯員工 Modal
  }

  delete(id: string): void {
    this.modalSrv.confirm({
      nzTitle: '確定要刪除嗎？',
      nzContent: '刪除後不可恢復',
      nzOnOk: () => {
        this.tableLoading(true);
        this.employeeService
          .deleteEmployee(id)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            this.message.success('刪除成功');
            this.getDataList();
          });
      }
    });
  }

  batchDelete(): void {
    if (this.checkedArray.length === 0) {
      this.message.error('請選擇要刪除的員工');
      return;
    }
    
    this.modalSrv.confirm({
      nzTitle: '確定要刪除選中的員工嗎？',
      nzContent: '刪除後不可恢復',
      nzOnOk: () => {
        const ids = this.checkedArray.map(emp => emp.id);
        this.tableLoading(true);
        this.employeeService
          .batchDeleteEmployees(ids)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            this.message.success('批量刪除成功');
            this.checkedArray = [];
            this.getDataList();
          });
      }
    });
  }


  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
    this.getDataList();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: '員工姓名',
          field: 'name',
          width: 120
        },
        {
          title: '狀態',
          width: 100,
          field: 'status',
          tdTemplate: this.statusTpl
        },
        {
          title: '郵箱',
          width: 180,
          field: 'email'
        },
        {
          title: '職位',
          width: 120,
          field: 'position'
        },
        {
          title: '部門',
          width: 150,
          field: 'departmentId'
        },
        {
          title: '入職日期',
          width: 120,
          field: 'hireDate',
          pipe: 'date:yyyy-MM-dd'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 180,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

  ngOnInit(): void {
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
    this.initTable();
    this.getDataList();
  }
}

