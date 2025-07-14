import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ description: 'Full name', example: 'John Doe', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'Login', example: 'johndoe', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'Password', example: 'password123', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
