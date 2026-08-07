import { Query } from '@nestjs/cqrs';
import { GetAllPublicDonationsResponse } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.response';
import { GetAllPublicDonationsFilters } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.filters';

export class GetAllPublicDonationsQuery extends Query<GetAllPublicDonationsResponse[]> {
  constructor(public readonly filters: GetAllPublicDonationsFilters) {
    super();
  }
}
