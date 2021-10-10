import {Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {DbConfig} from '../configs/database-config';

export enum DbConnection {
  Users = 'users',
  Cats = 'cats',
}

export const dbConfigUsers: TypeOrmModuleOptions = {
  type: 'postgres',
  name: DbConnection.Users,
  host: DbConfig.POSTGRES_HOST_USERS,
  database: DbConfig.POSTGRES_DB_USERS,
  username: DbConfig.POSTGRES_USER_USERS,
  password: DbConfig.POSTGRES_PASSWORD_USERS,
  port: DbConfig.POSTGRES_PORT_USERS,
  entities: [`${__dirname}/../**/${DbConnection.Users}/*.{ts,js}`],
  migrations: [`${__dirname}/../../database/migrations/${DbConnection.Users}/*.{ts,js}`],
  cli: {migrationsDir: `../database/migrations/${DbConnection.Users}`},
};

export const dbConfigCats: TypeOrmModuleOptions = {
  type: 'postgres',
  name: DbConnection.Cats,
  host: DbConfig.POSTGRES_HOST_CATS,
  database: DbConfig.POSTGRES_DB_CATS,
  username: DbConfig.POSTGRES_USER_CATS,
  password: DbConfig.POSTGRES_PASSWORD_CATS,
  port: DbConfig.POSTGRES_PORT_CATS,
  entities: [`${__dirname}/../**/${DbConnection.Cats}/*.{ts,js}`],
  migrations: [`${__dirname}/../../database/migrations/${DbConnection.Cats}/*.{ts,js}`],
  cli: {migrationsDir: `../database/migrations/${DbConnection.Cats}`},
};

@Module({
  imports: [TypeOrmModule.forRoot(dbConfigUsers), TypeOrmModule.forRoot(dbConfigCats)],
})
export class DatabaseModule {}
