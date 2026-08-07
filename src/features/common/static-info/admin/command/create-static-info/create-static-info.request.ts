import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaticInfoRequest {
  @IsString()
  @ApiProperty()
  aboutUs!: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty({ required: false })
  appStoreLink?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty({ required: false })
  playMarketLink?: string;
}
