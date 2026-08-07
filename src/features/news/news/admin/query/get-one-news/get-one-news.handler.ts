import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsQuery } from '@/features/news/news/admin/query/get-one-news/get-one-news.request';
import { GetOneNewsResponse } from '@/features/news/news/admin/query/get-one-news/get-one-news.response';
import { News } from '@/features/news/news/news.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneNewsQuery)
export class GetOneNewsHandler implements IQueryHandler<GetOneNewsQuery> {
  async execute(query: GetOneNewsQuery): Promise<GetOneNewsResponse> {
    const news = await News.findOne({
      where: { id: query.id },
      relations: ['category', 'country'],
    });
    if (!news) {
      throw new NotFoundException('news with given id not found');
    }
    return plainToInstance(GetOneNewsResponse, news, { excludeExtraneousValues: true });
  }
}
