import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {Common} from "@shared/classes/common";
import {CommonService} from "@shared/services/common.service";
import {SignUpRedirectAuthConfig} from "@type/angular-firebase";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-base-account-activation',
  templateUrl: './base-account-activation.component.html',
  styleUrls: ['./base-account-activation.component.scss']
})
export class BaseAccountActivationComponent implements OnInit {

  private readonly subs = Common.NewSubs;
  private signUpRedirectAuthConfig?: SignUpRedirectAuthConfig;

  constructor(
    private readonly router: Router,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getUserCredentialData();
  }

  private getUserCredentialData(){
    this.subs.subList = this.commonService.getQueryParameters<SignUpRedirectAuthConfig>()
      .subscribe(signUpRedirectAuthConfig => {
        this.signUpRedirectAuthConfig = signUpRedirectAuthConfig;
        console.log(this.signUpRedirectAuthConfig);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  redirectToLogInWithQueryParam(){
    this.router.navigate([this.signUpRedirectAuthConfig?.continueUrl.replace('http:/','')
      .replace(environment.domain,'')],{queryParams: {
        lang: this.signUpRedirectAuthConfig?.lang,
        mode: this.signUpRedirectAuthConfig?.mode,
        oobCode: this.signUpRedirectAuthConfig?.oobCode
      }})
  }

}
