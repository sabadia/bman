import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {BaseEntity} from "@entities/base-entity";
import {RegisteredEmail} from "@entities/Person";
import {BaseService} from "@shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class RegisteredEmailService extends BaseService<RegisteredEmail>{

  constructor(private readonly angularFirestore: AngularFirestore) {
    super(angularFirestore, RegisteredEmail.name)
  }
}
