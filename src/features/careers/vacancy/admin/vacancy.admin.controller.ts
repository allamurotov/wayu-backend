import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVacancyResponse } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.response';
import { CreateVacancyRequest } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.request';
import { CreateVacancyCommand } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.command';
import { GetAllVacancyResponse } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.response';
import { GetAllVacancyFilters } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.filters';
import { GetAllVacancyQuery } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.query';
import { GetOneVacancyResponse } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.response';
import { GetOneVacancyQuery } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.query';
import { DeleteVacancyCommand } from '@/features/careers/vacancy/admin/command/delete-vacancy/delete-vacancy.command';
import { UpdateVacancyResponse } from '@/features/careers/vacancy/admin/command/update-vacancy/update-vacancy.response';
import { UpdateVacancyCommand } from '@/features/careers/vacancy/admin/command/update-vacancy/update-vacancy.command';
import { UpdateVacancyRequest } from '@/features/careers/vacancy/admin/command/update-vacancy/update-vacancy.request';

@Controller('admin/vacancy')
@ApiTags('Vacancy-Admin')
export class VacancyAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateVacancyResponse })
  async createVacancy(@Body() payload: CreateVacancyRequest) {
    return await this.commandBus.execute(
      new CreateVacancyCommand(payload.title, payload.address, payload.description, payload.phoneNumber, payload.type, payload.salary, payload.isActive ?? true),
    );
  }

  @Get()
  @ApiOkResponse({ type: [GetAllVacancyResponse] })
  async getAllVacancies(@Query() filters: GetAllVacancyFilters) {
    return await this.queryBus.execute(new GetAllVacancyQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacancyResponse })
  async getOneVacancy(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacancyQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteVacancy(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteVacancyCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateVacancyResponse })
  async updateVacancy(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateVacancyRequest) {
    return await this.commandBus.execute(
      new UpdateVacancyCommand(id, payload.title, payload.address, payload.description, payload.phoneNumber, payload.type, payload.salary, payload.isActive),
    );
  }
}
