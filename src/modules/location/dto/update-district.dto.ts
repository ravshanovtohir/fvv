import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiPropertyOptional({ description: 'The name of the district in Uzbek', example: 'Toshkent' })
  @IsOptional()
  @IsString()
  name_uz: string;

  @ApiPropertyOptional({ description: 'The name of the district in Russian', example: 'Тошкент' })
  @IsOptional()
  @IsString()
  name_ru: string;

  @ApiPropertyOptional({ description: 'The name of the district in English', example: 'Tashkent' })
  @IsOptional()
  @IsString()
  name_en: string;

  @ApiPropertyOptional({ description: 'The id of the region', example: 1 })
  @IsOptional()
  @IsNumber()
  region_id: number;
}
