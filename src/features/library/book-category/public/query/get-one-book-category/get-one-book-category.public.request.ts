import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneBookCategoryPublicResponse } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.response';

export class GetOneBookCategoryPublicQuery extends Query<GetOneBookCategoryPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
