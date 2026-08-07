import { Query } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { GetOneBookPublicResponse } from '@/features/library/book/public/query/get-one-book/get-one-book.public.response';

export class GetOneBookPublicQuery extends Query<GetOneBookPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
