import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ tableName: 'order_items' })
export class OrderItem {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;

  @Property()
  price!: number;
}
