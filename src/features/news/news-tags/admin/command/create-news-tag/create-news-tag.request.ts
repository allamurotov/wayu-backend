import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNewsTagRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  newsId!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  tagId!: number;
}
