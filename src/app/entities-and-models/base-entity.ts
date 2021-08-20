import {Common} from "@shared/classes/common";
import {Injectable} from "@angular/core";

export abstract class BaseEntity<Entity>{
  id: string = Common.Guid.RandomGuid;
  _t?: string;
  CreatedBy?: string;
  CreateDate: string = new Date().toISOString();
  Language?: string = 'en-US';
  LastUpdateDate: string =  new Date().toISOString();
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
