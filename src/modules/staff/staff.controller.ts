import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto, GetStaffDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from '@decorators';
import { UserRoles } from '@enums';
import { JwtAuthGuard, RolesGuard } from '@guards';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Find all staff admin panel', description: 'Find all staff admin panel' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get()
  async findAll(@Query() query: GetStaffDto) {
    return this.staffService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one staff admin panel', description: 'Find one staff admin panel' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create staff admin panel', description: 'Create staff admin panel' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: 'Update staff admin panel', description: 'Update staff admin panel' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({ summary: 'Delete staff admin panel', description: 'Delete staff admin panel' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
