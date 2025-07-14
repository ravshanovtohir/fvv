import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiPropertyOptional({ description: 'Sarlavha (uz)', example: 'Tez Tibbiy yordam' })
  @IsOptional()
  @IsString()
  title_uz?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (ru)', example: 'Быстрая медицинская помощь' })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (en)', example: 'Fast medical help' })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiPropertyOptional({ description: 'Telefon raqam', example: '101' })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
