import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePublicDonationsResponse } from '@/features/finance/donations/public/command/create-donations/create-public-donations.response';
import { CreatePublicDonationCommand } from '@/features/finance/donations/public/command/create-donations/create-public-donation.command';
import { CreatePublicDonationsRequest } from '@/features/finance/donations/public/command/create-donations/create-public-donations.request';
import { GetAllPublicDonationsResponse } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.response';
import { GetAllPublicDonationsFilters } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.filters';
import { GetAllPublicDonationsQuery } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.query';
import { GetOnePublicDonationsResponse } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.response';
import { GetOnePublicDonationsQuery } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.query';

@Controller('public/donations')
@ApiTags('Donations-Public')
export class DonationsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePublicDonationsResponse })
  async createDonations(@Body() payload: CreatePublicDonationsRequest) {
    let cmd = new CreatePublicDonationCommand(payload.amount, payload.fullName, payload.date, payload.paidBy);
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllPublicDonationsResponse] })
  async getAllDonations(@Query() filters: GetAllPublicDonationsFilters) {
    return await this.queryBus.execute(new GetAllPublicDonationsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOnePublicDonationsResponse })
  async getOneDonations(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOnePublicDonationsQuery(id));
  }
}
