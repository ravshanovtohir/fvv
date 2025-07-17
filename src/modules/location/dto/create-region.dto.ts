import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ description: 'The name of the region in Uzbek', example: 'Toshkent' })
  @IsNotEmpty()
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'The name of the region in Russian', example: 'Тошкент' })
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'The name of the region in English', example: 'Tashkent' })
  @IsNotEmpty()
  @IsString()
  name_en: string;
}
