import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBranchQuery } from './get-all-branch.query';
import { GetAllBranchResponse } from './get-all-branch.response';
import { Branches } from '@/features/network/branches/branches.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllBranchQuery)
export class GetAllBranchHandler implements IQueryHandler<GetAllBranchQuery> {
  async execute(query: GetAllBranchQuery): Promise<GetAllBranchResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const branches = await Branches.find({
      skip,
      take,
      relations: ['country', 'representative'],
    });
    return plainToInstance(GetAllBranchResponse, branches, { excludeExtraneousValues: true });
  }
}
