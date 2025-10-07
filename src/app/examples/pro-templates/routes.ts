import { Routes } from '@angular/router';

import { ProAccountCenterApplicationsComponent } from './account/account-center/my-applications-tab/applications.component';
import { ProAccountCenterArticlesComponent } from './account/account-center/my-articles-tab/articles.component';
import { ProAccountCenterComponent } from './account/account-center/center.component';
import { ProAccountCenterProjectsComponent } from './account/account-center/my-projects-tab/projects.component';
import { ProAccountSettingsBaseComponent } from './account/account-settings/base-settings/base.component';
import { ProAccountSettingsBindingComponent } from './account/account-settings/binding-settings/binding.component';
import { ProAccountSettingsNotificationComponent } from './account/account-settings/notification-settings/notification.component';
import { ProAccountSettingsSecurityComponent } from './account/account-settings/security-settings/security.component';
import { ProAccountSettingsComponent } from './account/account-settings/settings.component';
import { AdvancedFormComponent } from './form-templates/advanced-form/advanced-form.component';
import { BasicFormComponent } from './form-templates/basic-form/basic-form.component';
import { StepFormComponent } from './form-templates/step-form/step-form.component';
import { ProListApplicationsComponent } from './list-templates/application-list/applications.component';
import { ProListArticlesComponent } from './list-templates/article-list/articles.component';
import { ProBasicListComponent } from './list-templates/basic-list/basic-list.component';
import { ProCardListComponent } from './list-templates/card-list/card-list.component';
import { ProListLayoutComponent } from './list-templates/list/list.component';
import { ProListProjectsComponent } from './list-templates/project-list/projects.component';
import { ProTableListComponent } from './list-templates/table-list/table-list.component';
import { ProProfileAdvancedComponent } from './profile-pages/advanced-profile/advanced.component';
import { ProProfileBaseComponent } from './profile-pages/basic-profile/basic.component';
import { ProResultFailComponent } from './result-pages/fail-result/fail.component';
import { ProResultSuccessComponent } from './result-pages/success-result/success.component';

export const routes: Routes = [
  {
    path: 'form',
    children: [
      { 
        path: 'basic-form', 
        component: BasicFormComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'step-form', 
        component: StepFormComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'advanced-form', 
        component: AdvancedFormComponent,
        data: { shouldDetach: 'no' }
      }
    ]
  },
  {
    path: 'list',
    children: [
      { 
        path: 'table-list', 
        component: ProTableListComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'basic-list', 
        component: ProBasicListComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'card-list', 
        component: ProCardListComponent,
        data: { shouldDetach: 'no' }
      },
      {
        path: '',
        component: ProListLayoutComponent,
        data: { shouldDetach: 'no' },
        children: [
          { 
            path: 'articles', 
            component: ProListArticlesComponent,
            data: { shouldDetach: 'no' }
          },
          { 
            path: 'projects', 
            component: ProListProjectsComponent,
            data: { shouldDetach: 'no' }
          },
          { 
            path: 'applications', 
            component: ProListApplicationsComponent,
            data: { shouldDetach: 'no' }
          }
        ]
      }
    ]
  },
  {
    path: 'profile',
    children: [
      { 
        path: 'basic', 
        component: ProProfileBaseComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'advanced', 
        component: ProProfileAdvancedComponent,
        data: { shouldDetach: 'no' }
      }
    ]
  },
  {
    path: 'result',
    children: [
      { 
        path: 'success', 
        component: ProResultSuccessComponent,
        data: { shouldDetach: 'no' }
      },
      { 
        path: 'fail', 
        component: ProResultFailComponent,
        data: { shouldDetach: 'no' }
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'center',
        component: ProAccountCenterComponent,
        data: { shouldDetach: 'no' },
        children: [
          { path: '', redirectTo: 'articles', pathMatch: 'full' },
          {
            path: 'articles',
            component: ProAccountCenterArticlesComponent,
            data: { titleI18n: 'pro-account-center', shouldDetach: 'no' }
          },
          {
            path: 'projects',
            component: ProAccountCenterProjectsComponent,
            data: { titleI18n: 'pro-account-center', shouldDetach: 'no' }
          },
          {
            path: 'applications',
            component: ProAccountCenterApplicationsComponent,
            data: { titleI18n: 'pro-account-center', shouldDetach: 'no' }
          }
        ]
      },
      {
        path: 'settings',
        component: ProAccountSettingsComponent,
        data: { shouldDetach: 'no' },
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: ProAccountSettingsBaseComponent,
            data: { titleI18n: 'pro-account-settings', shouldDetach: 'no' }
          },
          {
            path: 'security',
            component: ProAccountSettingsSecurityComponent,
            data: { titleI18n: 'pro-account-settings', shouldDetach: 'no' }
          },
          {
            path: 'binding',
            component: ProAccountSettingsBindingComponent,
            data: { titleI18n: 'pro-account-settings', shouldDetach: 'no' }
          },
          {
            path: 'notification',
            component: ProAccountSettingsNotificationComponent,
            data: { titleI18n: 'pro-account-settings', shouldDetach: 'no' }
          }
        ]
      }
    ]
  }
];
