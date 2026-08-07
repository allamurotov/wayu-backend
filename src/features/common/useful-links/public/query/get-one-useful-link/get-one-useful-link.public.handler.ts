import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.response';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';
import { GetOneUsefulLinkPublicQuery } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.query';
import { GetOneUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.response';

@QueryHandler(GetOneUsefulLinkPublicQuery)
export class GetOneUsefulLinkPublicHandler implements IQueryHandler<GetOneUsefulLinkPublicQuery> {
  async execute(query: GetOneUsefulLinkPublicQuery): Promise<GetOneUsefulLinkPublicResponse> {
    const links = await UsefulLinks.findOneBy({ id: query.id });
    if (!links) {
      throw new NotFoundException('links with given id not found');
    }
    return plainToInstance(GetOneUsefulLinkPublicResponse, links, { excludeExtraneousValues: true });
  }
}
