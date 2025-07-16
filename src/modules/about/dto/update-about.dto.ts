import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAboutDto {
  @ApiPropertyOptional({ description: 'Nomi (uz)', example: 'Biz haqimizda' })
  @IsOptional()
  @IsString()
  name_uz?: string;

  @ApiPropertyOptional({ description: 'Nomi (ru)', example: 'О нас' })
  @IsOptional()
  @IsString()
  name_ru?: string;

  @ApiPropertyOptional({ description: 'Nomi (en)', example: 'About us' })
  @IsOptional()
  @IsString()
  name_en?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (uz)', example: 'Biz haqimizda sarlavha' })
  @IsOptional()
  @IsString()
  title_uz?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (ru)', example: 'О нас заголовок' })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (en)', example: 'About us title' })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiPropertyOptional({ description: 'Rasm', example: 'about.png' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Telefon raqam', example: '+998901234567' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({ description: 'Manzil (uz)', example: 'Toshkent' })
  @IsOptional()
  @IsString()
  address_uz?: string;

  @ApiPropertyOptional({ description: 'Manzil (ru)', example: 'Ташкент' })
  @IsOptional()
  @IsString()
  address_ru?: string;

  @ApiPropertyOptional({ description: 'Manzil (en)', example: 'Tashkent' })
  @IsOptional()
  @IsString()
  address_en?: string;

  @ApiPropertyOptional({ description: 'Email', example: 'info@example.com ' })
  @IsOptional()
  @IsString()
  email?: string;
}
