import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoryResponse } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.response';
import { GetAllEventCategoryFilters } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.filters';

export class GetAllEventCategoryQuery extends Query<GetAllEventCategoryResponse[]> {
  constructor(public readonly filters: GetAllEventCategoryFilters) {
    super();
  }
}
