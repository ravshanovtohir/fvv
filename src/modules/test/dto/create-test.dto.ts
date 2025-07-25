import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray, IsNumber, ValidateNested, IsObject } from 'class-validator';

class AnswerDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
class Test {
  @ApiProperty({ description: 'Savol (uz)', example: 'Poytaxti qayer?', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  question_uz: string;

  @ApiProperty({ description: 'Вопрос (ru)', example: 'Столица где?', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  question_ru: string;

  @ApiProperty({ description: 'Question (en)', example: 'Where is the capital?', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  question_en: string;

  @ApiProperty({
    description: 'Javob variantlari (JSON massiv yoki obyekt)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    required: true,
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers_uz: AnswerDto[];

  @ApiProperty({
    description: 'Javob variantlari (ru)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    required: true,
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers_ru: AnswerDto[];

  @ApiProperty({
    description: 'Javob variantlari (en)',
    example: [
      { key: 'A', value: 'Toshkent' },
      { key: 'B', value: 'Samarqand' },
      { key: 'C', value: 'Buxoro' },
      { key: 'D', value: 'Xiva' },
    ],
    required: true,
    type: Array,
    items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } } },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers_en: AnswerDto[];

  @ApiProperty({ description: 'To‘g‘ri javob kaliti (masalan, A)', example: 'A', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  true_answer: string;

  @ApiProperty({ description: 'Kategoriya ID', example: 1, required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}

export class CreateTestDto {
  @ApiProperty({ description: 'Test', type: [Test], required: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  tests: Test[];
}
