import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional({ description: 'Sarlavha', example: 'Yangi xabar' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Xabar matni', example: 'Sizga yangi xabar keldi!' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({ description: 'Turi', example: 'info' })
  @IsOptional()
  @IsString()
  type?: string;
}
