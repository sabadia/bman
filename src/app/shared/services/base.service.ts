import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference, Query} from "@angular/fire/compat/firestore";
import {Person} from "@entities/Person";
import {FilterQuery} from "@type/angular-firebase";
import {NestedConfiguration} from "@type/common";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Common} from "@shared/classes/common";
import {combineLatest} from "rxjs";
import {filter, map, switchMap, take} from "rxjs/operators";
import {BaseEntity} from "@entities/base-entity";


// @Injectable({
//   providedIn: 'root'
// })
export abstract class BaseService<EntityType extends BaseEntity<EntityType>>{
  private EntityDataCollection: AngularFirestoreCollection<EntityType>;
  protected constructor(private afs: AngularFirestore,private entityName: string ) {
    this.EntityDataCollection = this.getCollection();
  }
  private getEntityTableNameFromEntityName = (entityName: string) => {
    return `${entityName}s`;
  }

  async add(dataList: EntityType[] | EntityType) {
    if(!Array.isArray(dataList)) {
      dataList = [dataList];
    }
    const failedIndexList: number[] = [];
    return await Promise.all(
      dataList.map(async (data: EntityType, index: number) => {
        return await this.EntityDataCollection.doc(data.Id).ref.get().then(async entityDocData => {
            if(!entityDocData.exists){
              this.onAddNewEntityDocument(data);
              return await this.EntityDataCollection.doc(data.Id).set(data);
            } else {
              failedIndexList.push(index);
            }
          }
        )
      })
    ).then(_ => !!!failedIndexList.length || {Error: {
        Key:'Id-already-exist',
        Value: `Id of indexList ${failedIndexList.join(', ')} already exist`
      }})
  }
  isExist(filterDataList?: FilterQuery[]) {
    return this.get(filterDataList).pipe(map(dataList => !!dataList.length));
  }

  get(filterDataList?: FilterQuery[]){
    return this.getCollection(filterDataList).valueChanges().pipe(map(dataList => dataList && !!dataList.length? dataList: []));
  }
    update(EntityCollection: EntityType[] = []){
    EntityCollection.forEach( async (entityDoc: EntityType) => {
      console.log(EntityCollection);
      this.onUpdateEntityDocument(entityDoc);
      return await this.EntityDataCollection.doc(entityDoc.Id).update(entityDoc as EntityType);
    })
  }
  delete(EntityCollection: EntityType[] = []){
    return EntityCollection.forEach((entityDoc: BaseEntity<EntityType>) => {
      this.EntityDataCollection.doc(entityDoc.Id).delete();
    })
  }

  // getWithNestedDataHasIdList(filterDataList: FilterQuery[],nestedConfigurationList: NestedConfiguration[]){
  //   return this.get(filterDataList).pipe(switchMap(dataList =>
  //       combineLatest(dataList.map(data =>
  //
  //       ))
  //     )
  //   )
  // }
  //
  // combineAndGetNestedData(data: any, nestedConfiguration: NestedConfiguration) {
  //   const Key = Object.keys(data)[0];
  //   let nestedKeyList = data[Key];
  //   if(!Array.isArray(data[Key])){
  //     nestedKeyList = [nestedKeyList];
  //   }
  //   return combineLatest([...(nestedKeyList as string[])?.filter(_r => typeof _r === 'string')
  //     .map(nestedDataKey => ({Key: nestedConfiguration[Key].Key || 'Id', Operator: '==', Value: nestedDataKey})).map(nestedDataFilter =>
  //       this.roleService.get([nestedDataFilter as FilterQuery]).pipe(map(roleList => roleList[0] || null),
  //         filter(role => role !== null)
  //       ))]).pipe(map(RoleList => new Person({...data, RoleList})))
  // }
  //
  // private getNestedDataCollection() {
  //
  // }
  getById(Id: string){
    return this.get([{Key: 'Id', Operator: '==', Value: Id} as FilterQuery]).pipe(map(data => data && data.length >= 1 ? data[0]: null))
  }

  private getCollection(filterDataList: FilterQuery[] = []){
      this.EntityDataCollection = this.afs.collection<EntityType>(this.getEntityTableNameFromEntityName(this.entityName),ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        filterDataList?.forEach(_query => query = query.where(_query.Key, _query.Operator, _query.Value))
        return query;
      })
    return this.EntityDataCollection;
  }
  private onAddNewEntityDocument(entityData: EntityType){
    entityData.CreateDate = new Date().toISOString();
    entityData.LastUpdateDate = new Date().toISOString();
  }

  private onUpdateEntityDocument(entityData: EntityType){
    entityData.LastUpdateDate = new Date().toISOString();
  }
}
