import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '@/core/enum/enum';

export class GetOneQuestionPublicResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  questions!: string;

  @Expose()
  @ApiProperty({ enum: QuestionStatus })
  status!: QuestionStatus;

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  updatedAt?: string;
}
