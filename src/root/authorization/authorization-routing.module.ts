import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseAuthorizationDefaultComponent} from "./components/base-authorization-default/base-authorization-default.component";
import {BaseAccountActivationComponent} from "./components/base-account-activation/base-account-activation.component";

const routes: Routes = [
  {
    path: 'account-activation/:id',
    component: BaseAccountActivationComponent
  },
  {
    path: '',
    component: BaseAuthorizationDefaultComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
