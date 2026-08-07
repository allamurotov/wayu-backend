import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFaqRequest } from '@/features/support/faqs/admin/command/create-faq/create-faq.request';
import { CreateFaqCommand } from '@/features/support/faqs/admin/command/create-faq/create-faq.command';
import { CreateFaqResponse } from '@/features/support/faqs/admin/command/create-faq/create-faq.response';
import { UpdateFaqRequest } from '@/features/support/faqs/admin/command/update-faq/update-faq.request';
import { UpdateFaqCommand } from '@/features/support/faqs/admin/command/update-faq/update-faq.command';
import { UpdateFaqResponse } from '@/features/support/faqs/admin/command/update-faq/update-faq.response';
import { DeleteFaqCommand } from '@/features/support/faqs/admin/command/delete-faq/delete-faq.command';
import { GetAllFaqQuery } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.query';
import { GetAllFaqFilters } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.filters';
import { GetAllFaqResponse } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.response';
import { GetOneFaqQuery } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.request';
import { GetOneFaqResponse } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.response';

@Controller('admin/faq')
@ApiTags('FAQ')
export class FaqController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateFaqResponse })
  async createFaq(@Body() payload: CreateFaqRequest) {
    return await this.commandBus.execute(new CreateFaqCommand(payload.question, payload.answer));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllFaqResponse] })
  async getAllFaqs(@Query() filters: GetAllFaqFilters) {
    return await this.queryBus.execute(new GetAllFaqQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqResponse })
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteFaq(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteFaqCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateFaqResponse })
  async updateFaq(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateFaqRequest) {
    return await this.commandBus.execute(new UpdateFaqCommand(id, payload.question, payload.answer));
  }
}
