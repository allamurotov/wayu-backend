import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAuthorQuery } from '@/features/library/author/admin/query/get-all-author/get-all-author.query';
import { GetAllAuthorResponse } from '@/features/library/author/admin/query/get-all-author/get-all-author.response';
import { Authors } from '@/features/library/author/authors.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllAuthorQuery)
export class GetAllAuthorHandler implements IQueryHandler<GetAllAuthorQuery> {
  async execute(query: GetAllAuthorQuery): Promise<GetAllAuthorResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await Authors.find({ skip, take });
    return plainToInstance(GetAllAuthorResponse, authors, { excludeExtraneousValues: true });
  }
}
