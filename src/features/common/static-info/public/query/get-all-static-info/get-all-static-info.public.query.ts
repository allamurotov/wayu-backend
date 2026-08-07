import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.response';
import { GetAllStaticInfoPublicFilters } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.filters';

export class GetAllStaticInfoPublicQuery extends Query<GetAllStaticInfoPublicResponse[]> {
  constructor(public filters: GetAllStaticInfoPublicFilters) {
    super();
  }
}
