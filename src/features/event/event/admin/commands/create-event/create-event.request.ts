import { Allow, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
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
