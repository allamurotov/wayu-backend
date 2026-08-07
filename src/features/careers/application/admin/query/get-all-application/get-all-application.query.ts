import { Query } from '@nestjs/cqrs';
import { GetAllApplicationResponse } from '@/features/careers/application/admin/query/get-all-application/get-all-application.response';
import { GetAllApplicationFilters } from '@/features/careers/application/admin/query/get-all-application/get-all-application.filters';

export class GetAllApplicationQuery extends Query<GetAllApplicationResponse[]> {
  constructor(public filters: GetAllApplicationFilters) {
    super();
  }
}
