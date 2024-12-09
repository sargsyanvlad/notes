import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  text: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  filePath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  fileStorage?: string;
}
