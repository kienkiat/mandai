import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum ProductStatus {
  Active = 1,
  Inactive = 2,
}
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
  status!: ProductStatus;

  @Property({ nullable: true })
  imageUrl?: string;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date;
  
}
