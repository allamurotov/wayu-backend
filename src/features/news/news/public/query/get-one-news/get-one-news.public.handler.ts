import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsPublicQuery } from './get-one-news.public.query';
import { GetOneNewsPublicResponse } from './get-one-news.public.response';
import { News } from '@/features/news/news/news.entity';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneNewsPublicQuery)
export class GetOneNewsPublicHandler implements IQueryHandler<GetOneNewsPublicQuery> {
  async execute(query: GetOneNewsPublicQuery): Promise<GetOneNewsPublicResponse> {
    const news = await News.findOneBy({ id: query.id });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return plainToInstance(GetOneNewsPublicResponse, news, { excludeExtraneousValues: true });
  }
}
