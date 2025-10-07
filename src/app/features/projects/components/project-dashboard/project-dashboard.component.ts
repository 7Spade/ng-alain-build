/**
 * 專案儀表板組件
 * @description 專案數據視覺化
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="project-dashboard-container">
      <h3>專案儀表板</h3>
      <p>Phase 3 將實現統計圖表和數據視覺化</p>
    </div>
  `,
  styles: [`
    .project-dashboard-container {
      padding: 16px;
    }
  `]
})
export class ProjectDashboardComponent {
}

