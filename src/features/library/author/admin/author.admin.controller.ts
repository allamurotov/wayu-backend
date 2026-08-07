import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAuthorRequest } from '@/features/library/author/admin/command/create-author/create-author.request';
import { CreateAuthorCommand } from '@/features/library/author/admin/command/create-author/create-author.command';
import { CreateAuthorResponse } from '@/features/library/author/admin/command/create-author/create-author.response';
import { UpdateAuthorRequest } from '@/features/library/author/admin/command/update-author/update-author.request';
import { UpdateAuthorCommand } from '@/features/library/author/admin/command/update-author/update-author.command';
import { UpdateAuthorResponse } from '@/features/library/author/admin/command/update-author/update-author.response';
import { DeleteAuthorCommand } from '@/features/library/author/admin/command/delete-author/delete-author.command';
import { GetAllAuthorQuery } from '@/features/library/author/admin/query/get-all-author/get-all-author.query';
import { GetAllAuthorFilters } from '@/features/library/author/admin/query/get-all-author/get-all-author.filters';
import { GetAllAuthorResponse } from '@/features/library/author/admin/query/get-all-author/get-all-author.response';
import { GetOneAuthorQuery } from '@/features/library/author/admin/query/get-one-author/get-one-author.request';
import { GetOneAuthorResponse } from '@/features/library/author/admin/query/get-one-author/get-one-author.response';

@Controller('admin/author')
@ApiTags('Author')
export class AuthorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateAuthorResponse })
  async createAuthor(@Body() payload: CreateAuthorRequest) {
    return await this.commandBus.execute(new CreateAuthorCommand(payload.fullName));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllAuthorResponse] })
  async getAllAuthors(@Query() filters: GetAllAuthorFilters) {
    return await this.queryBus.execute(new GetAllAuthorQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorResponse })
  async getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAuthorQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteAuthorCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateAuthorResponse })
  async updateAuthor(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateAuthorRequest) {
    return await this.commandBus.execute(new UpdateAuthorCommand(id, payload.fullName));
  }
}
