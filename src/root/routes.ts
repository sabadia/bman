import {Routes} from "@angular/router";
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import {FeatureCanActiveGuard} from "@authorization/guards/feature-can-active.guard";
const routes: Routes  = [
  {
    path: '', redirectTo: 'authorization', pathMatch: 'full',
  },
  {
    path: 'authorization',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule),
    canActivate: [FeatureCanActiveGuard],
    data: {
      isFullScreen: true,
      // authGuardPipe: () => redirectLoggedInTo(['dashboard'])
    }
  },
  {
    path: 'dashboard', loadChildren: () => import('@pages/overview-panel/overview-panel.module').then(m => m.OverviewPanelModule),
    canActivate: [FeatureCanActiveGuard],
    data: {
      isFullScreen: false,
      // authGuardPipe: () => redirectUnauthorizedTo(['authorization'])
    }
  },
  {
    path: 'admin', loadChildren: () => import('@pages/app-admin/app-admin.module').then(m => m.AppAdminModule),
    canActivate: [FeatureCanActiveGuard],
    data: {
      isFullScreen: false,
      // authGuardPipe: () => redirectUnauthorizedTo(['authorization'])
    }
  },
]

export {routes};
