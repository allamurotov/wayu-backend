import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllAuthorPublicResponse } from '@/features/library/author/public/query/get-all-author/get-all-author.public.response';
import { GetAllAuthorPublicFilters } from '@/features/library/author/public/query/get-all-author/get-all-author.public.filters';
import { GetAllAuthorPublicQuery } from '@/features/library/author/public/query/get-all-author/get-all-author.public.query';
import { GetOneAuthorPublicResponse } from '@/features/library/author/public/query/get-one-author/get-one-author.public.response';
import { GetOneAuthorPublicQuery } from '@/features/library/author/public/query/get-one-author/get-one-author.public.request';

@Controller('public/author')
@ApiTags('Author-public')
export class AuthorPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllAuthorPublicResponse] })
  async getAllAuthors(@Query() filters: GetAllAuthorPublicFilters) {
    return await this.queryBus.execute(new GetAllAuthorPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorPublicResponse })
  async getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAuthorPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
