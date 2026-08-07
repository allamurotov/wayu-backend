import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllBranchesPublicFilters {
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  size?: number;
}
