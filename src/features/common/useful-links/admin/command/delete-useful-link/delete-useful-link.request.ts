import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsefulLinkRequest {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
