import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { __prod__ } from 'src/constants';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: 'localhost' || process.env.RDS_HOSTNAME || dbConfig.host,
  port: 5432 || process.env.RDS_PORT || dbConfig.port,
  username: 'postgres' || process.env.RDS_USERNAME || dbConfig.username,
  password: 'postgres' || process.env.RDS_PASSWORD || dbConfig.password,
  database: 'board-app' || process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize || !__prod__,
};
