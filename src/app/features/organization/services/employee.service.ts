/**
 * 員工服務
 * @description 提供員工管理的 CRUD 操作
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import type { Employee, CreateEmployeeRequest, UpdateEmployeeRequest, QueryParams, PagedResult } from '../models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/employees';

  /**
   * 獲取員工列表（分頁）
   * @param params 查詢參數
   * @returns Observable<PagedResult<Employee>>
   */
  getEmployees(params?: QueryParams): Observable<PagedResult<Employee>> {
    return this.http.get<PagedResult<Employee>>(this.API_BASE, params).pipe(
      catchError(err => {
        console.error('獲取員工列表失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取單個員工資訊
   * @param id 員工 ID
   * @returns Observable<Employee>
   */
  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_BASE}/${id}`).pipe(
      catchError(err => {
        console.error(`獲取員工資訊失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 創建員工
   * @param data 員工資料
   * @returns Observable<Employee>
   */
  createEmployee(data: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(this.API_BASE, data).pipe(
      catchError(err => {
        console.error('創建員工失敗', err);
        throw err;
      })
    );
  }

  /**
   * 更新員工
   * @param id 員工 ID
   * @param data 更新資料
   * @returns Observable<Employee>
   */
  updateEmployee(id: string, data: UpdateEmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.API_BASE}/${id}`, data).pipe(
      catchError(err => {
        console.error(`更新員工失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 刪除員工
   * @param id 員工 ID
   * @returns Observable<void>
   */
  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      catchError(err => {
        console.error(`刪除員工失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 批次刪除員工
   * @param ids 員工 ID 列表
   * @returns Observable<void>
   */
  batchDeleteEmployees(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/batch`, { ids }).pipe(
      catchError(err => {
        console.error('批次刪除員工失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取部門下的所有員工
   * @param departmentId 部門 ID
   * @returns Observable<Employee[]>
   */
  getEmployeesByDepartment(departmentId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_BASE}/department/${departmentId}`).pipe(
      catchError(err => {
        console.error(`獲取部門員工失敗 (部門ID: ${departmentId})`, err);
        throw err;
      })
    );
  }

  /**
   * 搜尋員工
   * @param keyword 搜尋關鍵字
   * @returns Observable<Employee[]>
   */
  searchEmployees(keyword: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_BASE}/search`, { keyword }).pipe(
      catchError(err => {
        console.error('搜尋員工失敗', err);
        throw err;
      })
    );
  }

  /**
   * 為員工分配角色
   * @param employeeId 員工 ID
   * @param roleIds 角色 ID 列表
   * @returns Observable<Employee>
   */
  assignRoles(employeeId: string, roleIds: string[]): Observable<Employee> {
    return this.http.put<Employee>(`${this.API_BASE}/${employeeId}/roles`, { roleIds }).pipe(
      catchError(err => {
        console.error(`分配角色失敗 (員工ID: ${employeeId})`, err);
        throw err;
      })
    );
  }

  /**
   * 上傳員工頭像
   * @param employeeId 員工 ID
   * @param file 頭像檔案
   * @returns Observable<string> 頭像 URL
   */
  uploadAvatar(employeeId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.http.post<{ url: string }>(`${this.API_BASE}/${employeeId}/avatar`, formData).pipe(
      map(response => response.url),
      catchError(err => {
        console.error(`上傳頭像失敗 (員工ID: ${employeeId})`, err);
        throw err;
      })
    );
  }

  /**
   * 匯出員工資料
   * @param params 查詢參數
   * @returns Observable<Blob>
   */
  exportEmployees(params?: QueryParams): Observable<Blob> {
    return this.http.get(`${this.API_BASE}/export`, params, {
      responseType: 'blob'
    }).pipe(
      catchError(err => {
        console.error('匯出員工資料失敗', err);
        throw err;
      })
    );
  }
}

