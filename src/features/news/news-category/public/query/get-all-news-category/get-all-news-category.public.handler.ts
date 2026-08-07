import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllNewsCategoryPublicQuery } from './get-all-news-category.public.query';
import { GetAllNewsCategoryPublicResponse } from './get-all-news-category.public.response';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllNewsCategoryPublicQuery)
export class GetAllNewsCategoryPublicHandler implements IQueryHandler<GetAllNewsCategoryPublicQuery> {
  async execute(query: GetAllNewsCategoryPublicQuery): Promise<GetAllNewsCategoryPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const newsCategories = await NewsCategories.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(GetAllNewsCategoryPublicResponse, newsCategories, { excludeExtraneousValues: true });
  }
}
