import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.response';
import { GetAllSocialLinkPublicFilters } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.filters';

export class GetAllSocialLinkPublicQuery extends Query<GetAllSocialLinkPublicResponse[]> {
  constructor(public filters: GetAllSocialLinkPublicFilters) {
    super();
  }
}
