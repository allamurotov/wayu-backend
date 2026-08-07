import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoResponse } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.response';
import { GetAllStaticInfoFilters } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.filters';

export class GetAllStaticInfoQuery extends Query<GetAllStaticInfoResponse[]> {
  constructor(public readonly filters: GetAllStaticInfoFilters) {
    super();
  }
}
