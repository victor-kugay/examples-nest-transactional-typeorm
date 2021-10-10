import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {version, description, name} from '../package.json';
import {ErrorFilter} from './common/error-filter';
import {AppConfig} from './configs/app-config';
import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from 'nestjs-pino';

const {APP_PORT} = AppConfig;

startApp(APP_PORT).catch((error) => {
  console.log(error);
  process.exit(1);
});

async function startApp(port: number) {
  const app = await NestFactory.create(AppModule, {
    // @See https://github.com/nestjs/nest/issues/5162
    abortOnError: false,
    // @See https://github.com/iamolegga/nestjs-pino/blob/master/README.md#example
    bufferLogs: true,
  });
  
  const logger = app.get(Logger);

  app.useGlobalFilters(new ErrorFilter(logger));
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('/api/v1');

  const swaggerDocOptions = new DocumentBuilder()
    .setDescription(description)
    .setVersion(version)
    .setTitle(name)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);

  SwaggerModule.setup('docs', app, swaggerDoc);

  await app.listen(port);
}
