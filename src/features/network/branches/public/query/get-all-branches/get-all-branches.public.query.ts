import { Query } from '@nestjs/cqrs';
import { GetAllBranchesPublicResponse } from './get-all-branches.public.response';
import { GetAllBranchesPublicFilters } from '@/features/network/branches/public/query/get-all-branches/get-all-branches.public.filters';

export class GetAllBranchesPublicQuery extends Query<GetAllBranchesPublicResponse[]> {
  constructor(public readonly filters: GetAllBranchesPublicFilters) {
    super();
  }
}
