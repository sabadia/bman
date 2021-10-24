import {DocumentReference} from "@angular/fire/compat/firestore";
import {BaseEntity} from "@entities/base-entity";
import {Role} from "@entities/role";
import {Common} from "@shared/classes/common";
import {Email, Gender} from "@type/common";
import {NestedConfiguration} from "@type/common";

export class RegisteredEmail extends BaseEntity<RegisteredEmail>{
  constructor(data?: Partial<RegisteredEmail>) {
    super(data);
  }
  get NestedConfigurationList() {
    return [];
  }
}

export class Person extends BaseEntity<Person>{
  private FirstName?: string;
  private LastName?: string;
  Gender?: Gender;
  CompanyName?: string;
  Email?: Email;
  UserId?: string;
  DisplayName: string = '';
  PhotoURL?: string;
  EmailVerified: boolean = false;
  Address?: string;
  MobileNumber?: string;
  UserName?: string;
  RoleList?: Array<Role> | Array<string>;
  constructor(data?: Partial<Person>) {
    super(data);
    this.setDisplayName();
  }
  set firstName(value: string) {
    this.FirstName = value;
    this.setDisplayName();
  }
  set lastName(value: string) {
    this.LastName = value;
    this.setDisplayName();
  }
  get firstName() {
    return this.FirstName || '';
  }
  get lastName() {
    return this.LastName || '';
  }
  private setDisplayName() {
    this.DisplayName = `${this.FirstName} ${this.LastName}`;
  }
  // get NestedConfigurationList() {
  //   return [
  //     {
  //       RoleList: {
  //         Type: 'Array',
  //         TableName: Role.name
  //       }
  //     }
  //   ] as NestedConfiguration[];
  // }
}
