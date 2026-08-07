import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneTagsQuery } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.query';
import { GetOneTagsResponse } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.response';
import { Tags } from '@/features/common/tags/tags.entity';

@QueryHandler(GetOneTagsQuery)
export class GetOneTagsHandler implements IQueryHandler<GetOneTagsQuery> {
  async execute(query: GetOneTagsQuery): Promise<GetOneTagsResponse> {
    const tags = await Tags.findOneBy({ id: query.id });
    if (!tags) {
      throw new NotFoundException('tags with given id not found');
    }
    return plainToInstance(GetOneTagsResponse, tags, { excludeExtraneousValues: true });
  }
}
