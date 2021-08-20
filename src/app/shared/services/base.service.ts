import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference, Query} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;


// @Injectable({
//   providedIn: 'root'
// })
export abstract class BaseService<EntityType>{
  private EntityDataCollection: AngularFirestoreCollection<EntityType>;
  protected constructor(private afs: AngularFirestore,private entityName: string ) {
    this.EntityDataCollection = this.getCollection();
  }
  private getEntityTableNameFromEntityName = (entityName: string) => {
    return `${entityName}s`;
  }

  async add(data: EntityType, collectionPath?: string): Promise<DocumentReference<EntityType> | undefined> {
    return this.EntityDataCollection.add(data);
  }

  get(filterDataList?: FilterQuery[]){
    this.EntityDataCollection = this.getCollection(filterDataList);
    return this.EntityDataCollection.valueChanges();
  }
  private getCollection(filterDataList?: FilterQuery[]){
    this.afs.collection<EntityType>(this.getEntityTableNameFromEntityName(this.entityName),ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      filterDataList?.forEach(_query => query = query.where(_query.Key, _query.Operator, _query.Value))
      return query;
    })
    return this.EntityDataCollection;
  }
}

type FilterQuery = {
  Key: string ,
  Operator: WhereFilterOp,
  Value: any
}
