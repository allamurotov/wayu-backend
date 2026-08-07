import { Query } from '@nestjs/cqrs';
import { GetAllAuthorPublicResponse } from '@/features/library/author/public/query/get-all-author/get-all-author.public.response';
import { GetAllAuthorPublicFilters } from '@/features/library/author/public/query/get-all-author/get-all-author.public.filters';

export class GetAllAuthorPublicQuery extends Query<GetAllAuthorPublicResponse[]> {
  constructor(public readonly filters: GetAllAuthorPublicFilters) {
    super();
  }
}
