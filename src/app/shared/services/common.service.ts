import { Injectable } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly sctivatedRoute: ActivatedRoute) { }

  public getQueryParameters<T>() {
    return this.sctivatedRoute.queryParamMap.pipe(map(params => {
      return (params as any).params as T;
    }))
      // .subscribe((params) => {
      //     this.paramsObject = { ...params.keys, ...params };
      //     console.log(this.paramsObject);
      //   }
      // );
  }
}
