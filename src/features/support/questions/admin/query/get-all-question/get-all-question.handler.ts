import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Questions } from '@/features/support/questions/questions.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionQuery } from '@/features/support/questions/admin/query/get-all-question/get-all-question.query';
import { GetAllQuestionResponse } from '@/features/support/questions/admin/query/get-all-question/get-all-question.response';

@QueryHandler(GetAllQuestionQuery)
export class GetAllQuestionHandler implements IQueryHandler<GetAllQuestionQuery> {
  async execute(query: GetAllQuestionQuery): Promise<GetAllQuestionResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const questions = await Questions.find({ skip, take });
    return plainToInstance(GetAllQuestionResponse, questions, { excludeExtraneousValues: true });
  }
}
