import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinkResponse } from '@/features/common/social-links/admin/query/get-all-social-link/get-all-social-link.response';
import { GetAllSocialLinkFilters } from '@/features/common/social-links/admin/query/get-all-social-link/get-all-social-link.filters';

export class GetAllSocialLinkQuery extends Query<GetAllSocialLinkResponse[]> {
  constructor(public readonly filters: GetAllSocialLinkFilters) {
    super();
  }
}
