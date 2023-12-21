import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env.config';
import hbs from 'hbs';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'admin', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src', 'admin', 'views', 'partials'));
  app.set('view options', { layout: 'layouts/main' });
  await app.listen(env.APP_PORT);
}
bootstrap()
  .then(() => console.log('Init app success'))
  .catch(console.error);
