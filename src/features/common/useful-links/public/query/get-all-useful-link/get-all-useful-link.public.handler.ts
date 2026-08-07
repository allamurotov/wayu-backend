import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';
import { GetAllUsefulLinkPublicQuery } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.query';
import { GetAllUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.response';

@QueryHandler(GetAllUsefulLinkPublicQuery)
export class GetAllUsefulLinkPublicHandler implements IQueryHandler<GetAllUsefulLinkPublicQuery> {
  async execute(query: GetAllUsefulLinkPublicQuery): Promise<GetAllUsefulLinkPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const links = await UsefulLinks.find({ skip: skip, take: take });
    return plainToInstance(GetAllUsefulLinkPublicResponse, links, { excludeExtraneousValues: true });
  }
}
