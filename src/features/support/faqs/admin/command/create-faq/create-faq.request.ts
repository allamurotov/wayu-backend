import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqRequest {
  @IsString()
  @ApiProperty()
  @MaxLength(256)
  question!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(512)
  answer!: string;
}
