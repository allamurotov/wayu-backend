import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllCountryResponse } from '@/features/common/countries/admin/query/get-all-country/get-all-country.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCountryResponse } from '@/features/common/countries/admin/command/create-country/create-country.response';
import { CreateCountryCommand } from '@/features/common/countries/admin/command/create-country/create-country.command';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import { GetAllCountryQuery } from '@/features/common/countries/admin/query/get-all-country/get-all-country.query';
import { GetAllCountryFilters } from '@/features/common/countries/admin/query/get-all-country/get-all-country.filters';
import { GetOneCountryResponse } from '@/features/common/countries/admin/query/get-one-country/get-one-country.response';
import { GetOneCountryQuery } from '@/features/common/countries/admin/query/get-one-country/get-one-country.query';
import { DeleteCountryCommand } from '@/features/common/countries/admin/command/delete-country/delete-country.command';
import { UpdateCountryResponse } from '@/features/common/countries/admin/command/update-country/update-country.response';
import { UpdateCountryCommand } from '@/features/common/countries/admin/command/update-country/update-country.command';
import { CreateCountryRequest } from '@/features/common/countries/admin/command/create-country/create-country.request';
import fs from 'fs';
import { UpdateCountryRequest } from '@/features/common/countries/admin/command/update-country/update-country.request';

@Controller('admin/country')
@ApiTags('Country')
export class CountryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllCountryResponse] })
  async getAllCountry(@Query() filters: GetAllCountryFilters) {
    return await this.queryBus.execute(new GetAllCountryQuery(filters));
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('flag', {
      storage: storageOptions,
      limits: {
        fileSize: 1024 * 256,
      },
    }),
  )
  @ApiCreatedResponse({ type: CreateCountryResponse })
  async createCountry(@Body() payload: CreateCountryRequest, @UploadedFile() flag: Express.Multer.File) {
    let cmd = new CreateCountryCommand(payload.title, flag);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(flag.path)) fs.rmSync(flag.path);
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneCountryResponse] })
  async getOneCountry(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountryQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountryCommand(id);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateCountryResponse })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions }))
  async updateCountry(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCountryRequest, @UploadedFile() flag: Express.Multer.File) {
    let cmd = new UpdateCountryCommand(payload.id, payload.title, flag);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(flag.path)) fs.rmSync(flag.path);
    }
  }
}
