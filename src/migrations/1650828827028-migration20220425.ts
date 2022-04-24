import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202204251650828827028 implements MigrationInterface {
    name = 'migration202204251650828827028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` ADD \`friend_request_id\` int NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` DROP COLUMN \`friend_request_id\``);
    }
}
