import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoryPublicFilters } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.filters';
import { GetAllBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.response';

export class GetAllBookCategoryPublicQuery extends Query<GetAllBookCategoryPublicResponse[]> {
  constructor(public readonly filters: GetAllBookCategoryPublicFilters) {
    super();
  }
}
