import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneQuestionResponse } from '@/features/support/questions/admin/query/get-one-question/get-one-question.response';

export class GetOneQuestionQuery extends Query<GetOneQuestionResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
