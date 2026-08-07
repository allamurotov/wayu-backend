import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneNewsCategoryResponse } from '@/features/news/news-category/admin/query/get-one-news-category/get-one-news-category.response';
import { GetOneTagsResponse } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.response';
import { GetOneTagsPublicResponse } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.response';

export class GetOneTagsPublicQuery extends Query<GetOneTagsPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
