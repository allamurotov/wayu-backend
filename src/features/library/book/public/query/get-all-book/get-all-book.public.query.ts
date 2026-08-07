import { Query } from '@nestjs/cqrs';
import { GetAllBookPublicFilters } from '@/features/library/book/public/query/get-all-book/get-all-book.public.filters';
import { GetAllBookPublicResponse } from '@/features/library/book/public/query/get-all-book/get-all-book.public.response';

export class GetAllBookPublicQuery extends Query<GetAllBookPublicResponse[]> {
  constructor(public readonly filters: GetAllBookPublicFilters) {
    super();
  }
}
