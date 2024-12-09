import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  password: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;
}
