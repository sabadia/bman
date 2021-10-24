import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Navigation} from "@entities/navigation";
import {Role} from "@entities/role";
import {BaseService} from "@shared/services/base.service";
import {FilterQuery} from "@type/angular-firebase";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, mergeMap, switchMap} from "rxjs/operators";
import { NavigationConfiguration} from "../models/NavigationConfiguration";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {AuthorizationService} from "../../authorization/services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class BaseNavigationService extends BaseService<Navigation>{
  private readonly navigatedUrlList : string[] = [];

  constructor(
    private readonly angularFirestore: AngularFirestore,
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(angularFirestore, Navigation.name);
  }
  private emitPreviousUrlAndUpdateList(){
    return this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        map(event => {
          const currentUrl = (event as NavigationEnd).url;
          this.navigatedUrlList.length >= 2 && currentUrl === this.navigatedUrlList[this.navigatedUrlList.length - 2] ?
            this.navigatedUrlList.pop(): this.navigatedUrlList.push(currentUrl)
          console.log(this.navigatedUrlList);
          return this.navigatedUrlList.length >= 2 ? this.navigatedUrlList[this.navigatedUrlList.length - 2] : undefined;
        })
        );
  }
  get $lastNavigatedroute() {
    return this.emitPreviousUrlAndUpdateList();
  }

   private onNavigationChangeData() {
     return this.router.events.pipe(
       filter(event => event instanceof NavigationEnd),
       map(() => this.activatedRoute),
       map(route => {
         while (route.firstChild) route = route.firstChild
         return route
       }),
       filter(route => route.outlet === 'primary'),
       mergeMap(route => route.data)
     )
  }

  get $RouteData() {
    return this.onNavigationChangeData();
  }

  // get(filterDataList?: FilterQuery[]){
  //   return super.get(filterDataList).pipe(map(navigationList => {
  //     return navigationList.map(navigation => {
  //       const resData = new Navigation(navigation);
  //       // resData.parentNavigationList = navigation.ParentNavigationList;
  //       // resData.subNavigationList = navigation.SubNavigationList
  //       return resData;
  //     })
  //   }))
  // }
  get LoggedInUserAccessableNavigationList$(){
    return this.authorizationService.LoggedInPerson$.pipe(map(person => {
        const navigationList: Navigation[] = [];
        if(person){
          person?.RoleList?.forEach(role => {
            (role as Role)?.NavigationsAllowedToAccess?.forEach(navigation => {
              navigation = navigation as Navigation;
              if(!this.checkIsNavigationExist(navigationList,navigation) ){
                navigationList.push(navigation);
              }
            })
          })
          return navigationList;
        } else {
          return [];
        }
      }
    ))
  }
  private checkIsNavigationExist(navigationList: Navigation[], navigation: Navigation): boolean{
    return !!navigationList.find(nav => nav.Id === navigation.Id);
  }
  get(filterDataList?: FilterQuery[]){
    return super.get(filterDataList).pipe(map(navigationList => {
      return navigationList.map(navigation => new Navigation(navigation))
    }))
  }
}
