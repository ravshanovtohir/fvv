import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiPropertyOptional({ description: 'The name of the region in Uzbek', example: 'Toshkent' })
  @IsOptional()
  @IsString()
  name_uz: string;

  @ApiPropertyOptional({ description: 'The name of the region in Russian', example: 'Тошкент' })
  @IsOptional()
  @IsString()
  name_ru: string;

  @ApiPropertyOptional({ description: 'The name of the region in English', example: 'Tashkent' })
  @IsOptional()
  @IsString()
  name_en: string;
}
