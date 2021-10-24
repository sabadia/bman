import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseAuthorizationDefaultComponent} from "./components/base-authorization-default/base-authorization-default.component";
import {BaseAccountActivationComponent} from "./components/base-account-activation/base-account-activation.component";
import {BaseAuthorizationLoginComponent} from "./components/base-authorization-login/base-authorization-login.component";
import {BaseAuthorizationRegisterComponent} from "./components/base-authorization-register/base-authorization-register.component";

const routes: Routes = [
  // {
  //   path: 'account-activation/:id',
  //   component: BaseAccountActivationComponent
  // },
  {
    path: '',
    component: BaseAuthorizationDefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: BaseAuthorizationLoginComponent,
        data: {
          isFullScreen: true,
        }
      },
      {
        path: 'registration',
        component: BaseAuthorizationRegisterComponent,
        data: {
          isFullScreen: true,
        }
      },
      {
        path: 'account-activation',
        component: BaseAccountActivationComponent,
        data: {
          isFullScreen: true,
        },
      },
      {
        path: 'account-activation/:id',
        component: BaseAccountActivationComponent,
        data: {
          isFullScreen: true,
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
