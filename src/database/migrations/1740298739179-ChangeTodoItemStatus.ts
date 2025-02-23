import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTodoItemStatus1740298739179 implements MigrationInterface {
  name = 'ChangeTodoItemStatus1740298739179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo-item" DROP CONSTRAINT "FK_68c8a7c4545ccd3828c0247df60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" RENAME COLUMN "statusId" TO "status"`,
    );
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."todo-item_status_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "status" "public"."todo-item_status_enum" NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."todo-item_status_enum"`);
    await queryRunner.query(`ALTER TABLE "todo-item" ADD "status" integer`);
    await queryRunner.query(
      `ALTER TABLE "todo-item" RENAME COLUMN "status" TO "statusId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD CONSTRAINT "FK_68c8a7c4545ccd3828c0247df60" FOREIGN KEY ("statusId") REFERENCES "todo-item-status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
