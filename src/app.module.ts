import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './core/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database.config';
import * as connectionOptions from '../ormconfig';
import { CoreModule } from './core/core.modules';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { contextMiddleware } from './middlewares/context.middleware';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, CoreModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
    //consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
