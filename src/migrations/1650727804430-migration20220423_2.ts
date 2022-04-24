import { MigrationInterface, QueryRunner } from "typeorm";

export class migration2022042321650727804430 implements MigrationInterface {
    name = 'migration2022042321650727804430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` ADD \`is_deleted\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` DROP COLUMN \`is_deleted\``);
    }

}
