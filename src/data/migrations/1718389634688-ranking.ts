/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Ranking1718389634688 implements MigrationInterface {
    name = 'Ranking1718389634688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ranking\` (\`idUser\` varchar(255) NOT NULL, \`score\` int(11) NOT NULL, PRIMARY KEY (\`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ranking\` ADD CONSTRAINT \`FK_c646b1088d6cb4a05960d476b57\` FOREIGN KEY (\`idUser\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ranking\` DROP FOREIGN KEY \`FK_c646b1088d6cb4a05960d476b57\``);
        await queryRunner.query(`DROP TABLE \`ranking\``);
    }

}
