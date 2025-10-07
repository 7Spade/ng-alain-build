/**
 * 組織設定頁面
 * @description 管理用戶所屬的所有組織
 */

import { Component, inject, ChangeDetectionStrategy, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent, PageHeaderType, AntTableConfig } from '@shared';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { OrganizationContextService } from '@core';
import { UserOrganizationService } from '../../services/user-organization.service';
import type { UserOrganization } from '../../models';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    PageHeaderComponent,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzAvatarModule,
    NzTagModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzSpaceModule,
    FormsModule
  ]
})
export class OrganizationSettingsComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('roleTpl', { static: true }) roleTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('logoTpl', { static: true }) logoTpl!: TemplateRef<NzSafeAny>;
  
  private readonly contextService = inject(OrganizationContextService);
  private readonly userOrgService = inject(UserOrganizationService);
  private readonly modalSrv = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  private readonly cdr = inject(ChangeDetectorRef);
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '組織管理',
    breadcrumb: ['首頁', '設定', '組織管理']
  };
  
  organizationList: UserOrganization[] = [];
  loading = false;
  
  tableConfig!: AntTableConfig;
  
  ngOnInit(): void {
    this.initTable();
    this.loadOrganizations();
  }
  
  /**
   * 初始化表格配置
   */
  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: 'Logo',
          field: 'logo',
          width: 80,
          tdTemplate: this.logoTpl
        },
        {
          title: '組織名稱',
          field: 'name',
          width: 200
        },
        {
          title: '角色',
          field: 'role',
          width: 120,
          tdTemplate: this.roleTpl
        },
        {
          title: '加入時間',
          field: 'joinedAt',
          width: 150,
          pipe: 'date:yyyy-MM-dd'
        },
        {
          title: '描述',
          field: 'description',
          width: 250
        },
        {
          title: '操作',
          tdTemplate: this.actionTpl,
          width: 280,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      showCheckbox: false
    };
  }
  
  /**
   * 加載組織列表
   */
  loadOrganizations(): void {
    this.loading = true;
    this.tableConfig.loading = true;
    
    // TODO: [OPTIMIZATION] Memory Leak Risk - HTTP 訂閱未在 ngOnDestroy 中取消訂閱
    // 建議：使用 async pipe 或 takeUntilDestroyed() 自動管理訂閱
    this.userOrgService.getUserOrganizations(false).subscribe({
      next: (orgs) => {
        // 過濾掉個人空間
        this.organizationList = orgs.filter(o => o.type === 'organization');
        this.tableConfig.total = this.organizationList.length;
        this.loading = false;
        this.tableConfig.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('加載組織列表失敗', err);
        this.loading = false;
        this.tableConfig.loading = false;
        this.message.error('加載組織列表失敗');
        this.cdr.markForCheck();
      }
    });
  }
  
  /**
   * 切換到組織
   * @param org 目標組織
   */
  switchTo(org: UserOrganization): void {
    if (org.id) {
      this.contextService.switchToOrganization(org.id);
    }
  }
  
  /**
   * 編輯組織設定
   * @param org 組織
   */
  editOrganization(org: UserOrganization): void {
    this.message.info(`編輯組織「${org.name}」功能開發中...`);
    // TODO: 打開編輯組織 Modal
  }
  
  /**
   * 離開組織
   * @param org 組織
   */
  leaveOrganization(org: UserOrganization): void {
    if (org.role === 'owner') {
      this.message.warning('擁有者無法離開組織，請先轉讓擁有權');
      return;
    }
    
    this.modalSrv.confirm({
      nzTitle: '確定要離開組織嗎？',
      nzContent: `離開後將無法訪問「${org.name}」的資源`,
      nzOkText: '確定離開',
      nzOkDanger: true,
      nzOnOk: () => {
        // 本地測試：直接從列表移除
        this.organizationList = this.organizationList.filter(o => o.id !== org.id);
        this.contextService.reloadOrganizations();
        this.message.success(`已離開組織「${org.name}」`);
        this.cdr.markForCheck();
        
        // TODO: 生產環境調用 API
        // return this.userOrgService.leaveOrganization(org.id!).toPromise();
      }
    });
  }
  
  /**
   * 刪除組織
   * @param org 組織
   */
  deleteOrganization(org: UserOrganization): void {
    if (org.role !== 'owner') {
      this.message.warning('只有擁有者可以刪除組織');
      return;
    }
    
    this.modalSrv.confirm({
      nzTitle: '確定要刪除組織嗎？',
      nzContent: `刪除後所有數據將無法恢復！`,
      nzOkText: '確定刪除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        // 本地測試：直接從列表移除
        this.organizationList = this.organizationList.filter(o => o.id !== org.id);
        this.contextService.reloadOrganizations();
        
        // 如果刪除的是當前組織，切換到個人空間
        if (org.id === this.contextService.currentOrgId()) {
          this.contextService.switchToPersonal();
        }
        
        this.message.success(`組織「${org.name}」已刪除`);
        this.cdr.markForCheck();
        
        // TODO: 生產環境調用 API
        // return this.userOrgService.deleteOrganization(org.id!).toPromise();
      }
    });
  }
  
  /**
   * 查看組織詳情
   * @param org 組織
   */
  viewDetails(org: UserOrganization): void {
    this.modalSrv.create({
      nzTitle: `組織詳情 - ${org.name}`,
      nzContent: `
        <nz-descriptions nzBordered [nzColumn]="1">
          <nz-descriptions-item nzTitle="組織 ID">${org.id}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="組織名稱">${org.name}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="您的角色">${this.getRoleLabel(org.role)}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="加入時間">${new Date(org.joinedAt).toLocaleString('zh-TW')}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="描述">${org.description || '無'}</nz-descriptions-item>
        </nz-descriptions>
      `,
      nzWidth: 600,
      nzFooter: null
    });
  }
  
  /**
   * 獲取角色標籤
   */
  // TODO: [OPTIMIZATION] Code Duplication - 與 org-switcher.component.ts 重複
  // 建議：將 ORGANIZATION_ROLE_LABELS 和 ORGANIZATION_ROLE_COLORS 提取到共享常數檔案
  // 位置：src/app/features/organization/models/organization.constants.ts
  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      owner: '擁有者',
      admin: '管理員',
      member: '成員',
      viewer: '訪客'
    };
    return labels[role] || role;
  }
  
  /**
   * 獲取角色顏色
   */
  // TODO: [OPTIMIZATION] Code Duplication - 與 org-switcher.component.ts 重複
  // 建議：將 ORGANIZATION_ROLE_COLORS 提取到共享常數檔案
  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      owner: 'purple',
      admin: 'blue',
      member: 'green',
      viewer: 'default'
    };
    return colors[role] || 'default';
  }
}

