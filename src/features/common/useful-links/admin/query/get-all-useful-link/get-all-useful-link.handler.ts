import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllUsefulLinkQuery } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.query';
import { GetAllUsefulLinkResponse } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.response';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';

@QueryHandler(GetAllUsefulLinkQuery)
export class GetAllUsefulLinkHandler implements IQueryHandler<GetAllUsefulLinkQuery> {
  async execute(query: GetAllUsefulLinkQuery): Promise<GetAllUsefulLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const links = await UsefulLinks.find({ skip: skip, take: take });
    return plainToInstance(GetAllUsefulLinkResponse, links, { excludeExtraneousValues: true });
  }
}
