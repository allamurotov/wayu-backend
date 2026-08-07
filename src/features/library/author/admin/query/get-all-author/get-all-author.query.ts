import { Query } from '@nestjs/cqrs';
import { GetAllAuthorResponse } from '@/features/library/author/admin/query/get-all-author/get-all-author.response';
import { GetAllAuthorFilters } from '@/features/library/author/admin/query/get-all-author/get-all-author.filters';

export class GetAllAuthorQuery extends Query<GetAllAuthorResponse[]> {
  constructor(public readonly filters: GetAllAuthorFilters) {
    super();
  }
}
