import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// ng-zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Services & Models
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

/**
 * 專案設定組件
 * 
 * 功能：
 * - 編輯專案基本資訊
 * - 專案可見性設定
 * - 危險操作（歸檔、刪除專案）
 * 
 * @example
 * ```html
 * <app-project-settings />
 * ```
 */
@Component({
  selector: 'app-project-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzAlertModule,
    NzModalModule,
    NzMessageService,
    NzSpinModule,
    NzDividerModule,
    NzIconModule
  ],
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSettingsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);

  // 狀態管理
  project = signal<Project | null>(null);
  loading = signal(false);
  saving = signal(false);

  // 表單
  settingsForm!: FormGroup;

  // 可見性選項
  visibilityOptions = [
    { label: '公開', value: 'public', description: '任何人都可以查看' },
    { label: '私有', value: 'private', description: '僅成員可以查看' },
    { label: '內部', value: 'internal', description: '組織內部可見' }
  ];

  ngOnInit(): void {
    this.initForm();
    
    // 從父路由獲取專案 ID
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(projectId);
    }
  }

  /**
   * 初始化表單
   */
  initForm(): void {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      visibility: ['private', [Validators.required]],
      tags: [[]]
    });
  }

  /**
   * 載入專案資料
   */
  loadProject(id: string): void {
    this.loading.set(true);
    this.projectService.getProject(id).subscribe({
      next: project => {
        this.project.set(project);
        // 填充表單
        this.settingsForm.patchValue({
          name: project.name,
          description: project.description,
          visibility: project.visibility,
          tags: project.tags || []
        });
        this.loading.set(false);
      },
      error: err => {
        console.error('載入專案失敗', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * 儲存設定
   */
  saveSettings(): void {
    if (this.settingsForm.invalid) {
      Object.values(this.settingsForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    const projectId = this.project()?.id;
    if (!projectId) return;

    this.saving.set(true);
    this.projectService.updateProject(projectId, this.settingsForm.value).subscribe({
      next: project => {
        this.project.set(project);
        this.message.success('設定已儲存');
        this.saving.set(false);
      },
      error: err => {
        console.error('儲存失敗', err);
        this.message.error('儲存失敗');
        this.saving.set(false);
      }
    });
  }

  /**
   * 歸檔專案
   */
  archiveProject(): void {
    const projectId = this.project()?.id;
    if (!projectId) return;

    this.modal.confirm({
      nzTitle: '確定要歸檔此專案嗎？',
      nzContent: '歸檔後專案將不再顯示在活躍列表中，但可以隨時恢復。',
      nzOkText: '確定歸檔',
      nzOkDanger: true,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.projectService.archiveProject(projectId).subscribe({
            next: () => {
              this.message.success('專案已歸檔');
              this.router.navigate(['/projects']);
              resolve();
            },
            error: err => {
              console.error('歸檔失敗', err);
              this.message.error('歸檔失敗');
              reject();
            }
          });
        });
      }
    });
  }

  /**
   * 刪除專案
   */
  deleteProject(): void {
    const projectId = this.project()?.id;
    const projectName = this.project()?.name;
    if (!projectId) return;

    this.modal.confirm({
      nzTitle: '確定要刪除此專案嗎？',
      nzContent: `此操作無法撤銷！專案 "${projectName}" 及其所有檔案將被永久刪除。`,
      nzOkText: '確定刪除',
      nzOkDanger: true,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.projectService.deleteProject(projectId).subscribe({
            next: () => {
              this.message.success('專案已刪除');
              this.router.navigate(['/projects']);
              resolve();
            },
            error: err => {
              console.error('刪除失敗', err);
              this.message.error('刪除失敗');
              reject();
            }
          });
        });
      }
    });
  }
}
