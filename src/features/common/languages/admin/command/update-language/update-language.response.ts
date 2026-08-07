import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateLanguageResponse {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}
