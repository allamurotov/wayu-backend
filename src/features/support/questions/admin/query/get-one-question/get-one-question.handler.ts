import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneQuestionQuery } from '@/features/support/questions/admin/query/get-one-question/get-one-question.request';
import { GetOneQuestionResponse } from '@/features/support/questions/admin/query/get-one-question/get-one-question.response';
import { Questions } from '@/features/support/questions/questions.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneQuestionQuery)
export class GetOneQuestionHandler implements IQueryHandler<GetOneQuestionQuery> {
  async execute(query: GetOneQuestionQuery): Promise<GetOneQuestionResponse> {
    const question = await Questions.findOneBy({ id: query.id });

    if (!question) throw new NotFoundException('Question with given id not found');

    return plainToInstance(GetOneQuestionResponse, question, { excludeExtraneousValues: true });
  }
}
