import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNewsRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  countryId?: number;

  @IsString()
  @ApiProperty()
  @MaxLength(256)
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @IsString()
  @ApiProperty()
  date!: string;

  @IsString()
  @ApiProperty()
  content!: string;
}
