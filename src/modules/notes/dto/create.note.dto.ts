import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  text: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  title: string;
}
