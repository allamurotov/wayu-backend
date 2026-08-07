import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBookCategoryQuery } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.query';
import { GetAllBookCategoryResponse } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.response';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllBookCategoryPublicQuery } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.query';
import { GetAllBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.response';

@QueryHandler(GetAllBookCategoryPublicQuery)
export class GetAllBookCategoryPublicHandler implements IQueryHandler<GetAllBookCategoryPublicQuery> {
  async execute(query: GetAllBookCategoryPublicQuery): Promise<GetAllBookCategoryPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await BookCategories.find({ skip, take });
    return plainToInstance(GetAllBookCategoryPublicResponse, categories, { excludeExtraneousValues: true });
  }
}
