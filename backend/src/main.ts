import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useStaticAssets(path.join(__dirname, '..', 'upload'), {
    prefix: '/upload/',
  });

  app.useStaticAssets(path.join(__dirname, '../upload'));
  await app.listen(4200);
}
bootstrap();
