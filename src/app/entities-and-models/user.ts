import {BaseEntity} from "@entities/base-entity";
import {Navigation} from "@entities/navigation";
import {NestedConfiguration} from "@type/common";

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
  // get NestedConfigurationList() {
  //   return [];  }
}
