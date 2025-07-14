import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { CreateEncyclopediaDto, UpdateEncyclopediaDto, GetEncyclopediaDto } from './dto';

@Controller('encyclopedia')
export class EncyclopediaController {
  constructor(private readonly encyclopediaService: EncyclopediaService) {}

  @Get()
  async findAll(@Query() query: GetEncyclopediaDto) {
    return this.encyclopediaService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.encyclopediaService.findOne(+id);
  }

  @Post()
  async create(@Body() createEncyclopediaDto: CreateEncyclopediaDto) {
    return this.encyclopediaService.create(createEncyclopediaDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEncyclopediaDto: UpdateEncyclopediaDto) {
    return this.encyclopediaService.update(+id, updateEncyclopediaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.encyclopediaService.remove(+id);
  }
}
