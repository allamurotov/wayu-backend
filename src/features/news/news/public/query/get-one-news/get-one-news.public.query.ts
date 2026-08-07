import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneNewsPublicResponse } from './get-one-news.public.response';

export class GetOneNewsPublicQuery extends Query<GetOneNewsPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
