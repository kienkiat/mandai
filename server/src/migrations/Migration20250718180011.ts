import { Migration } from '@mikro-orm/migrations';

export class Migration20250718180011 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "products" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "status" int not null, "created_at" timestamptz not null default CURRENT_TIMESTAMP);`);

    this.addSql(`create table "inventory" ("id" serial primary key, "product_id" int not null, "quantity" int not null);`);
    this.addSql(`alter table "inventory" add constraint "inventory_product_id_unique" unique ("product_id");`);

    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null default 'customer', "created_at" timestamptz not null default CURRENT_TIMESTAMP);`);

    this.addSql(`create table "orders" ("id" serial primary key, "user_id" int not null, "total_price" int not null, "order_date" timestamptz not null default CURRENT_TIMESTAMP, "status" int not null default 1);`);

    this.addSql(`create table "order_items" ("id" serial primary key, "order_id" int not null, "product_id" int not null, "quantity" int not null, "price" int not null);`);

    this.addSql(`alter table "inventory" add constraint "inventory_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);

    this.addSql(`alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;`);
    this.addSql(`alter table "order_items" add constraint "order_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
  }

}
