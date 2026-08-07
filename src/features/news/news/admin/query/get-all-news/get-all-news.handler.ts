import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllNewsQuery } from '@/features/news/news/admin/query/get-all-news/get-all-news.query';
import { GetAllNewsResponse } from '@/features/news/news/admin/query/get-all-news/get-all-news.response';
import { News } from '@/features/news/news/news.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {
  async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const news = await News.find({
      skip: skip,
      take: take,
      relations: ['category', 'country'],
    });
    return plainToInstance(GetAllNewsResponse, news, { excludeExtraneousValues: true });
  }
}
