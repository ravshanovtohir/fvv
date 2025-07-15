import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto, UpdateDictionaryDto, GetDictionaryDto } from './dto';
import { DeviceHeadersDto } from '@enums';
import { HeadersValidation } from '@decorators';
import { ApiOperation } from '@nestjs/swagger';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOperation({ summary: 'Find all dictionaries mobile', description: 'Find all dictionaries mobile' })
  @Get()
  async findAll(@Query() query: GetDictionaryDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.dictionaryService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Find one dictionary mobile', description: 'Find one dictionary mobile' })
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.dictionaryService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all dictionaries admin', description: 'Find all dictionaries admin' })
  @Get('admin/dictionaries')
  async findAllAdmin(@Query() query: GetDictionaryDto) {
    return this.dictionaryService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Find one dictionary admin', description: 'Find one dictionary admin' })
  @Get('admin/dictionaries/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.dictionaryService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create dictionary admin', description: 'Create dictionary admin' })
  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @ApiOperation({ summary: 'Update dictionary admin', description: 'Update dictionary admin' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @ApiOperation({ summary: 'Delete dictionary admin', description: 'Delete dictionary admin' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }
}
