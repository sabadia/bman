import {DocumentReference} from "@angular/fire/compat/firestore";
import {Common} from "@shared/classes/common";
import {Injectable} from "@angular/core";
import {NestedConfiguration} from "@type/common";

enum NormalDataType{
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  undefined = 'undefined',
}
enum ComplexDataType {
  function = 'function',
  object = 'object',
}

export abstract class BaseEntity<Entity>{
  Id: string = Common.NewRandomGuid;
  _t?: string;
  CreatedBy?: string;
  CreateDate?: string ;
  Language?: string = 'en-US';
  LastUpdateDate?: string;
  LastUpdatedBy?: string;
  Tags?: string[];
  TenantId?: string;
  IsMarkedToDelete?: boolean = false;
  RolesAllowedToRead?: string[];
  IdsAllowedToRead?: string[];
  RolesAllowedToWrite?: string[];
  IdsAllowedToWrite?: string[];
  RolesAllowedToUpdate?: string[];
  IdsAllowedToUpdate?: string[];
  RolesAllowedToDelete?: string[];
  IdsAllowedToDelete?: string[];
  EntityName?: string;
  protected constructor(data?: Partial<Entity>) {
      this.InitProperty(data);
  }
  // abstract get NestedConfigurationList() : NestedConfiguration[];

  private InitProperty(data?: Partial<Entity>): void{
    if (!data) { return };
    Object.assign(this, data);
  }


  get EntityJson() : Entity {
    const result = {};
    Object.assign(result,this);
    return result as Entity;
  }
}
