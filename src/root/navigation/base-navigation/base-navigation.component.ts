import {Component, Input, OnInit} from '@angular/core';
import {NavigationConfiguration, NavigationViewType} from "../models/navigation";
import {NavigationList} from "../navigations";

@Component({
  selector: 'base-navigation',
  templateUrl: './base-navigation.component.html',
  styleUrls: ['./base-navigation.component.scss']
})
export class BaseNavigationComponent implements OnInit {
  navConfig = NavigationConfiguration.BaseNavConfig;
  NavigationViewType = NavigationViewType
  constructor() { }

  ngOnInit(): void {
    this.InitNavigationList();
  }
  private InitNavigationList(){
    this.navConfig.NavigationList = this.navConfig.NavigationList?.concat(NavigationList)
  }
}
