import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { OrganizationType, CreateOrganizationRequest } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

/**
 * 組織表單組件
 *
 * @description 用於新增/編輯組織的 Modal 表單
 * @usage 配合 NzModalService 使用
 */
@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzTreeSelectModule, NzInputNumberModule, NzGridModule]
})
export class OrganizationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orgService = inject(OrganizationService);

  /**
   * 組織類型枚舉（暴露給模板）
   */
  readonly OrganizationType = OrganizationType;

  /**
   * 組織類型選項
   */
  readonly typeOptions = [
    { label: '公司', value: OrganizationType.Company },
    { label: '事業部', value: OrganizationType.Division },
    { label: '部門', value: OrganizationType.Department },
    { label: '團隊', value: OrganizationType.Team },
    { label: '小組', value: OrganizationType.Group }
  ];

  /**
   * 表單實例
   */
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    type: [OrganizationType.Department, [Validators.required]],
    parentId: [null as string | null],
    code: ['', [Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(200)]],
    order: [0, [Validators.min(0)]]
  });

  /**
   * 父組織樹狀數據
   *
   * @description 從服務獲取組織樹，用於 nz-tree-select
   */
  parentOrgNodes: any[] = [];

  ngOnInit(): void {
    // 加載父組織樹狀數據
    this.loadParentOrgTree();
  }

  /**
   * 加載父組織樹狀數據
   */
  private loadParentOrgTree(): void {
    // TODO: 從服務獲取組織樹
    // this.orgService.getOrganizationTree().subscribe(tree => {
    //   this.parentOrgNodes = this.convertToTreeSelectNodes(tree);
    // });

    // 臨時 Mock 數據
    this.parentOrgNodes = [
      {
        title: '總公司',
        value: '1',
        key: '1',
        children: [
          {
            title: '技術部',
            value: '2',
            key: '2',
            children: [{ title: '前端組', value: '3', key: '3', isLeaf: true }]
          },
          {
            title: '業務部',
            value: '4',
            key: '4',
            isLeaf: true
          }
        ]
      }
    ];
  }

  /**
   * 提交表單
   *
   * @description 由 Modal 的 OK 按鈕調用
   * @returns Promise<CreateOrganizationRequest> 表單數據
   */
  submit(): Promise<CreateOrganizationRequest> {
    // 標記所有欄位為已觸碰，觸發驗證提示
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return Promise.reject(new Error('表單驗證失敗'));
    }

    return Promise.resolve(this.form.value as CreateOrganizationRequest);
  }

  /**
   * 重置表單
   */
  reset(): void {
    this.form.reset({
      name: '',
      type: OrganizationType.Department,
      parentId: null,
      code: '',
      description: '',
      order: 0
    });
  }

  /**
   * 設置表單值（用於編輯模式）
   *
   * @param data 組織數據
   */
  setValue(data: Partial<CreateOrganizationRequest>): void {
    this.form.patchValue(data);
  }
}
