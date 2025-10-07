/**
 * 專案列表組件
 * @description 顯示專案列表，支援搜尋、篩選、排序
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="project-list-container">
      <h2>專案列表</h2>
      <p>Phase 2 將實現完整功能</p>
    </div>
  `,
  styles: [`
    .project-list-container {
      padding: 24px;
    }
  `]
})
export class ProjectListComponent {
}

