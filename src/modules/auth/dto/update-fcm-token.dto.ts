import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFcmTokenDto {
  @ApiProperty({ type: String, required: true, example: 'fcm_token' })
  @IsNotEmpty()
  @IsString()
  fcm_token: string;
}
