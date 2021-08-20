import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewPanelRoutingModule } from './overview-panel-routing.module';
import { OverviewPanelDefaultComponent } from './components/default/overview-panel-default.component';


@NgModule({
  declarations: [
    OverviewPanelDefaultComponent
  ],
  imports: [
    CommonModule,
    OverviewPanelRoutingModule
  ]
})
export class OverviewPanelModule { }
