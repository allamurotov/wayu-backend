import { Query } from '@nestjs/cqrs';
import { GetAllTagsPublicResponse } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.response';
import { GetAllTagsPublicFilters } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.filters';

export class GetAllTagsPublicQuery extends Query<GetAllTagsPublicResponse[]> {
  constructor(public readonly filters: GetAllTagsPublicFilters) {
    super();
  }
}
