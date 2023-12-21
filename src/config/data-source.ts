import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './env.config';
export const dataSourceOptions: DataSourceOptions = {
  type: env.DATABASE.CONNECT,
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/databases/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
