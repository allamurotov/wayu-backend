import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllFaqPublicResponse } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.response';
import { GetAllFaqPublicFilters } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.filters';
import { GetAllFaqPublicQuery } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.query';
import { GetOneFaqPublicResponse } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.response';
import { GetOneFaqPublicQuery } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.request';

@Controller('public/faq')
@ApiTags('FAQ-public')
export class FaqPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllFaqPublicResponse] })
  async getAllFaqs(@Query() filters: GetAllFaqPublicFilters) {
    return await this.queryBus.execute(new GetAllFaqPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqPublicResponse })
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
