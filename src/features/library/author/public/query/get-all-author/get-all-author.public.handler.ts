import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Authors } from '@/features/library/author/authors.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllAuthorPublicQuery } from '@/features/library/author/public/query/get-all-author/get-all-author.public.query';
import { GetAllAuthorPublicResponse } from '@/features/library/author/public/query/get-all-author/get-all-author.public.response';

@QueryHandler(GetAllAuthorPublicQuery)
export class GetAllAuthorPublicHandler implements IQueryHandler<GetAllAuthorPublicQuery> {
  async execute(query: GetAllAuthorPublicQuery): Promise<GetAllAuthorPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await Authors.find({ skip, take });
    return plainToInstance(GetAllAuthorPublicResponse, authors, { excludeExtraneousValues: true });
  }
}
