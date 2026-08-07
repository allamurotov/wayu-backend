import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeleteLanguageResponse {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}
