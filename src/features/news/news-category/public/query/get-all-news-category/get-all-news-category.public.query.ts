import { Query } from '@nestjs/cqrs';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllNewsCategoryPublicResponse } from './get-all-news-category.public.response';
import { GetAllNewsCategoryPublicFilters } from '@/features/news/news-category/public/query/get-all-news-category/get-all-news-category.public.filters';

export class GetAllNewsCategoryPublicQuery extends Query<GetAllNewsCategoryPublicResponse[]> {
  constructor(public readonly filters: GetAllNewsCategoryPublicFilters) {
    super();
  }
}
