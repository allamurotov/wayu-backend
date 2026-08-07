import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllCountryPublicResponse } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.response';
import { GetAllCountryPublicFilters } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.filters';
import { GetAllCountryPublicQuery } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.query';
import { GetOneCountryPublicResponse } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.response';
import { GetOneCountryPublicQuery } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.query';

@Controller('public/countries')
@ApiTags('Countries-public')
export class CountryPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllCountryPublicResponse] })
  async getAllCountries(@Query() filters: GetAllCountryPublicFilters) {
    return await this.queryBus.execute(new GetAllCountryPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountryPublicResponse })
  async getOneCountry(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountryPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
