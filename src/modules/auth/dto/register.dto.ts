import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'John', description: 'User middle name' })
  @IsString()
  @IsNotEmpty()
  middle_name: string;

  @ApiProperty({ example: '1234567890', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: '1234567890', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
