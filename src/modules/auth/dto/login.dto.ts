import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true, example: 'login' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ type: String, required: true, example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
