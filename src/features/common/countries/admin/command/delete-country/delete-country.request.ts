import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCountryRequest {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
