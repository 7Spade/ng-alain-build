import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ng-zorro
import { PageHeaderComponent } from '@shared';
import { formatStorage } from '@shared';
import { format } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';

// @delon

// Services & Models
import { PROJECT_STATUS_COLORS, PROJECT_DEFAULT_COLOR } from '../../models/project.constants';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';

/**
 * 專案列表組件
 *
 * 功能：
 * - 顯示專案列表（卡片視圖 / 表格視圖）
 * - 搜尋、篩選、排序
 * - 新建專案
 * - 根據組織上下文自動切換（個人/組織專案）
 *
 * @example
 * ```html
 * <app-project-list />
 * ```
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzSegmentedModule,
    NzIconModule,
    NzTagModule,
    NzStatisticModule,
    NzEmptyModule,
    NzSpinModule,
    NzAvatarModule,
    NzModalModule
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly modal = inject(NzModalService);

  // 狀態管理（Signals）
  projects = signal<Project[]>([]);
  loading = signal(false);
  viewMode = signal<'card' | 'table'>('card');
  searchText = signal('');
  statusFilter = signal<string | null>(null);
  sortBy = signal<string>('updatedAt');

  // 計算屬性
  filteredProjects = computed(() => {
    let result = this.projects();

    // 搜尋過濾
    const search = this.searchText().toLowerCase();
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search));
    }

    // 狀態過濾
    const status = this.statusFilter();
    if (status) {
      result = result.filter(p => p.status === status);
    }

    // 排序
    const sortBy = this.sortBy();
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updatedAt':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  });

  // 視圖選項
  viewOptions = [
    { label: '卡片視圖', value: 'card', icon: 'appstore' },
    { label: '列表視圖', value: 'table', icon: 'bars' }
  ];

  // 狀態選項
  statusOptions = [
    { label: '全部', value: null },
    { label: '活躍', value: 'active' },
    { label: '已歸檔', value: 'archived' }
  ];

  // 排序選項
  sortOptions = [
    { label: '最近更新', value: 'updatedAt' },
    { label: '最近創建', value: 'createdAt' },
    { label: '名稱', value: 'name' }
  ];

  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * 載入專案列表
   *
   * @note HTTP 請求是一次性操作，完成後自動清理，無需手動取消訂閱
   */
  loadProjects(): void {
    this.loading.set(true);
    this.projectService.getProjects().subscribe({
      next: response => {
        this.projects.set(response.list);
        this.loading.set(false);
      },
      error: err => {
        console.error('載入專案失敗', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * 搜尋變更
   */
  onSearchChange(value: string): void {
    this.searchText.set(value);
  }

  /**
   * 狀態篩選變更
   */
  onStatusFilterChange(value: string | null): void {
    this.statusFilter.set(value);
  }

  /**
   * 排序變更
   */
  onSortChange(value: string): void {
    this.sortBy.set(value);
  }

  /**
   * 視圖模式切換
   */
  onViewModeChange(value: 'card' | 'table'): void {
    this.viewMode.set(value);
  }

  /**
   * 新建專案
   * 打開 Modal 表單
   */
  createProject(): void {
    const modalRef = this.modal.create({
      nzTitle: '新建專案',
      nzContent: ProjectFormComponent,
      nzWidth: 600,
      nzFooter: null, // 使用組件內的自定義 footer
      nzMaskClosable: false
    });

    // 監聽 Modal 關閉事件
    modalRef.afterClose.subscribe(result => {
      if (result) {
        // 如果返回了專案資料，重新載入列表
        this.loadProjects();
      }
    });
  }

  /**
   * 查看專案詳情
   */
  viewProject(project: Project): void {
    this.router.navigate(['/projects', project.id]);
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
   * 獲取專案圖標顏色
   */
  getProjectColor(project: Project): string {
    return project.color || PROJECT_DEFAULT_COLOR;
  }

  /**
   * 獲取狀態標籤顏色
   */
  getStatusColor(status: string): string {
    return PROJECT_STATUS_COLORS[status as keyof typeof PROJECT_STATUS_COLORS] || 'default';
  }

  /**
   * TrackBy 函數（性能優化）
   */
  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}
