import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ParamId } from '@enums';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: ParamId) {
    return this.categoryService.findOne(param.id);
  }

  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
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
