import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneBranchPublicResponse } from './get-one-branch.public.response';

export class GetOneBranchPublicQuery extends Query<GetOneBranchPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
