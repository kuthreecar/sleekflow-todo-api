import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTodoTable1740242880485 implements MigrationInterface {
  name = 'UpdateTodoTable1740242880485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "todo-item" ADD "tags" text`);
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "dueDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "dueDate"`);
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "tags"`);
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "deletedAt" TIMESTAMP`,
    );
  }
}
