import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202204221650566304836 implements MigrationInterface {
    name = 'migration202204221650566304836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`friend_request\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`sender_id\` int NOT NULL, \`receiver_id\` int NOT NULL, \`is_accepted\` tinyint NOT NULL, \`is_deleted\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`friend_request\``);
    }

}
