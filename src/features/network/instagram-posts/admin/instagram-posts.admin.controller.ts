import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { CreateInstagramPostRequest } from './command/create-instagram-post/create-instagram-post.request';
import { CreateInstagramPostCommand } from './command/create-instagram-post/create-instagram-post.command';
import { CreateInstagramPostResponse } from './command/create-instagram-post/create-instagram-post.response';
import { UpdateInstagramPostRequest } from './command/update-instagram-post/update-instagram-post.request';
import { UpdateInstagramPostCommand } from './command/update-instagram-post/update-instagram-post.command';
import { UpdateInstagramPostResponse } from './command/update-instagram-post/update-instagram-post.response';
import { DeleteInstagramPostCommand } from './command/delete-instagram-post/delete-instagram-post.command';
import { GetAllInstagramPostQuery } from './query/get-all-instagram-post/get-all-instagram-post.query';
import { GetAllInstagramPostFilters } from './query/get-all-instagram-post/get-all-instagram-post.filters';
import { GetAllInstagramPostResponse } from './query/get-all-instagram-post/get-all-instagram-post.response';
import { GetOneInstagramPostQuery } from './query/get-one-instagram-post/get-one-instagram-post.query';
import { GetOneInstagramPostResponse } from './query/get-one-instagram-post/get-one-instagram-post.response';

@Controller('admin/instagram-posts')
@ApiTags('Instagram-Posts')
export class InstagramPostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateInstagramPostResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 } }))
  async createInstagramPost(@Body() payload: CreateInstagramPostRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new CreateInstagramPostCommand(image, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostResponse] })
  async getAllInstagramPosts(@Query() filters: GetAllInstagramPostFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostResponse })
  async getOneInstagramPost(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteInstagramPost(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteInstagramPostCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateInstagramPostResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async updateInstagramPost(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateInstagramPostRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new UpdateInstagramPostCommand(id, image, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }
}
