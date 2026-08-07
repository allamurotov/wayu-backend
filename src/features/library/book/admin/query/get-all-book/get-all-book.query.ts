import { Query } from '@nestjs/cqrs';
import { GetAllBookResponse } from '@/features/library/book/admin/query/get-all-book/get-all-book.response';
import { GetAllBookFilters } from '@/features/library/book/admin/query/get-all-book/get-all-book.filters';

export class GetAllBookQuery extends Query<GetAllBookResponse[]> {
  constructor(public filters: GetAllBookFilters) {
    super();
  }
}
