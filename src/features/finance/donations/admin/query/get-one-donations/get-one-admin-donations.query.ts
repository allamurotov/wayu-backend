import { Query } from '@nestjs/cqrs';
import { GetOneAdminDonationsResponse } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.response';

export class GetOneAdminDonationsQuery extends Query<GetOneAdminDonationsResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
