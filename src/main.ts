import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpConfig } from './config/http.config';
import { operationIdFactory } from './utilities/swaggerOperationIdFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpConfig = app.get(HttpConfig);
  const config = new DocumentBuilder()
    .setTitle('Notes API v1')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        bearerFormat: 'APIToken',
      },
      'APIToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory,
  });

  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      tryItOutEnabled: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(httpConfig.port ?? 3000);
}
bootstrap();
