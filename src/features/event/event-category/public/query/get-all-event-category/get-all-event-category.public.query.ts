import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoryPublicResponse } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.response';
import { GetAllEventCategoryPublicFilters } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.filters';

export class GetAllEventCategoryPublicQuery extends Query<GetAllEventCategoryPublicResponse[]> {
  constructor(public filters: GetAllEventCategoryPublicFilters) {
    super();
  }
}
