/**
 * 成員列表組件
 * @description 專案成員管理
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="member-list-container">
      <h3>專案成員</h3>
      <p>Phase 3 將實現成員邀請、角色管理功能</p>
    </div>
  `,
  styles: [`
    .member-list-container {
      padding: 16px;
    }
  `]
})
export class MemberListComponent {
}

