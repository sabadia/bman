import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NavigationService} from "@authorization/services/navigation.service";
import {Navigation} from "@entities/navigation";
import {Person} from "@entities/Person";
import {Role} from "@entities/role";
import {BaseService} from "@shared/services/base.service";
import {FilterQuery} from "@type/angular-firebase";
import {combineLatest, of, zip} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends  BaseService<Role>{

  constructor(private readonly angularFirestore: AngularFirestore,
              private readonly navigationService: NavigationService
              ) {
    super(angularFirestore, Role.name)
  }
  get(filterDataList?: FilterQuery[]){
    return super.get(filterDataList).pipe(switchMap(dataList =>
        combineLatest(dataList.map(data =>
          data.NavigationsAllowedToAccess?combineLatest([...(data.NavigationsAllowedToAccess as string[] || [])?.filter(_r => typeof _r === 'string')
            .map(nestedId => ({Key: 'Id', Operator: '==', Value: nestedId})).map(nestedIdFilter => this.navigationService.get([nestedIdFilter as FilterQuery])
              .pipe(map(nestedDataList => nestedDataList[0] || null
                ),
                filter(nestedData => nestedData !== null)
              )
            )]).pipe(map(nestedDataList => new Role({...data, NavigationsAllowedToAccess : nestedDataList})))
            : of(new Role(data))
        ))
      )
    )
  }

}
