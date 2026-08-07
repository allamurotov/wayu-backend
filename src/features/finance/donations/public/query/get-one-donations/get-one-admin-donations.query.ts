import { Query } from '@nestjs/cqrs';
import { GetOnePublicDonationsResponse } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.response';

export class GetOnePublicDonationsQuery extends Query<GetOnePublicDonationsResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
