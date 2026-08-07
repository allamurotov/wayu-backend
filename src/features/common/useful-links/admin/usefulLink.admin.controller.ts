import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import { GetAllUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.response';
import { GetAllUsefulLinkFilters } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.filters';
import { GetAllUsefulLinkQuery } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.query';
import { CreateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.response';
import { CreateUsefulLinkCommand } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.command';
import { GetOneUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.response';
import { GetOneUsefulLinkQuery } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.query';
import { DeleteUsefulLinkCommand } from '@/features/common/useful-links/admin/command/delete-useful-link/delete-useful-link.command';
import { UpdateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.response';
import { UpdateUsefulLinkCommand } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.command';
import { CreateUsefulLinkRequest } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.request';
import fs from 'fs';
import { UpdateUsefulLinkRequest } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.request';

@Controller('admin/useful-link')
@ApiTags('Useful-Link')
export class UsefulLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinkResponse] })
  async getAllUsefulLink(@Query() filters: GetAllUsefulLinkFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinkQuery(filters));
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: storageOptions,
      limits: {
        fileSize: 1024 * 256,
      },
    }),
  )
  @ApiCreatedResponse({ type: CreateUsefulLinkResponse })
  async createUsefulLink(@Body() payload: CreateUsefulLinkRequest, @UploadedFile() icon: Express.Multer.File) {
    let cmd = new CreateUsefulLinkCommand(payload.title, icon, payload.link);

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(icon.path)) fs.rmSync(icon.path);
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneUsefulLinkResponse] })
  async getOneUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinkQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinkCommand(id);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateUsefulLinkResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions }))
  async updateUsefulLink(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUsefulLinkRequest, @UploadedFile() icon: Express.Multer.File) {
    let cmd = new UpdateUsefulLinkCommand(payload.id, payload.title, icon, payload.link);

    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(icon.path)) fs.rmSync(icon.path);
    }
  }
}
