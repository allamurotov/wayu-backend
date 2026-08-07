import { Query } from '@nestjs/cqrs';
import { GetAllAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.response';
import { GetAllAdminDonationsFilters } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.filters';

export class GetAllAdminDonationsQuery extends Query<GetAllAdminDonationsResponse[]> {
  constructor(public readonly filters: GetAllAdminDonationsFilters) {
    super();
  }
}
