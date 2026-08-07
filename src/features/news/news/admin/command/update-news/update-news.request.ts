import { Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNewsRequest {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  title?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  date?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  content?: string;
}
