import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNewsTagRequest } from './command/create-news-tag/create-news-tag.request';
import { CreateNewsTagCommand } from './command/create-news-tag/create-news-tag.command';
import { CreateNewsTagResponse } from './command/create-news-tag/create-news-tag.response';
import { DeleteNewsTagCommand } from './command/delete-news-tag/delete-news-tag.command';

@Controller('admin/news-tags')
@ApiTags('News-Tags')
export class NewsTagsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiCreatedResponse({ type: CreateNewsTagResponse })
  async createNewsTag(@Body() payload: CreateNewsTagRequest) {
    let cmd = new CreateNewsTagCommand(payload.newsId, payload.tagId);
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  async deleteNewsTags(@Param('id', ParseIntPipe) id: number) {
    let cmd = new DeleteNewsTagCommand(id, 0);
    return await this.commandBus.execute(cmd);
  }
}
