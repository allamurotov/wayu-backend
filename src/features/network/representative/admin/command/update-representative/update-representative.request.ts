import { Allow, IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateRepresentativeRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  fullName?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsEmail()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @Length(9, 16)
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  resume?: string;
}
