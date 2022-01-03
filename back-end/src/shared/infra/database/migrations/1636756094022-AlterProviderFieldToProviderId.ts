import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1636756094022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments','provider');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
      }));

      await queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
          name: 'users_fk',
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: "CASCADE"
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments','users_fk');

      await queryRunner.dropColumn('appointments','provide_id');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider',
          type: 'varchar',
        }),
      );
    }

}
