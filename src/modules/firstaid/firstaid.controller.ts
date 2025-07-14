import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { CreateFirstaidDto, UpdateFirstaidDto, GetFirstaidDto } from './dto';

@Controller('firstaid')
export class FirstaidController {
  constructor(private readonly firstaidService: FirstaidService) {}

  @Get()
  async findAll(@Query() query: GetFirstaidDto) {
    return this.firstaidService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.firstaidService.findOne(+id);
  }

  @Post()
  async create(@Body() createFirstaidDto: CreateFirstaidDto) {
    return this.firstaidService.create(createFirstaidDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFirstaidDto: UpdateFirstaidDto) {
    return this.firstaidService.update(+id, updateFirstaidDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.firstaidService.remove(+id);
  }
}
