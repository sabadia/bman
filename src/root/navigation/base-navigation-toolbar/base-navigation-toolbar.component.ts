import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthorizationService} from "@authorization/services/authorization.service";
import {Person} from "@entities/Person";
import {Common} from "@shared/classes/common";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {NavigationConfiguration, NavigationViewType} from "../models/NavigationConfiguration";
import {BaseNavigationService} from "../services/base-navigation.service";

@Component({
  selector: 'base-navigation-toolbar',
  templateUrl: './base-navigation-toolbar.component.html',
  styleUrls: ['./base-navigation-toolbar.component.scss']
})
export class BaseNavigationToolbarComponent implements OnInit, OnDestroy {

  navConfig = NavigationConfiguration.BaseNavConfig;
  private subs = Common.NewSubs
  NavigationViewType = NavigationViewType
  lastRoute: string = '';
  person$?: Observable<Person | null>;

  constructor(
    private readonly baseNavigationService: BaseNavigationService,
    private readonly authorizationService : AuthorizationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getRouteChangesList();
    this.person$ = this.authorizationService.LoggedInPerson$
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
  async logOut(){
    await this.authorizationService.logout().then(_ => this.router.navigateByUrl('authorization'));

  }

}
