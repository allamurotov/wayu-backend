import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsResponse } from '@/features/news/news/admin/command/create-news/create-news.response';
import { CreateNewsRequest } from '@/features/news/news/admin/command/create-news/create-news.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllNewsResponse } from '@/features/news/news/admin/query/get-all-news/get-all-news.response';
import { GetAllNewsQuery } from '@/features/news/news/admin/query/get-all-news/get-all-news.query';
import { GetAllNewsFilters } from '@/features/news/news/admin/query/get-all-news/get-all-news.filters';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import { GetOneNewsResponse } from '@/features/news/news/admin/query/get-one-news/get-one-news.response';
import { GetOneNewsQuery } from '@/features/news/news/admin/query/get-one-news/get-one-news.request';
import { UpdateNewsResponse } from '@/features/news/news/admin/command/update-news/update-news.response';
import { CreateNewsCommand } from '@/features/news/news/admin/command/create-news/create-news.command';
import fs from 'fs';
import { DeleteNewsCommand } from '@/features/news/news/admin/command/delete-news/delete-news-command';
import { UpdateNewsRequest } from '@/features/news/news/admin/command/update-news/update-news.request';
import { UpdateNewsCommand } from '@/features/news/news/admin/command/update-news/update-news.command';

@Controller('admin/news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateNewsResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageOptions,
      limits: {
        fileSize: 1024 * 1024,
      },
    }),
  )
  async createNews(@Body() payload: CreateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    let cmd = new CreateNewsCommand(payload.categoryId, payload.title, image, payload.date, payload.content, payload.countryId);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllNewsResponse] })
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneNewsResponse] })
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCommand(id);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateNewsResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async updateCountry(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    let cmd = new UpdateNewsCommand(payload.id, payload.title, image, payload.date, payload.content);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
    }
  }
}
