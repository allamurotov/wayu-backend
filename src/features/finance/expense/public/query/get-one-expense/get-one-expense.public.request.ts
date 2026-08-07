import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetOneExpensePublicRequest {
  @IsString()
  @ApiProperty()
  @Type(() => Number)
  id!: number;
}
