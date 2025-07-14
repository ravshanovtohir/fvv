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
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, GetCategoryDto } from './dto';
import { ParamId } from '@enums';
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll(@Query() query: GetCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @Get('category-type')
  async getCategoryByType() {
    return this.categoryService.getCategoryByType();
  }

  @Get(':id')
  findOne(@Param() param: ParamId) {
    return this.categoryService.findOne(param.id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCategoryDto })
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
    return this.categoryService.create(data, file);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCategoryDto })
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
  update(@Param() param: ParamId, @Body() data: UpdateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.categoryService.update(param.id, data, file);
  }

  @Delete(':id')
  remove(@Param() param: ParamId) {
    return this.categoryService.remove(param.id);
  }
}
