import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

// Modules
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "@environments/environment";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {UserService} from "@shared/services/user.service";
import { AppLoadingComponent } from '../components/app-loading/app-loading.component';

const modules = [
  FormsModule,
  MaterialModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [

    AppLoadingComponent
  ],
  imports: [
    CommonModule,
    ...modules,
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl', 'gt-xs', 'gt-sm', 'gt- md', 'gt-lg'],
    }),
    AngularFireModule,
    AngularFirestoreModule
  ],
  exports: [
    ...modules,
    AngularFireModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AppLoadingComponent
  ],
  providers: [UserService]
})
export class SharedDataModule{}
