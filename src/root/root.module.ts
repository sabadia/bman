import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './routing.module';
import { BaseComponent } from './base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedDataModule} from '@shared/modules/shared-data.module';
import { BaseNavigationComponent } from './navigation/base-navigation/base-navigation.component';
import { BaseNavigationToolbarComponent } from './navigation/base-navigation-toolbar/base-navigation-toolbar.component';

@NgModule({
  declarations: [
    BaseComponent,
    BaseNavigationComponent,
    BaseNavigationToolbarComponent
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
