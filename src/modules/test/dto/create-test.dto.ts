import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsObject } from 'class-validator';

export class CreateTestDto {
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
  @IsObject({ each: true })
  asnwers: Array<{ key: string; value: string }>;

  @ApiProperty({ description: 'To‘g‘ri javob kaliti (masalan, A)', example: 'A', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  true_answer: string;
}
