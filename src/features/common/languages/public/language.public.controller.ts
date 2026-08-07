import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllLanguagePublicResponse } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.response';
import { GetAllLanguagePublicFilters } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.filters';
import { GetAllLanguagePublicQuery } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.query';
import { GetOneLanguagePublicResponse } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.response';
import { GetOneLanguagePublicQuery } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.query';

@Controller('public/languages')
@ApiTags('Languages-public')
export class LanguagePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllLanguagePublicResponse] })
  async getAllLanguages(@Query() filters: GetAllLanguagePublicFilters) {
    return await this.queryBus.execute(new GetAllLanguagePublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagePublicResponse })
  async getOneLanguage(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagePublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
