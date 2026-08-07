import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstagramPostRequest {
  @Allow()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty({ required: false })
  link?: string;
}
