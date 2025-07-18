import { Migration } from '@mikro-orm/migrations';

export class Migration20250718223556 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "cart_items" ("id" serial primary key, "user_id" int not null, "product_id" int not null, "quantity" int not null);`);

    this.addSql(`alter table "cart_items" add constraint "cart_items_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "cart_items" cascade;`);
  }

}
