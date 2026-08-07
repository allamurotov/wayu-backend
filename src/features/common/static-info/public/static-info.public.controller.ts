import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.response';
import { GetAllStaticInfoPublicFilters } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.filters';
import { GetAllStaticInfoPublicQuery } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.query';
import { GetOneStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.response';
import { GetOneStaticInfoPublicQuery } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.query';

@Controller('public/static-info')
@ApiTags('Static-info-public')
export class StaticInfoPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllStaticInfoPublicResponse] })
  async getAllStaticInfo(@Query() filters: GetAllStaticInfoPublicFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoPublicResponse })
  async getOneStaticInfo(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
