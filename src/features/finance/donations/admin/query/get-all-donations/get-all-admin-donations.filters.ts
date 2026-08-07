import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllAdminDonationsFilters {
  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  size?: number;

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
