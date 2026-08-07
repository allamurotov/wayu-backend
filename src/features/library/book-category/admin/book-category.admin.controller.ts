import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookCategoryRequest } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.request';
import { CreateBookCategoryCommand } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.command';
import { CreateBookCategoryResponse } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.response';
import { UpdateBookCategoryRequest } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.request';
import { UpdateBookCategoryCommand } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.command';
import { UpdateBookCategoryResponse } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.response';
import { DeleteBookCategoryCommand } from '@/features/library/book-category/admin/command/delete-book-category/delete-book-category.command';
import { GetAllBookCategoryQuery } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.query';
import { GetAllBookCategoryFilters } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.filters';
import { GetAllBookCategoryResponse } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.response';
import { GetOneBookCategoryQuery } from '@/features/library/book-category/admin/query/get-one-book-category/get-one-book-category.request';
import { GetOneBookCategoryResponse } from '@/features/library/book-category/admin/query/get-one-book-category/get-one-book-category.response';

@Controller('admin/book-category')
@ApiTags('Book-Category')
export class BookCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateBookCategoryResponse })
  async createBookCategory(@Body() payload: CreateBookCategoryRequest) {
    return await this.commandBus.execute(new CreateBookCategoryCommand(payload.title));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBookCategoryResponse] })
  async getAllBookCategories(@Query() filters: GetAllBookCategoryFilters) {
    return await this.queryBus.execute(new GetAllBookCategoryQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoryResponse })
  async getOneBookCategory(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookCategoryQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteBookCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteBookCategoryCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateBookCategoryResponse })
  async updateBookCategory(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBookCategoryRequest) {
    return await this.commandBus.execute(new UpdateBookCategoryCommand(id, payload.title));
  }
}
