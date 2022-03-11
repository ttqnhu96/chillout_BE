import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.modules';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { contextMiddleware } from './middlewares/context.middleware';
import { PassportModule } from '@nestjs/passport';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, CoreModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    PassportModule
  ],
  controllers: [AppController],
  providers: [AppService, JsonWebTokenStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
    //consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
