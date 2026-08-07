import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTagsQuery } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.query';
import { GetAllTagsResponse } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.response';
import { Tags } from '@/features/common/tags/tags.entity';

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
  async execute(query: GetAllTagsQuery): Promise<GetAllTagsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const tags = await Tags.find({ skip: skip, take: take });
    return plainToInstance(GetAllTagsResponse, tags, { excludeExtraneousValues: true });
  }
}
