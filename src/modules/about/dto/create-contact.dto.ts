import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'Sarlavha (uz)', example: 'Tez Tibbiy yordam', required: true })
  @IsNotEmpty()
  @IsString()
  title_uz: string;

  @ApiPropertyOptional({ description: 'Sarlavha (ru)', example: 'Быстрая медицинская помощь' })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({ description: 'Sarlavha (en)', example: 'Fast medical help' })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiProperty({ description: 'Telefon raqam', example: '101', required: true })
  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
