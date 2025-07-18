import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@config';
import { WinstonLoggerService } from '@logger';
import { LoggingInterceptor } from '@interceptors';
import { PrismaModule } from '@prisma';
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
    AuthModule,
    UserModule,
    TestModule,
    StaffModule,
    PrismaModule,
    FirstaidModule,
    CategoryModule,
    DictionaryModule,
    EncyclopediaModule,
    AboutModule,
    NotificationModule,
    LocationModule,
    MapModule,
  ],
  controllers: [],
  providers: [WinstonLoggerService, LoggingInterceptor],
  exports: [WinstonLoggerService],
})
export class AppModule {}
