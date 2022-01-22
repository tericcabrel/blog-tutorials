import {MigrationInterface, QueryRunner} from "typeorm";

export class createTasksTable1642869891226 implements MigrationInterface {
    name = 'createTasksTable1642869891226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`status\` varchar(20) NOT NULL DEFAULT 'pending', \`due_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6086c8dafbae729a930c04d865\` (\`status\`), UNIQUE INDEX \`IDX_396d500ff7f1b82771ddd812fd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_396d500ff7f1b82771ddd812fd\` ON \`tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_6086c8dafbae729a930c04d865\` ON \`tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
