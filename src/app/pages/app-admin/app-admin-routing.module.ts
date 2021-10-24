import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureCanActiveGuard} from "@authorization/guards/feature-can-active.guard";
import {AppAdminDefaultComponent} from "@pages/app-admin/components/app-admin-default/app-admin-default.component";
import {AppNavigationEditComponent} from "@pages/app-admin/components/app-navigation/app-navigation-edit/app-navigation-edit.component";
import {AppNavigationViewComponent} from "@pages/app-admin/components/app-navigation/app-navigation-view/app-navigation-view.component";
import {AppRoleEditComponent} from "@pages/app-admin/components/app-role/app-role-edit/app-role-edit.component";
import {AppRoleViewComponent} from "@pages/app-admin/components/app-role/app-role-view/app-role-view.component";

const routes: Routes = [
  {
    path: '',
    component: AppAdminDefaultComponent,
    canActivateChild: [FeatureCanActiveGuard],
    children: [
      {
        path: 'navigation',
        component: AppNavigationViewComponent
      },
      {
        path: 'navigation/:Id',
        component: AppNavigationEditComponent
      },
      {
        path: 'role',
        component: AppRoleViewComponent
      },
      {
        path: 'role/:Id',
        component: AppRoleEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
