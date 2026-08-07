import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { CreateApplicationResponse } from '@/features/careers/application/admin/commands/create-application/create-application.response';
import { CreateApplicationRequest } from '@/features/careers/application/admin/commands/create-application/create-application.request';
import { CreateApplicationCommand } from '@/features/careers/application/admin/commands/create-application/create-application.command';
import { UpdateApplicationRequest } from '@/features/careers/application/admin/commands/update-application/update-application.request';
import { UpdateApplicationCommand } from '@/features/careers/application/admin/commands/update-application/update-application.command';
import { GetAllApplicationResponse } from '@/features/careers/application/admin/query/get-all-application/get-all-application.response';
import { GetAllApplicationFilters } from '@/features/careers/application/admin/query/get-all-application/get-all-application.filters';
import { GetAllApplicationQuery } from '@/features/careers/application/admin/query/get-all-application/get-all-application.query';
import { GetOneApplicationResponse } from '@/features/careers/application/admin/query/get-one-application/get-one-application.response';
import { GetOneApplicationQuery } from '@/features/careers/application/admin/query/get-one-application/get-one-application.request';
import { DeleteApplicationCommand } from '@/features/careers/application/admin/commands/delete-application/delete-application.command';
import { UpdateApplicationResponse } from '@/features/careers/application/admin/commands/update-application/update-application.response';

@Controller('admin/application')
@ApiTags('Application-admin')
export class ApplicationAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateApplicationResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', { storage: storageOptions }))
  async createApplication(@Body() payload: CreateApplicationRequest, @UploadedFile() resume: Express.Multer.File) {
    const cmd = new CreateApplicationCommand(payload.fullName, payload.phoneNumber, payload.email, payload.vacancyId, resume);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(resume.path)) fs.rmSync(resume.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllApplicationResponse] })
  async getAllApplications(@Query() filters: GetAllApplicationFilters) {
    return await this.queryBus.execute(new GetAllApplicationQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationResponse })
  async getOneApplication(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteApplicationCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateApplicationResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', { storage: storageOptions }))
  async updateApplication(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateApplicationRequest, @UploadedFile() resume?: Express.Multer.File) {
    const cmd = new UpdateApplicationCommand(id, payload.fullName, payload.phoneNumber, payload.email, payload.vacancyId, resume, payload.status);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (resume && fs.existsSync(resume.path)) fs.rmSync(resume.path);
      throw exc;
    }
  }
}
