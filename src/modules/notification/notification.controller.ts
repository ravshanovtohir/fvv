import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Notification jo‘natish (barchaga, tanlanganlarga yoki bitta userga)' })
  @ApiBody({ type: CreateNotificationDto })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha notificationlarni olish' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Notificationni ID orqali olish' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Get('static/all')
  @ApiOperation({ summary: 'Statik notificationlarni olish (barchaga yuborilganlar)' })
  getStaticAll() {
    return this.notificationService.getStaticAll();
  }

  @Get('static/user/:userId')
  @ApiOperation({ summary: 'Foydalanuvchiga yuborilgan notificationlarni olish' })
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(+userId);
  }
}
