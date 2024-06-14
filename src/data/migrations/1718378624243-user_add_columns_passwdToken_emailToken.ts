/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddColumnsPasswdTokenEmailToken1718378624243 implements MigrationInterface {
    name = 'UserAddColumnsPasswdTokenEmailToken1718378624243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwdToken\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`emailToken\` varchar(20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`emailToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwdToken\``);
    }

}
