/**
 * 專案設定組件
 * @description 專案設定管理
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="project-settings-container">
      <h3>專案設定</h3>
      <p>Phase 2 將實現基本資訊編輯、成員管理、危險操作功能</p>
    </div>
  `,
  styles: [`
    .project-settings-container {
      padding: 16px;
    }
  `]
})
export class ProjectSettingsComponent {
}

