import {get} from 'env-var';

export class DbConfig {
  public static readonly POSTGRES_HOST_USERS: string = get('POSTGRES_HOST_USERS').required().asString();
  public static readonly POSTGRES_DB_USERS: string = get('POSTGRES_DB_USERS').required().asString();
  public static readonly POSTGRES_USER_USERS: string = get('POSTGRES_USER_USERS').required().asString();
  public static readonly POSTGRES_PASSWORD_USERS: string = get('POSTGRES_PASSWORD_USERS').required().asString();
  public static readonly POSTGRES_PORT_USERS: number = get('POSTGRES_PORT_USERS').required().asPortNumber();

  public static readonly POSTGRES_HOST_CATS: string = get('POSTGRES_HOST_CATS').required().asString();
  public static readonly POSTGRES_DB_CATS: string = get('POSTGRES_DB_CATS').required().asString();
  public static readonly POSTGRES_USER_CATS: string = get('POSTGRES_USER_CATS').required().asString();
  public static readonly POSTGRES_PASSWORD_CATS: string = get('POSTGRES_PASSWORD_CATS').required().asString();
  public static readonly POSTGRES_PORT_CATS: number = get('POSTGRES_PORT_CATS').required().asPortNumber();
}
