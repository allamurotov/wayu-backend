import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllStaticInfoQuery } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.query';
import { GetAllStaticInfoResponse } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.response';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllStaticInfoQuery)
export class GetAllStaticInfoHandler implements IQueryHandler<GetAllStaticInfoQuery> {
  async execute(query: GetAllStaticInfoQuery): Promise<GetAllStaticInfoResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const items = await StaticInfo.find({ skip, take });
    return plainToInstance(GetAllStaticInfoResponse, items, { excludeExtraneousValues: true });
  }
}
