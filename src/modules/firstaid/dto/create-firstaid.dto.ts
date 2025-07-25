import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateFirstaidDto {
  @ApiProperty({ description: 'Title in Uzbek', example: 'Yordam', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_uz: string;

  @ApiProperty({ description: 'Title in Russian', example: 'Помощь', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @ApiProperty({ description: 'Title in English', example: 'Help', required: true, type: String })
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

  @ApiProperty({ description: 'Image', example: 'https://example.com/image.jpg', required: true, format: 'binary' })
  image: string;
}
