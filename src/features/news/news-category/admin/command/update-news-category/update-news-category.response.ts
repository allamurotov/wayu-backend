import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateNewsCategoryResponse {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}
