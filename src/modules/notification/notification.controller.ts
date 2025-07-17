import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto';
import { ApiTags, ApiOperation, ApiBody, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { IRequest } from '@interfaces';
import { Roles } from '@decorators';
import { UserRoles } from '@enums';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Notification jo‘natish (barchaga, tanlanganlarga yoki bitta userga)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post()
  @ApiBody({ type: CreateNotificationDto })
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @ApiOperation({ summary: 'Barcha notificationlarni olish' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @ApiOperation({ summary: 'Notificationni ID orqali olish' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @ApiProperty({ name: 'get static notification for mobile', description: 'get static notification for mobile' })
  @ApiOperation({ summary: 'Static notificationlarni olish (barchaga yuborilganlar)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('static')
  async staticAll(@Req() request: IRequest) {
    return await this.notificationService.getStaticNotification(request.user.id);
  }

  @ApiOperation({ summary: 'Statik notificationlarni olish (barchaga yuborilganlar)' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('static/all')
  getStaticAll() {
    return this.notificationService.getStaticAll();
  }

  @ApiOperation({ summary: 'Foydalanuvchiga yuborilgan notificationlarni olish' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('static/user/:userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(+userId);
  }
}
