import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateDictionaryDto {
  @ApiProperty({ description: 'Prefix', example: 'A', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  prefix: string;

  @ApiProperty({ description: 'Title in Uzbek', example: 'Soz', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_uz: string;

  @ApiProperty({ description: 'Title in Russian', example: 'Слово', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @ApiProperty({ description: 'Title in English', example: 'Word', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({ description: 'Description in Uzbek', example: 'Izoh', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  description_uz: string;

  @ApiProperty({ description: 'Description in Russian', example: 'Описание', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  description_ru: string;

  @ApiProperty({ description: 'Description in English', example: 'Description', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  description_en: string;

  @ApiProperty({ description: 'Category ID', example: 1, required: true, type: Number })
  @IsNotEmpty()
  @IsInt()
  category_id: number;
}
