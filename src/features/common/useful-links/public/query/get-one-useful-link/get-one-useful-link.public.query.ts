import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneUsefulLinkPublicResponse } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.response';

export class GetOneUsefulLinkPublicQuery extends Query<GetOneUsefulLinkPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
