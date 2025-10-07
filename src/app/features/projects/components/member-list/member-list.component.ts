import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// ng-zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';

// Services & Models
import { ProjectMemberService } from '../../services/project-member.service';
import { 
  ProjectMember, 
  PROJECT_ROLE_COLORS, 
  PROJECT_ROLE_LABELS 
} from '../../models/project-member.model';
import { format } from 'date-fns';

/**
 * 專案成員列表組件
 * 
 * 功能：
 * - 顯示專案成員列表
 * - 成員角色管理
 * - 邀請新成員
 * - 移除成員
 * 
 * @example
 * ```html
 * <app-member-list />
 * ```
 */
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzAvatarModule,
    NzSpinModule,
    NzEmptyModule,
    NzPopconfirmModule
  ],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit {
  private readonly memberService = inject(ProjectMemberService);
  private readonly route = inject(ActivatedRoute);
  private readonly message = inject(NzMessageService);

  // 狀態管理
  projectId = signal<string>('');
  members = signal<ProjectMember[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    // 從父路由獲取專案 ID
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectId.set(projectId);
      this.loadMembers();
    }
  }

  /**
   * 載入成員列表
   * @note HTTP 請求是一次性操作，完成後自動清理
   */
  loadMembers(): void {
    this.loading.set(true);
    // TODO: [OPTIMIZATION] Memory Leak Risk - HTTP 訂閱未管理（雖是一次性，建議統一使用 takeUntilDestroyed）
    this.memberService.getMembers({ projectId: this.projectId() }).subscribe({
      next: response => {
        this.members.set(response.members);
        this.loading.set(false);
      },
      error: err => {
        console.error('載入成員失敗', err);
        this.message.error('載入成員失敗');
        this.loading.set(false);
      }
    });
  }

  /**
   * 邀請成員
   */
  inviteMember(): void {
    // TODO: 打開邀請成員 Modal
    this.message.info('邀請成員功能開發中');
  }

  /**
   * 移除成員
   * @note HTTP 請求完成後自動清理
   */
  removeMember(member: ProjectMember): void {
    // TODO: [OPTIMIZATION] Memory Leak Risk - HTTP 訂閱未管理（建議統一使用 takeUntilDestroyed）
    this.memberService.removeMember(this.projectId(), member.id).subscribe({
      next: () => {
        this.message.success('成員已移除');
        this.loadMembers();
      },
      error: err => {
        console.error('移除成員失敗', err);
        this.message.error('移除成員失敗');
      }
    });
  }

  /**
   * 格式化日期
   */
  formatDate(date: Date): string {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  /**
   * 獲取角色標籤顏色
   */
  getRoleColor(role: string): string {
    return PROJECT_ROLE_COLORS[role as keyof typeof PROJECT_ROLE_COLORS] || 'default';
  }

  /**
   * 獲取角色文字
   */
  getRoleText(role: string): string {
    return PROJECT_ROLE_LABELS[role as keyof typeof PROJECT_ROLE_LABELS] || role;
  }

  /**
   * TrackBy 函數
   */
  trackByMemberId(index: number, member: ProjectMember): string {
    return member.id;
  }
}
