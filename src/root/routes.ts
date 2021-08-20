import {Routes} from "@angular/router";

const routes: Routes  = [
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full'
  },
  {
    path: 'panel', loadChildren: () => import('@pages/overview-panel/overview-panel.module').then(m => m.OverviewPanelModule)
  },
]

export {routes};
