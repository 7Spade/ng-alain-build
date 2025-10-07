/**
 * 組織切換器組件
 *
 * @description 類似 GitHub 的組織切換器，支持個人空間和多組織切換
 */

import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { OrganizationContextService } from '../../../core/services/organization-context/organization-context.service';
import { OrganizationFormComponent } from '../../../features/organization/components/organization-form';
import type { UserOrganization, CreateOrganizationRequest } from '../../../features/organization/models';
import { OrganizationService } from '../../../features/organization/services/organization.service';

@Component({
  selector: 'org-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NzDropDownModule, NzMenuModule, NzIconModule, NzAvatarModule, NzDividerModule, NzTagModule],
  template: `
    <div class="org-switcher-wrapper" nz-dropdown [nzDropdownMenu]="orgMenu" nzTrigger="click" nzPlacement="bottomLeft">
      <div class="org-switcher-trigger">
        <nz-avatar
          [nzSrc]="currentContext().currentOrg?.logo"
          [nzText]="currentContext().currentOrg?.name?.charAt(0)"
          nzSize="small"
          class="org-avatar"
        />
        <div class="org-info">
          <strong class="org-name">{{ currentContext().currentOrg?.name }}</strong>
          <small class="org-type">
            {{ currentContext().isPersonalSpace ? '個人空間' : '組織' }}
          </small>
        </div>
        <i nz-icon nzType="swap" class="swap-icon"></i>
      </div>
    </div>

    <nz-dropdown-menu #orgMenu="nzDropdownMenu">
      <ul nz-menu class="org-switcher-menu">
        <!-- 個人空間 -->
        <li nz-menu-item (click)="switchToPersonal()" [class.org-menu-item-selected]="currentContext().isPersonalSpace">
          <i nz-icon nzType="user" class="menu-icon"></i>
          <span class="org-menu-name">個人空間</span>
          @if (currentContext().isPersonalSpace) {
            <i nz-icon nzType="check" class="check-icon"></i>
          }
        </li>

        <li nz-menu-divider></li>

        <!-- 您的組織標題 + 管理圖示 -->
        <li class="org-header">
          <span class="org-header-title">您的組織</span>
          <a routerLink="/settings/organizations" class="org-header-action" (click)="$event.stopPropagation()">
            <i nz-icon nzType="setting" nzTheme="outline"></i>
          </a>
        </li>

        <!-- 組織列表 -->
        @for (org of organizationList(); track org.id) {
          <li nz-menu-item (click)="switchToOrg(org)" [class.org-menu-item-selected]="org.id === currentContext().currentOrgId">
            <div class="org-item-content">
              <nz-avatar [nzSrc]="org.logo" [nzText]="org.name.charAt(0)" nzSize="small" class="org-item-avatar" />
              <div class="org-item-info">
                <span class="org-item-name">{{ org.name }}</span>
                <nz-tag [nzColor]="getRoleColor(org.role)" class="role-tag" nzBordered>
                  {{ getRoleLabel(org.role) }}
                </nz-tag>
              </div>
              @if (org.id === currentContext().currentOrgId) {
                <i nz-icon nzType="check" class="check-icon"></i>
              }
            </div>
          </li>
        }

        @if (organizationList().length === 0) {
          <li nz-menu-item disabled class="empty-state">
            <span class="empty-text">尚無組織</span>
          </li>
        }

        <li nz-menu-divider></li>

        <!-- 新增組織 -->
        <li nz-menu-item (click)="createOrganization()">
          <i nz-icon nzType="plus-circle" class="menu-icon"></i>
          <span>新增組織</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .org-switcher-wrapper {
        padding: 12px 16px;
        margin: 8px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid transparent;
      }

      .org-switcher-wrapper:hover {
        background-color: rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 0, 0, 0.1);
      }

      .org-switcher-trigger {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .org-avatar {
        flex-shrink: 0;
      }

      .org-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 2px;
      }

      .org-name {
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.88);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .org-type {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }

      .swap-icon {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        flex-shrink: 0;
        transition: transform 0.3s;
      }

      .org-switcher-wrapper:hover .swap-icon {
        transform: rotate(180deg);
      }

      .org-switcher-menu {
        min-width: 280px;
        max-height: 500px;
        overflow-y: auto;
      }

      .org-menu-item-selected {
        background-color: #e6f4ff !important;
      }

      .check-icon {
        color: #1890ff;
        margin-left: auto;
        flex-shrink: 0;
      }

      .menu-icon {
        margin-right: 8px;
        color: rgba(0, 0, 0, 0.45);
      }

      .org-item-content {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
      }

      .org-item-avatar {
        flex-shrink: 0;
      }

      .org-item-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }

      .org-item-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .role-tag {
        flex-shrink: 0;
        font-size: 11px;
        padding: 0 6px;
        line-height: 18px;
      }

      .empty-state {
        text-align: center;
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
      }

      .empty-text {
        font-size: 12px;
      }

      /* 組織標題區域 */
      .org-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 500;
      }

      .org-header-title {
        flex: 1;
      }

      .org-header-action {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.3s;
        cursor: pointer;
      }

      .org-header-action:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }

      /* 響應式：側邊欄收起時的樣式 */
      @media (min-width: 768px) {
        :host-context(.alain-default__collapsed) .org-switcher-wrapper {
          width: 64px;
          margin-left: 0;
          padding: 12px 0;
        }

        :host-context(.alain-default__collapsed) .org-info {
          display: none;
        }

        :host-context(.alain-default__collapsed) .swap-icon {
          display: none;
        }

        :host-context(.alain-default__collapsed) .org-avatar {
          margin: 0 auto;
        }

        :host-context(.alain-default__collapsed) .org-switcher-trigger {
          justify-content: center;
        }
      }
    `
  ]
})
export class OrgSwitcherComponent {
  private readonly contextService = inject(OrganizationContextService);
  private readonly modalSrv = inject(NzModalService);
  private readonly orgService = inject(OrganizationService);
  private readonly message = inject(NzMessageService);

  // 從 contextService 獲取狀態
  readonly currentContext = this.contextService.currentContext;
  readonly availableOrgs = this.contextService.availableOrgs;

  // 過濾出組織（排除個人空間）
  readonly organizationList = computed(() => this.availableOrgs().filter(org => org.type === 'organization'));

  /**
   * 切換到個人空間
   */
  switchToPersonal(): void {
    this.contextService.switchToPersonal();
  }

  /**
   * 切換到指定組織
   *
   * @param org 目標組織
   */
  switchToOrg(org: UserOrganization): void {
    if (org.id) {
      this.contextService.switchToOrganization(org.id);
    }
  }

  /**
   * 創建新組織（使用 Modal）
   */
  createOrganization(): void {
    const modal = this.modalSrv.create({
      nzTitle: '新增組織',
      nzContent: OrganizationFormComponent,
      nzWidth: window.innerWidth < 768 ? '90%' : 600,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        },
        {
          label: '確定',
          type: 'primary',
          autoLoading: true,
          onClick: (componentInstance: OrganizationFormComponent | undefined) => {
            if (!componentInstance) {
              return Promise.reject(new Error('組件實例不存在'));
            }

            return componentInstance
              .submit()
              .then((formValue: CreateOrganizationRequest) => {
                // 本地測試：直接添加組織到上下文
                const newOrg: UserOrganization = {
                  id: `org-${Date.now()}`,
                  name: formValue.name,
                  type: 'organization' as const,
                  role: 'owner' as const,
                  joinedAt: new Date(),
                  description: formValue.description,
                  logo: './assets/logo.svg'
                };

                // 添加到組織上下文
                this.contextService.addOrganizationLocally(newOrg);

                this.message.success(`組織「${newOrg.name}」創建成功`);
                modal.destroy();

                // TODO: 生產環境使用真實 API
                // return this.orgService.createOrganization(formValue).toPromise().then(() => {
                //   this.contextService.reloadOrganizations();
                // });
              })
              .catch((error: Error) => {
                console.error('表單驗證失敗', error);
              });
          }
        }
      ]
    });
  }

  /**
   * 獲取角色標籤
   *
   * @param role 組織角色
   * @returns 中文標籤
   */
  // TODO: [OPTIMIZATION] Code Duplication - 與 organization-settings.component.ts 重複
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
   *
   * @param role 組織角色
   * @returns nz-tag 顏色
   */
  // TODO: [OPTIMIZATION] Code Duplication - 與 organization-settings.component.ts 重複
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
