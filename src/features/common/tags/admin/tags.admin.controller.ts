import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagsResponse } from '@/features/common/tags/admin/command/create-tags/create-tags.response';
import { GetAllTagsResponse } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.response';
import { GetAllTagsQuery } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTagsFilters } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.filters';
import { GetOneTagsResponse } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.response';
import { GetOneTagsQuery } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.query';
import { DeleteTagsCommand } from '@/features/common/tags/admin/command/delete-tags/delete-tags.command';
import { UpdateTagsResponse } from '@/features/common/tags/admin/command/update-tags/update-tags.response';
import { UpdateTagsCommand } from '@/features/common/tags/admin/command/update-tags/update-tags.command';
import { CreateTagsCommand } from '@/features/common/tags/admin/command/create-tags/create-tags.command';

@Controller('admin/tags')
@ApiTags('Tags')
export class TagsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllTagsResponse] })
  async getAllTags(@Query() filters: GetAllTagsFilters) {
    return await this.queriesBus.execute(new GetAllTagsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneTagsResponse] })
  async getOneTags(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneTagsQuery();
    query.id = id;
    return await this.queriesBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTagsResponse })
  async createTags(@Body() command: CreateTagsCommand) {
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async deleteTags(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteTagsCommand(id);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateTagsResponse })
  async updateTags(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateTagsCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }
}
