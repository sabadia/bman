import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference, Query} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Common} from "@shared/classes/common";
import {take} from "rxjs/operators";
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

  async add(dataList: EntityType[] | EntityType): Promise<boolean | Error> {
    if(!Array.isArray(dataList)){
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
    ).then(_ => !!!failedIndexList.length || new Error(`Failed IndexList ${failedIndexList.join(', ')}`))
  }

  get(filterDataList?: FilterQuery[]){
    return this.getCollection(filterDataList).valueChanges();
  }
  update(EntityCollection: EntityType[] = []){
    return EntityCollection.forEach((entityDoc: EntityType) => {
      this.onUpdateEntityDocument(entityDoc);
      this.EntityDataCollection.doc(entityDoc.Id).update(entityDoc as EntityType);
    })
  }
  delete(EntityCollection: EntityType[] = []){
    return EntityCollection.forEach((entityDoc: BaseEntity<EntityType>) => {
      this.EntityDataCollection.doc(entityDoc.Id).delete();
    })
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

type FilterQuery = {
  Key: string ,
  Operator: WhereFilterOp,
  Value: any
}
