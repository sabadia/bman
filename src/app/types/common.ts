export type Email = `${string}${string}@${string}${string}.${string}${string}`

// export type Address = `${string}${string}`

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum RoleT {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Distributor = 'Distributor',
  Manager = 'Manager',
  CompanyRepresentative = 'CompanyRepresentative',
  SalesMan = 'SalesMan',
  DeliveryMan = 'DeliveryMan',
  AppUser = 'AppUser',
}
// export type NestedDataConfig = {
//   PropertyName: string,
//   TableName: string,
//   PropertyType: Array<string> | string
// }

export type NestedConfiguration = { [key: string]:  {
    TableName: string,
    Type: 'Array' | 'string',
    Key?: string
  }
}

// export enum RoleHierarchyBaseValue {
//   SuperAdmin = 1 ,
//   Admin ,
//   Distributor,
//   Manager,
//   CompanyRepresentative,
//   SalesMan,
//   DeliveryMan,
//   AppUser
// }
