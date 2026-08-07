import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Books } from '@/features/library/book/books.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllBookPublicQuery } from '@/features/library/book/public/query/get-all-book/get-all-book.public.query';
import { GetAllBookPublicResponse } from '@/features/library/book/public/query/get-all-book/get-all-book.public.response';

@QueryHandler(GetAllBookPublicQuery)
export class GetAllBookPublicHandler implements IQueryHandler<GetAllBookPublicQuery> {
  async execute(query: GetAllBookPublicQuery): Promise<GetAllBookPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const books = await Books.find({ skip, take });
    return plainToInstance(GetAllBookPublicResponse, books, { excludeExtraneousValues: true });
  }
}
