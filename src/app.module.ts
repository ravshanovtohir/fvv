import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@config';
import { WinstonLoggerService } from '@logger';
import { LoggingInterceptor } from '@interceptors';
import { PrismaModule } from '@prisma';
import {
  AuthModule,
  UserModule,
  TestModule,
  StaffModule,
  CategoryModule,
  FirstaidModule,
  DictionaryModule,
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
  ],
  controllers: [],
  providers: [WinstonLoggerService, LoggingInterceptor],
  exports: [WinstonLoggerService],
})
export class AppModule {}
