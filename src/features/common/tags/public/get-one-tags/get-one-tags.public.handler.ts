import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Tags } from '@/features/common/tags/tags.entity';
import { GetOneTagsPublicQuery } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.query';
import { GetOneTagsPublicResponse } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.response';

@QueryHandler(GetOneTagsPublicQuery)
export class GetOneTagsPublicHandler implements IQueryHandler<GetOneTagsPublicQuery> {
  async execute(query: GetOneTagsPublicQuery): Promise<GetOneTagsPublicResponse> {
    const tags = await Tags.findOneBy({ id: query.id });
    if (!tags) {
      throw new NotFoundException('tags with given id not found');
    }
    return plainToInstance(GetOneTagsPublicResponse, tags, { excludeExtraneousValues: true });
  }
}
