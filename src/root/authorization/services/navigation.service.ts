import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Navigation} from "@entities/navigation";
import {Role} from "@entities/role";
import {BaseService} from "@shared/services/base.service";
import {FilterQuery} from "@type/angular-firebase";
import {combineLatest, of, zip} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NavigationService extends  BaseService<Navigation>{

  constructor(private readonly angularFirestore: AngularFirestore) {
    super(angularFirestore, Navigation.name)
  }
  get(filterDataList?: FilterQuery[]){
    return super.get(filterDataList).pipe(switchMap(dataList =>
        combineLatest(dataList.map(data =>
          data.SubNavigationList?combineLatest([...(data.SubNavigationList as string[] || [])?.filter(_r => typeof _r === 'string')
              .map(nestedId => ({Key: 'Id', Operator: '==', Value: nestedId})).map(nestedIdFilter =>
                super.get([nestedIdFilter as FilterQuery]).pipe(map(nestedDataList => nestedDataList[0] || null),
                  filter(nestedData => nestedData !== null)
                ))]).pipe(map(nestedDataList => new Navigation({...data, SubNavigationList: nestedDataList})
            )): of(new Navigation(data))

        ))
      )
    )
  }
}
