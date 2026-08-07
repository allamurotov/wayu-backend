import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllVacancyResponse } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.response';
import { GetAllVacancyFilters } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.filters';
import { GetAllVacancyQuery } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.query';
import { GetOneVacancyResponse } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.response';
import { GetOneVacancyQuery } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.query';

@Controller('public/vacancy')
@ApiTags('Vacancy-Public')
export class VacancyPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
}
