import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllStaticInfoPublicQuery } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.query';
import { GetAllStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.response';

@QueryHandler(GetAllStaticInfoPublicQuery)
export class GetAllStaticInfoPublicHandler implements IQueryHandler<GetAllStaticInfoPublicQuery> {
  async execute(query: GetAllStaticInfoPublicQuery): Promise<GetAllStaticInfoPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const staticInfo = await StaticInfo.find({ skip: skip, take: take });
    return plainToInstance(GetAllStaticInfoPublicResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
