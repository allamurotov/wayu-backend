import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllApplicationPublicResponse } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.response';
import { GetAllApplicationPublicFilters } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.filters';
import { GetAllApplicationPublicQuery } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.query';
import { GetOneApplicationPublicResponse } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.response';
import { GetOneApplicationPublicQuery } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.request';

@Controller('public/application')
@ApiTags('Application-public')
export class ApplicationPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllApplicationPublicResponse] })
  async getAllApplications(@Query() filters: GetAllApplicationPublicFilters) {
    return await this.queryBus.execute(new GetAllApplicationPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationPublicResponse })
  async getOneApplication(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
