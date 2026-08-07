import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  authorId!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @ApiProperty()
  @MaxLength(256)
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  file!: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  pages!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  year!: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;
}
