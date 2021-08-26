import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NavigationConfiguration} from "../../navigation/models/navigation";
import {Email} from "@type/common";
import {BaseService} from "@shared/services/base.service";
import {Person} from "@entities/Person";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends BaseService<Person> {

  constructor(
    private readonly angularFirestore: AngularFirestore,
    private readonly angularFireAuth: AngularFireAuth
  ) {
    super(angularFirestore, Person.name);
  }

  async login(email: Email, password: string) {
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  async logout() {
     return await this.angularFireAuth.signOut();
  }
  async sendInviteForSigningUp(person: Person, password: string, redirectUrl: string){
    return await this.angularFireAuth.sendSignInLinkToEmail(person.Email as string, {
      url: redirectUrl,
      handleCodeInApp: true
    }).then(
      async () => await this.add(person)
    )
  }

  async getLoggedInUser() {
    this.angularFireAuth.onAuthStateChanged(data => console.log(data));
    return this.angularFireAuth.currentUser;
  }
}
