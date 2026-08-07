import { Allow, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '@/core/enum/enum';

export class UpdateApplicationRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(64)
  fullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Length(1, 16)
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(64)
  email?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  vacancyId?: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  resume?: string;

  @IsEnum(ApplicationStatus)
  @IsOptional()
  @ApiProperty({ enum: ApplicationStatus, required: false })
  status?: ApplicationStatus;
}
