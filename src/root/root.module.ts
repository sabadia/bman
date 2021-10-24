import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {FlexLayoutModule} from "@angular/flex-layout";
import { BrowserModule } from '@angular/platform-browser';
import {FeatureCanActiveGuard} from "@authorization/guards/feature-can-active.guard";
import {environment} from "@environments/environment";

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
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl', 'gt-xs', 'gt-sm', 'gt- md', 'gt-lg'],
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    SharedDataModule
  ],
  providers: [FeatureCanActiveGuard],
  bootstrap: [BaseComponent]
})
export class RootModule { }
