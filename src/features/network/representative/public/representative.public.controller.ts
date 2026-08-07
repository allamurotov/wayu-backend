import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllRepresentativePublicResponse } from './query/get-all-representative/get-all-representative.public.response';
import { GetAllRepresentativePublicFilters } from './query/get-all-representative/get-all-representative.public.filters';
import { GetAllRepresentativePublicQuery } from './query/get-all-representative/get-all-representative.public.query';
import { GetOneRepresentativePublicResponse } from './query/get-one-representative/get-one-representative.public.response';
import { GetOneRepresentativePublicQuery } from './query/get-one-representative/get-one-representative.public.query';

@Controller('public/representative')
@ApiTags('Representative-Public')
export class RepresentativePublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllRepresentativePublicResponse] })
  async getAllRepresentatives(@Query() filters: GetAllRepresentativePublicFilters) {
    return await this.queryBus.execute(new GetAllRepresentativePublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativePublicResponse })
  async getOneRepresentative(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativePublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
