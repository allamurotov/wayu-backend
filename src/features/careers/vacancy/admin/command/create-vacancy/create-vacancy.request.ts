import { IsBoolean, IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyType } from '@/core/enum/enum';
import { Transform } from 'class-transformer';

export class CreateVacancyRequest {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  address!: string;

  @IsString()
  @ApiProperty()
  description!: string;

  @IsString()
  @Length(9, 16)
  @ApiProperty()
  phoneNumber!: string;

  @IsEnum(VacancyType)
  @ApiProperty()
  type!: VacancyType;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  salary!: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  isActive?: boolean = true;
}
