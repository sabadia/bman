import {BaseEntity} from "@entities/base-entity";

export class User extends BaseEntity<User>{
  UserName?: string;
  Email?: string;
  Password?: string;
  FirstName?: string;
  LastName?: string;
  DisplayName?: string;
  constructor(data?: Partial<User>) {
    super(data);
  }
}
