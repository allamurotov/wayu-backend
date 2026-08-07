import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.response';
import { GetAllSocialLinkPublicFilters } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.filters';
import { GetAllSocialLinkPublicQuery } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.query';
import { GetOneSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.response';
import { GetOneSocialLinkPublicQuery } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.query';

@Controller('public/social-links')
@ApiTags('Social-links-public')
export class SocialLinkPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllSocialLinkPublicResponse] })
  async getAllSocialLinks(@Query() filters: GetAllSocialLinkPublicFilters) {
    return await this.queryBus.execute(new GetAllSocialLinkPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinkPublicResponse })
  async getOneSocialLink(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinkPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
