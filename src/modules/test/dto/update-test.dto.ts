import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsObject, IsNumber } from 'class-validator';

export class UpdateTestDto {
  @ApiPropertyOptional({ description: 'Savol (uz)', example: 'Poytaxti qayer?', type: String })
  @IsOptional()
  @IsString()
  question_uz?: string;

  @ApiPropertyOptional({ description: 'Вопрос (ru)', example: 'Столица где?', type: String })
  @IsOptional()
  @IsString()
  question_ru?: string;

  @ApiPropertyOptional({ description: 'Question (en)', example: 'Where is the capital?', type: String })
  @IsOptional()
  @IsString()
  question_en?: string;

  @ApiPropertyOptional({
    description: 'Javob variantlari (JSON massiv yoki obyekt)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  answers_uz?: Array<{ key: string; value: string }>;

  @ApiPropertyOptional({
    description: 'Javob variantlari (ru)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  answers_ru?: Array<{ key: string; value: string }>;

  @ApiPropertyOptional({
    description: 'Javob variantlari (en)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  answers_en?: Array<{ key: string; value: string }>;

  @ApiPropertyOptional({ description: 'To‘g‘ri javob kaliti (masalan, A)', example: 'A', type: String })
  @IsOptional()
  @IsString()
  true_answer?: string;

  @ApiPropertyOptional({ description: 'Kategoriya ID', example: 1, type: Number })
  @IsOptional()
  @IsNumber()
  category_id?: number;
}
