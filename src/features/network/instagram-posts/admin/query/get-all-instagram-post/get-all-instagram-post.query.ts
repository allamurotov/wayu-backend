import { Query } from '@nestjs/cqrs';
import { GetAllInstagramPostResponse } from './get-all-instagram-post.response';
import { GetAllInstagramPostFilters } from './get-all-instagram-post.filters';

export class GetAllInstagramPostQuery extends Query<GetAllInstagramPostResponse[]> {
  constructor(public readonly filters: GetAllInstagramPostFilters) {
    super();
  }
}
