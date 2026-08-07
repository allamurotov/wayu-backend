import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneAdminDonationsQuery } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.query';
import { GetOneAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.response';
import { Donations } from '@/features/finance/donations/donations.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneAdminDonationsQuery)
export class GetOneAdminDonationsHandler implements IQueryHandler<GetOneAdminDonationsQuery> {
  async execute(query: GetOneAdminDonationsQuery): Promise<GetOneAdminDonationsResponse> {
    const donations = await Donations.findOneBy({ id: query.id });
    if (!donations) {
      throw new NotFoundException('donations with given id not found');
    }

    return plainToInstance(GetOneAdminDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}
