import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { CreateBookRequest } from '@/features/library/book/admin/command/create-book/create-book.request';
import { CreateBookCommand } from '@/features/library/book/admin/command/create-book/create-book.command';
import { CreateBookResponse } from '@/features/library/book/admin/command/create-book/create-book.response';
import { UpdateBookRequest } from '@/features/library/book/admin/command/update-book/update-book.request';
import { UpdateBookCommand } from '@/features/library/book/admin/command/update-book/update-book.command';
import { UpdateBookResponse } from '@/features/library/book/admin/command/update-book/update-book.response';
import { DeleteBookCommand } from '@/features/library/book/admin/command/delete-book/delete-book.command';
import { GetAllBookQuery } from '@/features/library/book/admin/query/get-all-book/get-all-book.query';
import { GetAllBookFilters } from '@/features/library/book/admin/query/get-all-book/get-all-book.filters';
import { GetAllBookResponse } from '@/features/library/book/admin/query/get-all-book/get-all-book.response';
import { GetOneBookQuery } from '@/features/library/book/admin/query/get-one-book/get-one-book.request';
import { GetOneBookResponse } from '@/features/library/book/admin/query/get-one-book/get-one-book.response';

@Controller('admin/book')
@ApiTags('Book')
export class BookController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateBookResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 },
      ],
      { storage: storageOptions },
    ),
  )
  async createBook(@Body() payload: CreateBookRequest, @UploadedFiles() files: { image?: Express.Multer.File[]; file?: Express.Multer.File[] }) {
    const cmd = new CreateBookCommand(
      payload.authorId,
      payload.categoryId,
      payload.title,
      files.image![0],
      files.file![0],
      payload.pages,
      payload.year,
      payload.description,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (files.image?.[0] && fs.existsSync(files.image[0].path)) fs.rmSync(files.image[0].path);
      if (files.file?.[0] && fs.existsSync(files.file[0].path)) fs.rmSync(files.file[0].path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBookResponse] })
  async getAllBooks(@Query() filters: GetAllBookFilters) {
    return await this.queryBus.execute(new GetAllBookQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  async getOneBook(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteBookCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateBookResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 },
      ],
      { storage: storageOptions },
    ),
  )
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const cmd = new UpdateBookCommand(
      id,
      payload.authorId,
      payload.categoryId,
      payload.title,
      files.image?.[0],
      files.file?.[0],
      payload.pages,
      payload.year,
      payload.description,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (files.image?.[0] && fs.existsSync(files.image[0].path)) fs.rmSync(files.image[0].path);
      if (files.file?.[0] && fs.existsSync(files.file[0].path)) fs.rmSync(files.file[0].path);
      throw exc;
    }
  }
}
