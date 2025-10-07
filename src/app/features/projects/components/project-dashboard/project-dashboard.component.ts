import { Component, ChangeDetectionStrategy, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

// ng-zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

// Services & Models
import { ProjectService } from '../../services/project.service';
import { ProjectFileService } from '../../services/project-file.service';
import { ProjectMemberService } from '../../services/project-member.service';
import { Project } from '../../models/project.model';
import { ProjectFile } from '../../models/project-file.model';
import { ProjectMember } from '../../models/project-member.model';
import { 
  PROJECT_VISIBILITY_LABELS, 
  PROJECT_OWNER_TYPE_LABELS 
} from '../../models/project.constants';
import { formatStorage } from '@shared';
import { format } from 'date-fns';

/**
 * 專案儀表板組件（總覽頁面內容）
 * 
 * 功能：
 * - 顯示專案統計資訊
 * - 最近檔案列表
 * - 專案成員列表
 * - 活動時間線
 * 
 * @example
 * ```html
 * <app-project-dashboard />
 * ```
 */
@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzAvatarModule,
    NzTimelineModule,
    NzSpinModule,
    NzEmptyModule
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDashboardComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly fileService = inject(ProjectFileService);
  private readonly memberService = inject(ProjectMemberService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  // 狀態管理
  project = signal<Project | null>(null);
  recentFiles = signal<ProjectFile[]>([]);
  members = signal<ProjectMember[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    // 從父路由獲取專案 ID
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadData(projectId);
    }
  }

  /**
   * 載入所有資料
   * 使用 forkJoin 並行載入，比 Promise.all 更好的類型支援
   */
  loadData(projectId: string): void {
    this.loading.set(true);

    // 使用 forkJoin 並行載入專案資訊、檔案、成員
    forkJoin({
      project: this.projectService.getProject(projectId),
      files: this.fileService.getFiles({ projectId }),
      members: this.memberService.getMembers({ projectId })
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ project, files, members }) => {
          this.project.set(project);
          this.recentFiles.set(files.files.slice(0, 5)); // 只顯示最近 5 個
          this.members.set(members.members.slice(0, 8)); // 只顯示前 8 個
          this.loading.set(false);
        },
        error: err => {
          console.error('載入資料失敗', err);
          this.loading.set(false);
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
   * 格式化儲存空間
   */
  formatStorage(bytes: number): string {
    return formatStorage(bytes);
  }

  /**
   * 格式化檔案大小
   */
  formatFileSize(bytes: number): string {
    return formatStorage(bytes);
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
   * 獲取擁有者類型文字
   */
  getOwnerTypeText(ownerType: string): string {
    return PROJECT_OWNER_TYPE_LABELS[ownerType as keyof typeof PROJECT_OWNER_TYPE_LABELS] || ownerType;
  }

  /**
   * 獲取可見性文字
   */
  getVisibilityText(visibility: string): string {
    return PROJECT_VISIBILITY_LABELS[visibility as keyof typeof PROJECT_VISIBILITY_LABELS] || visibility;
  }
}
