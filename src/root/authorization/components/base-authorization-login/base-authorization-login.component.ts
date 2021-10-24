import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Common} from "@shared/classes/common";
import {CommonService} from "@shared/services/common.service";
import {EmailValidator} from "@shared/validators/email-validator";
import {PasswordValidator} from "@shared/validators/password-validator";
import {SignUpRedirectAuthConfig} from "@type/angular-firebase";
import firebase from "firebase/compat";
import {map, take} from "rxjs/operators";
import {NavigationConfiguration, NavigationViewType} from "../../../navigation/models/NavigationConfiguration";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'base-authorization-login',
  templateUrl: './base-authorization-login.component.html',
  styleUrls: ['./base-authorization-login.component.scss']
})
export class BaseAuthorizationLoginComponent implements OnInit {
  private readonly subs = Common.NewSubs;
  private signUpRedirectAuthConfig? : SignUpRedirectAuthConfig;
  logInForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  constructor(
    private readonly authorizationService : AuthorizationService,
    private readonly commonService: CommonService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.logInForm = this.getLogInForm();
  }

  private getLogInForm() {
    return this.formBuilder.group({
        Email: ['', {validators: [Validators.required, Validators.email]}],
        Password: ['',[Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.getUserCredentialData();
    this.authorizationService.LoggedInPerson$.subscribe(person => console.log(person));
  }
  private getUserCredentialData(){
    this.subs.subList = this.commonService.getQueryParameters<SignUpRedirectAuthConfig>()
      .subscribe(signUpRedirectAuthConfig => {
        this.signUpRedirectAuthConfig = signUpRedirectAuthConfig;
      });
  }
    submitLogin(){
    this.errorMessage = '';
    this.logInForm.markAllAsTouched();
    if(this.logInForm.invalid){
      return;
    }
    this.isLoading = true;
    const logInCredentials = this.logInForm.value;
    this.authorizationService.login(logInCredentials.Email,logInCredentials.Password)
      .then(data => {
        if(!!Object.getOwnPropertyNames(this.signUpRedirectAuthConfig).length) {
           this.validateWithAuthConfig(data?.user)
        } else {
           this.checkIsEmailVerified(data?.user)
        }
      }).catch(err => {
      this.errorMessage = 'Envalid Email Or Password'
      this.isLoading = false;
    })

  }
  private checkIsEmailVerified(loggedInUser: firebase.User | null) {
    console.log(loggedInUser);
    return loggedInUser?.emailVerified ? this.subs.subList = this.getPersonDataByUserId(loggedInUser?.uid).subscribe(person => {
        console.log(person)
        this.isLoading = false;
        window.location.reload();
      })
      :  (this.logOut()
      .then(() => {
        this.errorMessage = 'This Email Is Not Verified Yet';
        this.isLoading = false;
        return false;
      }));
  }


  private async validateWithAuthConfig(loggedInUser: firebase.User | null){
    return await this.authorizationService.verifyEmail(this.signUpRedirectAuthConfig?.oobCode || '')
      .then(async () => {
        return loggedInUser?.reload().then(async () => await this.authorizationService.getLoggedInUser());
      })
      .then(async user=> {
        this.subs.subList = this.getPersonDataByUserId(user?.uid).pipe(take(1)).subscribe(person => {
          person.EmailVerified = true;
          this.authorizationService.update([person]);
          this.isLoading = false;
        })
        return true;
        }
      )
  }
  private getPersonDataByUserId(userId = ''){
    return this.authorizationService.get([{
      Key: 'UserId',
      Operator: '==',
      Value: userId
    }]).pipe(map(personList => personList[0]))
  }
  async logOut() {
    return await this.authorizationService.logout().then(() => null);
  }
}
