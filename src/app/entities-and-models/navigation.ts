import {DocumentReference} from "@angular/fire/compat/firestore";
import {BaseEntity} from "@entities/base-entity";
import {Role} from "@entities/role";
import {Common} from "@shared/classes/common";
import {NestedConfiguration} from "@type/common";

export class Navigation extends BaseEntity<Navigation>{
  Icon?: string;
  Name?: string;
  Path?: string;
  SubNavigationList?: Array<Navigation> | Array<string>;
  constructor(data?: Partial<Navigation>) {
    super(data);
  }

  // get NestedConfigurationList() {
  //   return [
  //       {
  //         SubNavigationList: {
  //           Type: 'Array',
  //           TableName: Navigation.name
  //         }
  //       }
  //   ] as NestedConfiguration[];
  // }
}
