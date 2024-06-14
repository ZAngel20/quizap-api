/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLevel1718393292112 implements MigrationInterface {
    name = 'UserLevel1718393292112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`level\` DROP FOREIGN KEY \`FK_a29e9477e7469b8197e5ba9a495\``);
        await queryRunner.query(`CREATE TABLE \`user_level\` (\`idUser\` varchar(255) NOT NULL, \`idLevel\` bigint NOT NULL, \`score\` int NOT NULL, PRIMARY KEY (\`idUser\`, \`idLevel\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`level\` ADD CONSTRAINT \`FK_a29e9477e7469b8197e5ba9a495\` FOREIGN KEY (\`idCategory\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_level\` ADD CONSTRAINT \`FK_530acacf8e39614c0ea4110bc82\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_level\` ADD CONSTRAINT \`FK_2e220ba90c0cbaaf1ede62ff827\` FOREIGN KEY (\`idLevel\`) REFERENCES \`level\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_level\` DROP FOREIGN KEY \`FK_2e220ba90c0cbaaf1ede62ff827\``);
        await queryRunner.query(`ALTER TABLE \`user_level\` DROP FOREIGN KEY \`FK_530acacf8e39614c0ea4110bc82\``);
        await queryRunner.query(`ALTER TABLE \`level\` DROP FOREIGN KEY \`FK_a29e9477e7469b8197e5ba9a495\``);
        await queryRunner.query(`DROP TABLE \`user_level\``);
        await queryRunner.query(`ALTER TABLE \`level\` ADD CONSTRAINT \`FK_a29e9477e7469b8197e5ba9a495\` FOREIGN KEY (\`idCategory\`) REFERENCES \`level\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
