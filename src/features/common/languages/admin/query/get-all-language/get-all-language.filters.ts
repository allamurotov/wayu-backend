import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllLanguageFilters {
  @IsInt()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsInt()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  size?: number;
}
