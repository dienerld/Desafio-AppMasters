import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Favorite1629639894766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorite',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'token', type: 'varchar' },
          { name: 'appId', type: 'int' },
          { name: 'rating', type: 'int' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorite');
  }
}
