import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, GetCategoryDto } from './dto';
import { ParamId } from '@enums';
import { v4 as uuidv4 } from 'uuid';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll(@Query() query: GetCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() param: ParamId) {
    return this.categoryService.findOne(param.id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/category_icons',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@Body() data: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.categoryService.create(data, file?.filename);
  }

  @Patch(':id')
  update(@Param() param: ParamId, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(param.id, data);
  }

  @Delete(':id')
  remove(@Param() param: ParamId) {
    return this.categoryService.remove(param.id);
  }
}
