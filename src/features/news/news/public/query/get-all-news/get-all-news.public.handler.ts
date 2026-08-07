import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllNewsPublicQuery } from './get-all-news.public.query';
import { GetAllNewsPublicResponse } from './get-all-news.public.response';
import { News } from '@/features/news/news/news.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllNewsPublicQuery)
export class GetAllNewsPublicHandler implements IQueryHandler<GetAllNewsPublicQuery> {
  async execute(query: GetAllNewsPublicQuery): Promise<GetAllNewsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const news = await News.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(GetAllNewsPublicResponse, news, { excludeExtraneousValues: true });
  }
}
