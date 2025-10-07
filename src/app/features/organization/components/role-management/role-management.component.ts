import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  AntTableConfig,
  PageHeaderComponent,
  PageHeaderType,
  TreeTableComponent,
  MapPipe,
  MapSet,
  MapKeyType,
  AuthDirective,
  DebounceClickDirective
} from '@shared';
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
import { finalize } from 'rxjs/operators';

import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

interface SearchParam {
  name: string;
  status: string;
}

/**
 * 角色管理組件
 *
 * @description 角色列表與權限管理
 */
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
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
    DebounceClickDirective,
    NzTagModule
  ]
})
export class RoleManagementComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<NzSafeAny>;

  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '角色管理',
    breadcrumb: ['首頁', '組織管理', '角色管理']
  };

  dataList: Role[] = [];
  statusOptions: Array<{ label: string; value: string }> = [];
  destroyRef = inject(DestroyRef);

  private roleService = inject(RoleService);
  private modalSrv = inject(NzModalService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

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

    this.roleService
      .getRoles(params)
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
    this.message.info('新增角色功能待實現（需要 Modal 組件）');
    // TODO: 實施新增角色 Modal
  }

  reloadTable(): void {
    this.message.info('重新整理成功');
    this.getDataList();
  }

  edit(id: string): void {
    this.message.info('編輯角色功能待實現（需要 Modal 組件）');
    // TODO: 實施編輯角色 Modal
  }

  setPermissions(id: string): void {
    this.message.info('設置權限功能待實現（需要 Modal 組件）');
    // TODO: 實施設置權限 Modal
  }

  delete(id: string): void {
    this.modalSrv.confirm({
      nzTitle: '確定要刪除嗎？',
      nzContent: '刪除後不可恢復',
      nzOnOk: () => {
        this.tableLoading(true);
        this.roleService
          .deleteRole(id)
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
      showCheckbox: false,
      headers: [
        {
          title: '角色名稱',
          field: 'name',
          width: 150
        },
        {
          title: '角色代碼',
          field: 'code',
          width: 120
        },
        {
          title: '狀態',
          width: 100,
          field: 'status',
          tdTemplate: this.statusTpl
        },
        {
          title: '描述',
          field: 'description',
          width: 250
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
          width: 220,
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
