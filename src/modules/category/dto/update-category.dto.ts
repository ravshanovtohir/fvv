import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Category title in Uzbek',
    example: 'Kategoriya',
    type: String,
  })
  @IsOptional()
  @IsString()
  title_uz?: string;

  @ApiPropertyOptional({
    description: 'Category title in Russian',
    example: 'Категория',
    type: String,
  })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({
    description: 'Category title in English',
    example: 'Category',
    type: String,
  })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiPropertyOptional({
    description: 'Category icon',
    example: 'icon.png',
    type: String,
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
