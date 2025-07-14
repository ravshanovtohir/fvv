import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { CreateEncyclopediaDto } from './dto/create-encyclopedia.dto';
import { UpdateEncyclopediaDto } from './dto/update-encyclopedia.dto';

@Controller('encyclopedia')
export class EncyclopediaController {
  constructor(private readonly encyclopediaService: EncyclopediaService) {}

  @Post()
  create(@Body() createEncyclopediaDto: CreateEncyclopediaDto) {
    return this.encyclopediaService.create(createEncyclopediaDto);
  }

  @Get()
  findAll() {
    return this.encyclopediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encyclopediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncyclopediaDto: UpdateEncyclopediaDto) {
    return this.encyclopediaService.update(+id, updateEncyclopediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encyclopediaService.remove(+id);
  }
}
