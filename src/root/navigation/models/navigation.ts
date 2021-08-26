import {BaseEntity} from "@entities/base-entity";

export type Navigation = {
  Id: string,
  Url: string,
  Icon: string,
  Name: string,
  SubNavigationList?: Navigation
}

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

  public static readonly BaseNavConfig = new NavigationConfiguration({ViewMode: NavigationViewType.Full, NavigationList: [] })
}
