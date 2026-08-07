import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsCategoryCommands } from './command/create-news-category/create-news-category.commands';
import { CreateNewsCategoryResponse } from './command/create-news-category/create-news-category.response';
import { GetAllNewsCategoryResponse } from './query/get-all-news-category/get-all-news-category.response';
import { GetAllNewsCategoryQuery } from './query/get-all-news-category/get-all-news-category.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllNewsCategoryFilters } from './query/get-all-news-category/get-all-news-category.filters';
import { DeleteNewsCategoryCommand } from './command/delete-news-category/delete-news-category.command';
import { GetOneNewsCategoryResponse } from './query/get-one-news-category/get-one-news-category.response';
import { GetOneNewsCategoryQuery } from './query/get-one-news-category/get-one-news-category.query';
import { UpdateNewsCategoryCommand } from './command/update-news-category/update-news-category.command';
import { UpdateNewsCategoryResponse } from './command/update-news-category/update-news-category.response';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationGuard } from '@/core/guards/authentification.guard';

@Controller('admin/news-category')
@ApiTags('News-Category')
export class NewsCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllNewsCategoryResponse] })
  async getAllNewsCategory(@Query() filters: GetAllNewsCategoryFilters) {
    return await this.queriesBus.execute(new GetAllNewsCategoryQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneNewsCategoryResponse] })
  async getOneNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsCategoryQuery();
    query.id = id;
    return await this.queriesBus.execute(query);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiCreatedResponse({ type: CreateNewsCategoryResponse })
  async createNewsCategory(@Body() command: CreateNewsCategoryCommands) {
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCategoryCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateNewsCategoryResponse })
  async updateNewsCategory(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateNewsCategoryCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }
}
