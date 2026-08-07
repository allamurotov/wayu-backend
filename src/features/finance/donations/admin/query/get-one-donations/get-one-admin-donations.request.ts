import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetOneAdminDonationsRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  id!: number;
}
