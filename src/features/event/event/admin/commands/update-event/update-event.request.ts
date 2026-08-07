import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEventRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  categoryId?: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  date?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  content?: string;
}
