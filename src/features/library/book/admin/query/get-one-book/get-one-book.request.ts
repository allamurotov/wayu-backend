import { Query } from '@nestjs/cqrs';
import { GetOneBookResponse } from '@/features/library/book/admin/query/get-one-book/get-one-book.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneBookQuery extends Query<GetOneBookResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
