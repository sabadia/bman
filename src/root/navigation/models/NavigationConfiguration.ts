import {DocumentReference} from "@angular/fire/compat/firestore";
import {BaseEntity} from "@entities/base-entity";
import {Navigation} from "@entities/navigation";
import {Common} from "@shared/classes/common";

export enum NavigationViewType {
  IconOnly = 'IconOnly',
  TextOnly = 'TextOnly',
  Full = 'Full',
  Hide = 'Hide'
}

export class NavigationConfiguration extends BaseEntity<NavigationConfiguration>{
  ViewMode?: NavigationViewType;
  NavigationList?: Array<Navigation>;
  constructor(data?: Partial<NavigationConfiguration>) {
    super(data);
  }
  // get NestedConfigurationList() {
  //   return []
  // }

  public static readonly BaseNavConfig = new NavigationConfiguration({ViewMode: NavigationViewType.Hide, NavigationList: [] })
}
