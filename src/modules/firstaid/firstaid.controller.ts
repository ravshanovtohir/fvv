import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { CreateFirstaidDto, UpdateFirstaidDto, GetFirstaidDto } from './dto';
import { HeadersValidation } from '@decorators';
import { DeviceHeadersDto } from '@enums';
import { ApiOperation } from '@nestjs/swagger';

@Controller('firstaid')
export class FirstaidController {
  constructor(private readonly firstaidService: FirstaidService) {}

  @ApiOperation({ summary: 'Find all firstaids mobile', description: 'Find all firstaids mobile' })
  @Get()
  async findAll(@Query() query: GetFirstaidDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.firstaidService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Find one firstaid mobile', description: 'Find one firstaid mobile' })
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.firstaidService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all firstaids admin', description: 'Find all firstaids admin' })
  @Get('admin/firstaid')
  async findAllAdmin(@Query() query: GetFirstaidDto) {
    return this.firstaidService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Find one firstaid admin', description: 'Find one firstaid admin' })
  @Get('admin/firstaid/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.firstaidService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create firstaid', description: 'Create firstaid' })
  @Post()
  async create(@Body() createFirstaidDto: CreateFirstaidDto) {
    return this.firstaidService.create(createFirstaidDto);
  }

  @ApiOperation({ summary: 'Update firstaid', description: 'Update firstaid' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFirstaidDto: UpdateFirstaidDto) {
    return this.firstaidService.update(+id, updateFirstaidDto);
  }

  @ApiOperation({ summary: 'Delete firstaid', description: 'Delete firstaid' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.firstaidService.remove(+id);
  }
}
