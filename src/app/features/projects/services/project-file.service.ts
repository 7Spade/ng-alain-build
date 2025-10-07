/**
 * 專案檔案服務
 *
 * @description 檔案上傳、下載、管理
 */

import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import type { ProjectFile, FileQueryParams, FileListResponse, CreateFolderRequest, UploadFileRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectFileService {
  private readonly http = inject(HttpClient);

  /**
   * 獲取專案檔案列表
   *
   * @param params 查詢參數
   * @returns 檔案列表
   */
  getFiles(params: FileQueryParams): Observable<FileListResponse> {
    const { projectId, path, search, sortBy, sortOrder } = params;

    let httpParams = new HttpParams();
    if (path) httpParams = httpParams.set('path', path);
    if (search) httpParams = httpParams.set('search', search);
    if (sortBy) httpParams = httpParams.set('sortBy', sortBy);
    if (sortOrder) httpParams = httpParams.set('sortOrder', sortOrder);

    return this.http.get<FileListResponse>(`/api/projects/${projectId}/files`, { params: httpParams });
  }

  /**
   * 上傳檔案
   *
   * @param request 上傳請求
   * @returns 上傳進度事件流
   */
  uploadFile(request: UploadFileRequest): Observable<HttpEvent<ProjectFile>> {
    const { projectId, file, path } = request;

    const formData = new FormData();
    formData.append('file', file);
    if (path) {
      formData.append('path', path);
    }

    return this.http.post<ProjectFile>(`/api/projects/${projectId}/files`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * 批量上傳檔案
   *
   * @param projectId 專案 ID
   * @param files 檔案列表
   * @param path 上傳路徑
   * @returns 上傳進度事件流陣列
   */
  uploadFiles(projectId: string, files: File[], path?: string): Array<Observable<HttpEvent<ProjectFile>>> {
    return files.map(file => this.uploadFile({ projectId, file, path }));
  }

  /**
   * 下載檔案
   *
   * @param projectId 專案 ID
   * @param fileId 檔案 ID
   * @returns Blob 資料
   */
  downloadFile(projectId: string, fileId: string): Observable<Blob> {
    return this.http.get(`/api/projects/${projectId}/files/${fileId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * 刪除檔案
   *
   * @param projectId 專案 ID
   * @param fileId 檔案 ID
   * @returns void
   */
  deleteFile(projectId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(`/api/projects/${projectId}/files/${fileId}`);
  }

  /**
   * 批量刪除檔案
   *
   * @param projectId 專案 ID
   * @param fileIds 檔案 ID 列表
   * @returns void
   */
  batchDeleteFiles(projectId: string, fileIds: string[]): Observable<void> {
    return this.http.post<void>(`/api/projects/${projectId}/files/batch-delete`, { fileIds });
  }

  /**
   * 創建資料夾
   *
   * @param request 創建資料夾請求
   * @returns 創建的資料夾
   */
  createFolder(request: CreateFolderRequest): Observable<ProjectFile> {
    const { projectId, path, folderName } = request;
    return this.http.post<ProjectFile>(`/api/projects/${projectId}/folders`, {
      path,
      folderName
    });
  }

  /**
   * 重命名檔案
   *
   * @param projectId 專案 ID
   * @param fileId 檔案 ID
   * @param newName 新名稱
   * @returns 更新後的檔案
   */
  renameFile(projectId: string, fileId: string, newName: string): Observable<ProjectFile> {
    return this.http.put<ProjectFile>(`/api/projects/${projectId}/files/${fileId}/rename`, { newName });
  }

  /**
   * 移動檔案
   *
   * @param projectId 專案 ID
   * @param fileId 檔案 ID
   * @param targetPath 目標路徑
   * @returns 更新後的檔案
   */
  moveFile(projectId: string, fileId: string, targetPath: string): Observable<ProjectFile> {
    return this.http.put<ProjectFile>(`/api/projects/${projectId}/files/${fileId}/move`, { targetPath });
  }

  /**
   * 獲取檔案預覽 URL
   *
   * @param projectId 專案 ID
   * @param fileId 檔案 ID
   * @returns 預覽 URL
   */
  getPreviewUrl(projectId: string, fileId: string): string {
    return `/api/projects/${projectId}/files/${fileId}/preview`;
  }
}
