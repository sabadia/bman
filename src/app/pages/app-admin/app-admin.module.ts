import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import { AppAdminDefaultComponent } from './components/app-admin-default/app-admin-default.component';
import { AppRoleViewComponent } from './components/app-role/app-role-view/app-role-view.component';
import { AppRoleEditComponent } from './components/app-role/app-role-edit/app-role-edit.component';
import { AppNavigationViewComponent } from './components/app-navigation/app-navigation-view/app-navigation-view.component';
import { AppNavigationEditComponent } from './components/app-navigation/app-navigation-edit/app-navigation-edit.component';


@NgModule({
  declarations: [
    AppAdminDefaultComponent,
    AppRoleViewComponent,
    AppRoleEditComponent,
    AppNavigationViewComponent,
    AppNavigationEditComponent
  ],
  imports: [
    CommonModule,
    AppAdminRoutingModule
  ]
})
export class AppAdminModule { }
