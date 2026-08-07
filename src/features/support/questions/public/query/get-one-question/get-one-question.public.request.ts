import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneQuestionPublicResponse } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.response';

export class GetOneQuestionPublicQuery extends Query<GetOneQuestionPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
