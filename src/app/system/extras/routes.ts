import { Routes } from '@angular/router';

import { HelpCenterComponent } from './helpcenter/helpcenter.component';
import { ExtrasPoiComponent } from './poi/poi.component';
import { ExtrasSettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { 
    path: 'helpcenter', 
    component: HelpCenterComponent,
    data: { 
      title: '幫助中心',
      titleI18n: 'extras.helpcenter',
      key: 'extras-helpcenter'
    }
  },
  { 
    path: 'settings', 
    component: ExtrasSettingsComponent,
    data: { 
      title: '設置',
      titleI18n: 'extras.settings',
      key: 'extras-settings'
    }
  },
  { 
    path: 'poi', 
    component: ExtrasPoiComponent,
    data: { 
      title: 'POI',
      titleI18n: 'extras.poi',
      key: 'extras-poi'
    }
  }
];
