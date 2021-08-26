import {Routes} from "@angular/router";
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';

const routes: Routes  = [
  {
    path: '', redirectTo: 'authorization', pathMatch: 'full',
  },
  {
    path: 'authorization', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'panel', loadChildren: () => import('@pages/overview-panel/overview-panel.module').then(m => m.OverviewPanelModule)
  },
]

export {routes};
