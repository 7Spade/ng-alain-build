import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// ng-zorro
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

// Services & Models
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { 
  PROJECT_VISIBILITY_LABELS, 
  PROJECT_OWNER_TYPE_LABELS,
  PROJECT_DEFAULT_COLOR 
} from '../../models/project.constants';
import { formatStorage } from '@shared';
import { format } from 'date-fns';

/**
 * 專案總覽組件
 * 
 * 功能：
 * - 顯示專案基本資訊
 * - Tab 導航（總覽、檔案、成員、設定）
 * - 統計資訊卡片
 * - 麵包屑導航
 * 
 * @example
 * ```html
 * <app-project-overview />
 * ```
 */
@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzCardModule,
    NzStatisticModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzAvatarModule,
    NzDescriptionsModule,
    NzEmptyModule
  ],
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectOverviewComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly route = inject(ActivatedRoute);

  // 狀態管理
  project = signal<Project | null>(null);
  loading = signal(false);
  currentTab = signal(0);

  // Tab 配置
  tabs = [
    { label: '總覽', icon: 'dashboard', path: 'overview' },
    { label: '檔案空間', icon: 'folder', path: 'files' },
    { label: '成員', icon: 'team', path: 'members' },
    { label: '設定', icon: 'setting', path: 'settings' }
  ];

  ngOnInit(): void {
    // 從路由參數獲取專案 ID
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(projectId);
    }
  }

  /**
   * 載入專案資料
   * @note HTTP 請求是一次性操作，完成後自動清理
   */
  loadProject(id: string): void {
    this.loading.set(true);
    // TODO: [OPTIMIZATION] Memory Leak Risk - HTTP 訂閱未管理（建議使用 takeUntilDestroyed）
    this.projectService.getProject(id).subscribe({
      next: project => {
        this.project.set(project);
        this.loading.set(false);
      },
      error: err => {
        console.error('載入專案失敗', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * Tab 切換
   */
  onTabChange(index: number): void {
    this.currentTab.set(index);
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
   * 獲取可見性文字
   */
  getVisibilityText(visibility: string): string {
    return PROJECT_VISIBILITY_LABELS[visibility as keyof typeof PROJECT_VISIBILITY_LABELS] || visibility;
  }

  /**
   * 獲取擁有者類型文字
   */
  getOwnerTypeText(ownerType: string): string {
    return PROJECT_OWNER_TYPE_LABELS[ownerType as keyof typeof PROJECT_OWNER_TYPE_LABELS] || ownerType;
  }
}
