import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllBranchesPublicResponse } from './query/get-all-branches/get-all-branches.public.response';
import { GetAllBranchesPublicFilters } from './query/get-all-branches/get-all-branches.public.filters';
import { GetAllBranchesPublicQuery } from './query/get-all-branches/get-all-branches.public.query';
import { GetOneBranchPublicResponse } from './query/get-one-branch/get-one-branch.public.response';
import { GetOneBranchPublicQuery } from './query/get-one-branch/get-one-branch.public.query';

@Controller('public/branches')
@ApiTags('Branches-Public')
export class BranchesPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBranchesPublicResponse] })
  async getAllBranches(@Query() filters: GetAllBranchesPublicFilters) {
    return await this.queryBus.execute(new GetAllBranchesPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchPublicResponse })
  async getOneBranch(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
