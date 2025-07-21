import { APP_PORT } from './config';
import { AppModule } from './app.module';
import { ParseFiltersPipe } from '@pipes';
import { NestFactory } from '@nestjs/core';
import { globalHeaderParametrs } from '@enums';
import { WinstonLoggerService } from '@logger';
import * as basicAuth from 'express-basic-auth';
import { AllExceptionFilter } from '@exceptions';
import { LoggingInterceptor } from '@interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLoggerService);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  (new ParseFiltersPipe(),
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors) => {
          const firstError = errors.find((error) => error.constraints);
          const message = firstError ? Object.values(firstError.constraints!)[0] : 'Validation error';
          return new BadRequestException(message);
        },
      }),
    ));

  app.useGlobalFilters(new AllExceptionFilter());

  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: {
        '1': '1',
        'fvv_user_nuriddin': 'fvv_user_nuriddin',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FVV API')
    .setDescription('The FVV API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'access-token',
      description: 'JWT access token',
    })
    .addGlobalParameters(...globalHeaderParametrs)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_PORT ?? 3000);
}
bootstrap();
