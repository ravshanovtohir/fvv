import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Ism', example: 'Ali', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Login', example: 'ali123', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'Telefon raqam', example: '+998901234567', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
