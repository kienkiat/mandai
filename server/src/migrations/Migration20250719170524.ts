import { Migration } from '@mikro-orm/migrations';

export class Migration20250719170524 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "products" add column "image_url" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "products" drop column "image_url";`);
  }

}
