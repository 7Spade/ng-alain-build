import { Routes } from '@angular/router';

import { ExceptionComponent } from './exception.component';
import { ExceptionTriggerComponent } from './trigger.component';

export const routes: Routes = [
  {
    path: '403',
    component: ExceptionComponent,
    data: { type: 403, shouldDetach: 'no' }
  },
  {
    path: '404',
    component: ExceptionComponent,
    data: { type: 404, shouldDetach: 'no' }
  },
  {
    path: '500',
    component: ExceptionComponent,
    data: { type: 500, shouldDetach: 'no' }
  },
  {
    path: 'trigger',
    component: ExceptionTriggerComponent,
    data: { shouldDetach: 'no' }
  }
];
