import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './User';

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
}
