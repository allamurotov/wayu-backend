import { Query } from '@nestjs/cqrs';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllNewsPublicResponse } from './get-all-news.public.response';
import { GetAllNewsPublicFilters } from '@/features/news/news/public/query/get-all-news/get-all-news.public.filters';

export class GetAllNewsPublicQuery extends Query<GetAllNewsPublicResponse[]> {
  constructor(public readonly filters: GetAllNewsPublicFilters) {
    super();
  }
}
