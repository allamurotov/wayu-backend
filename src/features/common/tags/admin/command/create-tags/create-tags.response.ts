import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTagsResponse {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id!: number;

  @IsString()
  @Expose()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}
