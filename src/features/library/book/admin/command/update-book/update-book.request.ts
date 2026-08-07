import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBookRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  authorId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  categoryId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(256)
  title?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  pages?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  year?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;
}
