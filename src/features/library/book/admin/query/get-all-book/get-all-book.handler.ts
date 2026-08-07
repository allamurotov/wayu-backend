import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBookQuery } from '@/features/library/book/admin/query/get-all-book/get-all-book.query';
import { GetAllBookResponse } from '@/features/library/book/admin/query/get-all-book/get-all-book.response';
import { Books } from '@/features/library/book/books.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllBookQuery)
export class GetAllBookHandler implements IQueryHandler<GetAllBookQuery> {
  async execute(query: GetAllBookQuery): Promise<GetAllBookResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const books = await Books.find({ skip, take, relations: { book: true, category: true } });
    return plainToInstance(GetAllBookResponse, books, { excludeExtraneousValues: true });
  }
}
