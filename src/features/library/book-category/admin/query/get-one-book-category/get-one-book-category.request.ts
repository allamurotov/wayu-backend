import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoryResponse } from '@/features/library/book-category/admin/query/get-one-book-category/get-one-book-category.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneBookCategoryQuery extends Query<GetOneBookCategoryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
