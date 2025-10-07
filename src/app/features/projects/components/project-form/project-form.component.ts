import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// ng-zorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

// Services & Models
import { PROJECT_VISIBILITY_DESCRIPTIONS } from '../../models/project.constants';
import { CreateProjectRequest } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

/**
 * 專案表單組件（新建/編輯專案）
 *
 * 用於 Modal 中的專案表單
 *
 * @example
 * ```typescript
 * this.modal.create({
 *   nzTitle: '新建專案',
 *   nzContent: ProjectFormComponent,
 *   nzWidth: 600
 * });
 * ```
 */
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, NzModalModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly modal = inject(NzModalRef);
  private readonly message = inject(NzMessageService);

  // 狀態管理
  submitting = signal(false);

  // 表單
  projectForm!: FormGroup;

  // 可見性選項
  visibilityOptions = [
    {
      label: '公開',
      value: 'public',
      description: PROJECT_VISIBILITY_DESCRIPTIONS.public
    },
    {
      label: '私有',
      value: 'private',
      description: PROJECT_VISIBILITY_DESCRIPTIONS.private
    },
    {
      label: '內部',
      value: 'internal',
      description: PROJECT_VISIBILITY_DESCRIPTIONS.internal
    }
  ];

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * 初始化表單
   */
  initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      visibility: ['private', [Validators.required]],
      tags: [[]]
    });
  }

  /**
   * 提交表單
   */
  submitForm(): void {
    if (this.projectForm.invalid) {
      // 標記所有欄位為已觸碰，顯示驗證錯誤
      Object.values(this.projectForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    const formValue = this.projectForm.value as CreateProjectRequest;
    this.submitting.set(true);

    this.projectService.createProject(formValue).subscribe({
      next: project => {
        this.message.success('專案創建成功！');
        this.modal.close(project); // 關閉 Modal 並返回創建的專案
      },
      error: err => {
        console.error('創建專案失敗', err);
        this.message.error('創建專案失敗，請稍後再試');
        this.submitting.set(false);
      }
    });
  }

  /**
   * 取消
   */
  cancel(): void {
    this.modal.destroy();
  }
}
