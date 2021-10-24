import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {AuthorizationService} from "@authorization/services/authorization.service";
import {Observable, timer} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

export class PasswordValidator {
  static PasswordAllValidator (control: AbstractControl):  ValidationErrors | null {
    const password = control.get('Password');
    const confirmPassword = control.get('ConfirmPassword');
    if(!confirmPassword?.value) {
      confirmPassword?.setErrors({required: true})
    }else if(password?.value !== confirmPassword?.value){
      confirmPassword?.setErrors({passwordNotMatched: true})
    }
    return control.validator;
  }
}
