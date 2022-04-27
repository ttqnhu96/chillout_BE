import { MigrationInterface, QueryRunner } from "typeorm";

export class migration20220324Device1648134413273 implements MigrationInterface {
    name = 'migration20220324Device1648134413273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`device\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`socket_id\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`is_deleted\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`device\``);
    }

}
