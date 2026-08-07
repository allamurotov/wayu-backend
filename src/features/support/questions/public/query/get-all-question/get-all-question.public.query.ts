import { Query } from '@nestjs/cqrs';
import { GetAllQuestionPublicResponse } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.response';
import { GetAllQuestionPublicFilters } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.filters';

export class GetAllQuestionPublicQuery extends Query<GetAllQuestionPublicResponse[]> {
  constructor(public readonly filters: GetAllQuestionPublicFilters) {
    super();
  }
}
