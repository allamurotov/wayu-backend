import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneBookCategoryPublicQuery } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.request';
import { GetOneBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.response';

@QueryHandler(GetOneBookCategoryPublicQuery)
export class GetOneBookCategoryPublicHandler implements IQueryHandler<GetOneBookCategoryPublicQuery> {
  async execute(query: GetOneBookCategoryPublicQuery): Promise<GetOneBookCategoryPublicResponse> {
    const category = await BookCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('Book category with given id not found');
    return plainToInstance(GetOneBookCategoryPublicResponse, category, { excludeExtraneousValues: true });
  }
}
