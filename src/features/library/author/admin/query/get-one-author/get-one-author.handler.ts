import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneAuthorQuery } from '@/features/library/author/admin/query/get-one-author/get-one-author.request';
import { GetOneAuthorResponse } from '@/features/library/author/admin/query/get-one-author/get-one-author.response';
import { Authors } from '@/features/library/author/authors.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneAuthorQuery)
export class GetOneAuthorHandler implements IQueryHandler<GetOneAuthorQuery> {
  async execute(query: GetOneAuthorQuery): Promise<GetOneAuthorResponse> {
    const author = await Authors.findOneBy({ id: query.id });

    if (!author) throw new NotFoundException('Author with given id not found');

    return plainToInstance(GetOneAuthorResponse, author, { excludeExtraneousValues: true });
  }
}
