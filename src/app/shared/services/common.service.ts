import { Injectable } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import {AuthorizationService} from "@authorization/services/authorization.service";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly sctivatedRoute: ActivatedRoute
  ) { }

  public getQueryParameters<T>() {
    return this.sctivatedRoute.queryParamMap.pipe(map(params => {
      return (params as any).params as T;
    }))
  }

}
