import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstagramPostRequest {
  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  link!: string;
}
