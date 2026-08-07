import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Events } from '@/features/event/event/events.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneEventPublicQuery } from '@/features/event/event/public/query/get-one-event/get-one-event.public.request';
import { GetOneEventPublicResponse } from '@/features/event/event/public/query/get-one-event/get-one-event.public.response';

@QueryHandler(GetOneEventPublicQuery)
export class GetOneEventPublicHandler implements IQueryHandler<GetOneEventPublicQuery> {
  async execute(query: GetOneEventPublicQuery): Promise<GetOneEventPublicResponse> {
    const event = await Events.findOneBy({ id: query.id });
    if (!event) throw new NotFoundException('Event with given id not found');
    return plainToInstance(GetOneEventPublicResponse, event, { excludeExtraneousValues: true });
  }
}
