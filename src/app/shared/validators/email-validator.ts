import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {AuthorizationService} from "@authorization/services/authorization.service";
import {Observable, timer} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

export class EmailValidator {
  static EmailExistValidator(authorizationService: AuthorizationService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authorizationService.isEmailExist([{
        Key: 'Id',
        Operator: '==',
        Value: control.get('Email')?.value
      }]).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(isExist => {
          isExist ? control.get('Email')?.setErrors({'EmailExist':true}) : control.get('Email')?.setErrors(null);
          control.updateValueAndValidity();
          return control.validator;
        })
      )
    }
  }
}
