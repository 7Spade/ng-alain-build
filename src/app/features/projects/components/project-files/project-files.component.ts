import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// ng-zorro
import { format } from 'date-fns';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';

// Services & Models
import { ProjectFile } from '../../models/project-file.model';
import { ProjectFileService } from '../../services/project-file.service';

/**
 * 專案檔案空間組件
 *
 * 功能：
 * - 檔案上傳（拖拽上傳）
 * - 檔案列表展示
 * - 檔案下載
 * - 檔案刪除
 * - 檔案預覽（圖片）
 *
 * @example
 * ```html
 * <app-project-files />
 * ```
 */
@Component({
  selector: 'app-project-files',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzUploadModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzEmptyModule,
    NzPopconfirmModule
  ],
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFilesComponent implements OnInit {
  private readonly fileService = inject(ProjectFileService);
  private readonly route = inject(ActivatedRoute);
  private readonly message = inject(NzMessageService);

  // 狀態管理
  projectId = signal<string>('');
  files = signal<ProjectFile[]>([]);
  loading = signal(false);
  uploading = signal(false);
  currentPath = signal('/');

  // 上傳檔案列表
  fileList: NzUploadFile[] = [];

  ngOnInit(): void {
    // 從父路由獲取專案 ID
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectId.set(projectId);
      this.loadFiles();
    }
  }

  /**
   * 載入檔案列表
   *
   * @note HTTP 請求是一次性操作，完成後自動清理
   */
  loadFiles(): void {
    this.loading.set(true);
    this.fileService
      .getFiles({
        projectId: this.projectId(),
        path: this.currentPath()
      })
      .subscribe({
        next: response => {
          this.files.set(response.files);
          this.loading.set(false);
        },
        error: err => {
          console.error('載入檔案失敗', err);
          this.message.error('載入檔案失敗');
          this.loading.set(false);
        }
      });
  }

  /**
   * 檔案上傳前檢查
   */
  beforeUpload = (file: NzUploadFile): boolean => {
    // 檔案大小限制（50MB）
    const maxSize = 50 * 1024 * 1024;
    if (file.size && file.size > maxSize) {
      this.message.error('檔案大小不能超過 50MB！');
      return false;
    }

    // 將檔案添加到上傳隊列
    this.fileList = [...this.fileList, file];
    return false; // 阻止自動上傳，使用自定義上傳
  };

  /**
   * 上傳檔案
   */
  handleUpload(): void {
    if (this.fileList.length === 0) {
      this.message.warning('請選擇要上傳的檔案');
      return;
    }

    this.uploading.set(true);

    // 逐個上傳檔案
    const uploadPromises = this.fileList.map(file => {
      if (!file.originFileObj) return Promise.resolve();

      return new Promise((resolve, reject) => {
        this.fileService
          .uploadFile({
            projectId: this.projectId(),
            file: file.originFileObj as File,
            path: this.currentPath()
          })
          .subscribe({
            next: event => {
              if (event.type === HttpEventType.UploadProgress) {
                // 更新進度
                const percent = event.total ? Math.round((100 * event.loaded) / event.total) : 0;
                file.percent = percent;
              } else if (event.type === HttpEventType.Response) {
                // 上傳完成
                resolve(event.body);
              }
            },
            error: err => {
              console.error('上傳失敗', err);
              reject(err);
            }
          });
      });
    });

    Promise.all(uploadPromises)
      .then(() => {
        this.message.success('所有檔案上傳成功');
        this.fileList = [];
        this.uploading.set(false);
        this.loadFiles(); // 重新載入列表
      })
      .catch(_err => {
        this.message.error('部分檔案上傳失敗');
        this.uploading.set(false);
      });
  }

  /**
   * 下載檔案
   *
   * @note HTTP 請求完成後自動清理
   */
  downloadFile(file: ProjectFile): void {
    this.fileService.downloadFile(this.projectId(), file.id).subscribe({
      next: blob => {
        // 創建下載連結
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
        window.URL.revokeObjectURL(url);
        this.message.success('下載成功');
      },
      error: err => {
        console.error('下載失敗', err);
        this.message.error('下載失敗');
      }
    });
  }

  /**
   * 刪除檔案
   *
   * @note HTTP 請求完成後自動清理
   */
  deleteFile(file: ProjectFile): void {
    this.fileService.deleteFile(this.projectId(), file.id).subscribe({
      next: () => {
        this.message.success('刪除成功');
        this.loadFiles(); // 重新載入列表
      },
      error: err => {
        console.error('刪除失敗', err);
        this.message.error('刪除失敗');
      }
    });
  }

  /**
   * 格式化日期
   */
  formatDate(date: Date): string {
    return format(new Date(date), 'yyyy-MM-dd HH:mm');
  }

  /**
   * 格式化檔案大小
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
  }

  /**
   * 獲取檔案圖標
   */
  getFileIcon(file: ProjectFile): string {
    if (file.isImage) return 'file-image';
    if (file.mimeType.includes('pdf')) return 'file-pdf';
    if (file.mimeType.includes('word')) return 'file-word';
    if (file.mimeType.includes('excel')) return 'file-excel';
    return 'file';
  }

  /**
   * TrackBy 函數
   */
  trackByFileId(index: number, file: ProjectFile): string {
    return file.id;
  }
}
