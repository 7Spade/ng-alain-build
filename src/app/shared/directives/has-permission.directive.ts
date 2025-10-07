import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnDestroy } from '@angular/core';
import { RBACService, Permission } from '@core/services/rbac.service';
import { Subscription } from 'rxjs';

/**
 * 權限指令
 * 根據使用者權限控制元素是否顯示
 *
 * @example
 * ```html
 * <!-- 單一權限 -->
 * <button *hasPermission="Permission.WRITE_USERS">
 *   新增使用者
 * </button>
 *
 * <!-- 使用字串 -->
 * <button *hasPermission="'users:write'">
 *   編輯使用者
 * </button>
 *
 * <!-- 任一權限 -->
 * <div *hasPermission="[Permission.READ_USERS, Permission.WRITE_USERS]; mode: 'any'">
 *   使用者管理
 * </div>
 *
 * <!-- 所有權限 -->
 * <div *hasPermission="[Permission.DELETE_USERS, Permission.ADMIN]; mode: 'all'">
 *   刪除使用者（需要管理員權限）
 * </div>
 * ```
 */
@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  private rbacService = inject(RBACService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private permissionSubscription?: Subscription;
  private permissionsToCheck: Array<Permission | string> = [];
  private checkMode: 'any' | 'all' = 'all';

  @Input() set hasPermission(permission: Permission | string | Array<Permission | string>) {
    if (Array.isArray(permission)) {
      this.permissionsToCheck = permission;
    } else {
      this.permissionsToCheck = [permission];
    }
    this.updateView();
  }

  @Input() set hasPermissionMode(mode: 'any' | 'all') {
    this.checkMode = mode;
    this.updateView();
  }

  ngOnInit(): void {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.permissionSubscription?.unsubscribe();
  }

  private updateView(): void {
    // 取消之前的訂閱
    this.permissionSubscription?.unsubscribe();

    // 根據模式選擇檢查方法
    const checkObservable =
      this.checkMode === 'any'
        ? this.rbacService.hasAnyPermission(this.permissionsToCheck)
        : this.rbacService.hasAllPermissions(this.permissionsToCheck);

    // 訂閱權限檢查結果
    this.permissionSubscription = checkObservable.subscribe(hasPermission => {
      this.viewContainer.clear();
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

/**
 * 角色指令
 * 根據使用者角色控制元素是否顯示
 *
 * @example
 * ```html
 * <!-- 單一角色 -->
 * <button *hasRole="Role.ADMIN">
 *   系統設定
 * </button>
 *
 * <!-- 使用字串 -->
 * <button *hasRole="'manager'">
 *   管理面板
 * </button>
 *
 * <!-- 任一角色 -->
 * <div *hasRole="[Role.ADMIN, Role.MANAGER]; mode: 'any'">
 *   管理功能
 * </div>
 * ```
 */
@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private rbacService = inject(RBACService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private roleSubscription?: Subscription;
  private rolesToCheck: string[] = [];
  private checkMode: 'any' | 'all' = 'all';

  @Input() set hasRole(role: string | string[]) {
    if (Array.isArray(role)) {
      this.rolesToCheck = role;
    } else {
      this.rolesToCheck = [role];
    }
    this.updateView();
  }

  @Input() set hasRoleMode(mode: 'any' | 'all') {
    this.checkMode = mode;
    this.updateView();
  }

  ngOnInit(): void {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe();
  }

  private updateView(): void {
    // 取消之前的訂閱
    this.roleSubscription?.unsubscribe();

    // 根據模式選擇檢查方法
    const checkObservable =
      this.checkMode === 'any' ? this.rbacService.hasAnyRole(this.rolesToCheck) : this.rbacService.hasRole(this.rolesToCheck[0]); // 單一角色

    // 訂閱角色檢查結果
    this.roleSubscription = checkObservable.subscribe(hasRole => {
      this.viewContainer.clear();
      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

/**
 * 非權限指令（反向邏輯）
 * 當使用者**沒有**特定權限時顯示元素
 *
 * @example
 * ```html
 * <div *hasNotPermission="Permission.ADMIN">
 *   您不是管理員，無法訪問某些功能
 * </div>
 * ```
 */
@Directive({
  selector: '[hasNotPermission]',
  standalone: true
})
export class HasNotPermissionDirective implements OnInit, OnDestroy {
  private rbacService = inject(RBACService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private permissionSubscription?: Subscription;
  private permission: Permission | string = '';

  @Input() set hasNotPermission(permission: Permission | string) {
    this.permission = permission;
    this.updateView();
  }

  ngOnInit(): void {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.permissionSubscription?.unsubscribe();
  }

  private updateView(): void {
    this.permissionSubscription?.unsubscribe();

    this.permissionSubscription = this.rbacService.hasPermission(this.permission).subscribe(hasPermission => {
      this.viewContainer.clear();
      // 反向邏輯：沒有權限時才顯示
      if (!hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
