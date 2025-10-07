/**
 * 角色服務
 * @description 提供角色管理和權限控制的操作
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { ACLService } from '@delon/acl';
import type { Role, CreateRoleRequest, UpdateRoleRequest, QueryParams, PagedResult } from '../models';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly http = inject(_HttpClient);
  private readonly acl = inject(ACLService);
  private readonly API_BASE = '/api/roles';

  /**
   * 獲取角色列表（分頁）
   * @param params 查詢參數
   * @returns Observable<PagedResult<Role>>
   */
  getRoles(params?: QueryParams): Observable<PagedResult<Role>> {
    return this.http.get<PagedResult<Role>>(this.API_BASE, params).pipe(
      catchError(err => {
        console.error('獲取角色列表失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取所有角色（不分頁）
   * @returns Observable<Role[]>
   */
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.API_BASE}/all`).pipe(
      catchError(err => {
        console.error('獲取所有角色失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取單個角色資訊
   * @param id 角色 ID
   * @returns Observable<Role>
   */
  getRole(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.API_BASE}/${id}`).pipe(
      catchError(err => {
        console.error(`獲取角色資訊失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 創建角色
   * @param data 角色資料
   * @returns Observable<Role>
   */
  createRole(data: CreateRoleRequest): Observable<Role> {
    return this.http.post<Role>(this.API_BASE, data).pipe(
      tap(() => this.refreshACL()),
      catchError(err => {
        console.error('創建角色失敗', err);
        throw err;
      })
    );
  }

  /**
   * 更新角色
   * @param id 角色 ID
   * @param data 更新資料
   * @returns Observable<Role>
   */
  updateRole(id: string, data: UpdateRoleRequest): Observable<Role> {
    return this.http.put<Role>(`${this.API_BASE}/${id}`, data).pipe(
      tap(() => this.refreshACL()),
      catchError(err => {
        console.error(`更新角色失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 刪除角色
   * @param id 角色 ID
   * @returns Observable<void>
   */
  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.refreshACL()),
      catchError(err => {
        console.error(`刪除角色失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 獲取所有可用權限
   * @returns Observable<string[]>
   */
  getAllPermissions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE}/permissions`).pipe(
      catchError(err => {
        console.error('獲取權限列表失敗', err);
        throw err;
      })
    );
  }

  /**
   * 為角色分配權限
   * @param roleId 角色 ID
   * @param permissions 權限列表
   * @returns Observable<Role>
   */
  assignPermissions(roleId: string, permissions: string[]): Observable<Role> {
    return this.http.put<Role>(`${this.API_BASE}/${roleId}/permissions`, { permissions }).pipe(
      tap(() => this.refreshACL()),
      catchError(err => {
        console.error(`分配權限失敗 (角色ID: ${roleId})`, err);
        throw err;
      })
    );
  }

  /**
   * 檢查用戶是否有指定權限
   * @param permission 權限
   * @returns Observable<boolean>
   */
  checkPermission(permission: string): Observable<boolean> {
    const hasPermission = this.acl.can(permission);
    return of(hasPermission);
  }

  /**
   * 檢查用戶是否有任一權限
   * @param permissions 權限列表
   * @returns Observable<boolean>
   */
  checkAnyPermission(permissions: string[]): Observable<boolean> {
    const hasPermission = this.acl.canAbility(permissions);
    return of(hasPermission);
  }

  /**
   * 刷新 ACL 配置
   * @private
   */
  private refreshACL(): void {
    // 重新載入當前用戶的權限
    this.http.get<{ roles: Role[] }>('/api/auth/me').subscribe({
      next: (user) => {
        const permissions = user.roles.flatMap(role => role.permissions);
        this.acl.setAbility(permissions);
      },
      error: (err) => {
        console.error('刷新 ACL 失敗', err);
      }
    });
  }
}

