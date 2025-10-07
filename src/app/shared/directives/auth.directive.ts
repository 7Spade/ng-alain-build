import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ACLService } from '@delon/acl';

/**
 * 元素級權限控制指令
 * @description 根據用戶權限顯示或隱藏元素
 * @example
 * ```html
 * <!-- 僅有 'user:delete' 權限的用戶可見 -->
 * <button *appAuth="'user:delete'" (click)="deleteUser()">
 *   刪除用戶
 * </button>
 * 
 * <!-- 僅有 'dept:edit' 權限的用戶可見 -->
 * <div *appAuth="'dept:edit'">
 *   編輯部門表單
 * </div>
 * 
 * <!-- 不傳入權限碼則始終顯示 -->
 * <button *appAuth>通用按鈕</button>
 * ```
 */
@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  private aclService = inject(ACLService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);

  /**
   * 設置權限碼
   * @param authCode 權限碼字串，如 'user:delete', 'dept:edit' 等
   */
  @Input()
  set appAuth(authCode: string | undefined) {
    // 如果沒有傳入權限碼，則始終顯示
    if (!authCode) {
      this.show(true);
      return;
    }
    
    // 使用 ACLService 檢查權限
    const hasPermission = this.aclService.can(authCode);
    this.show(hasPermission);
  }

  /**
   * 顯示或隱藏元素
   * @param hasAuth 是否有權限
   */
  private show(hasAuth: boolean): void {
    if (hasAuth) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

