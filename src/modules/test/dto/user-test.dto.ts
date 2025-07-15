import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartUserTestDto {
  @ApiProperty({ type: Number, example: 1, description: 'Category ID' })
  @IsNumber()
  category_id: number;
}

export class NextTestDto {
  @ApiProperty({ type: Number, example: 10, description: 'Session ID' })
  @IsNumber()
  session_id: number;

  @ApiProperty({ type: String, example: 'uz', description: 'Language code (uz, ru, en)' })
  @IsString()
  lang: string;
}

export class AnswerTestDto {
  @ApiProperty({ type: Number, example: 5, description: 'Test ID' })
  @IsNumber()
  test_id: number;

  @ApiProperty({ type: String, example: 'A', description: 'Answer key (A, B, C, D, ...)' })
  @IsString()
  answer: string;
}
