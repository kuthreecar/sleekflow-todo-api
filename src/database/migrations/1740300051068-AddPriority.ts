import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriority1740300051068 implements MigrationInterface {
  name = 'AddPriority1740300051068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."todo-item_priority_enum" AS ENUM('High', 'Medium', 'Low')`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "priority" "public"."todo-item_priority_enum" NOT NULL DEFAULT 'Medium'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "priority"`);
    await queryRunner.query(`DROP TYPE "public"."todo-item_priority_enum"`);
  }
}
