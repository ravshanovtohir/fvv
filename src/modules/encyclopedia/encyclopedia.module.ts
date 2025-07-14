import { Module } from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { EncyclopediaController } from './encyclopedia.controller';

@Module({
  controllers: [EncyclopediaController],
  providers: [EncyclopediaService],
})
export class EncyclopediaModule {}
