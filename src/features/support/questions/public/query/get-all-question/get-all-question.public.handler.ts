import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Questions } from '@/features/support/questions/questions.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionPublicQuery } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.query';
import { GetAllQuestionPublicResponse } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.response';

@QueryHandler(GetAllQuestionPublicQuery)
export class GetAllQuestionPublicHandler implements IQueryHandler<GetAllQuestionPublicQuery> {
  async execute(query: GetAllQuestionPublicQuery): Promise<GetAllQuestionPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const questions = await Questions.find({ skip, take });
    return plainToInstance(GetAllQuestionPublicResponse, questions, { excludeExtraneousValues: true });
  }
}
