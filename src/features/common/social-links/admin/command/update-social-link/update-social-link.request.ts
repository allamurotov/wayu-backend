import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSocialLinkRequest {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon?: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  link!: string;
}
