import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventQuery } from '@/features/event/event/admin/query/get-all-event/get-all-event.query';
import { GetAllEventResponse } from '@/features/event/event/admin/query/get-all-event/get-all-event.response';
import { Events } from '@/features/event/event/events.entity';

@QueryHandler(GetAllEventQuery)
export class GetAllEventHandler implements IQueryHandler<GetAllEventQuery> {
  async execute(query: GetAllEventQuery): Promise<GetAllEventResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const events = await Events.find({
      skip,
      take,
      relations: ['category'],
    });
    return plainToInstance(GetAllEventResponse, events, { excludeExtraneousValues: true });
  }
}
