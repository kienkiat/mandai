
import { defineConfig } from '@mikro-orm/postgresql';
import { Product } from './models/Product';
import { User } from './models/User';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Inventory } from './models/Inventory';

export default defineConfig({
  dbName: 'products',
  user: 'kienkiat',
  password: 'kienkiat',
  entities: [Product, User, Order, OrderItem, Inventory],
  debug: true,
  migrations: {
    path: './migrations',
    pathTs: './migrations',
  },
});
