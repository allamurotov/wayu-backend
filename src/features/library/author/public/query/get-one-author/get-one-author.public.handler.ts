import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Authors } from '@/features/library/author/authors.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneAuthorPublicQuery } from '@/features/library/author/public/query/get-one-author/get-one-author.public.request';
import { GetOneAuthorPublicResponse } from '@/features/library/author/public/query/get-one-author/get-one-author.public.response';

@QueryHandler(GetOneAuthorPublicQuery)
export class GetOneAuthorPublicHandler implements IQueryHandler<GetOneAuthorPublicQuery> {
  async execute(query: GetOneAuthorPublicQuery): Promise<GetOneAuthorPublicResponse> {
    const author = await Authors.findOneBy({ id: query.id });

    if (!author) throw new NotFoundException('Author with given id not found');

    return plainToInstance(GetOneAuthorPublicResponse, author, { excludeExtraneousValues: true });
  }
}
