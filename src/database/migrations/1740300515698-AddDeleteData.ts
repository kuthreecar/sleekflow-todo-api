import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteData1740300515698 implements MigrationInterface {
  name = 'AddDeleteData1740300515698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "deletedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "deletedAt"`);
  }
}
