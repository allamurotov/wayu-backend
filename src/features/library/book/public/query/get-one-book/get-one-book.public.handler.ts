import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Books } from '@/features/library/book/books.entity';
import { plainToInstance } from 'class-transformer';
import { GetOneBookPublicQuery } from '@/features/library/book/public/query/get-one-book/get-one-book.public.request';
import { GetOneBookPublicResponse } from '@/features/library/book/public/query/get-one-book/get-one-book.public.response';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneBookPublicQuery)
export class GetOneBookPublicHandler implements IQueryHandler<GetOneBookPublicQuery> {
  async execute(query: GetOneBookPublicQuery): Promise<GetOneBookPublicResponse> {
    const book = await Books.findOneBy({ id: query.id });
    if (!book) throw new NotFoundException('book with given id not found');
    return plainToInstance(GetOneBookPublicResponse, book, { excludeExtraneousValues: true });
  }
}
