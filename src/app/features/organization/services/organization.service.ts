/**
 * 組織服務
 * @description 提供組織架構的 CRUD 操作和樹狀結構管理
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import type { Organization, CreateOrganizationRequest, UpdateOrganizationRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(CacheService);
  private readonly API_BASE = '/api/organizations';
  
  // 緩存鍵
  private readonly CACHE_KEY_TREE = 'org:tree';
  private readonly CACHE_KEY_ORG = (id: string) => `org:${id}`;
  private readonly CACHE_EXPIRE = 300; // 5 分鐘

  /**
   * 獲取組織架構樹
   * @param useCache 是否使用緩存
   * @returns Observable<Organization[]>
   */
  getOrganizationTree(useCache = true): Observable<Organization[]> {
    if (useCache) {
      const cached = this.cache.get(this.CACHE_KEY_TREE);
      if (cached) {
        return of(cached);
      }
    }
    
    return this.http.get<Organization[]>(`${this.API_BASE}/tree`).pipe(
      tap(data => this.cache.set(this.CACHE_KEY_TREE, data, { expire: this.CACHE_EXPIRE })),
      catchError(err => {
        console.error('獲取組織架構樹失敗', err);
        throw err;
      })
    );
  }

  /**
   * 獲取單個組織資訊
   * @param id 組織 ID
   * @returns Observable<Organization>
   */
  getOrganization(id: string): Observable<Organization> {
    const cacheKey = this.CACHE_KEY_ORG(id);
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return of(cached);
    }
    
    return this.http.get<Organization>(`${this.API_BASE}/${id}`).pipe(
      tap(data => this.cache.set(cacheKey, data, { expire: this.CACHE_EXPIRE })),
      catchError(err => {
        console.error(`獲取組織資訊失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 創建組織
   * @param data 組織資料
   * @returns Observable<Organization>
   */
  createOrganization(data: CreateOrganizationRequest): Observable<Organization> {
    return this.http.post<Organization>(this.API_BASE, data).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error('創建組織失敗', err);
        throw err;
      })
    );
  }

  /**
   * 更新組織
   * @param id 組織 ID
   * @param data 更新資料
   * @returns Observable<Organization>
   */
  updateOrganization(id: string, data: UpdateOrganizationRequest): Observable<Organization> {
    return this.http.put<Organization>(`${this.API_BASE}/${id}`, data).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error(`更新組織失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 刪除組織
   * @param id 組織 ID
   * @returns Observable<void>
   */
  deleteOrganization(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error(`刪除組織失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 移動組織到新的父組織下
   * @param id 組織 ID
   * @param newParentId 新父組織 ID
   * @returns Observable<Organization>
   */
  moveOrganization(id: string, newParentId: string): Observable<Organization> {
    return this.http.put<Organization>(`${this.API_BASE}/${id}/move`, { newParentId }).pipe(
      tap(() => this.clearCache()),
      catchError(err => {
        console.error(`移動組織失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 獲取組織的所有子節點
   * @param id 組織 ID
   * @returns Observable<Organization[]>
   */
  getChildren(id: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.API_BASE}/${id}/children`).pipe(
      catchError(err => {
        console.error(`獲取子組織失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 獲取組織的完整路徑（從根到當前節點）
   * @param id 組織 ID
   * @returns Observable<Organization[]>
   */
  getPath(id: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.API_BASE}/${id}/path`).pipe(
      catchError(err => {
        console.error(`獲取組織路徑失敗 (ID: ${id})`, err);
        throw err;
      })
    );
  }

  /**
   * 搜尋組織
   * @param keyword 搜尋關鍵字
   * @returns Observable<Organization[]>
   */
  searchOrganizations(keyword: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.API_BASE}/search`, { keyword }).pipe(
      catchError(err => {
        console.error('搜尋組織失敗', err);
        throw err;
      })
    );
  }

  /**
   * 清除緩存
   */
  private clearCache(): void {
    this.cache.remove(this.CACHE_KEY_TREE);
    // 清除所有組織緩存
    this.cache.clear(/^org:/);
  }
}

