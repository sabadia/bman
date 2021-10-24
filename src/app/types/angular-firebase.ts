import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export type SignUpRedirectAuthConfig = {
  apiKey: string,
  continueUrl: string,
  lang: string,
  mode: string,
  oobCode: string

}

export type FilterQuery = {
  Key: string ,
  Operator: WhereFilterOp,
  Value: any
}


export enum SingUpType{
  Self = 'Self',
  Invite = 'Invite'
}
