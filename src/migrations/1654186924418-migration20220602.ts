import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202206021654186924418 implements MigrationInterface {
    name = 'migration202206021654186924418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device\` ADD \`is_connected\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`is_read\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`is_read\``);
        await queryRunner.query(`ALTER TABLE \`device\` DROP COLUMN \`is_connected\``);
    }

}
