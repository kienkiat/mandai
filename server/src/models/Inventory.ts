import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { Product } from './Product';

@Entity({ tableName: 'inventory' })
export class Inventory {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => Product)
  product!: Product;  // Relationship to Product

  @Property()
  quantity!: number;
}
