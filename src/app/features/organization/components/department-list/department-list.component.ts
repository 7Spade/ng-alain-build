import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { 
  AntTableConfig, 
  TreeTableComponent, 
  PageHeaderComponent, 
  PageHeaderType,
  TreeNodeInterface,
  fnFlatDataHasParentToTree,
  fnFlattenTreeDataByDataList,
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
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface SearchParam {
  name: string;
  status: string;
}

/**
 * 部門列表組件
 * @description 使用 TreeTable 顯示部門層級結構
 */
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
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
export class DepartmentListComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<NzSafeAny>;
  
  searchParam: Partial<SearchParam> = {};
  destroyRef = inject(DestroyRef);
  tableConfig!: AntTableConfig;
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '部門管理',
    breadcrumb: ['首頁', '組織管理', '部門列表']
  };
  
  dataList: TreeNodeInterface[] = [];
  statusOptions: Array<{ label: string; value: string }> = [];

  private deptService = inject(DepartmentService);
  private modalSrv = inject(NzModalService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  reloadTable(): void {
    this.message.info('已重新整理');
    this.getDataList();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableLoading(true);
    
    const params = {
      page: e?.pageIndex || this.tableConfig.pageIndex,
      pageSize: this.tableConfig.pageSize,
      ...this.searchParam
    };

    this.deptService
      .getDepartments(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        // 將扁平數據轉換為樹狀結構
        const treeData = fnFlatDataHasParentToTree(
          response.data.map(dept => ({
            id: dept.id,
            name: dept.name,
            status: dept.status,
            description: dept.description,
            createdAt: dept.createdAt,
            fatherId: dept.parentId || 0
          }))
        );
        
        // 扁平化為 TreeTable 可用格式
        this.dataList = fnFlattenTreeDataByDataList(treeData);
        this.tableConfig.total = response.total;
        this.tableLoading(false);
      });
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  add(parentId?: string): void {
    this.message.info('新增部門功能待實現（需要 Modal 組件）');
    // TODO: 實施新增部門 Modal
  }

  edit(id: string): void {
    this.message.info('編輯部門功能待實現（需要 Modal 組件）');
    // TODO: 實施編輯部門 Modal
  }

  delete(id: string): void {
    this.modalSrv.confirm({
      nzTitle: '確定要刪除嗎？',
      nzContent: '刪除後不可恢復',
      nzOnOk: () => {
        this.tableLoading(true);
        this.deptService
          .deleteDepartment(id)
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

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
    this.getDataList();
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '部門名稱',
          width: 230,
          field: 'name'
        },
        {
          title: '狀態',
          field: 'status',
          tdTemplate: this.statusTpl,
          width: 100
        },
        {
          title: '描述',
          field: 'description',
          width: 200
        },
        {
          title: '創建時間',
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm',
          width: 180
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: false,
          fixedDir: 'right'
        }
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

  ngOnInit(): void {
    this.initTable();
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
    this.getDataList();
  }
}

