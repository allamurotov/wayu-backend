import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Events } from '@/features/event/event/events.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllEventPublicQuery } from '@/features/event/event/public/query/get-all-event/get-all-event.public.query';
import { GetAllEventPublicResponse } from '@/features/event/event/public/query/get-all-event/get-all-event.public.response';

@QueryHandler(GetAllEventPublicQuery)
export class GetAllEventPublicHandler implements IQueryHandler<GetAllEventPublicQuery> {
  async execute(query: GetAllEventPublicQuery): Promise<GetAllEventPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const events = await Events.find({ skip: skip, take: take });
    return plainToInstance(GetAllEventPublicResponse, events, { excludeExtraneousValues: true });
  }
}
