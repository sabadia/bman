import {BaseEntity} from "@entities/base-entity";
import {Email} from "@type/common";

export class Person extends BaseEntity<Person>{
  Name?: string;
  Email?: Email;
  UserId?: string;
  constructor(data: Partial<Person>) {
    super(data);
  }
}
