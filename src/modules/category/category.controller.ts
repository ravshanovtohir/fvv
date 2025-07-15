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
import { DeviceHeadersDto, ParamId } from '@enums';
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { HeadersValidation } from '@decorators';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Find all categories mobile', description: 'Find all categories mobile' })
  @Get()
  async findAllPublic(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.categoryService.findAllPublic(headers.lang);
  }

  @ApiOperation({ summary: 'Find one category mobile', description: 'Find one category mobile' })
  @Get(':id')
  async findOnePublic(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.categoryService.findOnePublic(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all categories admin', description: 'Find all categories admin' })
  @Get('admin')
  async findAll(@Query() query: GetCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one category admin', description: 'Find one category admin' })
  @Get('admin/:id')
  findOne(@Param() param: ParamId) {
    return this.categoryService.findOne(param.id);
  }

  @ApiOperation({ summary: 'Get category by type', description: 'Get category by type' })
  @Get('category-type')
  async getCategoryByType() {
    return this.categoryService.getCategoryByType();
  }

  @ApiOperation({ summary: 'Create category admin', description: 'Create category admin' })
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
    return this.categoryService.create(data, file.filename);
  }

  @ApiOperation({ summary: 'Update category admin', description: 'Update category admin' })
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
    return this.categoryService.update(param.id, data, file.filename);
  }

  @ApiOperation({ summary: 'Delete category admin', description: 'Delete category admin' })
  @Delete(':id')
  remove(@Param() param: ParamId) {
    return this.categoryService.remove(param.id);
  }
}
