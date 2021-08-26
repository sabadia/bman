import {Component, OnDestroy, OnInit} from '@angular/core';
import {Common} from "@shared/classes/common";
import {SignUpRedirectAuthConfig} from "@type/angular-firebase";
import {AuthorizationService} from "../../services/authorization.service";
import {Person} from "@entities/Person";
import {CommonService} from "@shared/services/common.service";


@Component({
  selector: 'app-base-authorization-default',
  templateUrl: './base-authorization-default.component.html',
  styleUrls: ['./base-authorization-default.component.scss']
})
export class BaseAuthorizationDefaultComponent implements OnInit,OnDestroy {
  private readonly subs = Common.SubsHandler.NewSubSink;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
    // const person = new Person({Email: 'dev.mahamudul@gmail.com', Id: '1575ab8c-9d29-4407-8f43-4d6c62da4256'}).EntityJson;
    // this.authorizationService.sendInviteForSigningUp(person,'5161411',`http://localhost:4200/authorization/account-activation/${person.Id}`)
    //   .then(data => console.log(data),
    //     err => console.log(err))
    //
    // this.authorizationService.getLoggedInUser();
    this.getUserCredentialData();
  }

  private getUserCredentialData(){
    this.subs.sublist = this.commonService.getQueryParameters<SignUpRedirectAuthConfig>().subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
