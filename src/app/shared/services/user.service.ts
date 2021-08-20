import { Injectable } from '@angular/core';
import {BaseService} from "@shared/services/base.service";
import {User} from "@entities/user";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor(private readonly angularFirestore: AngularFirestore) {
    super(angularFirestore, User.name);
  }
}
