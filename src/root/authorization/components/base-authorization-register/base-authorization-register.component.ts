import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "@entities/Person";
import {environment} from "@environments/environment";
import {EmailValidator} from "@shared/validators/email-validator";
import {PasswordValidator} from "@shared/validators/password-validator";
import {SingUpType} from "@type/angular-firebase";
import {Gender} from "@type/common";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-base-authorization-register',
  templateUrl: './base-authorization-register.component.html',
  styleUrls: ['./base-authorization-register.component.scss']
})
export class BaseAuthorizationRegisterComponent implements OnInit {
  @Input('Person') person: Person = new Person();
  @Input('SignUpType') signUpType: SingUpType = SingUpType.Self;
  personForm: FormGroup;
  Gender = Gender;
  Object = Object;
  isLoading = false;
  constructor(private readonly formBuilder: FormBuilder, private readonly authorizationService : AuthorizationService) {
    this.personForm = this.getPersonForm(this.person);
  }

  ngOnInit(): void {
    // this.personForm = this.getPersonForm(this.person);
  }
  private getPersonForm(person: Person = new Person()) {
    return this.formBuilder.group({
      Id: [person.Id, [Validators.required]],
      FirstName: [person.firstName, [Validators.required]],
      LastName: [person.lastName, [Validators.required]],
      Gender: [person.Gender, [Validators.required]],
      CompanyName: [person.CompanyName, [Validators.required]],
      Email: [person.Email, {validators: [Validators.required, Validators.email]}],
      UserId: [person.UserId, person.EmailVerified? [Validators.required] : []],
      DisplayName: [person.DisplayName, [Validators.required]],
      Password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
      ConfirmPassword : ['',[Validators.required]],
      EmailVerified : [person.EmailVerified, [Validators.required]],
      Address: [person.Address, [Validators.required]],
      MobileNumber: [person.MobileNumber, [Validators.required, Validators.pattern("^[\\+]*[0-9]*$")]],
    },
      {
        validators : PasswordValidator.PasswordAllValidator,
        asyncValidators: EmailValidator.EmailExistValidator(this.authorizationService)
      }
      )
  }

  private getPersonData(data: any){
    const result = {...data};
    delete result['Password'];
    delete result['ConfirmPassword'];
    result['UserName'] = data.Email
    return result
  }
  submitRegistration(){
    this.personForm.markAllAsTouched();
    if(this.personForm.invalid){
      return;
    }
    this.isLoading = true;
    const person = new Person(this.getPersonData(this.personForm.getRawValue()));
    // this.authorizationService
    //   .SignUpWithEmailVerification(person,
    //     `http://${environment.domain}/authorization/account-activation/${person.Id}`,
    //     this.signUpType).subscribe(data => {
    //       this.isLoading = false;
    //       console.log(data)
    // });
    this.authorizationService.SignUp(person,this.personForm.get('Password')?.value, `http://${environment.domain}/authorization/login`, this.signUpType)
      .then(val => this.isLoading = false)
      .catch(err => console.log(err));
  }
}
