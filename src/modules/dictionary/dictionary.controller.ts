import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto, UpdateDictionaryDto, GetDictionaryDto } from './dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  async findAll(@Query() query: GetDictionaryDto) {
    return this.dictionaryService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }
}
