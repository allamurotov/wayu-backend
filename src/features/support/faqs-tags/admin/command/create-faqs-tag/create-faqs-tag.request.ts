import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFaqsTagRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  faqsId!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  tagId!: number;
}
