import { Query } from '@nestjs/cqrs';
import { GetAllEventResponse } from '@/features/event/event/admin/query/get-all-event/get-all-event.response';
import { GetAllEventFilters } from '@/features/event/event/admin/query/get-all-event/get-all-event.filters';

export class GetAllEventQuery extends Query<GetAllEventResponse[]> {
  constructor(public readonly filters: GetAllEventFilters) {
    super();
  }
}
