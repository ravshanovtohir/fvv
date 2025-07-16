import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FindUserDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from '@decorators';
import { UserRoles } from '@enums';
import { JwtAuthGuard, RolesGuard } from '@guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find all users admin panel', description: 'Find all users admin panel' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query() query: FindUserDto) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one user admin panel', description: 'Find one user admin panel' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
