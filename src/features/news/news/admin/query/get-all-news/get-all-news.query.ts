import { Query } from '@nestjs/cqrs';
import { GetAllNewsResponse } from '@/features/news/news/admin/query/get-all-news/get-all-news.response';
import { GetAllNewsFilters } from '@/features/news/news/admin/query/get-all-news/get-all-news.filters';

export class GetAllNewsQuery extends Query<GetAllNewsResponse[]> {
  constructor(public readonly filters: GetAllNewsFilters) {
    super();
  }
}
