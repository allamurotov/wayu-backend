import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneNewsCategoryResponse } from '@/features/news/news-category/admin/query/get-one-news-category/get-one-news-category.response';

export class GetOneNewsCategoryQuery extends Query<GetOneNewsCategoryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
