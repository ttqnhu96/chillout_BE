//import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  const configService = app.select(SharedModule).get(ConfigService);

  // set API prefix
  app.setGlobalPrefix(configService.get('API_PREFIX'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
    }),
  );

  setupSwagger(app);

  //const configService = app.get(ConfigService);
  //const port = configService.get('app.port');

  const port = configService.getNumber('PORT');
  await app.listen(port);

  console.info(`server running on port ${port}`);
}
bootstrap();
