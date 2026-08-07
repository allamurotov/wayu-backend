import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Questions } from '@/features/support/questions/questions.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneQuestionPublicQuery } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.request';
import { GetOneQuestionPublicResponse } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.response';

@QueryHandler(GetOneQuestionPublicQuery)
export class GetOneQuestionPublicHandler implements IQueryHandler<GetOneQuestionPublicQuery> {
  async execute(query: GetOneQuestionPublicQuery): Promise<GetOneQuestionPublicResponse> {
    const question = await Questions.findOneBy({ id: query.id });

    if (!question) throw new NotFoundException('Question with given id not found');

    return plainToInstance(GetOneQuestionPublicResponse, question, { excludeExtraneousValues: true });
  }
}
