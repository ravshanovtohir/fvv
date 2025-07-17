import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateRegionDto, CreateDistrictDto, UpdateRegionDto, UpdateDistrictDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { HeadersValidation, Roles } from '@decorators';
import { DeviceHeadersDto, UserRoles } from '@enums';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Get all regions mobile' })
  @Get('region')
  async findAllRegionsPublic(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.locationService.findAllRegion(headers.lang);
  }

  @ApiOperation({ summary: 'Get all districts mobile' })
  @Get('district')
  async findAllDistrictsPublic(@HeadersValidation() headers: DeviceHeadersDto, @Query('region_id') region_id: number) {
    return this.locationService.findAllDistrict(region_id, headers.lang);
  }

  @ApiOperation({ summary: 'Get all regions admin' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/region')
  async findAllRegions() {
    return this.locationService.findAllRegions();
  }

  @ApiOperation({ summary: 'Get all districts admin' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/district')
  async findAllDistricts() {
    return this.locationService.findAllDistricts();
  }

  @ApiOperation({ summary: 'Get a region by id admin' })
  @Get('admin/region/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async findOneRegion(@Param('id') id: string) {
    return this.locationService.findOneRegion(+id);
  }

  @ApiOperation({ summary: 'Get a district by id admin' })
  @Get('district/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async findOneDistrict(@Param('id') id: string) {
    return this.locationService.findOneDistrict(+id);
  }

  @ApiOperation({ summary: 'Create a region admin' })
  @Post('region')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async createRegion(@Body() data: CreateRegionDto) {
    return this.locationService.createRegion(data);
  }

  @ApiOperation({ summary: 'Create a district admin' })
  @Post('district')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async createDistrict(@Body() data: CreateDistrictDto) {
    return this.locationService.createDistrict(data);
  }

  @ApiOperation({ summary: 'Update a region admin' })
  @Patch('region/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async updateRegion(@Param('id') id: string, @Body() data: UpdateRegionDto) {
    return this.locationService.updateRegion(+id, data);
  }

  @ApiOperation({ summary: 'Update a district admin' })
  @Patch('district/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async updateDistrict(@Param('id') id: string, @Body() data: UpdateDistrictDto) {
    return this.locationService.updateDistrict(+id, data);
  }

  @ApiOperation({ summary: 'Delete a region admin' })
  @Delete('region/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async removeRegion(@Param('id') id: string) {
    return this.locationService.removeRegion(+id);
  }

  @ApiOperation({ summary: 'Delete a district admin' })
  @Delete('district/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  async removeDistrict(@Param('id') id: string) {
    return this.locationService.removeDistrict(+id);
  }
}
