import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
