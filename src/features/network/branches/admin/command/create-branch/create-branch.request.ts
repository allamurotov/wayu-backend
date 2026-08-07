import { IsNumber, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBranchRequest {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  countryId!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  representativeId!: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  city!: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  latitude!: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  longitude!: number;

  @IsString()
  @Length(9, 16)
  @ApiProperty()
  phoneNumber!: string;
}
