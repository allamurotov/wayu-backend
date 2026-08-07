import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Tags } from '@/features/common/tags/tags.entity';
import { GetAllTagsPublicQuery } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.query';
import { GetAllTagsPublicResponse } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.response';

@QueryHandler(GetAllTagsPublicQuery)
export class GetAllTagsPublicHandler implements IQueryHandler<GetAllTagsPublicQuery> {
  async execute(query: GetAllTagsPublicQuery): Promise<GetAllTagsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const tags = await Tags.find({ skip: skip, take: take });
    return plainToInstance(GetAllTagsPublicResponse, tags, { excludeExtraneousValues: true });
  }
}
