import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.response';
import { GetAllUsefulLinkFilters } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.filters';

export class GetAllUsefulLinkQuery extends Query<GetAllUsefulLinkResponse[]> {
  constructor(public readonly filters: GetAllUsefulLinkFilters) {
    super();
  }
}
