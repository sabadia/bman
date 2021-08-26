import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {BaseService} from "@shared/services/base.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, mergeMap, switchMap} from "rxjs/operators";
import {NavigationConfiguration} from "../models/navigation";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthorizationService} from "../../authorization/services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class BaseNavigationService extends BaseService<NavigationConfiguration>{
  private readonly navigatedUrlList : string[] = [];

  constructor(
    private readonly angularFirestore: AngularFirestore,
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {
    super(angularFirestore, NavigationConfiguration.name);
    this.emitPreviousUrlAndUpdateList();
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
//   switchMap(event => {
//   return new BehaviorSubject<string[]>(this.$NavigatedUrlList.value && this.$NavigatedUrlList.value.concat([(event as NavigationEnd).url]) || [(event as NavigationEnd).url] );
// })

}
