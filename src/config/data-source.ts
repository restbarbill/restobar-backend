import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const isSslEnabled = process.env.DB_SSL === 'true';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: isSslEnabled ? { rejectUnauthorized: false } : false,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' && process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
