import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreateNewsTagResponse {
  @Expose()
  @ApiProperty()
  newsId!: number;

  @Expose()
  @ApiProperty()
  tagId!: number;
}
