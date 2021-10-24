import {Component, OnDestroy, OnInit} from '@angular/core';
import {Common} from "@shared/classes/common";
import {SignUpRedirectAuthConfig} from "@type/angular-firebase";
import {BaseNavigationService} from "../../../navigation/services/base-navigation.service";
import {AuthorizationService} from "../../services/authorization.service";
import {Person} from "@entities/Person";
import {CommonService} from "@shared/services/common.service";


@Component({
  selector: 'app-base-authorization-default',
  templateUrl: './base-authorization-default.component.html',
  styleUrls: ['./base-authorization-default.component.scss']
})
export class BaseAuthorizationDefaultComponent implements OnInit,OnDestroy {
  private readonly subs = Common.NewSubs;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  private getUserCredentialData(){

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
