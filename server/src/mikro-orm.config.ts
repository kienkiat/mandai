
import { defineConfig } from '@mikro-orm/postgresql';
import { Product } from './models/Product';
import { User } from './models/User';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Inventory } from './models/Inventory';

export default defineConfig({
  dbName: process.env.DB_NAME || 'products',
  user: process.env.DB_USER || 'kienkiat',
  password: process.env.DB_PASSWORD || 'kienkiat',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  // entities: ['./dist/models'],
  // entitiesTs: ['./src/models'],
  entities: [Product, User, Order, OrderItem, Inventory],
  debug: true,
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
  },
});
