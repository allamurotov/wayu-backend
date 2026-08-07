import { Query } from '@nestjs/cqrs';
import { GetAllApplicationPublicResponse } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.response';
import { GetAllApplicationPublicFilters } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.filters';

export class GetAllApplicationPublicQuery extends Query<GetAllApplicationPublicResponse[]> {
  constructor(public filters: GetAllApplicationPublicFilters) {
    super();
  }
}
