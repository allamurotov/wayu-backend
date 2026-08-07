import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneAuthorPublicResponse } from '@/features/library/author/public/query/get-one-author/get-one-author.public.response';

export class GetOneAuthorPublicQuery extends Query<GetOneAuthorPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
