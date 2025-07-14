import { Module } from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { EncyclopediaController } from './encyclopedia.controller';
import { PrismaModule } from '@prisma';

@Module({
  imports: [PrismaModule],
  controllers: [EncyclopediaController],
  providers: [EncyclopediaService],
})
export class EncyclopediaModule {}
