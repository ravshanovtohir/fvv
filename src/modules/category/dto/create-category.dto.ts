import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category type',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  type: number;

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
  // @IsNotEmpty()
  // @IsString()
  icon: string; // Fayl yuklash bo'lsa, bu yerda fayl nomi yoki URL saqlanadi
}
