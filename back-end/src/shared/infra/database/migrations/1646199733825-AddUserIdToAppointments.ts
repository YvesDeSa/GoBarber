import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserIdToAppointments1646199733825 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }));

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'users_id_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: "CASCADE"
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'users_id_fk');

    await queryRunner.dropColumn('appointments', 'user_id');
  }


}
