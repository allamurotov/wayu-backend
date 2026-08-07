import { Query } from '@nestjs/cqrs';
import { GetOneBranchResponse } from './get-one-branch.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneBranchQuery extends Query<GetOneBranchResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
