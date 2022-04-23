import { MigrationInterface, QueryRunner } from "typeorm";

export class migration202204231650715460427 implements MigrationInterface {
    name = 'migration202204231650715460427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` ADD \`type\` enum ('FRIEND', 'FRIEND_REQUEST_RECEIVER', 'FRIEND_REQUEST_SENDER') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` DROP COLUMN \`type\``);
    }

}
