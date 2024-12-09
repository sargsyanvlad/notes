import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  password: string;
}
