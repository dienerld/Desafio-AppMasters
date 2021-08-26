import { MigrationInterface, QueryRunner } from 'typeorm';

export default class updateTokenToUserHash1629939000696
  implements MigrationInterface
{
  name = 'updateTokenToUserHash1629939000696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."favorite" RENAME COLUMN "token" TO "userHash"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."favorite" RENAME COLUMN "userHash" TO "token"`,
    );
  }
}
