import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsCategoryPublicQuery } from './get-one-news-category.public.query';
import { GetOneNewsCategoryPublicResponse } from './get-one-news-category.public.response';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneNewsCategoryPublicQuery)
export class GetOneNewsCategoryPublicHandler implements IQueryHandler<GetOneNewsCategoryPublicQuery> {
  async execute(query: GetOneNewsCategoryPublicQuery): Promise<GetOneNewsCategoryPublicResponse> {
    const newsCategory = await NewsCategories.findOneBy({ id: query.id });

    if (!newsCategory) {
      throw new NotFoundException('News category not found');
    }

    return plainToInstance(GetOneNewsCategoryPublicResponse, newsCategory, { excludeExtraneousValues: true });
  }
}
