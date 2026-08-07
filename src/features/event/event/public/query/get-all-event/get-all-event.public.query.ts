import { Query } from '@nestjs/cqrs';
import { GetAllEventPublicResponse } from '@/features/event/event/public/query/get-all-event/get-all-event.public.response';
import { GetAllEventPublicFilters } from '@/features/event/event/public/query/get-all-event/get-all-event.public.filters';

export class GetAllEventPublicQuery extends Query<GetAllEventPublicResponse[]> {
  constructor(public filters: GetAllEventPublicFilters) {
    super();
  }
}
