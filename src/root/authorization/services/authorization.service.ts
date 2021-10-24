import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
// import * as Firebase from 'firebase/app';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RegisteredEmailService} from "@authorization/services/registered-email.service";
import {RoleService} from "@authorization/services/role.service";
import {Person, RegisteredEmail} from "@entities/Person";
import {BaseService} from "@shared/services/base.service";
import {FilterQuery, SingUpType} from "@type/angular-firebase";
import {Email, RoleT} from "@type/common";
import firebase from "firebase/compat";
import {combineLatest, forkJoin, of, zip} from "rxjs";
import {filter, map, mergeMap, switchMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends BaseService<Person> {

  constructor(
    private readonly angularFirestore: AngularFirestore,
    private readonly angularFireAuth: AngularFireAuth,
    private readonly registeredEmailService: RegisteredEmailService,
    private readonly roleService: RoleService
  ) {
    super(angularFirestore, Person.name);
  }
  get(filterDataList?: FilterQuery[]){
    return super.get(filterDataList).pipe(switchMap(dataList =>
      combineLatest(dataList.map(data =>
          data.RoleList? combineLatest([...(data.RoleList as string[] || [])?.filter(_r => typeof _r === 'string')
          .map(nestedId => ({Key: 'Id', Operator: '==', Value: nestedId})).map(nestedIdFilter =>
            this.roleService.get([nestedIdFilter as FilterQuery]).pipe(map(nestedDataList => nestedDataList[0] || null),
              filter(nestedData => nestedData !== null)
            ))]).pipe(map(nestedDataList => new Person({...data, RoleList: nestedDataList})))
            : of(new Person(data))
          ))
      )
    )
  }

  isEmailExist(filterDataList?: FilterQuery[]) {
    return this.registeredEmailService.isExist(filterDataList)
  }

  async login(email: Email, password: string) {
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  SignUpWithEmailVerification(person: Person, accountActivationUrl: string, singUpType: SingUpType){
    return this.LoggedInPerson$.pipe(mergeMap(async loggedInPerson => {
      console.log(loggedInPerson);
    // && !!loggedInPerson.RoleList?.find(role => role.Key === (RoleT.SuperAdmin || RoleT.Admin))
      if(loggedInPerson ) {
        return await this.angularFireAuth.sendSignInLinkToEmail(person.Email as string,{
          url: accountActivationUrl || '',
          handleCodeInApp: true
        }).then(async () => {
          person.CreatedBy = loggedInPerson.UserId;
          return await this.add(person.EntityJson).then(res => {
            console.log(res);
            return person;
          }).then(() => this.registeredEmailService.add(new RegisteredEmail({Id: (person.Email as string)}).EntityJson).then(() => person)
          )
            .catch(err=> console.log(err));
        })
      } else {
        return null;
      }
    }))
  }

  async SignUp(person: Person, password: string, accountActivationUrl: string, singUpType: SingUpType) {
    return await this.angularFireAuth.createUserWithEmailAndPassword(person.Email as string, password)
      .then(async (result) => {
        return await this.sendVerificationMail(result && result.user || undefined,accountActivationUrl)
          .then(async user =>{
            person.UserId = result.user?.uid;
            person.CreatedBy = result.user?.uid;
            return await this.add(person.EntityJson).then(res => {
              console.log(res);
              return user;
            }).then(() => this.registeredEmailService.add(new RegisteredEmail({Id: (person.Email as string)}).EntityJson).then(() => person))
              .catch(err=> console.log(err));
          })
          .then(async user => {
            return await this.angularFireAuth.signOut().then(() => user);
          });
      })
      .catch((error) => {
        return {
          error: {
            Key: 'User-Creation-Error',
            Value: `User Creation Failed for Email: ${person.Email}`
          }
        }
      })
  }

  async verifyEmail(oobCode: string){
    return await this.angularFireAuth.applyActionCode(oobCode);
  }
  async sendVerificationMail(user?: firebase.User ,accountActivationUrl?: string){
      return user?.sendEmailVerification({
        url: accountActivationUrl || '',
        handleCodeInApp: true
      }).then(() => user)
        .catch((error) => {
          return {
            error: {
              Key: 'User-Email-Verification-Errorr',
              Value: `User Email Verification Failed for Email: ${user?.email}`
            }
          }
        });
  }
  async logout() {
     return await this.angularFireAuth.signOut();
  }

  async getLoggedInUser() {
    return await this.angularFireAuth.currentUser;
  }
  getLoggdInUserOrNone(){
    return this.angularFireAuth.authState.pipe(map(user => (user && user?.emailVerified) ? user : null));
  }
  get LoggedInPerson$() {
    return this.getLoggdInUserOrNone().pipe(switchMap(user => {
      if(user) {
        return this.get([{
          Key: 'UserId',
          Operator: '==',
          Value: user?.uid
        }])
      } else {
        return of(null);
      }
      }),
      map(personList => personList && !!personList.length && personList[0] || null)
    )
  }
}
