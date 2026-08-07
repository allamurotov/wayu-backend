import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllInstagramPostsPublicResponse } from './query/get-all-instagram-posts/get-all-instagram-posts.public.response';
import { GetAllInstagramPostsPublicFilters } from './query/get-all-instagram-posts/get-all-instagram-posts.public.filters';
import { GetAllInstagramPostsPublicQuery } from './query/get-all-instagram-posts/get-all-instagram-posts.public.query';
import { GetOneInstagramPostPublicResponse } from './query/get-one-instagram-post/get-one-instagram-post.public.response';
import { GetOneInstagramPostPublicQuery } from './query/get-one-instagram-post/get-one-instagram-post.public.query';

@Controller('public/instagram-posts')
@ApiTags('Instagram-Posts-Public')
export class InstagramPostsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostsPublicResponse] })
  async getAllInstagramPosts(@Query() filters: GetAllInstagramPostsPublicFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostPublicResponse })
  async getOneInstagramPost(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
