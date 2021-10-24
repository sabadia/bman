import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {AuthorizationService} from "@authorization/services/authorization.service";
import {Person} from "@entities/Person";
import {Role} from "@entities/role";
import {Observable, of, pipe} from 'rxjs';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import {map, switchMap} from "rxjs/operators";
import {BaseNavigationService} from "../../navigation/services/base-navigation.service";
import {routes} from "../../routes";

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<unknown>, CanLoad
export class FeatureCanActiveGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authorizationService : AuthorizationService,
    private readonly router: Router,
    private readonly baseNavigationService: BaseNavigationService
    ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.url)
    return this.baseNavigationService.LoggedInUserAccessableNavigationList$.pipe(map(navigationList => {
      console.log(navigationList, 'working')
      if(navigationList && !!navigationList.length ){
        if (!navigationList.find(navigation => !!route.url.find(url => url.path === navigation.Path))) {
          console.log('here')
          this.router.navigateByUrl(navigationList[0]?.Path || 'authorization');
        }
      } else if(!route.url.find(url => url.path === 'authorization')) {
        console.log('hereA')
        this.router.navigateByUrl('authorization');
      }
      return true;
    }))
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('here', childRoute)
    return this.authorizationService.LoggedInPerson$.pipe(map(person => {
      return true;
    }))
  }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
