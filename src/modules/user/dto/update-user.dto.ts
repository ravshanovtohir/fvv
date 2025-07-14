import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Ism', example: 'Ali', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Login', example: 'ali123', type: String })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional({ description: 'Telefon raqam', example: '+998901234567', type: String })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
