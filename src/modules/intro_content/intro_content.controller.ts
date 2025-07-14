import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { IntroContentService } from './intro_content.service';
import { CreateIntroContentDto, UpdateIntroContentDto } from './dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('intro-content')
export class IntroContentController {
  constructor(private readonly introContentService: IntroContentService) {}

  @Get()
  findAll() {
    return this.introContentService.find();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/logo',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@Body() data: CreateIntroContentDto, @UploadedFile() file: Express.Multer.File) {
    return this.introContentService.create(data, file?.filename);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/logo',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  update(@Body() data: UpdateIntroContentDto, @UploadedFile() file: Express.Multer.File) {
    return this.introContentService.update(data, file?.filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.introContentService.remove(+id);
  }
}
