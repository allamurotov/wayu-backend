import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.response';
import { GetAllUsefulLinkPublicFilters } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.filters';

export class GetAllUsefulLinkPublicQuery extends Query<GetAllUsefulLinkPublicResponse[]> {
  constructor(public readonly filters: GetAllUsefulLinkPublicFilters) {
    super();
  }
}
