import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  // get timezone(): string {
  //   return this.get('APP_TIMEZONE');
  // }

  get ENV_CONFIG() {
    return {
      TIMEZONE: `${this.get('APP_TIMEZONE')}`,
      JWT_SECRET_KEY: `${this.get('JWT_SECRET_KEY')}`,
      EXPIRES_TIME: `${this.get('EXPIRES_TIME')}`,
      // CRON_EXPRESSION_TRANSFER_ST_FROM_EVENT_TO_OPERATOR_JOB: `${this.get('CRON_EXPRESSION_TRANSFER_ST_FROM_EVENT_TO_OPERATOR_JOB')}`,
      // NATIONAL_PHONE: `${this.get('NATIONAL_PHONE')}`,
      // RIDERECT_LINK: `${this.get('APP_RIDERECT_LINK')}`,
      // WHITELIST_PHONE_NUMBER: `${this.get('WHITELIST_PHONE_NUMBER')}`,
      // COGNITO: {
      //   CLIENT_ID: `${this.get('COGNITO_CLIENT_ID')}`,
      //   USER_POOL_ID: `${this.get('COGNITO_USER_POOL_ID')}`,
      // },
      // GMO_CONFIG: {
      //   CONFIG_ID: `${this.get('GMO_CONFIG_ID')}`,
      //   SHOPID: `${this.get('GMO_SHOPID')}`,
      //   SHOPPASS: `${this.get('GMO_SHOPPASS')}`,
      //   PAYMETHODS: this.get('GMO_PAYMETHODS').split(','),
      //   TAX: this.get('GMO_TAX'),
      //   JOBCD: `${this.get('GMO_JOBCD')}`,
      //   API_URL: `${this.get('GMO_API_URL')}`,
      //   RETURL: `${this.get('GMO_RETURL')}`,
      //   PAYMENT_CHANGE_URL: `${this.get('GMO_PAYMENT_CHANGE_URL')}`,
      //   METHOD: `${this.get('GMO_METHOD')}`,
      // },
      // QUEUE_CONFIG: {
      //   REDIS_HOST: `${this.get('REDIS_HOST')}`,
      //   REDIS_PORT: `${this.get('REDIS_PORT')}`,
      //   REDIS_DB: `${this.get('REDIS_DB')}`
      // } 
    }
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../core/entities/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      type: 'mysql',
      host: this.get('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      migrationsRun: true,
      connectTimeout: 1000,
      logging: this.nodeEnv === 'development',
      multipleStatements: true
    };
  }
}

export const ENV_CONFIG = new ConfigService().ENV_CONFIG;
