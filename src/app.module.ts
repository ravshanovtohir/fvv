import { join } from 'path';
import { validate } from '@config';
import { PrismaModule } from '@prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonLoggerService } from '@logger';
import { LoggingInterceptor } from '@interceptors';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  MapModule,
  UserModule,
  AuthModule,
  TestModule,
  AboutModule,
  StaffModule,
  CategoryModule,
  FirstaidModule,
  LocationModule,
  DictionaryModule,
  NotificationModule,
  EncyclopediaModule,
} from '@modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'logs'),
      serveRoot: '/logs',
      serveStaticOptions: {
        index: false,
      },
    }),
    MapModule,
    AuthModule,
    UserModule,
    TestModule,
    AboutModule,
    StaffModule,
    PrismaModule,
    FirstaidModule,
    CategoryModule,
    LocationModule,
    DictionaryModule,
    EncyclopediaModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [WinstonLoggerService, LoggingInterceptor],
  exports: [WinstonLoggerService],
})
export class AppModule {}
