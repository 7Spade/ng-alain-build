import { Routes } from '@angular/router';

import { LayoutPassportComponent } from '../layout';
import { LandingComponent } from './landing/landing.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { UserRegisterComponent } from './register/register.component';
import { UserRegisterResultComponent } from './register-result/register-result.component';

export const routes: Routes = [
  // auth - 認證頁面
  {
    path: 'auth',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
        data: { title: '首頁', titleI18n: 'app.landing', shouldDetach: 'no' }
      },
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login', shouldDetach: 'no' }
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register', shouldDetach: 'no' }
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register', shouldDetach: 'no' }
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock', shouldDetach: 'no' }
      }
    ]
  },
  // 保留舊路徑兼容性（重定向到新路徑）
  {
    path: 'passport',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  }
];
