import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { BaseAuthorizationDefaultComponent } from './components/base-authorization-default/base-authorization-default.component';
import { BaseAuthorizationLoginComponent } from './components/base-authorization-login/base-authorization-login.component';
import { BaseAuthorizationRegisterComponent } from './components/base-authorization-register/base-authorization-register.component';
import { BaseAuthFailedDefaultComponent } from './components/base-auth-failed-default/base-auth-failed-default.component';
import { BaseNotFoundDefaultComponent } from './components/base-not-found-default/base-not-found-default.component';
import { BaseAccountActivationComponent } from './components/base-account-activation/base-account-activation.component';


@NgModule({
  declarations: [
    BaseAuthorizationDefaultComponent,
    BaseAuthorizationLoginComponent,
    BaseAuthorizationRegisterComponent,
    BaseAuthFailedDefaultComponent,
    BaseNotFoundDefaultComponent,
    BaseAccountActivationComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
