import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllNewsCategoryPublicFilters {
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  size?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  page?: number;
}
