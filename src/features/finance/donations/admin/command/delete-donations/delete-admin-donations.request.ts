import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteAdminDonationsRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  id!: number;
}
