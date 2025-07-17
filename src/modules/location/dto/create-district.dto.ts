import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ description: 'The name of the district in Uzbek', example: 'Toshkent' })
  @IsNotEmpty()
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'The name of the district in Russian', example: 'Тошкент' })
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'The name of the district in English', example: 'Tashkent' })
  @IsNotEmpty()
  @IsString()
  name_en: string;

  @ApiProperty({ description: 'The id of the region', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;
}
