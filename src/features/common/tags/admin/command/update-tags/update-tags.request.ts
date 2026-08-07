import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateTagsRequest {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title?: string;
}
