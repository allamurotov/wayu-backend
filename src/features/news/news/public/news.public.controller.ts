import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllNewsPublicResponse } from './query/get-all-news/get-all-news.public.response';
import { GetAllNewsPublicFilters } from './query/get-all-news/get-all-news.public.filters';
import { GetAllNewsPublicQuery } from './query/get-all-news/get-all-news.public.query';
import { GetOneNewsPublicResponse } from './query/get-one-news/get-one-news.public.response';
import { GetOneNewsPublicQuery } from './query/get-one-news/get-one-news.public.query';

@Controller('public/news')
@ApiTags('News-Public')
export class NewsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllNewsPublicResponse] })
  async getAllNews(@Query() filters: GetAllNewsPublicFilters) {
    return await this.queryBus.execute(new GetAllNewsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsPublicResponse })
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
