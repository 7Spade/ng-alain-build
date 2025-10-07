/**
 * 專案總覽組件
 * @description 專案詳情主頁面，包含 Tab 導航
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="project-overview-container">
      <h2>專案總覽</h2>
      <router-outlet />
    </div>
  `,
  styles: [`
    .project-overview-container {
      padding: 24px;
    }
  `]
})
export class ProjectOverviewComponent {
}

