import { Routes } from '@angular/router';

import { ColorService } from './color.service';
import { ColorsComponent } from './colors-demo/colors.component';
import { GridMasonryComponent } from './grid-demo/gridmasonry.component';
import { TypographyComponent } from './typography-demo/typography.component';

export const routes: Routes = [
  {
    path: '',
    providers: [ColorService],
    children: [
      {
        path: 'gridmasonry',
        component: GridMasonryComponent,
        data: { shouldDetach: 'no' }
      },
      {
        path: 'typography',
        component: TypographyComponent,
        data: { shouldDetach: 'no' }
      },
      {
        path: 'colors',
        component: ColorsComponent,
        data: { shouldDetach: 'no' }
      }
    ]
  }
];
