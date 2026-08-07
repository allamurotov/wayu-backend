import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBranchesPublicQuery } from './get-all-branches.public.query';
import { GetAllBranchesPublicResponse } from './get-all-branches.public.response';
import { Branches } from '@/features/network/branches/branches.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllBranchesPublicQuery)
export class GetAllBranchesPublicHandler implements IQueryHandler<GetAllBranchesPublicQuery> {
  async execute(query: GetAllBranchesPublicQuery): Promise<GetAllBranchesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const branches = await Branches.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(GetAllBranchesPublicResponse, branches, { excludeExtraneousValues: true });
  }
}
