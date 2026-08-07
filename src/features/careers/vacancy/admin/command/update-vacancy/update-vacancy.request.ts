import { IsBoolean, IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyType } from '@/core/enum/enum';
import { Transform } from 'class-transformer';

export class UpdateVacancyRequest {
  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty({ required: false })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @Length(9, 16)
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @IsEnum(VacancyType)
  @IsOptional()
  @ApiProperty({ enum: VacancyType, required: false })
  type?: VacancyType;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  salary?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean;
}
