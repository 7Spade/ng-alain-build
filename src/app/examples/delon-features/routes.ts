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
  {
    path: 'st',
    component: STDemoComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'util',
    component: UtilComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'print',
    component: PrintComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'acl',
    component: ACLComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'guard',
    component: GuardComponent,
    data: { shouldDetach: 'no' },
    children: [
      {
        path: 'leave',
        component: GuardLeaveComponent,
        canDeactivate: [canLeave],
        data: { shouldDetach: 'no' }
      },
      {
        path: 'auth',
        component: GuardAuthComponent,
        canActivate: [aclCanActivate],
        data: { guard: 'user1', shouldDetach: 'no' }
      },
      {
        path: 'admin',
        component: GuardAdminComponent,
        canActivate: [aclCanActivate],
        data: { guard: 'admin', shouldDetach: 'no' }
      }
    ]
  },
  {
    path: 'cache',
    component: CacheComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'qr',
    component: QRComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'downfile',
    component: DownFileComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'xlsx',
    component: XlsxComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'zip',
    component: ZipComponent,
    data: { shouldDetach: 'no' }
  },
  {
    path: 'form',
    component: DelonFormComponent,
    data: { shouldDetach: 'no' }
  }
];
