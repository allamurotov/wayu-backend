import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneUsefulLinkQuery } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.query';
import { GetOneUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.response';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';

@QueryHandler(GetOneUsefulLinkQuery)
export class GetOneUsefulLinkHandler implements IQueryHandler<GetOneUsefulLinkQuery> {
  async execute(query: GetOneUsefulLinkQuery): Promise<GetOneUsefulLinkResponse> {
    const links = await UsefulLinks.findOneBy({ id: query.id });
    if (!links) {
      throw new NotFoundException('links with given id not found');
    }
    return plainToInstance(GetOneUsefulLinkResponse, links, { excludeExtraneousValues: true });
  }
}
