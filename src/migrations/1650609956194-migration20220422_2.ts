import {MigrationInterface, QueryRunner} from "typeorm";

export class migration2022042221650609956194 implements MigrationInterface {
    name = 'migration2022042221650609956194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relationship\` RENAME COLUMN \`user_id_1\` TO \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`relationship\` RENAME COLUMN \`user_id_2\` TO \`friend_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
