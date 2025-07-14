import { Module } from '@nestjs/common';
import { IntroContentService } from './intro_content.service';
import { IntroContentController } from './intro_content.controller';

@Module({
  controllers: [IntroContentController],
  providers: [IntroContentService],
})
export class IntroContentModule {}
