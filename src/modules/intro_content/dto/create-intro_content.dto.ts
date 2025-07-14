import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIntroContentDto {
  @ApiProperty({ description: 'Name (uz)', example: 'Name', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'Name (ru)', example: 'Name', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'Name (en)', example: 'Name', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name_en: string;

  @ApiProperty({ description: 'Title (uz)', example: 'Title', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_uz: string;

  @ApiProperty({ description: 'Title (ru)', example: 'Title', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @ApiProperty({ description: 'Title (en)', example: 'Title', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({ description: 'Image', example: 'Image', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  image: string;
}
