/**
 * 組織上下文服務
 *
 * @description 管理當前組織上下文，提供組織切換功能
 * @usage 類似 GitHub 的組織切換機制
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

import type {
  UserOrganization,
  OrganizationContext,
  OrganizationRole,
  ORGANIZATION_ROLE_PERMISSIONS
} from '../../../features/organization/models';
import { UserOrganizationService } from '../../../features/organization/services/user-organization.service';
import { TabService } from '../tab/tab.service';

@Injectable({ providedIn: 'root' })
export class OrganizationContextService {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);
  private readonly aclService = inject(ACLService);
  private readonly tabService = inject(TabService);
  private readonly message = inject(NzMessageService);
  private readonly userOrgService = inject(UserOrganizationService);

  // Signals 狀態管理
  private readonly _currentContext = signal<OrganizationContext>({
    currentOrgId: null,
    currentOrg: null,
    currentRole: 'owner',
    isPersonalSpace: true
  });

  private readonly _availableOrgs = signal<UserOrganization[]>([]);

  // 公開只讀 Signals
  readonly currentContext = this._currentContext.asReadonly();
  readonly availableOrgs = this._availableOrgs.asReadonly();

  // Computed Signals
  readonly isPersonalSpace = computed(() => this._currentContext().isPersonalSpace);
  readonly currentOrgId = computed(() => this._currentContext().currentOrgId);
  readonly currentRole = computed(() => this._currentContext().currentRole);
  readonly currentOrgName = computed(() => this._currentContext().currentOrg?.name || '個人空間');

  /**
   * 初始化組織列表
   *
   * @description 從 API 獲取用戶所屬組織並恢復上次選擇
   */
  async initialize(): Promise<void> {
    try {
      // 獲取用戶所屬的所有組織
      const orgs = await this.userOrgService.getUserOrganizations().toPromise();

      // 確保包含個人空間
      const orgsWithPersonal = this.ensurePersonalSpace(orgs || []);
      this._availableOrgs.set(orgsWithPersonal);

      // 恢復上次選擇的組織
      const savedOrgId = localStorage.getItem('current_organization_id');

      if (savedOrgId && savedOrgId !== 'null') {
        const org = orgsWithPersonal.find(o => o.id === savedOrgId);
        if (org) {
          await this.switchToOrganization(savedOrgId, false);
          return;
        }
      }

      // 默認切換到個人空間
      this.switchToPersonal(false);
    } catch (error) {
      console.error('初始化組織上下文失敗', error);
      // 發生錯誤時，至少切換到個人空間
      this._availableOrgs.set(this.getDefaultPersonalSpace());
      this.switchToPersonal(false);
    }
  }

  /**
   * 切換到指定組織
   *
   * @param orgId 組織 ID
   * @param clearTabs 是否清除所有 Tab（預設 true）
   */
  async switchToOrganization(orgId: string, clearTabs = true): Promise<void> {
    const targetOrg = this._availableOrgs().find(o => o.id === orgId);

    if (!targetOrg) {
      this.message.error('找不到目標組織');
      return;
    }

    if (targetOrg.id === this._currentContext().currentOrgId) {
      return; // 已經在此組織中
    }

    // 1. 更新上下文
    this._currentContext.set({
      currentOrgId: targetOrg.id,
      currentOrg: targetOrg,
      currentRole: targetOrg.role,
      isPersonalSpace: false
    });

    // 2. 持久化到 localStorage
    if (targetOrg.id) {
      localStorage.setItem('current_organization_id', targetOrg.id);
    }

    // 3. 清除 Tab（推薦，避免跨組織混亂）
    if (clearTabs) {
      this.tabService.clearTabs();
    }

    // 4. 加載組織菜單
    await this.loadOrganizationMenu(orgId);

    // 5. 更新 ACL 權限
    this.updateACL(targetOrg.role);

    // 6. 跳轉到組織首頁
    this.router.navigateByUrl('/dashboard');

    this.message.success(`已切換至 ${targetOrg.name}`);
  }

  /**
   * 切換到個人空間
   *
   * @param clearTabs 是否清除所有 Tab（預設 true）
   */
  switchToPersonal(clearTabs = true): void {
    const personalOrg = this._availableOrgs().find(o => o.type === 'personal');

    if (!personalOrg) {
      console.error('找不到個人空間');
      return;
    }

    // 1. 更新上下文
    this._currentContext.set({
      currentOrgId: null,
      currentOrg: personalOrg,
      currentRole: 'owner',
      isPersonalSpace: true
    });

    // 2. 持久化
    localStorage.setItem('current_organization_id', 'null');

    // 3. 清除 Tab
    if (clearTabs) {
      this.tabService.clearTabs();
    }

    // 4. 加載個人菜單
    this.loadPersonalMenu();

    // 5. 更新 ACL 權限（個人空間全權限）
    this.aclService.setFull(true);

    // 6. 跳轉到首頁
    this.router.navigateByUrl('/dashboard');

    this.message.success('已切換至個人空間');
  }

  /**
   * 重新加載組織列表
   *
   * @description 創建新組織後調用
   */
  async reloadOrganizations(): Promise<void> {
    try {
      const orgs = await this.userOrgService.getUserOrganizations(false).toPromise();
      const orgsWithPersonal = this.ensurePersonalSpace(orgs || []);
      this._availableOrgs.set(orgsWithPersonal);
    } catch (error) {
      console.error('重新加載組織列表失敗', error);
    }
  }

  /**
   * 本地添加組織（用於測試）
   *
   * @param org 新組織
   */
  addOrganizationLocally(org: UserOrganization): void {
    const current = this._availableOrgs();
    this._availableOrgs.set([...current, org]);
  }

  /**
   * 加載組織菜單
   *
   * @param orgId 組織 ID
   */
  private async loadOrganizationMenu(orgId: string): Promise<void> {
    try {
      const menuData = await this.userOrgService.getOrganizationMenu(orgId).toPromise();
      this.menuService.clear();
      this.menuService.add(menuData || []);
    } catch (error) {
      console.error('加載組織菜單失敗', error);
      this.menuService.clear();
    }
  }

  /**
   * 加載個人菜單
   */
  private loadPersonalMenu(): void {
    this.userOrgService.getPersonalMenu().subscribe({
      next: menuData => {
        this.menuService.clear();
        this.menuService.add(menuData);
      },
      error: error => {
        console.error('加載個人菜單失敗', error);
        this.menuService.clear();
      }
    });
  }

  /**
   * 更新 ACL 權限
   *
   * @param role 組織角色
   */
  private updateACL(role: OrganizationRole): void {
    const permissions = this.getRolePermissions(role);
    this.aclService.setAbility(permissions);
  }

  /**
   * 獲取角色權限
   *
   * @param role 組織角色
   * @returns 權限列表
   */
  private getRolePermissions(role: OrganizationRole): string[] {
    const permissionMap: Record<OrganizationRole, string[]> = {
      owner: ['admin', 'user', 'manage_members', 'manage_settings', 'delete_organization'],
      admin: ['admin', 'user', 'manage_members'],
      member: ['user'],
      viewer: ['viewer']
    };
    return permissionMap[role] || [];
  }

  /**
   * 確保組織列表包含個人空間
   *
   * @param orgs 組織列表
   * @returns 包含個人空間的組織列表
   */
  private ensurePersonalSpace(orgs: UserOrganization[]): UserOrganization[] {
    const hasPersonal = orgs.some(o => o.type === 'personal');
    if (hasPersonal) {
      return orgs;
    }

    // 添加默認個人空間
    return [
      {
        id: null,
        name: '個人空間',
        type: 'personal',
        role: 'owner',
        joinedAt: new Date()
      },
      ...orgs
    ];
  }

  /**
   * 獲取默認個人空間
   */
  private getDefaultPersonalSpace(): UserOrganization[] {
    return [
      {
        id: null,
        name: '個人空間',
        type: 'personal',
        role: 'owner',
        joinedAt: new Date()
      }
    ];
  }
}
