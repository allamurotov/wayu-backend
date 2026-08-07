import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsCategoryQuery } from '@/features/news/news-category/admin/query/get-one-news-category/get-one-news-category.query';
import { GetOneNewsCategoryResponse } from '@/features/news/news-category/admin/query/get-one-news-category/get-one-news-category.response';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneNewsCategoryQuery)
export class GetOneNewsCategoryHandler implements IQueryHandler<GetOneNewsCategoryQuery> {
  async execute(query: GetOneNewsCategoryQuery): Promise<GetOneNewsCategoryResponse> {
    const newsCategory = await NewsCategories.findOneBy({ id: query.id });
    if (!newsCategory) {
      throw new NotFoundException('category with given id not found');
    }
    return plainToInstance(GetOneNewsCategoryResponse, newsCategory, { excludeExtraneousValues: true });
  }
}
