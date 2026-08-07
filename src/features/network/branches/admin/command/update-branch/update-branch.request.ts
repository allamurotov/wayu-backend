import { IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBranchRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  countryId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  representativeId?: number;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  longitude?: number;

  @IsString()
  @Length(9, 16)
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;
}
