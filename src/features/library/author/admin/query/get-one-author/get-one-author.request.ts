import { Query } from '@nestjs/cqrs';
import { GetOneAuthorResponse } from '@/features/library/author/admin/query/get-one-author/get-one-author.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneAuthorQuery extends Query<GetOneAuthorResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
