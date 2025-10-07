/**
 * 專案檔案組件
 * @description 檔案管理（上傳、下載、展示）
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-files',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="project-files-container">
      <h3>檔案空間</h3>
      <p>Phase 2 將實現檔案上傳、下載、預覽功能</p>
    </div>
  `,
  styles: [`
    .project-files-container {
      padding: 16px;
    }
  `]
})
export class ProjectFilesComponent {
}

