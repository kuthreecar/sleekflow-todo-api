import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTodoItemStatusType1740299046802
  implements MigrationInterface
{
  name = 'ChangeTodoItemStatusType1740299046802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."todo-item_status_enum" RENAME TO "todo-item_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."todo-item_status_enum" AS ENUM('NotStart', 'InProgress', 'Completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" TYPE "public"."todo-item_status_enum" USING "status"::"text"::"public"."todo-item_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" SET DEFAULT 'NotStart'`,
    );
    await queryRunner.query(`DROP TYPE "public"."todo-item_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."todo-item_status_enum_old" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" TYPE "public"."todo-item_status_enum_old" USING "status"::"text"::"public"."todo-item_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ALTER COLUMN "status" SET DEFAULT '1'`,
    );
    await queryRunner.query(`DROP TYPE "public"."todo-item_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."todo-item_status_enum_old" RENAME TO "todo-item_status_enum"`,
    );
  }
}
