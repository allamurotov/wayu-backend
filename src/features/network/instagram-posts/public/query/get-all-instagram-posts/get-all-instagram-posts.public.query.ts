import { Query } from '@nestjs/cqrs';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllInstagramPostsPublicResponse } from './get-all-instagram-posts.public.response';
import { GetAllInstagramPostsPublicFilters } from '@/features/network/instagram-posts/public/query/get-all-instagram-posts/get-all-instagram-posts.public.filters';

export class GetAllInstagramPostsPublicQuery extends Query<GetAllInstagramPostsPublicResponse[]> {
  constructor(public readonly filters: GetAllInstagramPostsPublicFilters) {
    super();
  }
}
