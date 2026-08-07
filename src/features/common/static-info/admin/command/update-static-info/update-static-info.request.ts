import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaticInfoRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  aboutUs?: string;

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
