import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOnePublicDonationsQuery } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.query';
import { GetOnePublicDonationsResponse } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.response';
import { Donations } from '@/features/finance/donations/donations.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOnePublicDonationsQuery)
export class GetOnePublicDonationsHandler implements IQueryHandler<GetOnePublicDonationsQuery> {
  async execute(query: GetOnePublicDonationsQuery): Promise<GetOnePublicDonationsResponse> {
    const donations = await Donations.findOneBy({ id: query.id });
    if (!donations) {
      throw new NotFoundException('donations with given id not found');
    }

    return plainToInstance(GetOnePublicDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}
