import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Common} from "@shared/classes/common";
import {NavigationConfiguration, NavigationViewType} from "../models/NavigationConfiguration";
import {NavigationList} from "../navigations";
import {BaseNavigationService} from "../services/base-navigation.service";

@Component({
  selector: 'base-navigation',
  templateUrl: './base-navigation.component.html',
  styleUrls: ['./base-navigation.component.scss']
})
export class BaseNavigationComponent implements OnInit,OnDestroy {
  navConfig = NavigationConfiguration.BaseNavConfig;
  NavigationViewType = NavigationViewType;
  private subs = Common.NewSubs
  constructor(private readonly baseNavigationService: BaseNavigationService,
              private readonly router: Router
              ) { }

  ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

  ngOnInit(): void {
    this.InitNavigationList();
    this.shouldNavVisible();
  }
  private InitNavigationList(){
    this.subs.subList = this.baseNavigationService.LoggedInUserAccessableNavigationList$
      .subscribe(data => {
        if(data && !!data.length){
          this.navConfig.NavigationList = data;
        }
      })
    // this.navConfig.NavigationList = this.navConfig.NavigationList?.concat(NavigationList)
  }
  private shouldNavVisible(){
    this.baseNavigationService.$RouteData.subscribe(data => {
      console.log(data);
      if(data && data.isFullScreen){
        this.navConfig.ViewMode = NavigationViewType.Hide
      } else {
        this.navConfig.ViewMode = NavigationViewType.Full
      }
      console.log(this.navConfig);
    })
  }
}
