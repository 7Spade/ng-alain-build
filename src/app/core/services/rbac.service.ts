import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DelonFirebaseTokenService } from './delon-firebase-token.service';

/**
 * 權限枚舉
 * 定義系統中所有可用的權限
 */
export enum Permission {
  // 使用者管理
  READ_USERS = 'users:read',
  WRITE_USERS = 'users:write',
  DELETE_USERS = 'users:delete',
  
  // 專案管理
  READ_PROJECTS = 'projects:read',
  WRITE_PROJECTS = 'projects:write',
  DELETE_PROJECTS = 'projects:delete',
  
  // 組織管理
  READ_ORGANIZATIONS = 'organizations:read',
  WRITE_ORGANIZATIONS = 'organizations:write',
  DELETE_ORGANIZATIONS = 'organizations:delete',
  
  // 部門管理
  READ_DEPARTMENTS = 'departments:read',
  WRITE_DEPARTMENTS = 'departments:write',
  DELETE_DEPARTMENTS = 'departments:delete',
  
  // 檔案管理
  READ_FILES = 'files:read',
  WRITE_FILES = 'files:write',
  DELETE_FILES = 'files:delete',
  
  // 系統管理
  ADMIN = 'admin:all',
  SYSTEM_SETTINGS = 'system:settings',
  VIEW_LOGS = 'system:logs',
  
  // 報表
  VIEW_REPORTS = 'reports:view',
  EXPORT_REPORTS = 'reports:export'
}

/**
 * 角色枚舉
 */
export enum Role {
  /** 系統管理員 */
  ADMIN = 'admin',
  
  /** 組織擁有者 */
  OWNER = 'owner',
  
  /** 組織管理員 */
  MANAGER = 'manager',
  
  /** 一般使用者 */
  USER = 'user',
  
  /** 訪客 */
  VIEWER = 'viewer'
}

/**
 * RBAC (Role-Based Access Control) 服務
 * 提供完整的角色權限管理功能
 */
@Injectable({ providedIn: 'root' })
export class RBACService {
  private auth = inject(Auth);
  private delonTokenService = inject(DelonFirebaseTokenService);

  // ===== 權限檢查 =====

  /**
   * 檢查使用者是否有特定權限
   */
  hasPermission(permission: Permission | string): Observable<boolean> {
    // 優先使用快取的 Token（效能優化）
    if (this.delonTokenService.hasToken()) {
      return of(this.delonTokenService.hasPermission(permission));
    }
    
    // 從 Firebase 即時獲取
    return from(this.getUserPermissions()).pipe(
      map(permissions => permissions.includes(permission)),
      catchError(() => of(false))
    );
  }

  /**
   * 檢查使用者是否有任一權限
   */
  hasAnyPermission(permissions: (Permission | string)[]): Observable<boolean> {
    // 優先使用快取
    if (this.delonTokenService.hasToken()) {
      return of(this.delonTokenService.hasAnyPermission(permissions as string[]));
    }
    
    return from(this.getUserPermissions()).pipe(
      map(userPerms => permissions.some(p => userPerms.includes(p as string))),
      catchError(() => of(false))
    );
  }

  /**
   * 檢查使用者是否有所有權限
   */
  hasAllPermissions(permissions: (Permission | string)[]): Observable<boolean> {
    // 優先使用快取
    if (this.delonTokenService.hasToken()) {
      return of(this.delonTokenService.hasAllPermissions(permissions as string[]));
    }
    
    return from(this.getUserPermissions()).pipe(
      map(userPerms => permissions.every(p => userPerms.includes(p as string))),
      catchError(() => of(false))
    );
  }

  /**
   * 同步獲取使用者權限（從快取）
   */
  getPermissionsSync(): string[] {
    const token = this.delonTokenService.getToken();
    return token?.permissions || [];
  }

  // ===== 角色檢查 =====

  /**
   * 檢查使用者是否有特定角色
   */
  hasRole(role: Role | string): Observable<boolean> {
    // 優先使用快取
    if (this.delonTokenService.hasToken()) {
      return of(this.delonTokenService.hasRole(role));
    }
    
    return from(this.getUserRole()).pipe(
      map(userRole => userRole === role),
      catchError(() => of(false))
    );
  }

  /**
   * 檢查使用者是否有任一角色
   */
  hasAnyRole(roles: (Role | string)[]): Observable<boolean> {
    // 優先使用快取
    if (this.delonTokenService.hasToken()) {
      return of(this.delonTokenService.hasAnyRole(roles as string[]));
    }
    
    return from(this.getUserRole()).pipe(
      map(userRole => roles.includes(userRole as Role)),
      catchError(() => of(false))
    );
  }

  /**
   * 同步獲取使用者角色（從快取）
   */
  getRoleSync(): string | undefined {
    const token = this.delonTokenService.getToken();
    return token?.role;
  }

  /**
   * 檢查是否為管理員
   */
  isAdmin(): Observable<boolean> {
    return this.hasRole(Role.ADMIN);
  }

  /**
   * 檢查是否為管理員（同步）
   */
  isAdminSync(): boolean {
    return this.getRoleSync() === Role.ADMIN;
  }

  // ===== 私有方法 =====

  /**
   * 從 Firebase 獲取使用者權限列表
   */
  private async getUserPermissions(): Promise<string[]> {
    const user = this.auth.currentUser;
    if (!user) return [];

    try {
      const result = await user.getIdTokenResult();
      return (result.claims['permissions'] as string[]) || [];
    } catch (error) {
      console.error('[RBAC Service] 獲取權限失敗:', error);
      return [];
    }
  }

  /**
   * 從 Firebase 獲取使用者角色
   */
  private async getUserRole(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (!user) return null;

    try {
      const result = await user.getIdTokenResult();
      return (result.claims['role'] as string) || null;
    } catch (error) {
      console.error('[RBAC Service] 獲取角色失敗:', error);
      return null;
    }
  }

  /**
   * 刷新權限和角色（從 Firebase 重新獲取）
   */
  async refreshPermissions(): Promise<void> {
    if (!this.auth.currentUser) {
      throw new Error('未登入');
    }

    try {
      // 強制刷新 Token 以獲取最新的 Custom Claims
      await this.delonTokenService.forceRefresh();
      console.log('[RBAC Service] 權限已刷新');
    } catch (error) {
      console.error('[RBAC Service] 權限刷新失敗:', error);
      throw error;
    }
  }
}

