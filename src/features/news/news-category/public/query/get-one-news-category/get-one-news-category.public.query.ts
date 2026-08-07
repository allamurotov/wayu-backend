import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneNewsCategoryPublicResponse } from './get-one-news-category.public.response';

export class GetOneNewsCategoryPublicQuery extends Query<GetOneNewsCategoryPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
