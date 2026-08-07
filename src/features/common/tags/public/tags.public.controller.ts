import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTagsPublicResponse } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.response';
import { GetAllTagsPublicFilters } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.filters';
import { GetAllTagsPublicQuery } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.query';
import { GetOneTagsPublicResponse } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.response';
import { GetOneTagsPublicQuery } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.query';

@Controller('public/tags')
@ApiTags('Tags-public')
export class TagsPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllTagsPublicResponse] })
  async getAllTags(@Query() filters: GetAllTagsPublicFilters) {
    return await this.queryBus.execute(new GetAllTagsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagsPublicResponse })
  async getOneTag(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneTagsPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
