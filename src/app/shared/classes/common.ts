import * as lodash from 'lodash';

class Guid{
  constructor() {
  }

  private getRandomGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,  (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  get RandomGuid(): string {
    return this.getRandomGuid();
  }

}

export class Common{
  public static readonly Guid: Guid = new Guid();
  public static lodash = lodash;
}
// enum Type {
//   Array = 'Array',
//   string = 'string',
//   number = 'number',
//   object = 'object',
//   boolean = 'boolean',
//   any = 'any'
// }
// type BaseType = Type.Array | Type.string | Type.number | Type.boolean | Type.object | Type.any;
//
