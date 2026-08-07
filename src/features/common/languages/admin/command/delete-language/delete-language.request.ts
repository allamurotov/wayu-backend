import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteLanguageRequest {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
