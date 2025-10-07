/**
 * 專案服務
 * @description 專案核心業務邏輯，自動適配組織/個人空間
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationContextService } from '@core';
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectQueryParams,
  ProjectListResponse
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly orgContext = inject(OrganizationContextService);
  
  /**
   * 獲取專案列表（自動適配個人/組織）
   * @param params 查詢參數
   * @returns 專案列表
   */
  getProjects(params?: ProjectQueryParams): Observable<ProjectListResponse> {
    const orgId = this.orgContext.currentOrgId();
    const url = orgId 
      ? `/api/organizations/${orgId}/projects`
      : `/api/users/me/projects`;
    
    // 構建查詢參數
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.tags) httpParams = httpParams.set('tags', params.tags.join(','));
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.visibility) httpParams = httpParams.set('visibility', params.visibility);
      if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
      if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
      if (params.pageIndex !== undefined) httpParams = httpParams.set('pageIndex', params.pageIndex.toString());
      if (params.pageSize !== undefined) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    
    return this.http.get<ProjectListResponse>(url, { params: httpParams });
  }
  
  /**
   * 獲取專案詳情
   * @param id 專案 ID
   * @returns 專案詳情
   */
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`);
  }
  
  /**
   * 創建專案（自動適配個人/組織）
   * @param data 創建專案請求
   * @returns 創建的專案
   */
  createProject(data: CreateProjectRequest): Observable<Project> {
    const orgId = this.orgContext.currentOrgId();
    const url = orgId
      ? `/api/organizations/${orgId}/projects`
      : `/api/users/me/projects`;
    return this.http.post<Project>(url, data);
  }
  
  /**
   * 更新專案
   * @param id 專案 ID
   * @param data 更新專案請求
   * @returns 更新後的專案
   */
  updateProject(id: string, data: UpdateProjectRequest): Observable<Project> {
    return this.http.put<Project>(`/api/projects/${id}`, data);
  }
  
  /**
   * 刪除專案
   * @param id 專案 ID
   * @returns void
   */
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${id}`);
  }
  
  /**
   * 歸檔專案
   * @param id 專案 ID
   * @returns 歸檔後的專案
   */
  archiveProject(id: string): Observable<Project> {
    return this.http.post<Project>(`/api/projects/${id}/archive`, {});
  }
  
  /**
   * 恢復專案
   * @param id 專案 ID
   * @returns 恢復後的專案
   */
  restoreProject(id: string): Observable<Project> {
    return this.http.post<Project>(`/api/projects/${id}/restore`, {});
  }
  
  /**
   * 獲取專案統計
   * @param id 專案 ID
   * @returns 專案統計數據
   */
  getProjectStats(id: string): Observable<{
    fileCount: number;
    storageUsed: number;
    memberCount: number;
    activityCount: number;
  }> {
    return this.http.get<any>(`/api/projects/${id}/stats`);
  }
}

