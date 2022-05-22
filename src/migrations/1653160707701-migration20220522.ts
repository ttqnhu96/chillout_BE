import {MigrationInterface, QueryRunner} from "typeorm";

export class migration202205221653160707701 implements MigrationInterface {
    name = 'migration202205221653160707701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`executor_id\` int NOT NULL, \`receiver_id\` int NOT NULL, \`action\` enum ('LIKE', 'COMMENT', 'SEND_FRIEND_REQUEST', 'ACCEPT_FRIEND_REQUEST') NOT NULL, \`object_type\` enum ('POST', 'FRIEND_REQUEST', 'USER') NOT NULL, \`object_id\` int NOT NULL, \`message\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
