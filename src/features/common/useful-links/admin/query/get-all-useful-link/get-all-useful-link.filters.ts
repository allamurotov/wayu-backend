import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllUsefulLinkFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  page?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  size?: number;
}
