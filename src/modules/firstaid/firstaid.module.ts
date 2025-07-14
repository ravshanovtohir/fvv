import { Module } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { FirstaidController } from './firstaid.controller';
import { PrismaModule } from '@prisma';

@Module({
  imports: [PrismaModule],
  controllers: [FirstaidController],
  providers: [FirstaidService],
})
export class FirstaidModule {}
