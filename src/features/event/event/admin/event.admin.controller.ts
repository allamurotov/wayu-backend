import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { GetAllEventResponse } from '@/features/event/event/admin/query/get-all-event/get-all-event.response';
import { GetAllEventFilters } from '@/features/event/event/admin/query/get-all-event/get-all-event.filters';
import { GetAllEventQuery } from '@/features/event/event/admin/query/get-all-event/get-all-event.query';
import { GetOneEventResponse } from '@/features/event/event/admin/query/get-one-event/get-one-event.response';
import { GetOneEventQuery } from '@/features/event/event/admin/query/get-one-event/get-one-event.request';
import { CreateEventCommand } from '@/features/event/event/admin/commands/create-event/create-event.command';
import { CreateEventResponse } from '@/features/event/event/admin/commands/create-event/create-event.response';
import { CreateEventRequest } from '@/features/event/event/admin/commands/create-event/create-event.request';
import { DeleteEventCommand } from '@/features/event/event/admin/commands/delete-event/delete-event.command';
import { UpdateEventResponse } from '@/features/event/event/admin/commands/update-event/update-event.response';
import { UpdateEventRequest } from '@/features/event/event/admin/commands/update-event/update-event.request';
import { UpdateEventCommand } from '@/features/event/event/admin/commands/update-event/update-event.command';

@Controller('admin/event')
@ApiTags('Event')
export class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateEventResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageOptions,
      limits: { fileSize: 1024 * 1024 },
    }),
  )
  async createEvent(@Body() payload: CreateEventRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new CreateEventCommand(payload.categoryId, payload.title, image, payload.date, payload.content);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventResponse] })
  async getAllEvents(@Query() filters: GetAllEventFilters) {
    return await this.queryBus.execute(new GetAllEventQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventResponse })
  async getOneEvent(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteEventCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateEventResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async updateEvent(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new UpdateEventCommand(id, payload.categoryId, payload.title, image, payload.date, payload.content);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }
}
