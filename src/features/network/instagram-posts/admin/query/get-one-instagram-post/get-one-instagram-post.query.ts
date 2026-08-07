import { Query } from '@nestjs/cqrs';
import { GetOneInstagramPostResponse } from './get-one-instagram-post.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneInstagramPostQuery extends Query<GetOneInstagramPostResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
