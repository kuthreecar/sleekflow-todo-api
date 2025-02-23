import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOwnerId1740277758675 implements MigrationInterface {
  name = 'AddOwnerId1740277758675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4094c6ea81dfb24cad8aa0060b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7016b902218adf94405e15f10c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-item" ADD "ownerId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c83a20c5ab08a49a79f31e04d3" ON "todo-item" ("ownerId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c83a20c5ab08a49a79f31e04d3"`,
    );
    await queryRunner.query(`ALTER TABLE "todo-item" DROP COLUMN "ownerId"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_7016b902218adf94405e15f10c" ON "todo-item" ("description") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4094c6ea81dfb24cad8aa0060b" ON "todo-item" ("name") `,
    );
  }
}
