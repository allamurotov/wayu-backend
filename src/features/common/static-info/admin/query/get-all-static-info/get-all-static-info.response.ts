import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllStaticInfoResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

  @Expose()
  @ApiProperty()
  appStoreLink?: string;

  @Expose()
  @ApiProperty()
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  updatedAt?: string;
}
