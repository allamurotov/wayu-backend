import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteAdminDonationsCommand } from '@/features/finance/donations/admin/command/delete-donations/delete-admin-donations.command';
import { GetAllAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.response';
import { GetAllAdminDonationsQuery } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.query';
import { GetAllAdminDonationsFilters } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.filters';
import { GetOneAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.response';
import { GetOneAdminDonationsQuery } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.query';

@Controller('admin/donations')
@ApiTags('Donations-Admin')
export class DonationsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Delete(':id')
  async deleteDonations(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteAdminDonationsCommand(id));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllAdminDonationsResponse] })
  async getAllDonations(@Query() filters: GetAllAdminDonationsFilters) {
    return await this.queryBus.execute(new GetAllAdminDonationsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetOneAdminDonationsResponse] })
  async getOneDonations(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneAdminDonationsQuery(id));
  }
}
