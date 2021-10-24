import {DocumentReference} from "@angular/fire/compat/firestore";
import {BaseEntity} from "@entities/base-entity";
import {Navigation} from "@entities/navigation";
import {RoleT} from "@type/common";
import {NestedConfiguration} from "@type/common";

export class Role extends BaseEntity<Role> {
  AuthFailedUrl?: string;
  Key?: RoleT;
  Parent?: Role;
  RoleHierarchyBaseValue?: number;
  NavigationsAllowedToAccess ?: Navigation[] | string[]
  constructor(data?: Partial<Role>) {
    super(data);
  }
  // get NestedConfigurationList() {
  //   return [
  //     {
  //       NavigationsAllowedToAccess: {
  //         Type: 'Array',
  //         TableName: Navigation.name
  //       }
  //     }
  //   ] as NestedConfiguration[];
  // }
}
