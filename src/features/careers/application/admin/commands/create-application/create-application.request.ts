import { Allow, IsEmail, IsNumber, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateApplicationRequest {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  fullName!: string;

  @IsString()
  @ApiProperty()
  @Length(1, 16)
  phoneNumber!: string;

  @IsEmail()
  @ApiProperty()
  @MaxLength(64)
  email!: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  vacancyId!: number;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  resume!: string;
}
