import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category title in Uzbek',
    example: 'Kategoriya',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title_uz: string;

  @ApiProperty({
    description: 'Category title in Russian',
    example: 'Категория',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @ApiProperty({
    description: 'Category title in English',
    example: 'Category',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({
    description: 'Category icon',
    example: 'icon.png',
    required: true,
    type: String,
    format: 'binary',
  })
  @IsNotEmpty()
  @IsString()
  icon: string; // Fayl yuklash bo'lsa, bu yerda fayl nomi yoki URL saqlanadi
}
