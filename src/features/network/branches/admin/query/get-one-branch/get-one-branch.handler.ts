import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBranchQuery } from './get-one-branch.query';
import { GetOneBranchResponse } from './get-one-branch.response';
import { Branches } from '@/features/network/branches/branches.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneBranchQuery)
export class GetOneBranchHandler implements IQueryHandler<GetOneBranchQuery> {
  async execute(query: GetOneBranchQuery): Promise<GetOneBranchResponse> {
    const branch = await Branches.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch with given id not found');
    return plainToInstance(GetOneBranchResponse, branch, { excludeExtraneousValues: true });
  }
}
