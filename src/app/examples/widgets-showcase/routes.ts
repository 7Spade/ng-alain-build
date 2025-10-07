import { Routes } from '@angular/router';

import { WidgetsComponent } from './widgets.component';

export const routes: Routes = [
  { 
    path: '', 
    component: WidgetsComponent,
    data: { shouldDetach: 'no' }
  }
];
