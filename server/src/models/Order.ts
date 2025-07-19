import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity({ tableName: 'orders' })
export class Order {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  totalPrice!: number;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  orderDate!: Date;

  @Property({ default: 1 })
  status!: number;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems = new Collection<OrderItem>(this);

}
