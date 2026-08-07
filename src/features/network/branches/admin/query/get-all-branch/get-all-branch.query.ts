import { Query } from '@nestjs/cqrs';
import { GetAllBranchResponse } from './get-all-branch.response';
import { GetAllBranchFilters } from './get-all-branch.filters';

export class GetAllBranchQuery extends Query<GetAllBranchResponse[]> {
  constructor(public readonly filters: GetAllBranchFilters) {
    super();
  }
}
