import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Common} from "@shared/classes/common";
import {filter} from "rxjs/operators";
import {SubSink} from "subsink";
import {NavigationConfiguration, NavigationViewType} from "../models/navigation";
import {BaseNavigationService} from "../services/base-navigation.service";

@Component({
  selector: 'base-navigation-toolbar',
  templateUrl: './base-navigation-toolbar.component.html',
  styleUrls: ['./base-navigation-toolbar.component.scss']
})
export class BaseNavigationToolbarComponent implements OnInit, OnDestroy {

  navConfig = NavigationConfiguration.BaseNavConfig;
  private subs = Common.SubsHandler.NewSubSink
  lastRoute: string = '';

  constructor(private readonly baseNavigationService: BaseNavigationService) { }

  ngOnInit(): void {
    this.getRouteChangesList();
  }
  private getRouteChangesList(){
    this.baseNavigationService.$lastNavigatedroute.subscribe(lastUrl => console.log(lastUrl));
  }

  onClickPrevious(): void{
    // this.NavigatedUrlList?.pop();
    // const previousUrl = this.NavigatedUrlList?.pop();
    // if(previousUrl){
    //   this.router.navigateByUrl(previousUrl);
    // };
  }
  onNavigationOpenClick(): void{
    this.navConfig.ViewMode === NavigationViewType.Full ? this.navConfig.ViewMode = NavigationViewType.IconOnly :
      this.navConfig.ViewMode = NavigationViewType.Full
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
