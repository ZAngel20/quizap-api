import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1718041585856 implements MigrationInterface {
  name = 'User1718041585856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`userName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwd\` varchar(255) NOT NULL, \`type\` enum ('default', 'admin') NOT NULL DEFAULT 'default', \`status\` enum ('active', 'pending') NOT NULL DEFAULT 'pending', \`activationToken\` varchar(20) NULL, \`activatedDate\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
