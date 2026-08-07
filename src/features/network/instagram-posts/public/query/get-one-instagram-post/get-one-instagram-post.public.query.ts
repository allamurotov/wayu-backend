import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneInstagramPostPublicResponse } from './get-one-instagram-post.public.response';

export class GetOneInstagramPostPublicQuery extends Query<GetOneInstagramPostPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
