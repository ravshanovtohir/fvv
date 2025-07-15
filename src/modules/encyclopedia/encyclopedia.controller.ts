import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { CreateEncyclopediaDto, UpdateEncyclopediaDto, GetEncyclopediaDto } from './dto';
import { HeadersValidation } from '@decorators';
import { DeviceHeadersDto } from '@enums';
import { ApiOperation } from '@nestjs/swagger';

@Controller('encyclopedia')
export class EncyclopediaController {
  constructor(private readonly encyclopediaService: EncyclopediaService) {}

  @ApiOperation({ summary: 'Find all encyclopedias mobile', description: 'Find all encyclopedias mobile' })
  @Get()
  async findAll(@Query() query: GetEncyclopediaDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.encyclopediaService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Find one encyclopedia mobile', description: 'Find one encyclopedia mobile' })
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.encyclopediaService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all encyclopedias admin', description: 'Find all encyclopedias admin' })
  @Get('admin/encyclopedia')
  async findAllAdmin(@Query() query: GetEncyclopediaDto) {
    return this.encyclopediaService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Find one encyclopedia admin', description: 'Find one encyclopedia admin' })
  @Get('admin/encyclopedia/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.encyclopediaService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create encyclopedia', description: 'Create encyclopedia' })
  @Post()
  async create(@Body() createEncyclopediaDto: CreateEncyclopediaDto) {
    return this.encyclopediaService.create(createEncyclopediaDto);
  }

  @ApiOperation({ summary: 'Update encyclopedia', description: 'Update encyclopedia' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEncyclopediaDto: UpdateEncyclopediaDto) {
    return this.encyclopediaService.update(+id, updateEncyclopediaDto);
  }

  @ApiOperation({ summary: 'Delete encyclopedia', description: 'Delete encyclopedia' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.encyclopediaService.remove(+id);
  }
}
