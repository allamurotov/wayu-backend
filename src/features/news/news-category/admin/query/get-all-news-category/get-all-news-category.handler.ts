import { GetAllNewsCategoryQuery } from './get-all-news-category.query';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { GetAllNewsCategoryResponse } from './get-all-news-category.response';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllNewsCategoryQuery)
export class GetAllNewsCategoryHandler implements IQueryHandler<GetAllNewsCategoryQuery> {
  async execute(query: GetAllNewsCategoryQuery): Promise<GetAllNewsCategoryResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const newsCategory = await NewsCategories.find({ skip: skip, take: take });
    return plainToInstance(GetAllNewsCategoryResponse, newsCategory, { excludeExtraneousValues: true });
  }
}
