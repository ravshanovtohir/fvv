import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateEncyclopediaDto {
  @ApiPropertyOptional({ description: 'Title in Uzbek', example: 'Mavzu', required: false, type: String })
  @IsOptional()
  @IsString()
  title_uz?: string;

  @ApiPropertyOptional({ description: 'Title in Russian', example: 'Тема', required: false, type: String })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({ description: 'Title in English', example: 'Topic', required: false, type: String })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiPropertyOptional({ description: 'Description in Uzbek', example: 'Izoh', required: false, type: String })
  @IsOptional()
  @IsString()
  description_uz?: string;

  @ApiPropertyOptional({ description: 'Description in Russian', example: 'Описание', required: false, type: String })
  @IsOptional()
  @IsString()
  description_ru?: string;

  @ApiPropertyOptional({ description: 'Description in English', example: 'Description', required: false, type: String })
  @IsOptional()
  @IsString()
  description_en?: string;

  @ApiPropertyOptional({ description: 'Category ID', example: 1, required: false, type: Number })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiPropertyOptional({
    description: 'Image',
    example: 'https://example.com/image.jpg',
    required: true,
    format: 'binary',
  })
  image: string;
}
