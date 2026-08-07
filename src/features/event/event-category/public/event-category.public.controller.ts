import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllEventCategoryPublicResponse } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.response';
import { GetAllEventCategoryPublicFilters } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.filters';
import { GetAllEventCategoryPublicQuery } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.query';
import { GetOneEventCategoryPublicResponse } from '@/features/event/event-category/public/query/get-one-event-category/get-one-event-category.public.response';
import { GetOneEventCategoryPublicQuery } from '@/features/event/event-category/public/query/get-one-event-category/get-one-event-category.public.request';

@Controller('public/event-category')
@ApiTags('EventCategory-public')
export class EventCategoryPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoryPublicResponse] })
  async getAllEventCategories(@Query() filters: GetAllEventCategoryPublicFilters) {
    return await this.queryBus.execute(new GetAllEventCategoryPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoryPublicResponse })
  async getOneEventCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoryPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
