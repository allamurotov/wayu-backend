import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageRequest {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
