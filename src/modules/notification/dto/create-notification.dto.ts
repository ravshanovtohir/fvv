import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export enum NotificationSendType {
  ALL = 'all',
  SELECTED = 'selected',
  ONE = 'one',
}

export class CreateNotificationDto {
  @ApiProperty({ description: 'Sarlavha', example: 'Yangi xabar', required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Xabar matni', example: 'Sizga yangi xabar keldi!', required: true })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ description: 'Turi', example: 'info', required: true })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Qaysi userlarga yuboriladi', enum: NotificationSendType, required: true })
  @IsNotEmpty()
  @IsEnum(NotificationSendType)
  send_to: NotificationSendType;

  @ApiPropertyOptional({ description: 'User IDlar (faqat selected yoki one uchun)', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  user_ids?: number[];
}
