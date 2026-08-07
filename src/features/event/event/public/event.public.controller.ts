import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllEventPublicResponse } from '@/features/event/event/public/query/get-all-event/get-all-event.public.response';
import { GetAllEventPublicFilters } from '@/features/event/event/public/query/get-all-event/get-all-event.public.filters';
import { GetAllEventPublicQuery } from '@/features/event/event/public/query/get-all-event/get-all-event.public.query';
import { GetOneEventPublicResponse } from '@/features/event/event/public/query/get-one-event/get-one-event.public.response';
import { GetOneEventPublicQuery } from '@/features/event/event/public/query/get-one-event/get-one-event.public.request';

@Controller('public/event')
@ApiTags('Event-public')
export class EventPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllEventPublicResponse] })
  async getAllEvents(@Query() filters: GetAllEventPublicFilters) {
    return await this.queryBus.execute(new GetAllEventPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventPublicResponse })
  async getOneEvent(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
