import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto, GetMapsDto, UpdateMapDto } from './dto';
import { GEOJSON_TYPE_OPTIONS } from '@constants';
import { ApiOperation } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @ApiOperation({ summary: 'Get all maps' })
  @Get()
  async findAll(@Query() query: GetMapsDto) {
    return this.mapService.findAll(query);
  }

  @ApiOperation({ summary: 'Get geojson type' })
  @Get('geojson-type')
  async getGeojsonType() {
    return GEOJSON_TYPE_OPTIONS;
  }

  @ApiOperation({ summary: 'Get one map' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mapService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create map' })
  @Post()
  async create(@Body() createMapDto: CreateMapDto) {
    return this.mapService.create(createMapDto);
  }

  @ApiOperation({ summary: 'Update map' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapService.update(+id, updateMapDto);
  }

  @ApiOperation({ summary: 'Delete map' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mapService.remove(+id);
  }
}
