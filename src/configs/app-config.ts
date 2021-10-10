import {get} from 'env-var';

export class AppConfig {
  public static readonly APP_PORT: number = get('APP_PORT').required().asPortNumber();

  public static readonly APP_DAY_PRICE_IN_CREDITS: number = get('APP_DAY_PRICE_IN_CREDITS').required().asIntPositive();
}
