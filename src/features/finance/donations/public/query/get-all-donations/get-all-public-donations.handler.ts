import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPublicDonationsQuery } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.query';
import { GetAllPublicDonationsResponse } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.response';
import { Donations } from '@/features/finance/donations/donations.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllPublicDonationsQuery)
export class GetAllPublicDonationsHandler implements IQueryHandler<GetAllPublicDonationsQuery> {
  async execute(query: GetAllPublicDonationsQuery): Promise<GetAllPublicDonationsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const donations = await Donations.find({
      take,
      skip,
      order: { date: 'DESC' },
    });

    return plainToInstance(GetAllPublicDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}
