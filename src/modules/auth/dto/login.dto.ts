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

export class LoginMobileDto {
  @ApiProperty({ type: String, required: true, example: 'phone_number' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ type: String, required: true, example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
