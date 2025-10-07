import { Routes } from '@angular/router';
import { aclCanActivate } from '@delon/acl';

import { ACLComponent } from './acl-demo/acl.component';
import { CacheComponent } from './cache-demo/cache.component';
import { DownFileComponent } from './downfile-demo/downfile.component';
import { DelonFormComponent } from './form-demo/form.component';
import { GuardAdminComponent } from './guard-demo/admin.component';
import { GuardAuthComponent } from './guard-demo/auth.component';
import { canLeave } from './guard-demo/can-leave';
import { GuardComponent } from './guard-demo/guard.component';
import { GuardLeaveComponent } from './guard-demo/leave.component';
import { PrintComponent } from './print-demo/print.component';
import { QRComponent } from './qr-demo/qr.component';
import { STDemoComponent } from './st-demo/st.component';
import { UtilComponent } from './util-demo/util.component';
import { XlsxComponent } from './xlsx-demo/xlsx.component';
import { ZipComponent } from './zip-demo/zip.component';

export const routes: Routes = [
  { path: 'st', component: STDemoComponent },
  { path: 'util', component: UtilComponent },
  { path: 'print', component: PrintComponent },
  { path: 'acl', component: ACLComponent },
  {
    path: 'guard',
    component: GuardComponent,
    children: [
      {
        path: 'leave',
        component: GuardLeaveComponent,
        canDeactivate: [canLeave]
      },
      {
        path: 'auth',
        component: GuardAuthComponent,
        canActivate: [aclCanActivate],
        data: { guard: 'user1' }
      },
      {
        path: 'admin',
        component: GuardAdminComponent,
        canActivate: [aclCanActivate],
        data: { guard: 'admin' }
      }
    ]
  },
  { path: 'cache', component: CacheComponent },
  { path: 'qr', component: QRComponent },
  { path: 'downfile', component: DownFileComponent },
  { path: 'xlsx', component: XlsxComponent },
  { path: 'zip', component: ZipComponent },
  { path: 'form', component: DelonFormComponent }
];
