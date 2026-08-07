import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllEventCategoryResponse } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.response';
import { GetAllEventCategoryFilters } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.filters';
import { GetAllEventCategoryQuery } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.query';
import { GetOneEventCategoryResponse } from '@/features/event/event-category/admin/query/get-one-event-category/get-one-event-category.response';
import { GetOneEventCategoryQuery } from '@/features/event/event-category/admin/query/get-one-event-category/get-one-event-category.request';
import { CreateEventCategoryResponse } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.response';
import { CreateEventCategoryRequest } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.request';
import { CreateEventCategoryCommand } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.command';
import { DeleteEventCategoryCommand } from '@/features/event/event-category/admin/commands/delete-event-category/delete-event-category.command';
import { UpdateEventCategoryResponse } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.response';
import { UpdateEventCategoryRequest } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.request';
import { UpdateEventCategoryCommand } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.command';

@Controller('admin/event-category')
@ApiTags('Event-Category')
export class EventCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateEventCategoryResponse })
  async createEventCategory(@Body() payload: CreateEventCategoryRequest) {
    return await this.commandBus.execute(new CreateEventCategoryCommand(payload.title));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoryResponse] })
  async getAllEventCategories(@Query() filters: GetAllEventCategoryFilters) {
    return await this.queryBus.execute(new GetAllEventCategoryQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoryResponse })
  async getOneEventCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoryQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteEventCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteEventCategoryCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateEventCategoryResponse })
  async updateEventCategory(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventCategoryRequest) {
    return await this.commandBus.execute(new UpdateEventCategoryCommand(id, payload.title));
  }
}
