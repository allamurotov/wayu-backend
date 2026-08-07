import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTagsRequest {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
