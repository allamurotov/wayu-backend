import { GetAllNewsCategoryResponse } from '@/features/news/news-category/admin/query/get-all-news-category/get-all-news-category.response';
import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoryFilters } from '@/features/news/news-category/admin/query/get-all-news-category/get-all-news-category.filters';
import { GetAllTagsResponse } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.response';
import { GetAllTagsFilters } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.filters';

export class GetAllTagsQuery extends Query<GetAllTagsResponse[]> {
  constructor(public readonly filters: GetAllTagsFilters) {
    super();
  }
}
