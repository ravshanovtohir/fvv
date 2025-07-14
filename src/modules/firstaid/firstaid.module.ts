import { Module } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { FirstaidController } from './firstaid.controller';

@Module({
  controllers: [FirstaidController],
  providers: [FirstaidService],
})
export class FirstaidModule {}
