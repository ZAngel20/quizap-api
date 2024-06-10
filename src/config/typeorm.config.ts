import { DataSource, DataSourceOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_MIGRATIONS_RUN,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: DB_TYPE as any,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../**/data/migrations/*{.ts,.js}'],
  migrationsRun: parseInt(DB_MIGRATIONS_RUN) === 1,
  migrationsTableName: '_db_migrations',
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
