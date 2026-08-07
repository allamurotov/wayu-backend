import { IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '@/core/enum/enum';

export class UpdateQuestionRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  fullName?: string;

  @IsString()
  @Length(9, 16)
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  @ApiProperty({ required: false })
  questions?: string;

  @IsEnum(QuestionStatus)
  @IsOptional()
  @ApiProperty({ enum: QuestionStatus, required: false })
  status?: QuestionStatus;
}
