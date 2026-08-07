import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllNewsCategoryPublicResponse } from './query/get-all-news-category/get-all-news-category.public.response';
import { GetAllNewsCategoryPublicFilters } from './query/get-all-news-category/get-all-news-category.public.filters';
import { GetAllNewsCategoryPublicQuery } from './query/get-all-news-category/get-all-news-category.public.query';
import { GetOneNewsCategoryPublicResponse } from './query/get-one-news-category/get-one-news-category.public.response';
import { GetOneNewsCategoryPublicQuery } from './query/get-one-news-category/get-one-news-category.public.query';

@Controller('public/news-category')
@ApiTags('News-Category-Public')
export class NewsCategoryPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllNewsCategoryPublicResponse] })
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoryPublicFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoryPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsCategoryPublicResponse })
  async getOneNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsCategoryPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
