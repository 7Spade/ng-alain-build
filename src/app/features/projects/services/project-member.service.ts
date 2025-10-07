/**
 * 專案成員服務
 * @description 專案成員和權限管理
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type {
  ProjectMember,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  MemberQueryParams,
  MemberListResponse
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectMemberService {
  private readonly http = inject(HttpClient);
  
  /**
   * 獲取專案成員列表
   * @param params 查詢參數
   * @returns 成員列表
   */
  getMembers(params: MemberQueryParams): Observable<MemberListResponse> {
    const { projectId, role, search } = params;
    
    let httpParams = new HttpParams();
    if (role) httpParams = httpParams.set('role', role);
    if (search) httpParams = httpParams.set('search', search);
    
    return this.http.get<MemberListResponse>(`/api/projects/${projectId}/members`, { params: httpParams });
  }
  
  /**
   * 獲取成員詳情
   * @param projectId 專案 ID
   * @param memberId 成員 ID
   * @returns 成員詳情
   */
  getMember(projectId: string, memberId: string): Observable<ProjectMember> {
    return this.http.get<ProjectMember>(`/api/projects/${projectId}/members/${memberId}`);
  }
  
  /**
   * 邀請成員
   * @param projectId 專案 ID
   * @param data 邀請請求
   * @returns 創建的成員
   */
  inviteMember(projectId: string, data: InviteMemberRequest): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(`/api/projects/${projectId}/members`, data);
  }
  
  /**
   * 更新成員角色
   * @param projectId 專案 ID
   * @param memberId 成員 ID
   * @param data 更新請求
   * @returns 更新後的成員
   */
  updateMemberRole(projectId: string, memberId: string, data: UpdateMemberRoleRequest): Observable<ProjectMember> {
    return this.http.put<ProjectMember>(`/api/projects/${projectId}/members/${memberId}`, data);
  }
  
  /**
   * 移除成員
   * @param projectId 專案 ID
   * @param memberId 成員 ID
   * @returns void
   */
  removeMember(projectId: string, memberId: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${projectId}/members/${memberId}`);
  }
  
  /**
   * 批量邀請成員
   * @param projectId 專案 ID
   * @param members 成員列表
   * @returns 創建的成員列表
   */
  batchInviteMembers(projectId: string, members: InviteMemberRequest[]): Observable<ProjectMember[]> {
    return this.http.post<ProjectMember[]>(`/api/projects/${projectId}/members/batch`, { members });
  }
  
  /**
   * 檢查用戶權限
   * @param projectId 專案 ID
   * @param userId 用戶 ID
   * @param permission 權限名稱
   * @returns 是否有權限
   */
  checkPermission(projectId: string, userId: string, permission: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/projects/${projectId}/members/${userId}/permissions/${permission}`);
  }
}

