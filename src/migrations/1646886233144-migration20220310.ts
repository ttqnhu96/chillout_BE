import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202203101646886233144 implements MigrationInterface {
    name = 'migration202203101646886233144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
