/**
 * 用戶組織服務
 * @description 提供用戶所屬組織的 CRUD 操作
 * @usage 區別於 OrganizationService（內部組織結構）
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import type { 
  UserOrganization, 
  OrganizationMembership,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  RemoveMemberRequest
} from '../models';

@Injectable({ providedIn: 'root' })
export class UserOrganizationService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(CacheService);
  private readonly API_BASE = '/api/user/organizations';
  
  // 緩存鍵
  private readonly CACHE_KEY_USER_ORGS = 'user:organizations';
  private readonly CACHE_KEY_ORG_MENU = (id: string) => `user:org:${id}:menu`;
  private readonly CACHE_EXPIRE = 300; // 5 分鐘

  /**
   * 獲取用戶所屬的所有組織
   * @param useCache 是否使用緩存
   * @returns Observable<UserOrganization[]>
   */
  getUserOrganizations(useCache = true): Observable<UserOrganization[]> {
    if (useCache) {
      const cached: any = this.cache.get(this.CACHE_KEY_USER_ORGS);
      if (cached) {
        return of(cached);
      }
    }
    
    return this.http.get<UserOrganization[]>(this.API_BASE).pipe(
      tap(data => this.cache.set(this.CACHE_KEY_USER_ORGS, data, { expire: this.CACHE_EXPIRE })),
      catchError(err => {
        console.error('獲取用戶組織列表失敗', err);
        // 返回默認個人空間（明確類型）
        const defaultPersonal: UserOrganization[] = [{
          id: null,
          name: '個人空間',
          type: 'personal' as const,
          role: 'owner' as const,
          joinedAt: new Date()
        }];
        return of(defaultPersonal);
      })
    );
  }

  /**
   * 獲取組織菜單
   * @param orgId 組織 ID（null = 個人空間）
   * @returns Observable<any[]>
   */
  getOrganizationMenu(orgId: string | null): Observable<any[]> {
    if (!orgId) {
      // 個人空間菜單
      return this.getPersonalMenu();
    }
    
    const cacheKey = this.CACHE_KEY_ORG_MENU(orgId);
    const cached: any = this.cache.get(cacheKey);
    
    if (cached) {
      return of(cached);
    }
    
    return this.http.get<any[]>(`/api/organizations/${orgId}/menu`).pipe(
      tap(data => this.cache.set(cacheKey, data, { expire: this.CACHE_EXPIRE })),
      catchError(err => {
        console.error(`獲取組織菜單失敗 (ID: ${orgId})`, err);
        return of([]);
      })
    );
  }

  /**
   * 獲取個人空間菜單
   * @returns Observable<any[]>
   */
  getPersonalMenu(): Observable<any[]> {
    // 從 app-data.json 讀取或從 API 獲取
    return this.http.get<any>('./assets/tmp/app-data.json').pipe(
      map(appData => appData.personalMenu || appData.menu),
      catchError(err => {
        console.error('獲取個人菜單失敗', err);
        return of([]);
      })
    );
  }

  /**
   * 獲取組織成員列表
   * @param orgId 組織 ID
   * @returns Observable<OrganizationMembership[]>
   */
  getOrganizationMembers(orgId: string): Observable<OrganizationMembership[]> {
    return this.http.get<OrganizationMembership[]>(`/api/organizations/${orgId}/members`).pipe(
      catchError(err => {
        console.error(`獲取組織成員失敗 (ID: ${orgId})`, err);
        return of([]);
      })
    );
  }

  /**
   * 邀請成員加入組織
   * @param request 邀請請求
   * @returns Observable<OrganizationMembership>
   */
  inviteMember(request: InviteMemberRequest): Observable<OrganizationMembership> {
    return this.http.post<OrganizationMembership>(`/api/organizations/${request.organizationId}/members/invite`, request).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error('邀請成員失敗', err);
        throw err;
      })
    );
  }

  /**
   * 更新成員角色
   * @param request 更新請求
   * @returns Observable<OrganizationMembership>
   */
  updateMemberRole(request: UpdateMemberRoleRequest): Observable<OrganizationMembership> {
    return this.http.put<OrganizationMembership>(`/api/memberships/${request.membershipId}/role`, request).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error('更新成員角色失敗', err);
        throw err;
      })
    );
  }

  /**
   * 移除組織成員
   * @param request 移除請求
   * @returns Observable<void>
   */
  removeMember(request: RemoveMemberRequest): Observable<void> {
    return this.http.delete<void>(`/api/memberships/${request.membershipId}`, { body: request }).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error('移除成員失敗', err);
        throw err;
      })
    );
  }

  /**
   * 離開組織
   * @param orgId 組織 ID
   * @returns Observable<void>
   */
  leaveOrganization(orgId: string): Observable<void> {
    return this.http.post<void>(`/api/organizations/${orgId}/leave`, {}).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error(`離開組織失敗 (ID: ${orgId})`, err);
        throw err;
      })
    );
  }

  /**
   * 清除緩存
   */
  clearCache(): void {
    this.cache.remove(this.CACHE_KEY_USER_ORGS);
    // 菜單緩存會自動過期
  }
}

