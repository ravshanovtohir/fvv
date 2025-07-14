import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { CreateFirstaidDto } from './dto/create-firstaid.dto';
import { UpdateFirstaidDto } from './dto/update-firstaid.dto';

@Controller('firstaid')
export class FirstaidController {
  constructor(private readonly firstaidService: FirstaidService) {}

  @Post()
  create(@Body() createFirstaidDto: CreateFirstaidDto) {
    return this.firstaidService.create(createFirstaidDto);
  }

  @Get()
  findAll() {
    return this.firstaidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firstaidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFirstaidDto: UpdateFirstaidDto) {
    return this.firstaidService.update(+id, updateFirstaidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.firstaidService.remove(+id);
  }
}
