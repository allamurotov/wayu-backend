import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAdminDonationsQuery } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.query';
import { GetAllAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.response';
import { Donations } from '@/features/finance/donations/donations.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllAdminDonationsQuery)
export class GetAllAdminDonationsHandler implements IQueryHandler<GetAllAdminDonationsQuery> {
  async execute(query: GetAllAdminDonationsQuery): Promise<GetAllAdminDonationsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const donations = await Donations.find({ skip: skip, take: take });
    return plainToInstance(GetAllAdminDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}
