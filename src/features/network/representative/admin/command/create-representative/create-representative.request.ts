import { Allow, IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepresentativeRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @IsEmail()
  @MaxLength(64)
  @ApiProperty()
  email!: string;

  @IsString()
  @Length(9, 16)
  @ApiProperty()
  phoneNumber!: string;

  @IsString()
  @ApiProperty()
  resume!: string;
}
