import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoryResponse } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.response';
import { GetAllBookCategoryFilters } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.filters';

export class GetAllBookCategoryQuery extends Query<GetAllBookCategoryResponse[]> {
  constructor(public readonly filters: GetAllBookCategoryFilters) {
    super();
  }
}
