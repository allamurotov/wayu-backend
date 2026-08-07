import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from '@/features/news/news/admin/query/get-one-news/get-one-news.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneNewsQuery extends Query<GetOneNewsResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
