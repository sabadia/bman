import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewPanelDefaultComponent} from "@pages/overview-panel/components/default/overview-panel-default.component";

const routes: Routes = [
  {
    path: '',
    component: OverviewPanelDefaultComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewPanelRoutingModule { }
