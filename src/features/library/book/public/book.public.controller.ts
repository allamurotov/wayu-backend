import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBookPublicResponse } from '@/features/library/book/public/query/get-all-book/get-all-book.public.response';
import { GetAllBookPublicFilters } from '@/features/library/book/public/query/get-all-book/get-all-book.public.filters';
import { GetAllBookPublicQuery } from '@/features/library/book/public/query/get-all-book/get-all-book.public.query';
import { GetOneBookPublicResponse } from '@/features/library/book/public/query/get-one-book/get-one-book.public.response';
import { GetOneBookPublicQuery } from '@/features/library/book/public/query/get-one-book/get-one-book.public.request';

@Controller('public/book')
@ApiTags('Book-public')
export class BookPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBookPublicResponse] })
  async getAllBooks(@Query() filters: GetAllBookPublicFilters) {
    return await this.queryBus.execute(new GetAllBookPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookPublicResponse })
  async getOneBook(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
