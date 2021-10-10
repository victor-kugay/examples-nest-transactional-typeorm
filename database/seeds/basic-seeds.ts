import {createConnection} from 'typeorm';
import {DbConfig} from '../../src/configs/database-config';
import {DbConnection} from '../../src/database/database.module';

if (module === require.main) {
  main().catch((error) => {
    console.log(error);
    process.exit(1);
  });
}

async function seed() {}

async function main() {
  const connectionUsers = await createConnection({
    type: 'postgres',
    name: DbConnection.Users,
    host: DbConfig.POSTGRES_HOST_USERS,
    database: DbConfig.POSTGRES_DB_USERS,
    username: DbConfig.POSTGRES_USER_USERS,
    password: DbConfig.POSTGRES_PASSWORD_USERS,
    port: DbConfig.POSTGRES_PORT_USERS,
  });

  const connectionCats = await createConnection({
    type: 'postgres',
    name: DbConnection.Cats,
    host: DbConfig.POSTGRES_HOST_CATS,
    database: DbConfig.POSTGRES_DB_CATS,
    username: DbConfig.POSTGRES_USER_CATS,
    password: DbConfig.POSTGRES_PASSWORD_CATS,
    port: DbConfig.POSTGRES_PORT_CATS,
  });

  await seed();

  await connectionCats.close();
  await connectionUsers.close();
}
