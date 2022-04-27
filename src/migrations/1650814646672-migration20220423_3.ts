import { MigrationInterface, QueryRunner } from "typeorm";

export class migration2022042331650814646672 implements MigrationInterface {
    name = 'migration2022042331650814646672'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`device\` ADD \`user_name\` varchar(255) NOT NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`device\` DROP COLUMN \`user_name\``);

    }

}
