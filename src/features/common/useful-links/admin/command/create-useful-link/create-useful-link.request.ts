import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsefulLinkRequest {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  link!: string;
}
