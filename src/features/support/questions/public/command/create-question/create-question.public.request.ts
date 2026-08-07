import { IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionPublicRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @IsString()
  @Length(9, 16)
  @ApiProperty()
  phoneNumber!: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @MaxLength(2000)
  @ApiProperty()
  questions!: string;
}
