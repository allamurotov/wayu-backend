import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBranchRequest } from './command/create-branch/create-branch.request';
import { CreateBranchCommand } from './command/create-branch/create-branch.command';
import { CreateBranchResponse } from './command/create-branch/create-branch.response';
import { UpdateBranchRequest } from './command/update-branch/update-branch.request';
import { UpdateBranchCommand } from './command/update-branch/update-branch.command';
import { UpdateBranchResponse } from './command/update-branch/update-branch.response';
import { DeleteBranchCommand } from './command/delete-branch/delete-branch.command';
import { GetAllBranchQuery } from './query/get-all-branch/get-all-branch.query';
import { GetAllBranchFilters } from './query/get-all-branch/get-all-branch.filters';
import { GetAllBranchResponse } from './query/get-all-branch/get-all-branch.response';
import { GetOneBranchQuery } from './query/get-one-branch/get-one-branch.query';
import { GetOneBranchResponse } from './query/get-one-branch/get-one-branch.response';

@Controller('admin/branch')
@ApiTags('Branch')
export class BranchController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateBranchResponse })
  async createBranch(@Body() payload: CreateBranchRequest) {
    return await this.commandBus.execute(
      new CreateBranchCommand(payload.countryId, payload.representativeId, payload.city, payload.latitude, payload.longitude, payload.phoneNumber),
    );
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBranchResponse] })
  async getAllBranches(@Query() filters: GetAllBranchFilters) {
    return await this.queryBus.execute(new GetAllBranchQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchResponse })
  async getOneBranch(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteBranch(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteBranchCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateBranchResponse })
  async updateBranch(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBranchRequest) {
    return await this.commandBus.execute(
      new UpdateBranchCommand(id, payload.countryId, payload.representativeId, payload.city, payload.latitude, payload.longitude, payload.phoneNumber),
    );
  }
}
