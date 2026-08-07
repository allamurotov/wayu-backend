import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.response';
import { GetAllUsefulLinkPublicFilters } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.filters';
import { GetAllUsefulLinkPublicQuery } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.query';
import { GetOneUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.response';
import { GetOneUsefulLinkPublicQuery } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.query';

@Controller('public/useful-link')
@ApiTags('Useful-Link-Public')
export class UsefulLinkPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinkPublicResponse] })
  async getAllUsefulLink(@Query() filters: GetAllUsefulLinkPublicFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinkPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneUsefulLinkPublicResponse] })
  async getOneUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinkPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
