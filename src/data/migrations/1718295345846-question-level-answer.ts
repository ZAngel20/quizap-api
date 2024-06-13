/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionLevelAnswer1718295345846 implements MigrationInterface {
    name = 'QuestionLevelAnswer1718295345846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`level\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`idCategory\` bigint NOT NULL, \`name\` varchar(255) NOT NULL, INDEX \`IDX_a29e9477e7469b8197e5ba9a49\` (\`idCategory\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`idAnswer\` bigint NOT NULL, \`text\` varchar(255) NOT NULL, \`index\` int(11) NOT NULL, INDEX \`IDX_d44f302468aa17f0f5b4afa6cc\` (\`idAnswer\`), UNIQUE INDEX \`REL_d44f302468aa17f0f5b4afa6cc\` (\`idAnswer\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`level_question\` (\`idLevel\` bigint NOT NULL, \`idQuestion\` bigint NOT NULL, INDEX \`IDX_499f8b113a7de4fb6c14ca32a1\` (\`idLevel\`), INDEX \`IDX_cb3ce455d4af6b43868fd89ab1\` (\`idQuestion\`), PRIMARY KEY (\`idLevel\`, \`idQuestion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_answer\` (\`idQuestion\` bigint NOT NULL, \`idAnswer\` bigint NOT NULL, INDEX \`IDX_1b388fa68592ad81688d4ff5ab\` (\`idQuestion\`), INDEX \`IDX_aac6716891db7ab556fd896044\` (\`idAnswer\`), PRIMARY KEY (\`idQuestion\`, \`idAnswer\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`level\` ADD CONSTRAINT \`FK_a29e9477e7469b8197e5ba9a495\` FOREIGN KEY (\`idCategory\`) REFERENCES \`level\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_d44f302468aa17f0f5b4afa6ccc\` FOREIGN KEY (\`idAnswer\`) REFERENCES \`answer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`level_question\` ADD CONSTRAINT \`FK_499f8b113a7de4fb6c14ca32a15\` FOREIGN KEY (\`idLevel\`) REFERENCES \`level\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`level_question\` ADD CONSTRAINT \`FK_cb3ce455d4af6b43868fd89ab1e\` FOREIGN KEY (\`idQuestion\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_answer\` ADD CONSTRAINT \`FK_1b388fa68592ad81688d4ff5aba\` FOREIGN KEY (\`idQuestion\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`question_answer\` ADD CONSTRAINT \`FK_aac6716891db7ab556fd8960448\` FOREIGN KEY (\`idAnswer\`) REFERENCES \`answer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question_answer\` DROP FOREIGN KEY \`FK_aac6716891db7ab556fd8960448\``);
        await queryRunner.query(`ALTER TABLE \`question_answer\` DROP FOREIGN KEY \`FK_1b388fa68592ad81688d4ff5aba\``);
        await queryRunner.query(`ALTER TABLE \`level_question\` DROP FOREIGN KEY \`FK_cb3ce455d4af6b43868fd89ab1e\``);
        await queryRunner.query(`ALTER TABLE \`level_question\` DROP FOREIGN KEY \`FK_499f8b113a7de4fb6c14ca32a15\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_d44f302468aa17f0f5b4afa6ccc\``);
        await queryRunner.query(`ALTER TABLE \`level\` DROP FOREIGN KEY \`FK_a29e9477e7469b8197e5ba9a495\``);
        await queryRunner.query(`DROP INDEX \`IDX_aac6716891db7ab556fd896044\` ON \`question_answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b388fa68592ad81688d4ff5ab\` ON \`question_answer\``);
        await queryRunner.query(`DROP TABLE \`question_answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb3ce455d4af6b43868fd89ab1\` ON \`level_question\``);
        await queryRunner.query(`DROP INDEX \`IDX_499f8b113a7de4fb6c14ca32a1\` ON \`level_question\``);
        await queryRunner.query(`DROP TABLE \`level_question\``);
        await queryRunner.query(`DROP INDEX \`REL_d44f302468aa17f0f5b4afa6cc\` ON \`question\``);
        await queryRunner.query(`DROP INDEX \`IDX_d44f302468aa17f0f5b4afa6cc\` ON \`question\``);
        await queryRunner.query(`DROP TABLE \`question\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_a29e9477e7469b8197e5ba9a49\` ON \`level\``);
        await queryRunner.query(`DROP TABLE \`level\``);
    }

}
