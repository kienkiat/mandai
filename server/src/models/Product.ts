import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  @Property()
  status!: number;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date;
}
