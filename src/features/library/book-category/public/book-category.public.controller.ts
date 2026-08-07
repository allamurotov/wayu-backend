import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.response';
import { GetAllBookCategoryPublicFilters } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.filters';
import { GetAllBookCategoryPublicQuery } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.query';
import { GetOneBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.response';
import { GetOneBookCategoryPublicQuery } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.request';

@Controller('public/book-category')
@ApiTags('BookCategory-public')
export class BookCategoryPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBookCategoryPublicResponse] })
  async getAllBookCategories(@Query() filters: GetAllBookCategoryPublicFilters) {
    return await this.queryBus.execute(new GetAllBookCategoryPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoryPublicResponse })
  async getOneBookCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookCategoryPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
