import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto {
  @ApiPropertyOptional({ description: 'Full name', example: 'John Doe', required: false, type: String })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ description: 'Login', example: 'johndoe', required: false, type: String })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional({ description: 'Password', example: 'password123', required: false, type: String })
  @IsOptional()
  @IsString()
  password?: string;
}
