import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateStaticInfoRequest } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.request';
import { CreateStaticInfoCommand } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.command';
import { CreateStaticInfoResponse } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.response';
import { UpdateStaticInfoRequest } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.request';
import { UpdateStaticInfoCommand } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.command';
import { UpdateStaticInfoResponse } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.response';
import { DeleteStaticInfoCommand } from '@/features/common/static-info/admin/command/delete-static-info/delete-static-info.command';
import { GetAllStaticInfoQuery } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.query';
import { GetAllStaticInfoFilters } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.filters';
import { GetAllStaticInfoResponse } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.response';
import { GetOneStaticInfoQuery } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.query';
import { GetOneStaticInfoResponse } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.response';

@Controller('admin/static-info')
@ApiTags('Static-Info')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateStaticInfoResponse })
  async createStaticInfo(@Body() payload: CreateStaticInfoRequest) {
    return await this.commandBus.execute(new CreateStaticInfoCommand(payload.aboutUs, payload.appStoreLink, payload.playMarketLink));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllStaticInfoResponse] })
  async getAllStaticInfo(@Query() filters: GetAllStaticInfoFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async getOneStaticInfo(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteStaticInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteStaticInfoCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateStaticInfoResponse })
  async updateStaticInfo(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateStaticInfoRequest) {
    return await this.commandBus.execute(new UpdateStaticInfoCommand(id, payload.aboutUs, payload.appStoreLink, payload.playMarketLink));
  }
}
