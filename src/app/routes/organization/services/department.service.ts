/**
 * 部門服務
 * @description 提供部門管理的 CRUD 操作
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import type { Department, CreateDepartmentRequest, UpdateDepartmentRequest, Employee, QueryParams, PagedResult } from '../models';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/departments';

  /**
   * 獲取部門列表（分頁）
   * @param params 查詢參數
   * @returns Observable<PagedResult<Department>>
   */
  getDepartments(params?: QueryParams): Observable<PagedResult<Department>> {
    return this.http.get<PagedResult<Department>>(this.API_BASE, params).pipe(
      catchError(err => {
        console.error('獲取部門列表失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取單個部門資訊
   * @param id 部門 ID
   * @returns Observable<Department>
   */
  getDepartment(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.API_BASE}/${id}`).pipe(
      catchError(err => {
        console.error(`獲取部門資訊失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 創建部門
   * @param data 部門資料
   * @returns Observable<Department>
   */
  createDepartment(data: CreateDepartmentRequest): Observable<Department> {
    return this.http.post<Department>(this.API_BASE, data).pipe(
      catchError(err => {
        console.error('創建部門失敗', err);
        throw err;
      })
    );
  }

  /**
   * 更新部門
   * @param id 部門 ID
   * @param data 更新資料
   * @returns Observable<Department>
   */
  updateDepartment(id: string, data: UpdateDepartmentRequest): Observable<Department> {
    return this.http.put<Department>(`${this.API_BASE}/${id}`, data).pipe(
      catchError(err => {
        console.error(`更新部門失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 刪除部門
   * @param id 部門 ID
   * @returns Observable<void>
   */
  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      catchError(err => {
        console.error(`刪除部門失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 批次刪除部門
   * @param ids 部門 ID 列表
   * @returns Observable<void>
   */
  batchDeleteDepartments(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/batch`, { ids }).pipe(
      catchError(err => {
        console.error('批次刪除部門失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取組織下的所有部門
   * @param organizationId 組織 ID
   * @returns Observable<Department[]>
   */
  getDepartmentsByOrganization(organizationId: string): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.API_BASE}/organization/${organizationId}`).pipe(
      catchError(err => {
        console.error(`獲取組織部門失敗 (組織ID: ${organizationId})`, err);
        throw err;
      })
    );
  }

  /**
   * 獲取部門成員列表
   * @param departmentId 部門 ID
   * @returns Observable<Employee[]>
   */
  getDepartmentMembers(departmentId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_BASE}/${departmentId}/members`).pipe(
      catchError(err => {
        console.error(`獲取部門成員失敗 (部門ID: ${departmentId})`, err);
        throw err;
      })
    );
  }

  /**
   * 搜尋部門
   * @param keyword 搜尋關鍵字
   * @returns Observable<Department[]>
   */
  searchDepartments(keyword: string): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.API_BASE}/search`, { keyword }).pipe(
      catchError(err => {
        console.error('搜尋部門失敗', err);
        throw err;
      })
    );
  }

  /**
   * 匯出部門資料
   * @param params 查詢參數
   * @returns Observable<Blob>
   */
  exportDepartments(params?: QueryParams): Observable<Blob> {
    return this.http.get(`${this.API_BASE}/export`, params, {
      responseType: 'blob'
    }).pipe(
      catchError(err => {
        console.error('匯出部門資料失敗', err);
        throw err;
      })
    );
  }
}

