import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateIntroContentDto } from './create-intro_content.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIntroContentDto {
  @ApiPropertyOptional({ description: 'Name (uz)', example: 'Name', type: String })
  @IsOptional()
  @IsString()
  name_uz?: string;

  @ApiPropertyOptional({ description: 'Name (ru)', example: 'Name', type: String })
  @IsOptional()
  @IsString()
  name_ru?: string;

  @ApiPropertyOptional({ description: 'Name (en)', example: 'Name', type: String })
  @IsOptional()
  @IsString()
  name_en?: string;

  @ApiPropertyOptional({ description: 'Title (uz)', example: 'Title', type: String })
  @IsOptional()
  @IsString()
  title_uz?: string;

  @ApiPropertyOptional({ description: 'Title (ru)', example: 'Title', type: String })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiPropertyOptional({ description: 'Title (en)', example: 'Title', type: String })
  @IsOptional()
  @IsString()
  title_en?: string;

  @ApiPropertyOptional({ description: 'Image', example: 'Image', type: String })
  @IsOptional()
  @IsString()
  image?: string;
}
