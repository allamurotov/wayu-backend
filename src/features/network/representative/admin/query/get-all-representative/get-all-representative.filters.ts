import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllRepresentativeFilters {
  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  size?: number;
}
