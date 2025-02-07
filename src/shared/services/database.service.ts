import { DataSource } from 'typeorm';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [path.join(process.cwd(), 'dist', '**', '*.entity.js')],
  migrations: [path.join(process.cwd(), 'dist', 'migrations', '*.js')],
});
