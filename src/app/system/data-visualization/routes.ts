import { Routes } from '@angular/router';

import { RelationComponent } from './relation-chart/relation.component';

export const routes: Routes = [
  { 
    path: 'relation', 
    component: RelationComponent,
    data: { 
      title: '關係圖',
      titleI18n: 'data-v.relation',
      key: 'data-v-relation'
    }
  }
];
