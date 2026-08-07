import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookCategoryRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;
}
