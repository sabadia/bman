import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './routing.module';
import { BaseComponent } from './base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedDataModule} from '@shared/modules/shared-data.module';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    SharedDataModule,
  ],
  providers: [],
  bootstrap: [BaseComponent]
})
export class RootModule { }
